import e from "express";
import OrderItem,{OrderItemDocument} from "../models/OrderItem";

const createOrderItem = async (orderItem: OrderItemDocument): Promise<OrderItemDocument> => {
  return await orderItem.save();
}

const getOneOrderItem = async (orderItemId: string): Promise<OrderItemDocument | null> => {
  const orderItem = await OrderItem.findById(orderItemId);
  return orderItem;
}

const getAllOrderItems = async (): Promise<OrderItemDocument[]> => {
  return await OrderItem.find().exec();
} 

const deleteOrderItem = async (orderItemId: string): Promise<OrderItemDocument | null> => {
  return await OrderItem.findByIdAndDelete(orderItemId).exec();
}

export default { createOrderItem, deleteOrderItem,getOneOrderItem, getAllOrderItems};