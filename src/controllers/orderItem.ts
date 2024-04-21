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
import orderService from '../services/orderService';



export async function createOrderItem(request: Request, response: Response, next: NextFunction) {
    try {
        const { product, quantity  } = request.body;
        // create a new order item
        const newOrderItem = new OrderItem({
            product: product,
            quantity: quantity
        });
        const orderItem = await orderItemService.createOrderItem(newOrderItem);

        //addOrderItemToOrder
        const { orderId } = request.body;
        const order = await orderService.addOrderItemToOrder(orderId, orderItem.id);
        if (!order) {
            return response.status(404).json({ message: 'Order not found' });
        }
        // return the order item
        response.status(201).json(orderItem);
    } catch (error) {
        next(error);
    }
}


export async function increaseOrderItemQuantity(request: Request, response: Response, next: NextFunction) {
    try {
        const orderItemId  = request.params.orderItemId;
        const orderItem = await orderItemService.increaseOrderItemQuantity(orderItemId);
        if (!orderItem) {
            response.status(404).json({ message: 'OrderItem not found' });
            return;
        }
        response.status(200).json(orderItem);
    }
    catch (error) {
        next(new InternalServerError());
    }
}

export async function decreaseOrderItemQuantity(request: Request, response: Response, next: NextFunction) {
    try {
        const orderItemId  = request.params.orderItemId;
        const orderItem = await orderItemService.decreaseOrderItemQuantity(orderItemId);
        if (!orderItem) {
            response.status(404).json({ message: 'OrderItem not found' });
            return;
        }
        response.status(200).json(orderItem);
    }
    catch (error) {
        next(new InternalServerError());
    }
}



export async function deleteOrderItem(request: Request, response: Response, next: NextFunction) {
    try {
        const order = await orderService.deleteOrderItemFromOrder(request.params.orderId, request.params.orderItemId);
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

export async function findOrderItemById(request: Request, response: Response, next: NextFunction) {
    try {
        const orderItem = await orderItemService.findOrderItemById(request.params.orderItemId);
        if (!orderItem) {
            response.status(404).json({ message: 'OrderItem not found' });
            return;
        }
        response.status(200).json(orderItem);
    } catch (error) {
        next(new InternalServerError());
    }
}
