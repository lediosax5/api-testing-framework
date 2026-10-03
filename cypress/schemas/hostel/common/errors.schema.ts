export const validationErrorSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      const: 'validation-error',
    },
    title: {
      type: 'string',
      const: 'Validation Error',
    },
    status: {
      type: 'integer',
      const: 400,
    },
    code: {
      type: 'string',
    },
    detail: {
      type: 'string',
    },
    instance: {
      type: 'string',
    },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
        required: ['field', 'message'],
        additionalProperties: false,
      },
    },
  },
  required: [
    'type',
    'title',
    'status',
    'code',
    'detail',
    'instance',
    'errors',
  ],
  additionalProperties: false,
} as const;

export const notFoundErrorSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      const: 'not-found',
    },
    title: {
      type: 'string',
      const: 'Resource Not Found',
    },
    status: {
      type: 'integer',
      const: 404,
    },
    code: {
      type: 'string',
      const: 'USR-404-01',
    },
    detail: {
      type: 'string',
      const: 'User was not found.',
    },
    instance: {
      type: 'string',
    },
  },
  required: [
    'type',
    'title',
    'status',
    'code',
    'detail',
    'instance',
  ],
  additionalProperties: false,
} as const;

export const conflictErrorSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      const: 'conflict',
    },
    title: {
      type: 'string',
      const: 'Resource Conflict',
    },
    status: {
      type: 'integer',
      const: 409,
    },
    code: {
      type: 'string',
      const: 'USR-409-01',
    },
    detail: {
      type: 'string',
      const: 'A user with this email already exists.',
    },
    instance: {
      type: 'string',
    },
  },
  required: [
    'type',
    'title',
    'status',
    'code',
    'detail',
    'instance',
  ],
  additionalProperties: false,
} as const;
