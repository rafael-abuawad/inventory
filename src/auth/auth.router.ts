import { Router } from 'express';
import { AuthController } from './auth.controller';
const router = Router();
const authController = new AuthController();

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

export default router;
