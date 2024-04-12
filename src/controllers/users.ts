import express, { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { InternalServerError } from "../errors/ApiError";
import usersService from "../services/userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export async function createUser(request: Request, response: Response, next: NextFunction) {
  try {
    const { password } = request.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = request.body;
    console.log(userData, "user data sean");
    userData.password = hashedPassword;
    const newData = new User(userData);
    console.log(newData, "new data");
    const newUser = await usersService.createUser(newData);
    console.log(newUser, "new user");
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

export async function forgetPassword(request: Request, response: Response, next: NextFunction) {
  try {
    const { email } = request.body;
    const user = await usersService.findUserByEmail(email);
    if (!user) {
      response.status(404).json({ message: "User not found,please sign up" });
      return;
    }
    response.status(200).json(user.password);
  } catch (error) {
    next(new InternalServerError());
  }
}


export async function changePassword(request: Request, response: Response, next: NextFunction) {
  try {
    const { email, oldPassword, newPassword } = request.body;
    const user = await usersService.findUserByEmail(email);
    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      response.status(403).json({ message: "Incorrect password" });
      return;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const updatedUser = await usersService.updateUser(user._id, { password: hashedPassword });
    response.status(200).json(updatedUser);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function login(request: Request, response: Response, next: NextFunction) {
  try {
    const { email, password } = request.body;
    const user = await usersService.findUserByEmail(email);
    // Check if user exists
    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    // Check if password is correct by comparing the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      response.status(403).json({ message: "Incorrect password" });
      return;
    }
    // Create and return a JWT token. then store the token in local storage in frontend
    const JWT_SECRET = process.env.JWT_SECRET as string;
    console.log(JWT_SECRET, "jwt");
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "3h" });
    response.status(200).json({ user, token });

  } catch (error) {
    next(new InternalServerError());
  }
}
  