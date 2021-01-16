import { Request, Response, NextFunction } from 'express';
import { UserService } from './users.service';

export class UserController {
  constructor(private userService: UserService = new UserService()) {}

  findAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.find();
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  findUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.findById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };
}
