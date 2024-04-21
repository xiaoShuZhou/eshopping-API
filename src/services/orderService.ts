import Order, {OrderDocument} from "../models/Order";
import OrderItem,{OrderItemDocument} from "../models/OrderItem";
import Product from "../models/Product";
import { OrderItem as OrderItemInterface } from "../types/Order";
import { Order as OrderInterface } from "../types/Order";

const createOrder = async (userId:string, items:OrderItemInterface[]) => {
  try {
    // Validate inputs
    if (!userId || !items || items.length === 0) {
      throw new Error("Invalid user ID or items list.");
    }

    // Create and save OrderItem documents
    const orderItems = await Promise.all(items.map(async item => {
      const orderItem = new OrderItem({
        product: item.product,
        quantity: item.quantity
      });
      return await orderItem.save();
    }));

    // Create and save the Order document
    const order = new Order({
      user: userId,
      items: orderItems.map(item => item._id) // Use ._id to reference the MongoDB default ID field
    });
    await order.save();

    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

const getOrdersByUserId = async (userId: string): Promise<OrderDocument[]> => {
  try {
    return await Order.find({ user: userId }).populate({
      path: 'items', // the field in Order that contains the references
      model: 'OrderItem', // the model to use for populating
      populate: { // nested populate for further depth
        path: 'product', // assuming you want to also populate the Product details in each OrderItem
        model: 'Product'
      }
    });
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
}

const addOrderItemToOrder = async (orderId: string, orderItemId: string): Promise<OrderDocument | null> => {
  try {
    return await Order.findByIdAndUpdate
    (orderId, { $push: { items: orderItemId } }, { new: true });
  } catch (error) {
    throw new Error("Failed to add order item to order");
  }
}

const deleteOrderItemFromOrder = async (orderId: string, orderItemId: string): Promise<OrderDocument | null> => {
  try {
    return await Order.findByIdAndUpdate
    (orderId, { $pull: { items: orderItemId } }, { new: true });
  } catch (error) {
    throw new Error("Failed to delete order item from order");
  }
}

const deleteOrder = async (orderId: string): Promise<boolean> => {
  try {
    const deletedOrder = await
    Order
    .findByIdAndDelete(orderId);
    return !!deletedOrder;
  } catch (error) {
    throw new Error("Failed to delete order");
  }
}


const findOrderById = async (orderId: string): Promise<OrderDocument | null> => {
  console.log(orderId, 'orderId');
  try {
    return await Order
      .findById(orderId)
      .populate({
        path: 'items', // the field in Order that contains the references
        model: 'OrderItem', // the model to use for populating
        populate: { // nested populate for further depth
          path: 'product', // assuming you want to also populate the Product details in each OrderItem
          model: 'Product'
        }
      });
  } catch (error) {
    throw new Error("Failed to fetch order");
  }
}


export default { createOrder, addOrderItemToOrder, deleteOrderItemFromOrder, deleteOrder,  findOrderById, getOrdersByUserId};