declare namespace Cypress {
  interface Chainable {
    get_health(): Chainable<Response<any>>;

    validateSchema(schema: object, body: unknown): Chainable<void>;
  }
}
