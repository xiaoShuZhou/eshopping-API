import Order, {OrderDocument} from "../models/Order";

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
    return await order.save();
  }

export default { createOrder };