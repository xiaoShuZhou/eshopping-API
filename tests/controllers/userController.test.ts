import request from "supertest";
import connect, { MongoHelper } from "../db-helper";
import app from "../../src/app";

describe("user controller test", () => {
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

    // Test for createUser
    it("should create a user", async () => {
        const userData = {
            firstName: "John",
            lastName: "Doe",
            password: "123456",
            email: "john@example.com",
            userName: "john123",
            role: "user",
            avatar: "path/to/avatar.jpg"
        };

        const response = await request(app)
            .post("/api/v1/users")
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            userName: "john123",
            role: "user"
        });
    });

    // Test for getAllUsers
    it("should return list of users", async () => {
        const response = await request(app).get("/api/v1/users");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test for getUser
    it("should return a specific user", async () => {
        const userId = 'someUserId';
        const response = await request(app).get(`/api/v1/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("email");
    });

    // Test for updateUser
    it("should update user data", async () => {
        const userId = 'someUserId';
        const updates = { firstName: "Jane" };
        const response = await request(app)
            .put(`/api/v1/users/${userId}`)
            .send(updates);

        expect(response.status).toBe(200);
        expect(response.body.firstName).toEqual("Jane");
    });

    // Test for deleteUser
    it("should delete a user", async () => {
        const userId = 'someUserId';
        const response = await request(app).delete(`/api/v1/users/${userId}`);
        expect(response.status).toBe(200);
    });

    // Test for login
    it("should log in a user", async () => {
        const credentials = {
            email: "john@example.com",
            password: "123456"
        };
        const response = await request(app).post("/api/v1/users/login").send(credentials);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    // Test for forgetPassword
    it("should handle forgotten password", async () => {
        const email = { email: "john@example.com" };
        const response = await request(app).post("/api/v1/users/forgetPassword").send(email);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(String)); // Assuming it sends a token or message
    });

    // Test for changePassword
    it("should change the user's password", async () => {
        const details = {
            email: "john@example.com",
            oldPassword: "123456",
            newPassword: "new123456"
        };
        const response = await request(app).put("/api/v1/users/changePassword").send(details);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("updatedUser");
    });

    // Test for verifyToken
    it("should verify user token", async () => {
        const token = 'yourTokenHere'; // You'll need a valid token here for a successful test
        const response = await request(app)
            .get("/api/v1/users/verifyToken")
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("email");
    });

    // Test for getUserProfileByToken
    it("should get user profile by token", async () => {
        const token = 'yourTokenHere'; // Again, you'll need a valid token here
        const response = await request(app)
            .get("/api/v1/users/profile")
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("userName");
        expect(response.body).toHaveProperty("email");
    });
});
