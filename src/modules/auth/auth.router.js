const { Router } = require('express');
const authController = require('./auth.controller');
const router = Router();

// prettier-ignore
router
  .route('/login')
  .post(authController.loginUser);

// prettier-ignore
router
  .route('/signup')
  .post(authController.signupUser);

// prettier-ignore
router
  .route('/profile')
  .get(authController.getProfile);

module.exports = router;
