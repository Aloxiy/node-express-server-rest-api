const request = require("supertest");
const app = require("../../src/app");
const db = require("../../src/models");

beforeEach(() => {
  db.users.length = 0;
  db.sessions.length = 0;
  db.messages.length = 0;
});

describe("Full message flow", () => {
  test("User → Session → Message", async () => {
    // 1. Create user
    const user = await request(app)
      .post("/users")
      .send({ username: "alice" });

    expect(user.statusCode).toBe(201);

    // 2. Create session
    const session = await request(app)
      .post("/sessions")
      .send({ userId: user.body.id });

    expect(session.statusCode).toBe(201);

    // 3. Create message
    const message = await request(app)
      .post("/messages")
      .send({
        text: "Hello from Alice",
        userId: user.body.id
      });

    expect(message.statusCode).toBe(201);
    expect(message.body.text).toBe("Hello from Alice");

    // 4. Retrieve messages
    const all = await request(app).get("/messages");

    expect(all.statusCode).toBe(200);
    expect(all.body.length).toBe(1);
  });
});
