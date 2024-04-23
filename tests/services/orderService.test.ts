import request from "supertest";
import connect, { MongoHelper } from "../db-helper";
import app from "../../src/app";
import orderService from "../../src/services/orderService";
import Order from "../../src/models/Order";
import OrderItem from "../../src/models/OrderItem";
import User from "../../src/models/User";
import Product from "../../src/models/Product";
import { ProductDocument } from '../../src/models/Product'; 

// Helper functions
const createUser = async () => {
  const user = new User({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "password",
    userName: "johnDoe",
    role: "user",
    avatar: "avatar.png"
  });
  return await user.save();
};

const createProduct = async () => {
  const product = new Product({
    title: "Laptop",
    price: 999,
    description: "High performance laptop",
    image: "laptop.jpg",
    category: { name: "Electronics", createdAt: new Date().toISOString() }
  });
  return await product.save();
};

const createOrderItem = async (product: ProductDocument) => {
  const orderItem = new OrderItem({
    product: product.id,
    quantity: 1
  });
  return await orderItem.save();
};

// Tests
describe("order service test", () => {
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

  // Create Order
  it("should create an order", async () => {
    const user = await createUser();
    const product = await createProduct();
    const orderItem = await createOrderItem(product);

    const order = await orderService.createOrder(user._id.toString(), [{ product: product, quantity: 1 }]);
    expect(order).toHaveProperty("_id");
    expect(order.user.toString()).toEqual(user._id.toString());
  });

  // Get Orders by User ID
  it("should retrieve orders by user ID", async () => {
    const user = await createUser();
    const product = await createProduct();
    const orderItem = await createOrderItem(product);

    await orderService.createOrder(user._id.toString(), [{ product: product, quantity: 1 }]);
    const orders = await orderService.getOrdersByUserId(user._id.toString());

    expect(orders.length).toBe(1);
    expect(orders[0].user.toString()).toEqual(user._id.toString());
  });

  // Add Order Item to Order
  it("should add an item to an order", async () => {
    const user = await createUser();
    const product = await createProduct();
    const order = await orderService.createOrder(user._id.toString(), []);
    const orderItem = await createOrderItem(product);

    const updatedOrder = await orderService.addOrderItemToOrder(order._id.toString(), orderItem._id.toString());
    if (updatedOrder) {
      expect(updatedOrder.items.length).toBe(1);
      expect(updatedOrder.items[0].toString()).toEqual(orderItem._id.toString());
    }
  });

  // Delete Order Item from Order
  const createOrderItem = async (product: ProductDocument) => {
    const orderItem = new OrderItem({
      product: product.id,
      quantity: 1
    });
    return await orderItem.save();
  };

  // Delete Order
  it("should delete an order", async () => {
    const user = await createUser();
    const product = await createProduct();
    const order = await orderService.createOrder(user._id.toString(), [{ product: product, quantity: 1 }]);

    const success = await orderService.deleteOrder(order._id.toString());
    expect(success).toBe(true);
  });

  // Find Order By ID
  it("should find an order by ID", async () => {
    const user = await createUser();
    const product = await createProduct();
    const order = await orderService.createOrder(user._id.toString(), [{ product: product, quantity: 1 }]);

    const foundOrder = await orderService.findOrderById(order._id.toString());
    expect(foundOrder).toBeDefined();
    if (foundOrder) {
      expect(foundOrder._id.toString()).toEqual(order._id.toString());
    }
  });
});
