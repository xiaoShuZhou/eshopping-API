import Order, {OrderDocument} from "../models/Order";

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
    return await order.save();
  }

const deleteOrder = async (orderId: string): Promise<OrderDocument | null> => {
    return await Order.findByIdAndDelete(orderId).exec();
  }

export default { createOrder, deleteOrder};