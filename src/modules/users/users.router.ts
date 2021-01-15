import { Router } from 'express';
import { UserController } from './users.controller';
const router = Router();
const userController = new UserController();

// prettier-ignore
router
  .route('/')
  .get(userController.findAllUsers);

// prettier-ignore
router
  .route('/:id')
  .get(userController.findUserById);

export default router;
