import mongoose from "mongoose";
import { Document } from "mongoose";
import { Category } from "./Category";

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: Category;
}

