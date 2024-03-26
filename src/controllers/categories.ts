import express, { NextFunction, Request, Response } from "express";

import { InternalServerError, NotFoundError } from "../errors/ApiError";
import Category from "../models/Category";

export async function getAllCategories(
  _: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const categories = await Category.find();
    response.status(200).json(categories);
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function createCategory(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    let newData = new Category(request.body);
    newData = await newData.save()
    response.status(201).json(newData);
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function getCategoryByName(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("request:",request.params);
    const foundCategory = await Category.findById(request.params.name);
    response.status(201).json(foundCategory);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cant find category ${request.params.name}`,
      });
      return;
    }
    next(new InternalServerError());
  }
}

export async function deleteCategoryByName(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const deletedCategory = await Category.findByIdAndDelete(request.params.name);
    response.status(200).json(deletedCategory);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response
        .status(404)
        .json({ message: `Cant find category: ${request.params.name}` });
      return;
    }
    next(new InternalServerError());
  }
}

export async function updateCategory(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const categoryId = request.params.name; 
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId }, 
      request.body,
      { new: true } 
    );

    if (!updatedCategory) {
      response.status(404).json({
        message: `Cannot find category with ID: ${categoryId}`,
      });
      return;
    }

    response.status(200).json(updatedCategory);
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}


