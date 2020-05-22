const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConfig");
const userModel = require('../auth/user-model')


// describe("clear out database on each test", () => {
//     beforeEach(async () => {
//         await db("users").truncate();
//     });
// });

describe("POST /register", () => {
  it("failed to create user", async () => {
    await request(server)
    .post('/api/auth/register')
    .then(res => {
        expect(res.status).toBe(500)
    })
  

  });
  it("responds with JSON", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "ltims11", password: "test" })
      .expect("Content-Type", /json/i);


  });
});

describe("POST /api/auth/register", () => {
    it("should create a new user and return 500 status code", async () => {
        return request(server)
            .post("/api/auth/register")
            .then((response) => {
                expect(response.status).toBe(500);
            });
    });
});

describe("POST  to /api/auth/login", () => {
    it("responds with 200 OK", async done => {
        await request(server)
            .post("/api/auth/register")
            .send({ username: "kiddos", password: "12345" });

        request(server)
            .post("/api/auth/login")
            .send({ username: "keepcalm", password: "justbr34th" })
            .expect(200);

        done();
    });

    it("responds with JSON", async done => {
        await request(server)
            .post("/api/auth/register")
            .send({ username: "babies", password: "12345" });

        request(server)
            .post("/api/auth/login")
            .send({ username: "ltims15", password: "7years" })
            .expect("Content-Type", /json/i);

        done();
    });
});