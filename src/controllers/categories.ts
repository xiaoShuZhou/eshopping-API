import express, { NextFunction, Request, Response } from "express";
import Categories from "../models/Category";
import { InternalServerError, NotFoundError } from "../errors/ApiError";
import { CreatedResponse, NoContentResponse, SuccessResponse } from "../responses/apiResponse";
import { Category } from "../types/Product";
import { createCategory, getAllCategories, getCategoryByName, updateCategory } from "../services/category.service";
import { CategoryInput } from "../schema/category.schema";


export async function createCategoryHandler(request: Request<{}, {}, CategoryInput["body"]>, _: Response, next: NextFunction) {
  try {
    let newData = new Categories(request.body);
    const _newData = await createCategory(newData);
    next(new CreatedResponse<Category>("Category created successfully", _newData));
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function getCategoriesHandler(_:Request, __:Response, next: NextFunction) {
  try {
    const categories = await getAllCategories();
    next(new SuccessResponse<Category[]>("Categories retrieved successfully", categories));
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function getCategoryByNameHandler(request: Request<CategoryInput["params"]>, _:Response, next: NextFunction) {
  try {
    const foundCategory = await getCategoryByName(request.params.name);
    if (!foundCategory) {
      next(new NotFoundError(`Cannot find category ${request.params.name}`));
      return;
    }
    next(new SuccessResponse<Category>("Category found", foundCategory));
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function deleteCategoryByNameHandler(request: Request<CategoryInput["params"]>, _:Response, next: NextFunction) {
  try {
    const deletedCategory = await Categories.findByIdAndDelete(request.params.name);
    if (!deletedCategory) {
      next(new NotFoundError(`Cannot find category ${request.params.name}`));
      return;
    }
    next(new NoContentResponse("Category deleted successfully"));
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function updateCategoryHandler(request: Request<CategoryInput["params"]>, _:Response, next: NextFunction) {
  try {
    const categoryId = request.params.name;
    const updatedCategory = await updateCategory(categoryId, request.body);
    if (!updatedCategory) {
      next(new NotFoundError(`Cannot find category with ID: ${categoryId}`));
      return;
    }
    next(new SuccessResponse<Category>("Category updated successfully", updatedCategory));
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}
