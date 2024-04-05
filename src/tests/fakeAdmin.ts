import { ProductDocument } from "../types/Product";
import { User } from "../types/User";

export const adminUser: User = {
    firstname: "admin",
    lastname: "admin",
    password: "password",
    email: "admin@admin.com",
    username: "admin",
    role: "admin",
    avatar: "avatar.jpg"
  };

export const fakeProduct = {
  title: "Fake Product",
  price: 10.99,
  description: "This is a fake product description.",
  categoryId: "clothes", 
};