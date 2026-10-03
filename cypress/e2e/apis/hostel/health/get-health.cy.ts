import testData from '../../../../fixtures/testdata/hostel/health/get-health';

describe('GET /health', () => {
  Cypress._.each(testData, ({ description, statusCode, schema }) => {
    it(description, () => {
      cy.step('Request service health');
      cy.getHealth().then((response) => {
        cy.step('Validate health response');
        expect(response.status).to.eq(statusCode);
        cy.validateSchema(schema, response.body);
      });
    });
  });
});
