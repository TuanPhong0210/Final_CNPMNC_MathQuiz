const express = require('express');
const router = express.Router();

// controllers
const roomsAPI = require('../app/controllers/RoomsAPI');

router.put('/:_id', roomsAPI.update);
router.post('/', roomsAPI.create);
router.get('/closest', roomsAPI.findClosest);
router.get('/', roomsAPI.findAll);

module.exports = router;
