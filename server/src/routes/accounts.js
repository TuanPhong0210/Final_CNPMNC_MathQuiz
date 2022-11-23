const express = require('express');
const router = express.Router();

// controllers
const accountsAPI = require('../app/controllers/AccountsAPI');
// middlewares
const verifyToken = require('../app/middlewares/verifyToken');

router.post('/login', accountsAPI.login);
router.post('/', accountsAPI.create);
router.get('/profile', verifyToken, accountsAPI.getProfile);
router.get('/verify/:service', verifyToken, accountsAPI.verify);

module.exports = router;
