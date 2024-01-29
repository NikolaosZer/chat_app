import { useState } from 'react';
import { Form, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  selectUsers,
  selectUsersLoading,
  setSelectedUser,
  setUsers,
  setUsersError,
  setUsersLoading,
} from '../state/users/usersSlice';
import { services } from '../services';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectUsersLoading);

  const [formData, setFormData] = useState({
    userName: '',
    lastName: '',
    gender: '',
    age: '',
  });

  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      dispatch(setUsersLoading());
      event.preventDefault();
      const users = await services.getUsersApi(formData);
      console.log(users);
      dispatch(setUsers(users));
      setFormData({
        userName: '',
        lastName: '',
        gender: '',
        age: '',
      });
      if (users.length > 0) {
        toast.success('Your users have been retrieved!!!');
      } else {
        toast.info('No users found');
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(setUsersError(error.message));
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 className="form-title">Get Users</h2>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="userName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={formData.userName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="N/A">N/A</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Younger than"
              value={formData.age}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {' Loading...'}
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </Form>

      <div className="user-cards mt-3">
        {users?.map(({ id, userName, firstName, lastName, age }) => (
          <Card key={id} bg="dark" text="light" className="user-card mb-3">
            <Card.Header style={{ fontSize: '2rem', letterSpacing: '2px' }}>
              {userName}
            </Card.Header>
            <Card.Body>
              <Card.Title>
                I am {firstName} {lastName} and I am {age} years old
              </Card.Title>
              <Button
                onClick={() => dispatch(setSelectedUser({ id, userName }))}
                className="user-card-button"
                variant="secondary"
              >
                Chats
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserList;
