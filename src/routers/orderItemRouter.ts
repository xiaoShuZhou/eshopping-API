import express from "express";
import {createOrderItem, updateOrderItemQuantity,deleteOrderItem,getAllOrderItems,getOrderItem} from "../controllers/orderItem";
import passport from "passport";

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }),createOrderItem);

router.put("/:orderItemId",passport.authenticate("jwt", { session: false }), updateOrderItemQuantity);

router.get("/",passport.authenticate("jwt", { session: false }), getAllOrderItems);

router.get("/:orderItemId",passport.authenticate("jwt", { session: false }), getOrderItem);

router.delete("/:orderItemId",passport.authenticate("jwt", { session: false }), deleteOrderItem);

export default router;