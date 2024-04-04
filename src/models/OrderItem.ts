import mongoose, { Document, Schema } from 'mongoose';

import { OrderItem } from '../types/Order';
import Product from './Product';


export const OrderItemSchema = new Schema({
  product: Product.schema,
  quantity: {
    type: Number,
    default: 1
  }
}); 

export type OrderItemDocument = Document & OrderItem;
export default mongoose.model<OrderItemDocument>('OrderItem', OrderItemSchema);