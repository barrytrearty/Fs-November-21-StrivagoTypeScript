import dotenv from "dotenv";
dotenv.config();
import { server } from "../server";
import supertest from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const request = supertest(server);

describe("Testing the environment", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});

describe("Testing the endpoints", () => {
  beforeAll((done) => {
    mongoose.connect(process.env.MONGO_CONNECTION!).then(() => {
      console.log("Connected to Mongo");
      done();
    });
  });

  const validCredentials = {
    email: "Michelle.Kirlin86@yahoo.com",
    password: "11111",
  };

  const invalidCredentials = {
    email: "Michelle.Kirlin86@yahoo.com",
    // password: "11111",
  };

  /////////////////////////////////////////////////////////

  it("should test that sending valid credentials via the POST /users/register is returning a 201 and a valid token", async () => {
    const response = await request
      .post("/users/register")
      .send(validCredentials);

    console.log(response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("accessToken");

    const { _id } = jwt.verify(
      response.body.accessToken,
      process.env.JWT_SECRET!
    ) as any as { _id: string };
    // expect(_id).toBe(response.body.user._id);
  });

  /////////////////////////////////////////////////////////

  it("should test that sending invalid  credentials via the POST /users/register  is returning a 401", async () => {
    const response = await request
      .post("/users/register")
      .send(invalidCredentials);

    expect(response.status).toBe(401);
  });

  it("should test that sending valid credentials via the POST /users/login is returning a 200 and a valid token", async () => {
    const response = await request.post("/users/login").send(validCredentials);

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");

    const { _id } = jwt.verify(
      response.body.accessToken,
      process.env.JWT_SECRET!
    ) as any as { _id: string };
    // expect(_id).toBe(response.body.user._id);
  });

  /////////////////////////////////////////////////////////

  it("should test that sending invalid credentials via the POST /users/login  is returning a 401", async () => {
    const response = await request
      .post("/users/login")
      .send(invalidCredentials);

    expect(response.status).toBe(401);
  });

  ////////////////////////////////////////////////////
});
