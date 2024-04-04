import supertest from "supertest";
import { sign } from "jsonwebtoken";
import serverPipeline from "../utils/server";
import connect, { MongoHelper } from "../utils/db_test_helper";
import { Payload } from "../types/User";
import User from "../models/User";
import { adminUser, fakeProduct } from "./fakeAdmin";
import Product from "../models/Product";
import { createProduct } from "../services/product.service";

jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "log").mockImplementation(() => {});

const app = serverPipeline();
const path = "/api/v1/products/";

let mongoHelper: MongoHelper;

beforeAll(async () => {
  mongoHelper = await connect();
});

afterAll(async () => {
  await mongoHelper.closeDatabase();
});

describe("Get product", () => {
    describe("get non existing product", () => {
      it("Returns 404", async () => {
        const productID = "000";
        await supertest(app).get(`${path}${productID}`).expect(404);
      });
    });
    describe("get real product", () => {
      it("Returns 200", async () => {
        let newData = new Product(fakeProduct);
        const _newData = await createProduct(newData);
        console.log(_newData._id);
        const { body, statusCode } = await supertest(app).get(
            `${path}?pid=${_newData._id.toString()}`
          );
        expect(statusCode).toBe(200);
        await mongoHelper.clearDatabase();
      });
    });
  });

