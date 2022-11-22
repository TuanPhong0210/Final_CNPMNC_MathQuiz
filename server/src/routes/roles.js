const express = require('express');
const router = express.Router();

// controllers
const rolesAPI = require('../app/controllers/RolesAPI');

router.put('/:_id', rolesAPI.update);
router.post('/exist', rolesAPI.checkExist);
router.post('/', rolesAPI.create);
router.get('/', rolesAPI.findAll);

module.exports = router;
