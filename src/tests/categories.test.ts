import supertest from "supertest";
import serverPipeline from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { mongo } from "mongoose";
import Categories from "../models/Category";

jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "log").mockImplementation(() => {});

const app = serverPipeline();
const path = '/api/v1/categories/'

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("category", () => {
  describe("get fake category", () => {
    it("Returns 404", async () => {
      const catID = "fakeCat";
      await supertest(app).get(`${path}${catID}`).expect(404);
    });
  });
  describe("get real category", () => {
    it("Returns 200", async () => {
      const catID = "test";
      let newData = new Categories({"_id": "test"});
      newData = await newData.save();
      const {body, statusCode} = await supertest(app).get(`${path}${catID}`);
      expect(statusCode).toBe(200);
    });
  });
});

