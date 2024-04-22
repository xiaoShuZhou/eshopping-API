
import express from "express";
import passport from "passport";
import adminCheck from "../middlewares/adminCheck";


import { createUser, deleteUser, getUser, getAllUsers, updateUser,login,forgetPassword, changePassword, getUserProfileByToken } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:userId", getUser);

router.post("/", createUser);

router.post("/profile", passport.authenticate("jwt", { session: false }),getUserProfileByToken);

router.put("/:userId", passport.authenticate("jwt", { session: false }),updateUser);

router.delete("/:userId", passport.authenticate("jwt", { session: false }),adminCheck, deleteUser);

router.post("/forget-password", passport.authenticate("jwt", { session: false }),forgetPassword);

router.post("/change-password", passport.authenticate("jwt", { session: false }), changePassword);

router.post("/login", login);




export default router;