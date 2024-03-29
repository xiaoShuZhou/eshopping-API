import express, { NextFunction, Request, Response } from "express";
import Categories from "../models/Category";
import { InternalServerError, NotFoundError } from "../errors/ApiError";
import { CreatedResponse, NoContentResponse, SuccessResponse } from "../responses/apiResponse";
import { Category } from "../types/Product";

export async function getAllCategories(_: Request, response: Response, next: NextFunction) {
  try {
    const categories = await Categories.find();
    next(new SuccessResponse<Category[]>("Categories retrieved successfully", categories));
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function createCategory(request: Request, response: Response, next: NextFunction) {
  try {
    let newData = new Categories(request.body);
    newData = await newData.save();
    next(new CreatedResponse<Category>("Category created successfully", newData));
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function getCategoryByName(request: Request, response: Response, next: NextFunction) {
  try {
    console.log("request:", request.params);
    const foundCategory = await Categories.findById(request.params.name);
    if (!foundCategory) {
      next(new NotFoundError(`Cannot find category ${request.params.name}`));
      return;
    }
    next(new SuccessResponse<Category>("Category found", foundCategory));
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function deleteCategoryByName(request: Request, response: Response, next: NextFunction) {
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

export async function updateCategory(request: Request, response: Response, next: NextFunction) {
  try {
    const categoryId = request.params.name;
    const updatedCategory = await Categories.findOneAndUpdate(
      { _id: categoryId },
      request.body,
      { new: true }
    );
    if (!updatedCategory) {
      next(new NotFoundError(`Cannot find category with ID: ${categoryId}`));
      return;
    }
    next(new SuccessResponse<Category>("Category updated successfully", updatedCategory));
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}
