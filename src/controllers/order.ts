import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import {
  ApiError,
  BadRequest,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '../utils/errors/ApiError';

import OrderItem from '../models/OrderItem';

import Order, { OrderDocument } from '../models/Order';
import orderService from '../services/orderService';


export async function createOrder(request: Request, response: Response, next: NextFunction) {
    try {
        const { user, items } = request.body;
        console.log({ user, items }, 'user');
        if (!user || !items) {
            next(new BadRequest('User and items are required'));
            return;
        }
        const order = await orderService.createOrder(user, items);

        response.status(201).json(order);
    } catch (error) {
        next(new InternalServerError());
    }
}

export async function getOrdersByUserId(request: Request, response: Response, next: NextFunction) {
    try {
        const orders = await orderService.getOrdersByUserId(request.params.userId);
        response.status(200).json(orders);
    } catch (error) {
        next(new InternalServerError());
    }
}

export async function deleteOrder(request: Request, response: Response, next: NextFunction) {
    try {
        
        const order1 = await orderService.getOrder(request.params.orderId);
        if (!order1) {
            return response.status(404).json({ message: 'Order not found' });
        }

        // Attempt to delete all order items associated with the order
        const orderItemDeletionResults = await OrderItem.deleteMany({ _id: { $in: order1.items } });
        if (orderItemDeletionResults.deletedCount === 0) {
            console.log('No order items found or deleted');
        } else {
            console.log(`${orderItemDeletionResults.deletedCount} order items deleted`);
        }


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


export async function addOrderItemToOrder(request: Request, response: Response, next: NextFunction) {
    try {
        const order = await orderService.addOrderItemToOrder(request.params.orderId, request.params.orderItemId);
        if (!order) {
            response.status(404).json({ message: 'Order not found' });
            return;
        }
        response.status(200).json(order);
    } catch (error) {
        next(new InternalServerError());
    }
}

export async function deleteOrderItemFromOrder(request: Request, response: Response, next: NextFunction) {
    try {
        const order = await orderService.deleteOrderItemFromOrder(request.params.orderId, request.params.orderItemId);
        if (!order) {
            response.status(404).json({ message: 'Order not found' });
            return;
        }
        response.status(200).json(order);
    } catch (error) {
        next(new InternalServerError());
    }
}


export async function findOrderById(request: Request, response: Response, next: NextFunction) {
    try {
        console.log(request.params.orderId, 'request.params.orderId');
        const order = await orderService.findOrderById(request.params.orderId);
        console.log(order, 'order');
        if (!order) {
            response.status(404).json({ message: 'Order not found' });
            return;
        }
        response.status(200).json(order);
    } catch (error) {
        console.log(error, 'error');
        next(new InternalServerError());
    }
}