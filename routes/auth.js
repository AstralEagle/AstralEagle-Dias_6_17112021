const express = require('express');
const router = express.Router();
const control = require('../controllers/user');

const Schema = require('../object/User');

router.get('/', control.getUsers);
router.post('/signup',control.signingUser);
router.post('/login',control.loginUser);
router.delete('/', control.deleteUser);


module.exports = router;