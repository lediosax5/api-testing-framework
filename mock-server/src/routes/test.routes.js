const { Router } = require('express');
const { userService } = require('../services/user.service');

const testRouter = Router();

testRouter.post('/reset', (_request, response) => {
  userService.reset();
  response.status(204).send();
});

module.exports = testRouter;
