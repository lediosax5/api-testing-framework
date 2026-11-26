const { Router } = require('express');

const healthRouter = Router();

healthRouter.get('/', (_request, response) => {
  response.status(200).json({
    status: 'UP',
    service: 'ms-hostel-api',
    timestamp: new Date().toISOString(),
  });
});

module.exports = healthRouter;
