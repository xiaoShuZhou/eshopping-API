import OrderItem,{OrderItemDocument} from "../models/OrderItem";
import { NotFoundError } from "../utils/errors/ApiError";

const createOrderItem = async (orderItemData: OrderItemDocument): Promise<OrderItemDocument> => {
  try {
    return await orderItemData.save();
  } catch (error) {
    throw new Error("Failed to create orderItem");
  }
}

const deleteOrderItem = async (orderItemId: string): Promise<boolean> => {
  try {
    const deletedOrderItem = await
    OrderItem
    .findByIdAndDelete(orderItemId);
    return !!deletedOrderItem;
  } catch (error) {
    throw new NotFoundError();
  }
}

const getOneOrderItem = async (orderItemId: string): Promise<OrderItemDocument | null> => {
  try {
    return await
    OrderItem
    .findById(orderItemId); 
  } catch (error) {
    throw new NotFoundError();
  }
}

const getAllOrderItems = async (): Promise<OrderItemDocument[]> => {
  try {
    return await
    OrderItem
    .find();
  } catch (error) {
    throw new NotFoundError();
  }
}


export default { createOrderItem, deleteOrderItem,getOneOrderItem, getAllOrderItems};