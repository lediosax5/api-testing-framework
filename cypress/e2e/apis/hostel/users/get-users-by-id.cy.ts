import testData from '../../../../fixtures/testdata/hostel/users/get-users-by-id';

describe('GET /api/v1/users/{id}', () => {
  Cypress._.each(testData, ({ description, userId, statusCode, schema, expectedBody }) => {
    it(description, () => {
      cy.step('Request user by id');
      cy.getUserById(userId).then((response) => {
        cy.step('Validate user response');
        expect(response.status).to.eq(statusCode);
        cy.validateSchema(schema, response.body);
        expect(response.body).to.deep.include(expectedBody);
      });
    });
  });
});
