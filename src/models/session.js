class Session {
  constructor({ userId }) {
    this.id = Date.now().toString();
    this.userId = userId;
  }
}

module.exports = Session;
