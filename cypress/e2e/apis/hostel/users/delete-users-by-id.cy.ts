import testData from '../../../../fixtures/testdata/hostel/users/delete-users-by-id';
import { notFoundErrorSchema } from '../../../../schemas/hostel/common/errors.schema';

describe('DELETE /api/v1/users/{id}', () => {
  describe('Positive cases', () => {
    Cypress._.each(testData.positive, ({ description, setupBody, statusCode }) => {
      it(description, () => {
        cy.step('Create user for deletion');
        cy.postUser(setupBody).then((postResponse) => {
          expect(postResponse.status).to.eq(201);
          const userId = postResponse.body.id as string;

          cy.step('Delete user');
          cy.deleteUserById(userId).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(statusCode);
          });

          cy.step('Verify user no longer exists');
          cy.getUserById(userId).then((getResponse) => {
            expect(getResponse.status).to.eq(404);
            cy.validateSchema(notFoundErrorSchema, getResponse.body);

            expect(getResponse.body).to.deep.include({
              code: 'USR-404-01',
              detail: 'User was not found.',
              instance: `/api/v1/users/${userId}`,
            });
          });
        });
      });
    });
  });

  describe('Negative cases', () => {
    Cypress._.each(testData.negative, ({ description, userId, statusCode, schema, expectedBody }) => {
      it(description, () => {
        cy.step('Send delete request');
        cy.deleteUserById(userId).then((response) => {
          cy.step('Validate error response');
          expect(response.status).to.eq(statusCode);
          cy.validateSchema(schema, response.body);
          expect(response.body).to.deep.include(expectedBody);
        });
      });
    });
  });
});
