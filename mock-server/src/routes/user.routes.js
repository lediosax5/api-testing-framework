const { Router } = require('express');
const { createUser, deleteUser, getUserById, getUsers, patchUser, replaceUser } = require('../controllers/user.controller');
const { validateCreateUserRequest, validatePatchUserRequest, validateReplaceUserRequest } = require('../middleware/create-user-validation.middleware');
const { validateUserId } = require('../middleware/user-id-validation.middleware');
const { validateUserListQuery } = require('../middleware/user-query-validation.middleware');

const userRouter = Router();

userRouter.post('/', validateCreateUserRequest, createUser);
userRouter.get('/', validateUserListQuery, getUsers);
userRouter.get('/:id', validateUserId, getUserById);
userRouter.put('/:id', validateUserId, validateReplaceUserRequest, replaceUser);
userRouter.patch('/:id', validateUserId, validatePatchUserRequest, patchUser);
userRouter.delete('/:id', validateUserId, deleteUser);

module.exports = userRouter;
