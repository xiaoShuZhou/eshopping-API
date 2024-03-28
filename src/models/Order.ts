import mongoose, { Document, Schema } from 'mongoose';

import { Order } from '../types/Order';
import { OrderItemSchema } from './OrderItem';



export const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    type: OrderItemSchema 
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  shippingAddress: {
    type: String
  }
});

export type OrderDocument = Document & Order;

export default mongoose.model<OrderDocument>('Order', OrderSchema);