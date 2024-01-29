const { sequelize, Message, Chat } = require("../db");



const findRecentUserConversations = async (userId) => {
    const plainSQLQuery = `
        SELECT m.content, 
        m.timestamp_sent,
            CASE
                WHEN m.sender_id = :userId THEN receiver.id 
                WHEN m.receiver_id = :userId THEN sender.id
            END AS friend_id,
            CASE
                WHEN m.sender_id = :userId THEN receiver.user_name
                WHEN m.receiver_id = :userId THEN sender.user_name
            END AS friend_name
        FROM user_conversations uc
        INNER JOIN messages m ON m.id = uc.last_message_id
        INNER JOIN users receiver ON receiver.id = m.receiver_id
        INNER JOIN users sender ON sender.id = m.sender_id
        WHERE uc.user_id = :userId OR uc.friend_id = :userId
        ORDER BY m.timestamp_sent DESC;
    `;

    try {
        return await sequelize.query(plainSQLQuery, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { userId: userId }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching users sorted by recent message');
    }
};

const findMessagesBetweenUsers = async (userId, friendId) => {
    const chatName = `user${Math.min(userId, friendId)}_user${Math.max(userId, friendId)}`;
    return await Message.findAll({
        attributes: ['id', 'senderId', 'receiverId', 'seen', 'content', 'timestampSent'],
        include: [
            {
                model: Chat,
                as: 'chat',
                where: {
                    name: chatName,
                },
                attributes: [],
            },
        ],
        order: [
            ['timestampSent', 'ASC'],
        ],
        raw: true,
    });
};

module.exports = {
    findRecentUserConversations,
    findMessagesBetweenUsers
}