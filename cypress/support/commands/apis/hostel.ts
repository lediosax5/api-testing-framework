import { apiWithEvidence } from '../../http-evidence';

Cypress.Commands.add('getHealth', () => {
  return apiWithEvidence({
    method: 'GET',
    url: '/health',
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('getUserById', (userId: string) => {
  return apiWithEvidence({
    method: 'GET',
    url: `/api/v1/users/${userId}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('getUsers', (query = {}) => {
  return apiWithEvidence({
    method: 'GET',
    url: '/api/v1/users',
    qs: query,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('postUser', (body: Cypress.RequestBody) => {
  return apiWithEvidence({
    method: 'POST',
    url: '/api/v1/users',
    body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('putUserById', (userId: string, body: Cypress.RequestBody) => {
  return apiWithEvidence({
    method: 'PUT',
    url: `/api/v1/users/${userId}`,
    body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('patchUserById', (userId: string, body: Cypress.RequestBody) => {
  return apiWithEvidence({
    method: 'PATCH',
    url: `/api/v1/users/${userId}`,
    body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('deleteUserById', (userId: string) => {
  return apiWithEvidence({
    method: 'DELETE',
    url: `/api/v1/users/${userId}`,
    failOnStatusCode: false,
  });
});
