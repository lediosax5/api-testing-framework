import userSchema from '../../../../schemas/hostel/users/user.schema';
import {
  validationErrorSchema,
  notFoundErrorSchema,
} from '../../../../schemas/hostel/common/errors.schema';

const testData = [
  {
    description: 'Returns an active user by id',
    userId: 'a1000000-0000-4000-8000-000000000001',
    statusCode: 200,
    schema: userSchema,
    expectedBody: {
      id: 'a1000000-0000-4000-8000-000000000001',
      status: 'ACTIVE',
    },
  },
  {
    description: 'Returns an inactive user by id',
    userId: 'a1000000-0000-4000-8000-000000000002',
    statusCode: 200,
    schema: userSchema,
    expectedBody: {
      id: 'a1000000-0000-4000-8000-000000000002',
      status: 'INACTIVE',
    },
  },
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
    description: 'Returns not found for an unknown user',
    userId: 'a1000000-0000-4000-8000-000000000099',
    statusCode: 404,
    schema: notFoundErrorSchema,
    expectedBody: {
      code: 'USR-404-01',
      detail: 'User was not found.',
    },
  },
];

export default testData;
