import Order, {OrderDocument} from "../models/Order";

const createOrder = async (orderData: OrderDocument): Promise<OrderDocument> => {
  try {
    return await orderData.save();
  } catch (error) {
    throw new Error("Failed to create order");
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

const updateOrder = async (orderId: string, orderData: Partial<OrderDocument>): Promise<OrderDocument | null> => {
  try {
    return await Order.findByIdAndUpdate
    (orderId, orderData, { new: true });
  } catch (error) {
    throw new Error("Failed to update order");
  }
}

const getAllOrders = async (): Promise<OrderDocument[]> => {
  try {
    return await
    Order
    .find();
  } catch (error) {
    throw new Error("Failed to fetch orders from the database");
  }
}

const findOrderById = async (orderId: string): Promise<OrderDocument | null> => {
  try {
    return await
    Order
    .findById(orderId);
  } catch (error) {
    throw new Error("Failed to fetch order");
  }
}


export default { createOrder, deleteOrder, updateOrder, getAllOrders, findOrderById};