const request = require("supertest");
const app = require("../../src/app");
const db = require("../../src/models");

beforeEach(() => {
  db.messages.length = 0;
  db.users.length = 0;
  db.sessions.length = 0;
});

describe("Messages API", () => {
  test("POST /messages creates a message", async () => {
    const res = await request(app)
      .post("/messages")
      .send({ text: "Hello", userId: "1" });

    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe("Hello");
  });

  test("GET /messages returns list", async () => {
    await request(app).post("/messages").send({ text: "Test", userId: "1" });

    const res = await request(app).get("/messages");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
