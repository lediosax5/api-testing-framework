import userSchema from '../../../../schemas/hostel/users/user.schema';
import { validationErrorSchema, conflictErrorSchema, } from '../../../../schemas/hostel/common/errors.schema';

const uniqueEmail = `qa.post.${Date.now()}@example.test`;

const testData = {
  positive: [
    {
      description: 'Creates a valid user',
      body: {
        firstName: 'Guido',
        lastName: 'Piaggio',
        email: uniqueEmail,
        age: 30,
        status: 'ACTIVE',
      },
      statusCode: 201,
      schema: userSchema,
      expectedBody: {
        firstName: 'Guido',
        lastName: 'Piaggio',
        email: uniqueEmail,
        age: 30,
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
