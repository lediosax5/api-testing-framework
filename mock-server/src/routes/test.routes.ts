import { Router } from 'express';
import { resetTestState } from '../controllers/test.controller';

const testRouter = Router();

testRouter.post('/reset', resetTestState);

export default testRouter;
