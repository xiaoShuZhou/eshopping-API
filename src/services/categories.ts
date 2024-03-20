import Category, { CategoryDocument } from "../models/Category";

const getAllCategories = async (): Promise<CategoryDocument[]> => {
  return await Category.find();
  // limit
  // skip
  // {regex: search query}
};

const createCategory = async (
  category: CategoryDocument
): Promise<CategoryDocument> => {
  // save
  // 1. create new category
  // 2. return that
  return await category.save();
};

// To do: handle error
const getCategoryByName = async (
  name: string
): Promise<CategoryDocument | undefined> => {
  const foundCategory = await Category.findById(name);
  if (foundCategory) {
    return foundCategory;
  }
};

const deleteCategoryByName = async (name: string) => {
  const foundCategory = await Category.findByIdAndDelete(name);
  if (foundCategory) {
    return foundCategory;
  }
};

const updateCategory = async (
  name: string,
  newInformation: Partial<CategoryDocument>
) => {
  const updatedCategory = await Category.findByIdAndUpdate(name, newInformation, {
    new: true,
  });
  return updatedCategory;
};

export default {
  getAllCategories,
  createCategory,
  getCategoryByName,
  deleteCategoryByName,
};
