import express from "express";
import { createOrder, deleteOrder, updateOrder, getAllOrders, findOrderById } from "../controllers/order";
import passport from "passport";

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }),createOrder);

router.delete("/:orderId", passport.authenticate("jwt", { session: false }),deleteOrder);

router.put("/:orderId", passport.authenticate("jwt", { session: false }),updateOrder);

router.get("/", passport.authenticate("jwt", { session: false }),getAllOrders);

router.get("/:orderId", passport.authenticate("jwt", { session: false }),findOrderById);


export default router;