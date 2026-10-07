const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    firstName: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: 'string',
      format: 'email',
      maxLength: 100,
    },
    age: {
      type: 'integer',
      minimum: 18,
      maximum: 120,
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE'],
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: [
    'id',
    'firstName',
    'lastName',
    'email',
    'age',
    'status',
    'createdAt',
    'updatedAt',
  ],
  additionalProperties: false,
} as const;

export default userSchema;
