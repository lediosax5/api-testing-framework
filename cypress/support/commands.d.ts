declare namespace Cypress {
  interface Chainable {
    get_health(): Chainable<Response<any>>;
    get_user_by_id(userId: string): Chainable<Response<any>>;
    get_users(query?: Record<string, string | number | undefined>): Chainable<Response<any>>;

    validateSchema(schema: object, body: unknown): Chainable<void>;
  }
}
