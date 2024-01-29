const { findRecentUserConversations, findMessagesBetweenUsers } = require('../services/messageService');

const retrieveRecentUserConversations = async (req, res) => {
    const userId = req.params.userId;
    try {
        const results = await findRecentUserConversations(userId);
        console.log(results);
        res.json(results);
    } catch (error) {
        console.error('Error fetching users sorted by recent message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const retrieveMessagesBetweenUsers = async (req, res) => {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    try {
        const results = await findMessagesBetweenUsers(userId, friendId);
        res.json(results);
    } catch (error) {
        console.error('Error fetching messaging between users:', error.message);
        res.status(500).json({ error: 'Error fetching messaging between users' });
    }
};



module.exports = {
    retrieveRecentUserConversations,
    retrieveMessagesBetweenUsers
};