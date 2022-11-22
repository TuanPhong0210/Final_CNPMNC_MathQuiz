const express = require('express');
const router = express.Router();

// controllers
const operationsAPI = require('../app/controllers/OperationsAPI');

router.delete('/destroy/:_id', operationsAPI.destroy);
router.delete('/:_id', operationsAPI.delete);
router.put('/:_id', operationsAPI.update);
router.patch('/lock/:_id', operationsAPI.editLocked);
router.patch('/restore/:_id', operationsAPI.restore);
router.post('/exist', operationsAPI.checkExist);
router.post('/', operationsAPI.create);
router.get('/deleted', operationsAPI.findAllDeleted);
router.get('/', operationsAPI.findAll);

module.exports = router;
