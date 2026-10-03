import getHealthSchema from '../../../../schemas/hostel/health/get-health.schema';

const testData = [
  {
    description: 'Returns the service health status',
    statusCode: 200,
    schema: getHealthSchema,
  },
];

export default testData;
