import express from 'express';

import healthRouter from './routes/health.routes';

const app = express();

app.disable('x-powered-by');

app.use(express.json());

app.use('/health', healthRouter);

export default app;