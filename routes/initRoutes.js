const express = require('express');
const { feedTables } = require('../controllers/initController');
const router = express.Router();


router.post('/init', feedTables);

module.exports = router;