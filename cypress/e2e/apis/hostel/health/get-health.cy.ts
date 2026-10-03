import testData from '../../../../fixtures/testdata/hostel/health/get-health';

describe('GET /health', () => {
  Cypress._.each(testData, ({ description, status, schema }) => {
    it(description, () => {
      cy.step('Request service health');
      cy.get_health().then((response) => {
        cy.step('Validate health response');
        expect(response.status).to.eq(status);
        cy.validateSchema(schema, response.body);
      });
    });
  });
});
