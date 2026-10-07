import testData from '../../../../fixtures/testdata/hostel/users/get-users-by-id';
import { User } from '../../../../types/hostel/users';

describe('GET /api/v1/users/{id}', () => {
  describe('Positive cases', () => {
    Cypress._.each(testData.positive, ({ description, userId, statusCode, schema, expectedBody }) => {
      it(description, () => {
        cy.step('Request user by id');
        cy.getUserById(userId).then((response) => {
          cy.step('Validate user response');
          expect(response.status).to.eq(statusCode);
          cy.validateSchema(schema, response.body);
          const user = response.body as User;
          expect(user).to.deep.include(expectedBody);
        });
      });
    });
  });

  describe('Negative cases', () => {
    Cypress._.each(testData.negative, ({ description, userId, statusCode, schema, expectedBody }) => {
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
});
