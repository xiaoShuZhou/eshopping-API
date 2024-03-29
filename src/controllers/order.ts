import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import {
  ApiError,
  BadRequest,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '../errors/ApiError';


import Order, { OrderDocument } from '../models/Order';
import orderService from '../services/orderService';


export async function createOrder(request: Request, response: Response, next: NextFunction) {
    try {
        const newOrder = new Order(request.body);
        const order = await orderService.createOrder(newOrder);
        response.status(201).json(order);
    } catch (error) {
        next(new InternalServerError());
    }
}

export async function deleteOrder(request: Request, response: Response, next: NextFunction) {
    try {
        const order = await orderService.deleteOrder(request.params.orderId);
        if (!order) {
            response.status(404).json({ message: 'Order not found' });
            return;
        }
        response.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        next(new InternalServerError());
    }
}
