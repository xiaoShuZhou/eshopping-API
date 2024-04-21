import express from "express";
import {createOrderItem, increaseOrderItemQuantity,decreaseOrderItemQuantity,deleteOrderItem,findOrderItemById} from "../controllers/orderItem";
import passport from "passport";

const router = express.Router();

router.get("/:orderItemId",findOrderItemById)

router.post("/", createOrderItem);

router.put("/increase/:orderItemId", increaseOrderItemQuantity);

router.put("/decrease/:orderItemId", decreaseOrderItemQuantity);

router.delete("/:orderId/items/:orderItemId", deleteOrderItem);


export default router;