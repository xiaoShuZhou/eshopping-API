import request from "supertest";
import connect, { MongoHelper } from "../db-helper";
import app from "../../src/app";

describe("Order Controller Tests", () => {
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

    it("should create an order", async () => {
        const user = { // Assuming this matches your user model schema
            firstName: "John",
            lastName: "Doe",
            password: "password",
            email: "john.doe@example.com",
            userName: "john.doe",
            role: "user",
            avatar: "avatar.jpg"
        };

        const items = [{
            product: {
                name: "Widget",
                price: 19.99,
                description: "A useful widget",
            },
            quantity: 2
        }];

        const response = await request(app)
            .post("/api/v1/orders")
            .send({ user, items });

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            user: expect.any(Object),
            items: expect.any(Array)
        });
    });

    it("should get orders by user ID", async () => {
        const userId = "someUserId";
        const response = await request(app)
            .get(`/api/v1/orders/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should delete an order", async () => {
        const orderId = "someOrderId";
        const response = await request(app)
            .delete(`/api/v1/orders/${orderId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Order deleted successfully' });
    });

    it("should add an item to an order", async () => {
        const orderId = "someOrderId";
        const orderItemId = "someOrderItemId";
        const response = await request(app)
            .post(`/api/v1/orders/${orderId}/items/${orderItemId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id");
    });

    it("should delete an item from an order", async () => {
        const orderId = "someOrderId";
        const orderItemId = "someOrderItemId";
        const response = await request(app)
            .delete(`/api/v1/orders/${orderId}/items/${orderItemId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id");
    });

    it("should find an order by ID", async () => {
        const orderId = "someOrderId";
        const response = await request(app)
            .get(`/api/v1/orders/${orderId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id");
    });
});
