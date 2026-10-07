import testData from '../../../../fixtures/testdata/hostel/users/put-users-by-id';

describe('PUT /api/v1/users/{id}', () => {
  describe('Positive cases', () => {
    Cypress._.each(testData.positive, ({ description, setupBody, body, statusCode, schema }) => {
      it(description, () => {
        cy.step('Create user for replacement');
        cy.postUser(setupBody).then((postResponse) => {
          expect(postResponse.status).to.eq(201);

          const userId = postResponse.body.id as string;
          const createdAt = postResponse.body.createdAt as string;
          const previousUpdatedAt = postResponse.body.updatedAt as string;

          cy.step('Replace user');
          cy.putUserById(userId, body).then((putResponse) => {
            expect(putResponse.status).to.eq(statusCode);
            cy.validateSchema(schema, putResponse.body);

            expect(putResponse.body).to.deep.include({
              id: userId,
              ...body,
            });

            expect(putResponse.body.createdAt).to.eq(createdAt);
            expect(putResponse.body.updatedAt).to.not.eq(previousUpdatedAt);

            cy.step('Verify replaced user');
            cy.getUserById(userId).then((getResponse) => {
              expect(getResponse.status).to.eq(200);
              cy.validateSchema(schema, getResponse.body);

              expect(getResponse.body).to.deep.include({
                id: userId,
                ...body,
              });

              expect(getResponse.body.createdAt).to.eq(createdAt);
              expect(getResponse.body.updatedAt).to.eq(putResponse.body.updatedAt);
            });

            cy.step('Delete created user');
            cy.deleteUserById(userId).then((deleteResponse) => {
              expect(deleteResponse.status).to.eq(204);
            });
          });
        });
      });
    });
  });

  describe('Negative cases', () => {
    Cypress._.each(testData.negative, ({ description, userId, body, statusCode, schema, expectedBody }) => {
      it(description, () => {
        cy.step('Send user replacement request');
        cy.putUserById(userId, body).then((response) => {
          cy.step('Validate error response');
          expect(response.status).to.eq(statusCode);
          cy.validateSchema(schema, response.body);
          expect(response.body).to.deep.include(expectedBody);
        });
      });
    });
  });
});
