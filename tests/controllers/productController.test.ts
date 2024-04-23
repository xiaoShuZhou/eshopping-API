import request from "supertest";
import connect, { MongoHelper } from "../db-helper";
import app from "../../src/app";

describe("Product Controller Tests", () => {
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

    it("should return all products", async () => {
        const response = await request(app)
            .get("/api/v1/products");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should return a product by ID", async () => {
        const productId = "someProductId";
        const response = await request(app)
            .get(`/api/v1/products/${productId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id", productId);
    });

    it("should create a product", async () => {
        const productData = {
            title: "New Product",
            price: 100,
            description: "Detailed description",
            image: "url/to/image.jpg",
            category: {
                name: "Electronics",
                createdAt: new Date().toISOString()
            }
        };

        const response = await request(app)
            .post("/api/v1/products")
            .send(productData);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(productData);
    });

    it("should update a product", async () => {
        const productId = "someProductId";
        const updatedData = {
            title: "Updated Product",
            price: 150
        };

        const response = await request(app)
            .put(`/api/v1/products/${productId}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(updatedData);
    });

    it("should delete a product", async () => {
        const productId = "someProductId";
        const response = await request(app)
            .delete(`/api/v1/products/${productId}`);

        expect(response.status).toBe(204);
    });

    it("should return products based on filters", async () => {
        const filters = {
            title: "Widget",
            priceMin: 50,
            priceMax: 500,
            categoryId: "someCategoryId"
        };

        const queryString = Object.entries(filters)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        const response = await request(app)
            .get(`/api/v1/products/search?${queryString}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
