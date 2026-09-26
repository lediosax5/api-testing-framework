import { Router } from 'express';
import { createUser } from '../controllers/user.controller';
import { validateCreateUserRequest } from '../middleware/create-user-validation.middleware';

const userRouter = Router();

userRouter.post('/', validateCreateUserRequest, createUser);

export default userRouter;
