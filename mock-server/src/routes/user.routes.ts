import { Router } from 'express';
import { createUser, getUserById, getUsers } from '../controllers/user.controller';
import { validateCreateUserRequest } from '../middleware/create-user-validation.middleware';
import { validateUserId } from '../middleware/user-id-validation.middleware';
import { validateUserListQuery } from '../middleware/user-query-validation.middleware';

const userRouter = Router();

userRouter.post('/', validateCreateUserRequest, createUser);
userRouter.get('/', validateUserListQuery, getUsers);
userRouter.get('/:id', validateUserId, getUserById);

export default userRouter;
