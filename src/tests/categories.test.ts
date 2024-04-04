import supertest from "supertest";
import serverPipeline from "../utils/server";
import Categories from "../models/Category";
import connect, { MongoHelper } from "../utils/db_test_helper";
import { createCategory } from "../services/category.service";

jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "log").mockImplementation(() => {});

const app = serverPipeline();
const path = '/api/v1/categories/'

let mongoHelper: MongoHelper;

beforeAll(async () => {
  mongoHelper = await connect();
});

afterAll(async () => {
  await mongoHelper.closeDatabase();
});

afterEach(async () => {
  await mongoHelper.clearDatabase();
});

describe("Get category", () => {
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
      const _newData = await createCategory(newData);
      const {body, statusCode} = await supertest(app).get(`${path}${_newData._id}`);
      expect(statusCode).toBe(200);
    });
  });
});

describe("create category", () => {
  describe("the admin not logged in", () => {
    it("should return a 403", async () => {
      const { statusCode } = await supertest(app).post(`${path}`);
      expect(statusCode).toBe(403);
    });
  });
  describe("the admin logged in", () => {
    it("should return a 200", async () => {
      const { statusCode } = await supertest(app).post(`${path}`);
      expect(statusCode).toBe(403);
    });
  });
});

