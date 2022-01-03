const express = require('express');
const router = express.Router();
const control = require('../controllers/user');

const Schema = require('../object/User');

router.post('/signup',control.signingUser);
router.post('/login',control.loginUser);


module.exports = router;