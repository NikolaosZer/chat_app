
const { findUsers, findUsersSortedByRecentMessage } = require('../services/userService');

const retrieveUsersWithFilters = async (req, res) => {
    try {
        const users = await findUsers(req.query);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users with filters:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const retrieveUsersSortedByRecentMessage = async (req, res) => {
    const userId = req.params.userId;

    try {
        const results = await findUsersSortedByRecentMessage(userId);
        console.log(results);
        res.json(results);
    } catch (error) {
        console.error('Error fetching users sorted by recent message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    retrieveUsersWithFilters,
    retrieveUsersSortedByRecentMessage,
};