import testData from '../../../../fixtures/testdata/hostel/users/patch-users-by-id';

describe('PATCH /api/v1/users/{id}', () => {
  describe('Positive cases', () => {
    Cypress._.each(testData.positive, ({ description, setupBody, body, statusCode, schema }) => {
      it(description, () => {
        cy.step('Create user for update');
        cy.postUser(setupBody).then((postResponse) => {
          expect(postResponse.status).to.eq(201);

          const userId = postResponse.body.id as string;
          const createdAt = postResponse.body.createdAt as string;
          const previousUpdatedAt = postResponse.body.updatedAt as string;

          cy.step('Update user');
          cy.patchUserById(userId, body).then((patchResponse) => {
            expect(patchResponse.status).to.eq(statusCode);
            cy.validateSchema(schema, patchResponse.body);

            expect(patchResponse.body).to.deep.include({
              id: userId,
              ...setupBody,
              ...body,
            });

            expect(patchResponse.body.createdAt).to.eq(createdAt);
            expect(patchResponse.body.updatedAt).to.not.eq(previousUpdatedAt);

            cy.step('Verify updated user');
            cy.getUserById(userId).then((getResponse) => {
              expect(getResponse.status).to.eq(200);
              cy.validateSchema(schema, getResponse.body);

              expect(getResponse.body).to.deep.include({
                id: userId,
                ...setupBody,
                ...body,
              });

              expect(getResponse.body.createdAt).to.eq(createdAt);
              expect(getResponse.body.updatedAt).to.eq(patchResponse.body.updatedAt);
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
        cy.step('Send partial update request');
        cy.patchUserById(userId, body).then((response) => {
          cy.step('Validate error response');
          expect(response.status).to.eq(statusCode);
          cy.validateSchema(schema, response.body);
          expect(response.body).to.deep.include(expectedBody);
        });
      });
    });
  });
});
