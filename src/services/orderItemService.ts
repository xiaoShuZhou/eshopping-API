import e from "express";
import OrderItem,{OrderItemDocument} from "../models/OrderItem";

const createOrderItem = async (orderItem: OrderItemDocument): Promise<OrderItemDocument> => {
    return await orderItem.save();
  }


export default { createOrderItem};