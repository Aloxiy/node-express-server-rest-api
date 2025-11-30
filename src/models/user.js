class User {
  constructor({ username }) {
    this.id = Date.now().toString();
    this.username = username;
  }
}

module.exports = User;
