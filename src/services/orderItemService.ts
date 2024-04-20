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

const increaseOrderItemQuantity = async (orderItemId: string): Promise<OrderItemDocument | null> => {
  try {
    const orderItem = await OrderItem.findById(orderItemId);
    if (!orderItem) {
      throw new NotFoundError();
    }
    orderItem.quantity += 1;
    return await orderItem.save();
  } catch (error) {
    throw new NotFoundError();
  }
}

const decreaseOrderItemQuantity = async (orderItemId: string): Promise<OrderItemDocument | null> => {
  try {
    const orderItem = await OrderItem
    .findById(orderItemId);
    if (!orderItem) {
      throw new NotFoundError();
    }
    orderItem.quantity -= 1;
    return await orderItem.save();
  } catch (error) {
    throw new NotFoundError();
  }
}






export default { createOrderItem, deleteOrderItem, increaseOrderItemQuantity, decreaseOrderItemQuantity};