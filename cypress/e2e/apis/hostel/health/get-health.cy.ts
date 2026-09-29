import testData from '../../../../fixtures/testdata/hostel/health/get-health';

describe('GET /health', () => {
  Cypress._.each(testData, ({ description, status, schema }) => {
    it(description, () => {
      cy.get_health().then((response) => {
        expect(response.status).to.eq(status);
        cy.validateSchema(schema, response.body);
      });
    });
  });
});
