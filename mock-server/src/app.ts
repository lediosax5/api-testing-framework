import express from 'express';

import healthRouter from './routes/health.routes';
import userRouter from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.disable('x-powered-by');

app.use(express.json({ strict: false }));

app.use('/health', healthRouter);
app.use('/api/v1/users', userRouter);
app.use(errorHandler);

export default app;
