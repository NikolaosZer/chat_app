const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
router.get('/users', UserController.retrieveUsersWithFilters);

module.exports = router;