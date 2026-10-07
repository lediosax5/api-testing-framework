import getUsersSchema from '../../../../schemas/hostel/users/get-users.schema';
import { validationErrorSchema } from '../../../../schemas/hostel/common/errors.schema';

const testData = {
  positive: [
    {
      description: 'Returns users with default pagination',
      query: {},
      statusCode: 200,
      schema: getUsersSchema,
      expected: {
        page: 1,
        limit: 10,
      },
    },
    {
      description: 'Returns the requested page and limit',
      query: {
        page: 2,
        limit: 5,
      },
      statusCode: 200,
      schema: getUsersSchema,
      expected: {
        page: 2,
        limit: 5,
      },
    },
    {
      description: 'Filters users by inactive status',
      query: {
        status: 'INACTIVE',
      },
      statusCode: 200,
      schema: getUsersSchema,
      expected: {
        page: 1,
        limit: 10,
        userStatus: 'INACTIVE',
      },
    },
    {
      description: 'Searches users by name',
      query: {
        search: 'Eduardo',
      },
      statusCode: 200,
      schema: getUsersSchema,
      expected: {
        page: 1,
        limit: 10,
      },
    },
    {
      description: 'Sorts users by age ascending',
      query: {
        sortBy: 'age',
        order: 'asc',
      },
      statusCode: 200,
      schema: getUsersSchema,
      expected: {
        page: 1,
        limit: 10,
      },
    },
    {
      description: 'Sorts users by age descending',
      query: {
        sortBy: 'age',
        order: 'desc',
      },
      statusCode: 200,
      schema: getUsersSchema,
      expected: {
        page: 1,
        limit: 10,
      },
    },
    {
      description: 'Filters active users and sorts by age descending',
      query: {
        status: 'ACTIVE',
        sortBy: 'age',
        order: 'desc',
        limit: 5,
      },
      statusCode: 200,
      schema: getUsersSchema,
      expected: {
        page: 1,
        limit: 5,
        userStatus: 'ACTIVE',
      },
    },
    {
      description: 'Accepts the maximum allowed limit',
      query: {
        limit: 100,
      },
      statusCode: 200,
      schema: getUsersSchema,
      expected: {
        page: 1,
        limit: 100,
      },
    },
  ],

  negative: [
    {
      description: 'Rejects page lower than one',
      query: {
        page: 0,
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
        errors: [
          {
            field: 'page',
            message: 'Must be greater than or equal to 1.',
          },
        ],
      },
    },
    {
      description: 'Rejects limit greater than one hundred',
      query: {
        limit: 101,
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
        errors: [
          {
            field: 'limit',
            message: 'Must be less than or equal to 100.',
          },
        ],
      },
    },
    {
      description: 'Rejects limit lower than one',
      query: {
        limit: 0,
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
        errors: [
          {
            field: 'limit',
            message: 'Must be greater than or equal to 1.',
          },
        ],
      },
    },
    {
      description: 'Rejects an unknown query parameter',
      query: {
        unknown: 'value',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
        errors: [
          {
            field: 'unknown',
            message: 'Query parameter is not allowed.',
          },
        ],
      },
    },
    {
      description: 'Rejects an invalid status filter',
      query: {
        status: 'UNKNOWN',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
      },
    },
    {
      description: 'Rejects a non-integer page',
      query: {
        page: 'abc',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
        errors: [
          {
            field: 'page',
            message: 'Must be an integer.',
          },
        ],
      },
    },
    {
      description: 'Rejects a non-integer limit',
      query: {
        limit: 'abc',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
        errors: [
          {
            field: 'limit',
            message: 'Must be an integer.',
          },
        ],
      },
    },
    {
      description: 'Rejects an invalid sortBy value',
      query: {
        sortBy: 'invalid',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
        errors: [
          {
            field: 'sortBy',
            message: 'Must be one of: firstName, lastName, email, age, status, createdAt, updatedAt.',
          },
        ],
      },
    },
    {
      description: 'Rejects an invalid order value',
      query: {
        order: 'invalid',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
        errors: [
          {
            field: 'order',
            message: 'Must be one of: asc, desc.',
          },
        ],
      },
    },
    {
      description: 'Rejects an empty search value',
      query: {
        search: '',
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
        errors: [
          {
            field: 'search',
            message: 'Must contain between 1 and 100 characters.',
          },
        ],
      },
    },
    {
      description: 'Rejects search longer than one hundred characters',
      query: {
        search: 'a'.repeat(101),
      },
      statusCode: 400,
      schema: validationErrorSchema,
      expectedBody: {
        code: 'USR-400-03',
        detail: 'Query parameter validation failed.',
        errors: [
          {
            field: 'search',
            message: 'Must contain between 1 and 100 characters.',
          },
        ],
      },
    },
  ],
};

export default testData;
