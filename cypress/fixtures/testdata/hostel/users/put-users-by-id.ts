import userSchema from '../../../../schemas/hostel/users/user.schema';
import { validationErrorSchema, notFoundErrorSchema, conflictErrorSchema } from '../../../../schemas/hostel/common/errors.schema';

const originalEmail = `qa.put.original.${Date.now()}@example.test`;
const updatedEmail = `qa.put.updated.${Date.now()}@example.test`;

const testData = {
  positive: [
    {
      description: 'Replaces an existing user',
      setupBody: {
        firstName: 'Original',
        lastName: 'User',
        email: originalEmail,
        age: 30,
        status: 'ACTIVE',
      },
      body: {
        firstName: 'Updated',
        lastName: 'UserEdit',
        email: updatedEmail,
        age: 35,
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
        lastName: 'User',
        email: 'qa.put.invalid.id@example.test',
        age: 35,
        status: 'ACTIVE',
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
      description: 'Rejects an incomplete body',
      userId: 'a1000000-0000-4000-8000-000000000001',
      body: {
        firstName: 'Updated',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-01',
        detail: 'Request validation failed.',
        errors: [
          {
            field: 'lastName',
            message: 'Field is required.',
          },
          {
            field: 'email',
            message: 'Field is required.',
          },
          {
            field: 'age',
            message: 'Field is required.',
          },
          {
            field: 'status',
            message: 'Field is required.',
          },
        ],
      },
    },
    {
      description: 'Returns not found for a non-existing user',
      userId: 'a1000000-0000-4000-8000-000000000099',
      body: {
        firstName: 'Updated',
        lastName: 'User',
        email: 'qa.put.notfound@example.test',
        age: 35,
        status: 'ACTIVE',
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
        firstName: 'Updated',
        lastName: 'User',
        email: 'qa.seed.carlos.menem@gmail.com',
        age: 35,
        status: 'ACTIVE',
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
