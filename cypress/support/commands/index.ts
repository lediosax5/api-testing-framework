import Ajv, { type AnySchema } from 'ajv';
import addFormats from 'ajv-formats';

import './apis/hostel';

const ajv = new Ajv({
  allErrors: true,
  strict: true,
});

addFormats(ajv);

Cypress.Commands.add('validateSchema', (schema: AnySchema, body: unknown) => {
  const validate = ajv.compile(schema);
  const isValid = validate(body);

  expect(
    isValid,
    JSON.stringify(validate.errors, null, 2),
  ).to.be.true;
});

export { };
