const resetTest = Cypress.config('isInteractive') ? it : it.skip;

describe('POST /__test/reset', () => {
  resetTest('Resets test data', () => {
    cy.step('Reset test data');
    cy.api({
      method: 'POST',
      url: '/__test/reset',
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
