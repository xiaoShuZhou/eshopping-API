import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import {
  ApiError,
  BadRequest,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '../errors/ApiError';

import OrderItem,{OrderItemDocument} from '../models/OrderItem';
import orderItemService from '../services/orderItemService';

export async function createOrderItem(request: Request, response: Response, next: NextFunction) {
    try {
        const newOrderItem = new OrderItem(request.body);
        const orderItem = await orderItemService.createOrderItem(newOrderItem);
        response.status(201).json(orderItem);
    } catch (error) {
        next(new InternalServerError());
    }
}