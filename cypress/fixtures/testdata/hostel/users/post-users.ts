import userSchema from '../../../../schemas/hostel/users/user.schema';
import { validationErrorSchema, conflictErrorSchema } from '../../../../schemas/hostel/common/errors.schema';

const runId = Date.now();

const testData = {
  positive: [
    {
      description: 'Creates a valid user',
      body: {
        firstName: 'Guido',
        lastName: 'Piaggio',
        email: `qa.post.valid.${runId}@example.test`,
        age: 30,
        status: 'ACTIVE',
      },
      statusCode: 201,
      schema: userSchema,
      expectedBody: {
        firstName: 'Guido',
        lastName: 'Piaggio',
        email: `qa.post.valid.${runId}@example.test`,
        age: 30,
        status: 'ACTIVE',
      },
    },
    {
      description: 'Creates a user with the minimum allowed age',
      body: {
        firstName: 'Boundary',
        lastName: 'User',
        email: `qa.post.minimum-age.${runId}@example.test`,
        age: 18,
        status: 'ACTIVE',
      },
      statusCode: 201,
      schema: userSchema,
      expectedBody: {
        firstName: 'Boundary',
        lastName: 'User',
        email: `qa.post.minimum-age.${runId}@example.test`,
        age: 18,
        status: 'ACTIVE',
      },
    },
  ],

  negative: [
    {
      description: 'Rejects an empty body',
      body: {},
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-01',
        detail: 'Request validation failed.',
        errors: [
          {
            field: 'firstName',
            message: 'Field is required.',
          },
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
      description: 'Rejects age below minimum',
      body: {
        firstName: 'Guido',
        lastName: 'Piaggio',
        email: 'qa.invalid.age@example.test',
        age: 17,
        status: 'ACTIVE',
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
      description: 'Rejects age above maximum',
      body: {
        firstName: 'Guido',
        lastName: 'Piaggio',
        email: 'qa.invalid.max.age@example.test',
        age: 121,
        status: 'ACTIVE',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-01',
        detail: 'Request validation failed.',
        errors: [
          {
            field: 'age',
            message: 'Must be less than or equal to 120.',
          },
        ],
      },
    },
    {
      description: 'Rejects an invalid email',
      body: {
        firstName: 'Guido',
        lastName: 'Piaggio',
        email: 'invalid-email',
        age: 30,
        status: 'ACTIVE',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-01',
        detail: 'Request validation failed.',
        errors: [
          {
            field: 'email',
            message: 'Must be a valid email address.',
          },
        ],
      },
    },
    {
      description: 'Rejects an unknown field',
      body: {
        firstName: 'Guido',
        lastName: 'Piaggio',
        email: 'qa.invalid.unknown-field@example.test',
        age: 30,
        status: 'ACTIVE',
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
      description: 'Rejects an invalid status',
      body: {
        firstName: 'Guido',
        lastName: 'Piaggio',
        email: 'qa.invalid.status@example.test',
        age: 30,
        status: 'UNKNOWN',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-01',
        detail: 'Request validation failed.',
        errors: [
          {
            field: 'status',
            message: 'Must be one of: ACTIVE, INACTIVE.',
          },
        ],
      },
    },
    {
      description: 'Rejects a duplicated email',
      body: {
        firstName: 'Duplicate',
        lastName: 'User',
        email: 'qa.seed.raul.alfonsin@gmail.com',
        age: 30,
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
