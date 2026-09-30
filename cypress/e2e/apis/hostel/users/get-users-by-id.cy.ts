import testData from '../../../../fixtures/testdata/hostel/users/get-users-by-id';

describe('GET /api/v1/users/{id}', () => {
  Cypress._.each(testData, ({ description, userId, statusCode, schema, expectedBody }) => {
    it(description, () => {
      cy.get_user_by_id(userId).then((response) => {
        expect(response.status).to.eq(statusCode);
        cy.validateSchema(schema, response.body);
        expect(response.body).to.deep.include(expectedBody);
      });
    });
  });
});
