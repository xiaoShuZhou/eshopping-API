import supertest from "supertest";
import serverPipeline from "../utils/server";
import Categories from "../models/Category";
import connect, { MongoHelper } from "../utils/db_test_helper";
import { createCategory } from "../services/category.service";
import { Payload } from "../types/User";
import { sign } from "jsonwebtoken";
import User from "../models/User";
import { adminUser } from "./fakeAdmin";

jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "log").mockImplementation(() => {});

const app = serverPipeline();
const path = "/api/v1/categories/";

let mongoHelper: MongoHelper;

beforeAll(async () => {
  mongoHelper = await connect();
});

afterAll(async () => {
  await mongoHelper.closeDatabase();
});

// afterEach(async () => {
//   await mongoHelper.clearDatabase();
// });

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
      let newData = new Categories({ _id: "test" });
      const _newData = await createCategory(newData);
      const { body, statusCode } = await supertest(app).get(
        `${path}${_newData._id}`
      );
      expect(statusCode).toBe(200);
      await mongoHelper.clearDatabase();
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
    it("should return a 201", async () => {
      let admin = new User(adminUser);
      const _admin = await admin.save();
      const adminPayload: Payload = {
        email: "admin@admin.com",
        _id: _admin._id,
      };
      const token = sign(adminPayload, process.env.JWT_SECRET as string);
      const { statusCode } = await supertest(app)
        .post(`${path}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ _id: "atest" });
      expect(statusCode).toBe(201);
    });
    it("Returns 200 for the newly created category", async () => {
      const catID = "atest";
      const { body, statusCode } = await supertest(app).get(`${path}${catID}`);
      expect(statusCode).toBe(200);
      await mongoHelper.clearDatabase();
    });
  });
});
