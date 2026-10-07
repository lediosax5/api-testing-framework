import { validationErrorSchema, notFoundErrorSchema } from '../../../../schemas/hostel/common/errors.schema';

const runId = Date.now();

const testData = {
  positive: [
    {
      description: 'Deletes an existing user',
      setupBody: {
        firstName: 'Delete',
        lastName: 'Test',
        email: `qa.delete.single.${runId}@example.test`,
        age: 30,
        status: 'ACTIVE',
      },
      statusCode: 204,
    },
    {
      description: 'Returns not found when deleting the same user twice',
      setupBody: {
        firstName: 'Delete',
        lastName: 'Twice',
        email: `qa.delete.twice.${runId}@example.test`,
        age: 30,
        status: 'ACTIVE',
      },
      statusCode: 204,
      secondDeleteStatusCode: 404,
      expectedBody: {
        code: 'USR-404-01',
        detail: 'User was not found.',
      },
    },
  ],

  negative: [
    {
      description: 'Rejects an invalid user id',
      userId: 'not-a-uuid',
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-02',
        detail: 'Path parameter validation failed.',
        errors: [
          {
            field: 'id',
            message: 'Must be a valid UUID.',
          },
        ],
      },
    },
    {
      description: 'Returns not found for a non-existing user',
      userId: 'a1000000-0000-4000-8000-000000000099',
      statusCode: 404,
      schema: notFoundErrorSchema,
      expectedBody: {
        code: 'USR-404-01',
        detail: 'User was not found.',
      },
    },
  ],
};

export default testData;
