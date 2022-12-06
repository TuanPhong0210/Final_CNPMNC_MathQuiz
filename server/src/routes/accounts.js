const express = require('express');
const router = express.Router();

// controllers
const accountsAPI = require('../app/controllers/AccountsAPI');
// middlewares
const verifyToken = require('../app/middlewares/verifyToken');

router.put('/:_id', accountsAPI.update);
router.post('/refreshToken', accountsAPI.refreshToken);
router.post('/login', accountsAPI.login);
router.post('/', accountsAPI.create);
router.get('/profile', verifyToken, accountsAPI.getProfile);
router.get('/verify/:service', verifyToken, accountsAPI.verify);
router.get('/:type', verifyToken, accountsAPI.findAllByType);

module.exports = router;
