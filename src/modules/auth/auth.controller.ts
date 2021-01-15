import { Request, Response, NextFunction } from 'express';
import { UserService } from '../users/users.service';
import jwt from 'jsonwebtoken';

const APP_SECRET = <string>process.env.APP_SECRET;

export class AuthController {
  constructor(private userService: UserService = new UserService()) {}

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const user = await this.userService.validate(username, password);
      const token = jwt.sign({ sub: user.id }, APP_SECRET);

      res.json({ user, token });
    } catch (err) {
      next(err);
    }
  };

  signupUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const user = await this.userService.create(username, password);
      const token = jwt.sign({ sub: user.id }, APP_SECRET);

      res.json({ user, token });
    } catch (err) {
      next(err);
    }
  };

  getProfile = async (req: any, res: Response, next: NextFunction) => {
    const userId = req.user.sub;
    if (userId) {
      try {
        const user = await this.userService.findProfile(userId);
        res.json(user);
      } catch (err) {
        next(err);
      }
    } else {
      next({ name: 'Error', message: 'Token has no useful data' });
    }
  };
}
