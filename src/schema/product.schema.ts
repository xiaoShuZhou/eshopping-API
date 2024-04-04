import { object, number, string, TypeOf } from "zod";
const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(20, "Description should be at least 20 characters long"),
    price: number().optional(),
    image: string().optional(),
    categoryId: string({
      required_error: "Category name is required",
    })
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

export const ProductSchema = object({
  ...payload,
  ...params,
});

export type ProductInput = TypeOf<typeof ProductSchema>;