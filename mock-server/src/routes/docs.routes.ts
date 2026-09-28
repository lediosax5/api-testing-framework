import { Router } from 'express';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';

const docsRouter = Router();
const openApiFilePath = path.resolve(__dirname, '../../openapi/openapi.yaml');

docsRouter.get('/openapi.yaml', (_request, response, next) => {
  response.type('application/yaml');
  response.sendFile(openApiFilePath, (error) => {
    if (error) next(error);
  });
});

docsRouter.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(null, {
    explorer: false,
    swaggerOptions: {
      url: '/openapi.yaml',
      persistAuthorization: false,
      displayRequestDuration: true,
    },
  }),
);

export default docsRouter;
