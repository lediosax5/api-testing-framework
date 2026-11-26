const { usersSeed } = require('../data/users.seed');

class UserRepository {
  users = new Map();

  constructor() {
    this.reset();
  }

  reset() {
    this.users.clear();

    for (const user of usersSeed) {
      this.users.set(user.id, { ...user });
    }
  }

  findAll() {
    return [...this.users.values()];
  }

  findById(id) {
    return this.users.get(id);
  }

  findByEmail(email) {
    return [...this.users.values()].find((user) => user.email === email);
  }

  create(user) {
    this.users.set(user.id, user);
    return user;
  }

  update(user) {
    this.users.set(user.id, user);
    return user;
  }

  delete(id) {
    return this.users.delete(id);
  }
}

const userRepository = new UserRepository();

module.exports = { UserRepository, userRepository };
