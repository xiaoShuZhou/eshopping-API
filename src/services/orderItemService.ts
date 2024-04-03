import e from "express";
import OrderItem,{OrderItemDocument} from "../models/OrderItem";

const createOrderItem = async (orderItem: OrderItemDocument): Promise<OrderItemDocument> => {
    return await orderItem.save();
  }

const deleteOrderItem = async (orderItemId: string): Promise<OrderItemDocument | null> => {
    return await OrderItem.findByIdAndDelete(orderItemId).exec();
  }

export default { createOrderItem, deleteOrderItem};