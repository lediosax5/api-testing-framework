import express from 'express';

import docsRouter from './routes/docs.routes';
import healthRouter from './routes/health.routes';
import testRouter from './routes/test.routes';
import userRouter from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.disable('x-powered-by');

app.use(express.json({ strict: false }));

app.use('/health', healthRouter);
app.use(docsRouter);
app.use('/__test', testRouter);
app.use('/api/v1/users', userRouter);
app.use(errorHandler);

export default app;
