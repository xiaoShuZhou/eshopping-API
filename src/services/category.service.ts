import { UpdateQuery } from "mongoose";
import Categories from "../models/Category";
import { CategoryDocument } from "../types/Product";


export async function createCategory(categoryData: CategoryDocument): Promise<CategoryDocument> {
    const newCategory = new Categories(categoryData);
    return await newCategory.save();
}

export async function getAllCategories(): Promise<CategoryDocument[]> {
    return await Categories.find();
}

export async function getCategoryByName(name: string): Promise<CategoryDocument | null> {
    return await Categories.findById(name);
}

export async function deleteCategoryByName(name: string): Promise<CategoryDocument | null> {
    const deletedCategory = await Categories.findByIdAndDelete(name);
    return deletedCategory;
}

export const updateCategory = async (
    catId: string,
    update: UpdateQuery<CategoryDocument>
  ): Promise<CategoryDocument | null> => {
    return await Categories.findByIdAndUpdate(catId, update, { new: true });
  };
