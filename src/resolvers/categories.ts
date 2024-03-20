import express, { NextFunction, Request, Response } from "express";

import categoriesService from "../services/categories";
import { InternalServerError, NotFoundError } from "../errors/ApiError";
import Category from "../models/Category";

// always has try catch in controller

export async function getAllCategories(
  _: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const categories = await categoriesService.getAllCategories();
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
    const newData = new Category(request.body);
    const newCategory = await categoriesService.createCategory(newData);
    response.status(201).json(newCategory);
    // pass validation
    // throw 400
  } catch (error) {
    next(new InternalServerError("Internal error"));
    // response.status(500).json({ message: "" });
  }
}

export async function getCategoryByName(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("request:",request.params);
    const foundCategory = await categoriesService.getCategoryByName(
      request.params.name
    );
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
    const deletedCategory = categoriesService.deleteCategoryByName(
      request.params.name
    );
    response.status(200).json(deletedCategory);
  } catch (error) {
    // handle error
    if (error instanceof NotFoundError) {
      response
        .status(404)
        .json({ message: `Cant find category: ${request.params.name}` });
      return;
    }
    next(new InternalServerError());

    // response.status(500).json({ message: "Internal error" });
    // To Do: handler error
    //  new InternalServerError();
  }
}