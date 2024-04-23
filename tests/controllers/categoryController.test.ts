import request from "supertest";
import connect, { MongoHelper } from "../db-helper";
import app from "../../src/app";

describe("category controller tests", () => {
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

    const categoryData = {
        name: "Electronics",
        createdAt: new Date().toISOString()
    };

    // Test for createCategory
    it("should create a category", async () => {
        const response = await request(app)
            .post("/api/v1/categories")
            .send(categoryData);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            name: "Electronics"
        });
    });

    // Test for getAllCategories
    it("should return all categories", async () => {
        // First create a category to ensure there's data to retrieve
        await request(app).post("/api/v1/categories").send(categoryData);

        const response = await request(app).get("/api/v1/categories");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test for getCategory
    it("should return a specific category", async () => {
        // First create a category to retrieve
        const createResponse = await request(app).post("/api/v1/categories").send(categoryData);
        const categoryId = createResponse.body._id;

        const response = await request(app).get(`/api/v1/categories/${categoryId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", "Electronics");
    });

    it("should return 404 for non-existing category", async () => {
        const response = await request(app).get(`/api/v1/categories/nonExistingId`);
        expect(response.status).toBe(404);
    });

    // Test for updateCategory
    it("should update a category", async () => {
        // First create a category to update
        const createResponse = await request(app).post("/api/v1/categories").send(categoryData);
        const categoryId = createResponse.body._id;
        const updatedData = { name: "Books" };

        const response = await request(app)
            .put(`/api/v1/categories/${categoryId}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Books");
    });

    it("should return 404 when updating non-existing category", async () => {
        const response = await request(app)
            .put(`/api/v1/categories/nonExistingId`)
            .send({ name: "Books" });

        expect(response.status).toBe(404);
    });

    // Test for deleteCategory
    it("should delete a category", async () => {
        // First create a category to delete
        const createResponse = await request(app).post("/api/v1/categories").send(categoryData);
        const categoryId = createResponse.body._id;

        const response = await request(app).delete(`/api/v1/categories/${categoryId}`);
        expect(response.status).toBe(204);
    });

    it("should return 404 when deleting non-existing category", async () => {
        const response = await request(app).delete(`/api/v1/categories/nonExistingId`);
        expect(response.status).toBe(404);
    });
});
