import express from "express";
import { createOrder, deleteOrder,  findOrderById,addOrderItemToOrder,deleteOrderItemFromOrder,getOrdersByUserId } from "../controllers/order";
import passport from "passport";
//passport.authenticate("jwt", { session: false })
const router = express.Router();

router.post("/", createOrder);

router.get("/getOrdersByuser/:userId", getOrdersByUserId);

router.delete("/:orderId", deleteOrder);

router.get("/:orderId", findOrderById);

router.put("/:orderId/items/:orderItemId", addOrderItemToOrder);

router.delete("/:orderId/items/:orderItemId", deleteOrderItemFromOrder);


export default router;