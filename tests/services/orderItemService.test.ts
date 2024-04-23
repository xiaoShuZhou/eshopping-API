import request from "supertest";
import connect, { MongoHelper } from "../db-helper";
import app from "../../src/app";
import OrderItemService from "../../src/services/orderItemService";
import OrderItem from "../../src/models/OrderItem";
import Product from "../../src/models/Product";

// Helper functions
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

const createOrderItem = async (product: typeof Product, quantity: number) => {
  const orderItem = new OrderItem({
    quantity: quantity
  });
  return await orderItem.save();
};

// Tests
describe("OrderItem service test", () => {
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

  // Create OrderItem
  it("should create an order item", async () => {
    const product = await createProduct();
    const orderItem = await OrderItemService.createOrderItem(new OrderItem({
      product: product._id,
      quantity: 1
    }));

    expect(orderItem).toHaveProperty("_id");
    expect(orderItem.quantity).toEqual(1);
    expect(orderItem.product.toString()).toEqual(product._id.toString());
  });

//   // Delete OrderItem
//   it("should delete an order item", async () => {
//     const product = await createProduct();
//     const orderItem = await createOrderItem(product, 1);
//     const success = await OrderItemService.deleteOrderItem(orderItem._id.toString());

//     expect(success).toBe(true);
//   });

//   // Increase OrderItem Quantity
//   it("should increase the quantity of an order item", async () => {
//     const product = await createProduct();
//     const orderItem = await createOrderItem(product, 1);
//     const updatedOrderItem = await OrderItemService.increaseOrderItemQuantity(orderItem._id.toString());

//     expect(updatedOrderItem.quantity).toBe(2);
//   });

//   // Decrease OrderItem Quantity
//   it("should decrease the quantity of an order item", async () => {
//     const product = await createProduct();
//     const orderItem = await createOrderItem(product, 2);
//     const updatedOrderItem = await OrderItemService.decreaseOrderItemQuantity(orderItem._id.toString());

//     expect(updatedOrderItem.quantity).toBe(1);
//   });

//   // Find OrderItem By ID
//   it("should find an order item by ID", async () => {
//     const product = await createProduct();
//     const orderItem = await createOrderItem(product, 1);
//     const foundOrderItem = await OrderItemService.findOrderItemById(orderItem._id.toString());

//     expect(foundOrderItem).toBeDefined();
//     expect(foundOrderItem._id.toString()).toEqual(orderItem._id.toString());
//     expect(foundOrderItem.product.id.toString()).toEqual(product._id.toString());
//   });
});
