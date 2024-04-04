import { object, number, string, TypeOf } from "zod";
const payload = {
  body: object({
    _id: string({
      required_error: "Category _id:name is required",
    })
  }),
};

const params = {
  params: object({
    name: string({
      required_error: "Category name is required",
    }),
  }),
};

export const CategorySchema = object({
  ...payload,
  ...params,
});


export type CategoryInput = TypeOf<typeof CategorySchema>;