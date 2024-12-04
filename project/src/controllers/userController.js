import { UserService } from '../services/userService.js';

export class UserController {
  static async register(req, res) {
    const user = await UserService.register(req.body);
    res.status(201).json(user);
  }

  static async getUser(req, res) {
    const user = await UserService.getUser(req.params.id);
    res.json(user);
  }
}