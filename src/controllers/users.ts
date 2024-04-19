import express, { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { InternalServerError } from "../utils/errors/ApiError";
import usersService from "../services/userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Payload } from "../types/User"
const cloudinary = require('../utils/cloudinary')

dotenv.config({ path: ".env" });

export async function createUser(request: Request, response: Response, next: NextFunction) {
  try {
    const { password } = request.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = request.body;
    userData.password = hashedPassword;

    const newData = new User(userData);
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
    console.log(user, "user");
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
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "3h" });
    response.status(200).json(token);

  } catch (error) {
    next(new InternalServerError());
  }
}

export async function verifyToken(request: Request, response: Response, next: NextFunction) {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      response.status(403).json({ message: "Token not provided" });
      return;
    }
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const decodedData = jwt.verify(token, JWT_SECRET);
    response.status(200).json(decodedData);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function getUserProfileByToken(request: Request, response: Response, next: NextFunction) {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      response.status(403).json({ message: "Token not provided" });
      return;
    }
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const decodedData = jwt.verify(token, JWT_SECRET) as Payload;
    const user = await usersService.findUserByEmail(decodedData.email);
    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    response.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(new InternalServerError());
  }
}