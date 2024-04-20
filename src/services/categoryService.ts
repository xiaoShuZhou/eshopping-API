import Category, { CategoryDocument } from "../models/Category";
import { NotFoundError } from "../utils/errors/ApiError";


const getAllCategories = async (): Promise<CategoryDocument[]> => {
  try {
    return await Category.find();
  } catch (error) {
    throw new Error("Failed to fetch categories from the database");
  }
};

const getCategoryById = async (categoryId: string): Promise<CategoryDocument | null> => {
    try {
        return await Category.findById(categoryId);
    } catch
    (error) {
        throw new NotFoundError();
    }
}


const createCategory = async (Category: CategoryDocument): Promise<CategoryDocument> => {
  try {
    return await Category.save();
  } catch (error) {
    console.error("Error creating category:", error); 
    throw new Error("Failed to create category");
  }
};

const updateCategory = async (categoryId: string, categoryData: Partial<CategoryDocument>): Promise<CategoryDocument | null> => {
  try {
    return await Category.findByIdAndUpdate
    (categoryId, categoryData, { new: true });
    } catch (error) {
    throw new NotFoundError();
    }
}

const deleteCategoryById = async (categoryId: string): Promise<boolean> => {

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    console.log(deletedCategory);
    return !!deletedCategory;
  } catch (error) {
    throw new NotFoundError();
  }
}

export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategoryById };