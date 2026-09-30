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
