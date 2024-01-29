const express = require('express');
const router = express.Router();
const { retrieveRecentUserConversations, retrieveMessagesBetweenUsers } = require('../controllers/messageController');


router.get('/messages/:userId', retrieveRecentUserConversations);
router.get('/messages/:userId/:friendId', retrieveMessagesBetweenUsers);

module.exports = router;