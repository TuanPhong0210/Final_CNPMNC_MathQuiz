const express = require('express');
const router = express.Router();

// controllers
const questionsAPI = require('../app/controllers/QuestionsAPI');

router.post('/', questionsAPI.create);
router.get('/', questionsAPI.findAll);

module.exports = router;
