import { Router } from 'express';
import { createUser, getUserById, getUsers, replaceUser } from '../controllers/user.controller';
import { validateCreateUserRequest, validateReplaceUserRequest } from '../middleware/create-user-validation.middleware';
import { validateUserId } from '../middleware/user-id-validation.middleware';
import { validateUserListQuery } from '../middleware/user-query-validation.middleware';

const userRouter = Router();

userRouter.post('/', validateCreateUserRequest, createUser);
userRouter.get('/', validateUserListQuery, getUsers);
userRouter.get('/:id', validateUserId, getUserById);
userRouter.put('/:id', validateUserId, validateReplaceUserRequest, replaceUser);

export default userRouter;
