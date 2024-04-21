import { Product } from "./Product";
import { User } from "./User"

export type OrderItem = {
    product: Product;
    quantity: number;
  }

export type Order = {
    user: User;
    items: OrderItem[];
  }