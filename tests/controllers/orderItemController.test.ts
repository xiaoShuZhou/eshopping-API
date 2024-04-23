import request from "supertest";
import connect, { MongoHelper } from "../db-helper";
import app from "../../src/app";

describe("OrderItem Controller Tests", () => {
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

    it("should create an order item and add it to an order", async () => {
        const product = {
            name: "Widget",
            price: 19.99,
            description: "A useful widget"
        };
        const quantity = 5;
        const orderId = "someOrderId"; // This ID should correspond to a valid order in the test database

        const response = await request(app)
            .post("/api/v1/orderItems")
            .send({ product, quantity, orderId });

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            _id: expect.any(String),
            product: expect.any(Object),
            quantity: expect.any(Number)
        });
    });

    it("should increase an order item's quantity", async () => {
        const orderItemId = "someOrderItemId";

        const response = await request(app)
            .put(`/api/v1/orderItems/${orderItemId}/increase`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("quantity");
    });

    it("should decrease an order item's quantity", async () => {
        const orderItemId = "someOrderItemId";

        const response = await request(app)
            .put(`/api/v1/orderItems/${orderItemId}/decrease`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("quantity");
    });

    it("should delete an order item", async () => {
        const orderItemId = "someOrderItemId";
        const orderId = "someOrderId";

        const response = await request(app)
            .delete(`/api/v1/orderItems/${orderId}/${orderItemId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'OrderItem deleted successfully' });
    });

    it("should find an order item by ID", async () => {
        const orderItemId = "someOrderItemId";

        const response = await request(app)
            .get(`/api/v1/orderItems/${orderItemId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id");
    });
});
