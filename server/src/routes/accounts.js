const express = require('express');
const router = express.Router();

// controllers
const accountsAPI = require('../app/controllers/AccountsAPI');

router.post('/', accountsAPI.create);

module.exports = router;
