const { Router } = require('express');
const authController = require('./auth.controller');
const router = Router();

router.route('/login').post(authController.loginUser);

router.route('/signup').post(authController.signupUser);

module.exports = router;
