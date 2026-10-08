import testData from '../../../../fixtures/testdata/hostel/users/get-users';
import { GetUsersResponse } from '../../../../types/hostel/users';

describe('GET /api/v1/users', () => {
  describe('Positive cases', () => {
    Cypress._.each(testData.positive, ({ description, query, statusCode, schema, expected }) => {
      it(description, () => {
        cy.step('Request users collection');
        cy.getUsers(query).then((response) => {
          cy.step('Validate collection response');
          expect(response.status).to.eq(statusCode);
          cy.validateSchema(schema, response.body);

          const { items, pagination } = response.body as GetUsersResponse;

          expect(pagination.page).to.eq(expected.page);
          expect(pagination.limit).to.eq(expected.limit);
          expect(items.length).to.be.at.most(expected.limit);
          expect(pagination.totalPages).to.eq(Math.ceil(pagination.total / pagination.limit));

          if (expected.userStatus) {
            items.forEach((user) => {
              expect(user.status).to.eq(expected.userStatus);
            });
          }

          if ('sortBy' in query && query.sortBy === 'age' && 'order' in query && query.order) {
            const ages = items.map((user) => user.age);
            const sortedAges = [...ages].sort((a, b) => (query.order === 'asc' ? a - b : b - a));

            expect(ages).to.deep.equal(sortedAges);
          }
        });
      });
    });
  });

  describe('Negative cases', () => {
    Cypress._.each(testData.negative, ({ description, query, statusCode, schema, expectedBody }) => {
      it(description, () => {
        cy.step('Send users request');
        cy.getUsers(query).then((response) => {
          cy.step('Validate error response');
          expect(response.status).to.eq(statusCode);
          cy.validateSchema(schema, response.body);
          expect(response.body).to.deep.include(expectedBody);
        });
      });
    });
  });
});
