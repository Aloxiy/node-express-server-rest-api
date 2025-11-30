const request = require("supertest");
const app = require("../../src/app");

describe("Full flow test: create → read → delete message", () => {

  test("User scenario: message lifecycle works correctly", async () => {

    const create = await request(app)
      .post("/messages")
      .send({ text: "Flow test message" });

    expect(create.statusCode).toBe(201);
    const messageId = create.body.id;

    const list = await request(app).get("/messages");

    expect(list.statusCode).toBe(200);
    const exists = list.body.some(msg => msg.id === messageId);
    expect(exists).toBe(true);

    const del = await request(app).delete(`/messages/${messageId}`);
    expect(del.statusCode).toBe(204);

    const listAfter = await request(app).get("/messages");
    const stillExists = listAfter.body.some(msg => msg.id === messageId);
    expect(stillExists).toBe(false);
  });

});
