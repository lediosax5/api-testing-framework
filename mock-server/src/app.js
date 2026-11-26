const express = require('express');

const docsRouter = require('./routes/docs.routes');
const healthRouter = require('./routes/health.routes');
const testRouter = require('./routes/test.routes');
const userRouter = require('./routes/user.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.disable('x-powered-by');

app.use(express.json({ strict: false }));

app.use('/health', healthRouter);
app.use(docsRouter);
app.use('/__test', testRouter);
app.use('/api/v1/users', userRouter);
app.use(errorHandler);

module.exports = app;
