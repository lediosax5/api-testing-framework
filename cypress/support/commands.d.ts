declare namespace Cypress {
  interface Chainable {
    getHealth(): Chainable<Response<any>>;
    getUserById(userId: string): Chainable<Response<any>>;
    getUsers(query?: Record<string, string | number | undefined>): Chainable<Response<any>>;
    postUser(body: Cypress.RequestBody): Chainable<Response<any>>;
    deleteUserById(userId: string): Chainable<Response<any>>;

    validateSchema(schema: object, body: unknown): Chainable<void>;
  }
}
