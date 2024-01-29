import { useEffect } from 'react';
import { Card, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedUser,
  selectUsers,
  setSelectedUser,
} from '../state/users/usersSlice';
import { services } from '../services';
import {
  selectChats,
  selectSelectedChat,
  setChats,
  setChatsError,
  setChatsLoading,
  setSelectedChat,
} from '../state/chats/chatsSlice';
import { toast } from 'react-toastify';
import {
  selectMessages,
  setMessages,
  setMessagesError,
  setMessagesLoading,
} from '../state/messages/messagesSlice';

const UserChats = () => {
  const selectedUser = useSelector(selectSelectedUser);
  const users = useSelector(selectUsers);
  const userChats = useSelector(selectChats);
  const dispatch = useDispatch();
  const selectedChat = useSelector(selectSelectedChat);
  const messages = useSelector(selectMessages);

  useEffect(() => {
    const getUserChats = async () => {
      try {
        dispatch(setChatsLoading());
        const userChats = await services.getUserChats(selectedUser.id);
        dispatch(setChats(userChats));
        toast.success('Your chats have been retrieved!!!');
      } catch (error) {
        const errorMessage = error.message;
        dispatch(setChatsError(errorMessage));
        toast.error(errorMessage);
      }
    };

    if (selectedUser && users && users.length > 0) {
      getUserChats();
    }
  }, [dispatch, selectedUser, users]);

  useEffect(() => {
    const getChatMessages = async () => {
      try {
        dispatch(setMessagesLoading());
        const messages = await services.getMessages(
          selectedUser.id,
          selectedChat.friend_id
        );
        dispatch(setMessages(messages));
      } catch (error) {
        const errorMessage = error.message;
        dispatch(setMessagesError(errorMessage));
        toast.error(errorMessage);
      }
    };

    if (selectedChat && selectedUser) {
      getChatMessages();
    }
  }, [dispatch, selectedChat, selectedUser]);

  const onHideClick = () => {
    dispatch(setSelectedUser(null));
    dispatch(setSelectedChat(null));
  };

  const onSelectCardClick = (chat) => {
    dispatch(setSelectedChat(chat));
  };

  const displayUser = (message) => {
    if (message.senderId === selectedUser.id) {
      return (
        <div className="current-user">
          <span>{selectedUser.userName}</span>
        </div>
      );
    } else {
      return (
        <div className="friend-user">
          <p>{selectedChat.friend_name}</p>
        </div>
      );
    }
  };

  const displayMessage = (message) => {
    const content = `${message.content} ${message.seen ? '✔️✔️' : ''}`;
    if (message.senderId === selectedUser.id) {
      return <p style={{ textAlign: 'right' }}>{content}</p>;
    } else {
      return <p style={{ textAlign: 'left' }}>{content}</p>;
    }
  };

  return (
    <div>
      {selectedUser && (
        <Modal
          data-bs-theme="dark"
          show={selectedUser ? true : false}
          fullscreen
          onHide={onHideClick}
        >
          <Modal.Header closeButton>
            <Modal.Title>Chats</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="chat-tabs">
              <section className="user-chats">
                {userChats?.map((chat) => (
                  <Card
                    key={chat.friend_id}
                    bg="dark"
                    text="light"
                    className={`user-card mb-3 ${
                      chat.friend_id === selectedChat?.friend_id
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => onSelectCardClick(chat)}
                  >
                    <Card.Header
                      style={{ fontSize: '2rem', letterSpacing: '2px' }}
                    >
                      {chat.friend_name}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{chat.content}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </section>
              <section className="selected-chat">
                {selectedChat && (
                  <Card bg="dark" text="light" className="user-card mb-3">
                    <Card.Header
                      style={{ fontSize: '3rem', letterSpacing: '2px' }}
                    >
                      {selectedChat.friend_name}
                    </Card.Header>
                    <Card.Body>
                      {messages?.map((message) => (
                        <Card
                          key={message.id}
                          bg="dark"
                          text="light"
                          className="user-card mb-3"
                        >
                          <Card.Header
                            style={{ fontSize: '1.5rem', letterSpacing: '2px' }}
                          >
                            {displayUser(message)}
                          </Card.Header>
                          <Card.Body>
                            <Card.Title>{displayMessage(message)}</Card.Title>
                          </Card.Body>
                        </Card>
                      ))}
                    </Card.Body>
                  </Card>
                )}
              </section>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
export default UserChats;
