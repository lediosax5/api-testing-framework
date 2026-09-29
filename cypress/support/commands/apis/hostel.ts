Cypress.Commands.add('get_health', () => {
  return cy.api({
    method: 'GET',
    url: '/health',
    failOnStatusCode: false,
  });
});
