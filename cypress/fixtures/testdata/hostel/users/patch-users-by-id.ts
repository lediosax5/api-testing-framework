import userSchema from '../../../../schemas/hostel/users/user.schema';
import { validationErrorSchema, notFoundErrorSchema, conflictErrorSchema } from '../../../../schemas/hostel/common/errors.schema';

const runId = Date.now();

const testData = {
  positive: [
    {
      description: 'Partially updates an existing user',
      setupBody: {
        firstName: 'Original',
        lastName: 'User',
        email: `qa.patch.partial.${runId}@example.test`,
        age: 30,
        status: 'ACTIVE',
      },
      body: {
        lastName: 'UserEdit',
        age: 35,
        status: 'INACTIVE',
      },
      statusCode: 200,
      schema: userSchema,
    },
    {
      description: 'Updates all user fields',
      setupBody: {
        firstName: 'Original',
        lastName: 'User',
        email: `qa.patch.full.${runId}@example.test`,
        age: 30,
        status: 'ACTIVE',
      },
      body: {
        firstName: 'Updated',
        lastName: 'UserEdit',
        email: `qa.patch.full.updated.${runId}@example.test`,
        age: 40,
        status: 'INACTIVE',
      },
      statusCode: 200,
      schema: userSchema,
    },
  ],

  negative: [
    {
      description: 'Rejects an invalid user id',
      userId: 'not-a-uuid',
      body: {
        firstName: 'Updated',
      },
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
      description: 'Rejects an empty body',
      userId: 'a1000000-0000-4000-8000-000000000001',
      body: {},
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-01',
        detail: 'Request validation failed.',
        errors: [
          {
            field: 'body',
            message: 'At least one field must be provided.',
          },
        ],
      },
    },
    {
      description: 'Rejects an invalid age',
      userId: 'a1000000-0000-4000-8000-000000000001',
      body: {
        age: 17,
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-01',
        detail: 'Request validation failed.',
        errors: [
          {
            field: 'age',
            message: 'Must be greater than or equal to 18.',
          },
        ],
      },
    },
    {
      description: 'Rejects an unknown field',
      userId: 'a1000000-0000-4000-8000-000000000001',
      body: {
        firstName: 'Updated',
        nickname: 'Test',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-01',
        detail: 'Request validation failed.',
        errors: [
          {
            field: 'nickname',
            message: 'Field is not allowed.',
          },
        ],
      },
    },
    {
      description: 'Returns not found for a non-existing user',
      userId: 'a1000000-0000-4000-8000-000000000099',
      body: {
        firstName: 'Updated',
      },
      statusCode: 404,
      schema: notFoundErrorSchema,
      expectedBody: {
        code: 'USR-404-01',
        detail: 'User was not found.',
      },
    },
    {
      description: 'Rejects an email already used by another user',
      userId: 'a1000000-0000-4000-8000-000000000001',
      body: {
        email: 'qa.seed.carlos.menem@gmail.com',
      },
      statusCode: 409,
      schema: conflictErrorSchema,
      expectedBody: {
        code: 'USR-409-01',
        detail: 'A user with this email already exists.',
      },
    },
  ],
};

export default testData;
