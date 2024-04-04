import { ProductDocument } from "./Product";
import { User } from "./User"

export type OrderItem = {
    product: ProductDocument;
    quantity: number;
  }

export type Order = {
    user: User;
    items: OrderItem[];
    shippingAddress: string;
  }