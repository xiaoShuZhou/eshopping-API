import mongoose from "mongoose";
import { Document } from "mongoose";

export interface ProductDocument extends mongoose.Document{
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
}

export interface Category {
  createdAt: string;
  id: string;
}

export type CategoryDocument = Document & Category;

export interface Filters {
  title?: string;
  categoryId?: string;
}
export interface Query extends Filters {
  skip?: number;
  limit?: number;
  pid?: string;
}
