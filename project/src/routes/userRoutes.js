import express from 'express';
import asyncHandler from 'express-async-handler';
import { UserController } from '../controllers/userController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { UserSchema } from '../schemas/userSchema.js';

export const userRouter = express.Router();

userRouter.post('/', 
  validateRequest(UserSchema),
  asyncHandler(UserController.register)
);

userRouter.get('/:id', 
  asyncHandler(UserController.getUser)
);