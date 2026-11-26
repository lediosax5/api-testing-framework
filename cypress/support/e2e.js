const Ajv = require('ajv');
const addFormats = require('ajv-formats');

require('cypress-mochawesome-reporter/register');
require('cypress-plugin-api');
require('cypress-plugin-steps');

require('cypress-terminal-report/src/installLogsCollector')({
  collectTypes: [
    'cy:command',
    'cy:request',
    'cy:intercept',
    'cy:log',
    'cons:log',
    'cons:error',
    'cons:warn',
    'cons:info',
  ],
});

require('./commands/apis/hostel');

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);

Cypress.Commands.add('validateSchema', (schema, body) => {
  const validate = ajv.compile(schema);
  const isValid = validate(body);

  expect(isValid, JSON.stringify(validate.errors, null, 2)).to.be.true;
});
