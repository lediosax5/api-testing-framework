import testData from '../../../../fixtures/testdata/hostel/users/get-users';

describe('GET /api/v1/users', () => {
  describe('Positive cases', () => {
    Cypress._.each(testData.positive, ({ description, query, statusCode, schema, expected }) => {
      it(description, () => {
        cy.get_users(query).then((response) => {
          expect(response.status).to.eq(statusCode);
          cy.validateSchema(schema, response.body);
          expect(response.body.items).to.have.length(expected.itemCount);
          expect(response.body.pagination).to.deep.equal(expected.pagination);

          if (expected.userStatus) {
            response.body.items.forEach((user: any) => {
              expect(user.status).to.eq(expected.userStatus);
            });
          }

          if (expected.firstUserAge) {
            expect(response.body.items[0].age).to.eq(expected.firstUserAge);
          }
        });
      });
    });
  });

  describe('Negative cases', () => {
    Cypress._.each(testData.negative, ({ description, query, statusCode, schema, expected }) => {
      it(description, () => {
        cy.get_users(query).then((response) => {
          expect(response.status).to.eq(statusCode);
          cy.validateSchema(schema, response.body);
          expect(response.body).to.deep.include(expected);
        });
      });
    });
  });
});
