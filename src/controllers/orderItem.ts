import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import {
  ApiError,
  BadRequest,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '../utils/errors/ApiError';

import OrderItem,{OrderItemDocument} from '../models/OrderItem';
import orderItemService from '../services/orderItemService';
import orderServive from '../services/orderService';

export async function createOrderItem(request: Request, response: Response, next: NextFunction) {
    try {
        const { orderId, productId, quantity = 1 } = request.body;
        // create a new order item
        const newOrderItem = new OrderItem({
            product: productId,
            quantity
        });
        const orderItem = await orderItemService.createOrderItem(newOrderItem);

        // update the order with the new order item
        await orderServive.updateOrder(orderId, { $push: { items: orderItem._id } } as any );

        // return the order item
        response.status(201).json(orderItem);
    } catch (error) {
        next(error);
    }
}

export async function updateOrderItemQuantity(request: Request, response: Response, next: NextFunction) {
    try {
        const { orderItemId, quantity } = request.body;

        // find the order item
        const orderItem = await orderItemService.getOneOrderItem(orderItemId);
        if (!orderItem) {
            return response.status(404).json({ message: 'OrderItem not found' });
        }
        // update the quantity
        orderItem.quantity += quantity;
        await orderItem.save();
        // return the updated order item
        response.status(200).json(orderItem);
    } catch (error) {
        next(error);
    }
}

export async function getAllOrderItems(request: Request, response: Response, next: NextFunction) {
    try {
        const orderItems = await orderItemService.getAllOrderItems();
        response.status(200).json(orderItems);
    } catch (error) {
        next(new InternalServerError());
    }
}

export async function getOrderItem(request: Request, response: Response, next: NextFunction) {
    try {
        const orderItem = await orderItemService.getOneOrderItem(request.params.orderItemId);
        if (!orderItem) {
            response.status(404).json({ message: 'OrderItem not found' });
            return;
        }
        response.status(200).json(orderItem);
    } catch (error) {
        next(new InternalServerError());
    }
}

export async function deleteOrderItem(request: Request, response: Response, next: NextFunction) {
    try {
        const orderItem = await orderItemService.deleteOrderItem(request.params.orderItemId);
        if (!orderItem) {
            response.status(404).json({ message: 'OrderItem not found' });
            return;
        }
        response.status(200).json({ message: 'OrderItem deleted successfully' });
    } catch (error) {
        next(new InternalServerError());
    }
}