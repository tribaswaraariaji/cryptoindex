const router = require('express').Router();
const UserDataController = require('../controller/userDataController');
const bcrypt = require('bcrypt');

router.post('/login',UserDataController.authenticate);
router.post('/register',UserDataController.create);

module.exports = router;