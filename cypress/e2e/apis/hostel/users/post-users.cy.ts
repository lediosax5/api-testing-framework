import testData from '../../../../fixtures/testdata/hostel/users/post-users';
import { notFoundErrorSchema } from '../../../../schemas/hostel/common/errors.schema';
import { User } from '../../../../types/hostel/users';

describe('POST /api/v1/users', () => {
  describe('Positive cases', () => {
    Cypress._.each(testData.positive, ({ description, body, statusCode, schema, expectedBody }) => {
      it(description, () => {
        cy.step('Create user');
        cy.postUser(body).then((postResponse) => {
          const userId = postResponse.body.id as string;

          expect(postResponse.status).to.eq(statusCode);
          cy.validateSchema(schema, postResponse.body);
          const createdUser = postResponse.body as User;
          expect(createdUser).to.deep.include(expectedBody);
          expect(postResponse.headers.location).to.eq(`/api/v1/users/${userId}`);

          cy.step('Verify created user');
          cy.getUserById(userId).then((getResponse) => {
            expect(getResponse.status).to.eq(200);
            cy.validateSchema(schema, getResponse.body);
            const fetchedUser = getResponse.body as User;
            expect(fetchedUser).to.deep.include({
              id: userId,
              ...expectedBody,
            });
          });

          cy.step('Delete created user');
          cy.deleteUserById(userId).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(204);
          });

          cy.step('Verify user no longer exists');
          cy.getUserById(userId).then((getDeletedResponse) => {
            expect(getDeletedResponse.status).to.eq(404);
            cy.validateSchema(notFoundErrorSchema, getDeletedResponse.body);
            expect(getDeletedResponse.body).to.deep.include({
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
    Cypress._.each(testData.negative, ({ description, body, statusCode, schema, expectedBody }) => {
      it(description, () => {
        cy.step('Send user request');
        cy.postUser(body).then((response) => {
          cy.step('Validate error response');
          expect(response.status).to.eq(statusCode);
          cy.validateSchema(schema, response.body);
          expect(response.body).to.deep.include(expectedBody);
        });
      });
    });
  });
});
