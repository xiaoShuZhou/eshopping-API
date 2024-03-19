import express, { Request, Response } from "express";
import Category from "../models/Category";
import categoriesService from "../services/categories";


export async function getAllCategories(_: Request, response: Response) {
  const categories = await categoriesService.getAllCategories();
  response.status(200).json(categories);
}

export async function createCategory(request: Request, response: Response) {
  const newData = new Category(request.body);
  console.log(newData);
  newData.save();
  // const newCategory = await categoriesService.createCategory(newData);
  // response.status(201).json(newCategory);
}

export async function getCategoryById(request: Request, response: Response) {
  const foundCategory = await categoriesService.getCategoryById(
    request.params.categoryId
  );
  response.status(201).json(foundCategory);
}
