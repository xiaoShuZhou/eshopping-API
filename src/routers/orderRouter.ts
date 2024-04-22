import express from "express";
import { createOrder, deleteOrder,  findOrderById,addOrderItemToOrder,deleteOrderItemFromOrder,getOrdersByUserId } from "../controllers/order";
import passport from "passport";

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }),createOrder);

router.get("/getOrdersByuser/:userId", passport.authenticate("jwt", { session: false }),getOrdersByUserId);

router.delete("/:orderId", passport.authenticate("jwt", { session: false }),deleteOrder);

// router.get("/:orderId", findOrderById);

// router.put("/:orderId/items/:orderItemId", addOrderItemToOrder);

// router.delete("/:orderId/items/:orderItemId", deleteOrderItemFromOrder);

export default router;