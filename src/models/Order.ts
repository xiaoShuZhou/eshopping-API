import mongoose, { Document, Schema } from 'mongoose';

import { Order } from '../types/Order';
import OrderItem from './OrderItem';
export const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'OrderItem'
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },

});

export type OrderDocument = Document & Order;

export default mongoose.model<OrderDocument>('Order', OrderSchema);