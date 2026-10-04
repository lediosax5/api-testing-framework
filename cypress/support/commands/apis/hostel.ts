Cypress.Commands.add('getHealth', () => {
  return cy.api({
    method: 'GET',
    url: '/health',
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('getUserById', (userId: string) => {
  return cy.api({
    method: 'GET',
    url: `/api/v1/users/${userId}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('getUsers', (query = {}) => {
  return cy.api({
    method: 'GET',
    url: '/api/v1/users',
    qs: query,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('postUser', (body: Cypress.RequestBody) => {
  return cy.api({
    method: 'POST',
    url: '/api/v1/users',
    body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('putUserById', (userId: string, body: Cypress.RequestBody) => {
  return cy.api({
    method: 'PUT',
    url: `/api/v1/users/${userId}`,
    body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('deleteUserById', (userId: string) => {
  return cy.api({
    method: 'DELETE',
    url: `/api/v1/users/${userId}`,
    failOnStatusCode: false,
  });
});
