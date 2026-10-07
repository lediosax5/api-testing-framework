import userSchema from './user.schema';

const getUsersSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: userSchema,
    },
    pagination: {
      type: 'object',
      properties: {
        page: {
          type: 'integer',
          minimum: 1,
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 100,
        },
        total: {
          type: 'integer',
          minimum: 0,
        },
        totalPages: {
          type: 'integer',
          minimum: 0,
        },
      },
      required: [
        'page',
        'limit',
        'total',
        'totalPages',
      ],
      additionalProperties: false,
    },
  },
  required: [
    'items',
    'pagination',
  ],
  additionalProperties: false,
} as const;

export default getUsersSchema;
