import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import { InternalServerError } from "../errors/ApiError";
import usersService from "../services/users";

export async function createUser(request: Request, response: Response, next: NextFunction) {
  try {
    const newData = new User(request.body);
    const newUser = await usersService.createUser(newData);
    response.status(201).json(newUser);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function getAllUsers(_: Request, response: Response, next: NextFunction) {
  try {
    const users = await usersService.getAllUsers();
    response.status(200).json(users);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function getUser(request: Request, response: Response, next: NextFunction) {
  try {
    const user = await usersService.findUserByID(request.params.userId);
    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    response.status(200).json(user);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function updateUser(request: Request, response: Response, next: NextFunction) {
  try {
    const updatedUser = await usersService.updateUser(request.params.userId, request.body);
    if (!updatedUser) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    response.status(200).json(updatedUser);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function deleteUser(request: Request, response: Response, next: NextFunction) {
  try {
    const deletedUser = await usersService.deleteUser(request.params.userId);
    if (!deletedUser) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    response.status(200).json(deletedUser);
  } catch (error) {
    next(new InternalServerError());
  }
}

