class Message {
  constructor({ text, userId }) {
    this.id = Date.now().toString();
    this.text = text;
    this.userId = userId;
  }
}

module.exports = Message;
