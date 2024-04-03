import mongoose, { Document, Schema } from 'mongoose';

import { OrderItem } from '../types/Order';
import Product, { ProductDocument } from './Product';


export const OrderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    default: 1
  }
}); 

export type OrderItemDocument = Document & OrderItem;
export default mongoose.model<OrderItemDocument>('OrderItem', OrderItemSchema);