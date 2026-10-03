Cypress.Commands.add('get_health', () => {
  return cy.api({
    method: 'GET',
    url: '/health',
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('get_user_by_id', (userId: string) => {
  return cy.api({
    method: 'GET',
    url: `/api/v1/users/${userId}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('get_users', (query = {}) => {
  return cy.api({
    method: 'GET',
    url: '/api/v1/users',
    qs: query,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('post_user', (body: Cypress.RequestBody) => {
  return cy.api({
    method: 'POST',
    url: '/api/v1/users',
    body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('delete_user_by_id', (userId: string) => {
  return cy.api({
    method: 'DELETE',
    url: `/api/v1/users/${userId}`,
    failOnStatusCode: false,
  });
});
