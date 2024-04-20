import express from "express";
import { createOrder, deleteOrder,  findOrderById,addOrderItemToOrder,deleteOrderItemFromOrder } from "../controllers/order";
import passport from "passport";

const router = express.Router();

router.post("/", createOrder);

router.delete("/:orderId", deleteOrder);

router.get("/:orderId", passport.authenticate("jwt", { session: false }),findOrderById);

router.put("/:orderId/items/:orderItemId", addOrderItemToOrder);

router.delete("/:orderId/items/:orderItemId", deleteOrderItemFromOrder);


export default router;