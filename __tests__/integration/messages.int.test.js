const request = require("supertest");
const app = require("../../src/app");

describe("Integration tests for /messages API", () => {

  test("GET /messages → should return list of messages", async () => {
    const res = await request(app).get("/messages");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /messages → should create a new message", async () => {
    const newMessage = { text: "Hello integration test!" };

    const res = await request(app)
      .post("/messages")
      .send(newMessage)
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.text).toBe("Hello integration test!");
  });

  test("POST /messages → should return 400 if body is invalid", async () => {
    const res = await request(app)
      .post("/messages")
      .send({})
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("DELETE /messages/:id → should delete an existing message", async () => {
    const createRes = await request(app)
      .post("/messages")
      .send({ text: "To delete" });

    const id = createRes.body.id;

    const deleteRes = await request(app).delete(`/messages/${id}`);

    expect(deleteRes.statusCode).toBe(204);

    const listRes = await request(app).get("/messages");
    const ids = listRes.body.map(m => m.id);
    expect(ids.includes(id)).toBe(false);
  });

  test("DELETE /messages/:id → should return 404 for nonexistent message", async () => {
    const fakeId = "nonexistent-id";

    const res = await request(app).delete(`/messages/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

});
