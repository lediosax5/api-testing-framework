const getHealthSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      const: 'UP',
    },
    service: {
      type: 'string',
      const: 'ms-hostel-api',
    },
    timestamp: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['status', 'service', 'timestamp'],
  additionalProperties: false,
} as const;

export default getHealthSchema;
