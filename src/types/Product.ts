import mongoose from "mongoose";
import { Document } from "mongoose";
import { Category } from "./Category";

export type Product = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: Category;
}

export type FilterParams ={
  title?: string;
  priceMin?: number;
  priceMax?: number;
  categoryId?: string;
}