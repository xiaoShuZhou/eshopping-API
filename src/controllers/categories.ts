import { NextFunction, Request, Response } from "express";
import { NotFoundError, InternalServerError } from "../utils/errors/ApiError";
import categoryService from "../services/categoryService";
import Category from "../models/Category";


export const getAllCategories = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAllCategories();
    response.status(200).json(categories);
  } catch (error) {
    next(new InternalServerError());
  }
}

export const getCategory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const category = await categoryService.getCategoryById(request.params.categoryId);
    if (!category) {
      response.status(404).json({ message: "Category not found" });
      return;
    }
    response.status(200).json(category);
  } catch (error) {
    next(new InternalServerError());
  }
}

export const createCategory = async (request: Request, response: Response, next: NextFunction) => {
  try {

    const categoryData = new Category(request.body);

    const category = await categoryService.createCategory(categoryData);
    response.status(201).json(category);
  } catch (error) {
    next(new InternalServerError());
  }
}

export const updateCategory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const updatedCategory = await categoryService.updateCategory(request.params.categoryId, request.body);
    if (!updatedCategory) {
      response.status(404).json({ message: "Category not found" });
      return;
    }
    response.status(200).json(updatedCategory);
  } catch (error) {
    next(new InternalServerError());
  }
}

export const deleteCategory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const deleted = await categoryService.deleteCategoryById(request.params.categoryId);
    if (!deleted) {
      response.status(404).json({ message: "Category not found" });
      return;
    }
    response.status(204).send();
  } catch (error) {
    next(new InternalServerError());
  }
}




