
import express from "express";
import passport from "passport";

import { createUser, deleteUser, getUser, getAllUsers, updateUser,login,forgetPassword, changePassword } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:userId", getUser);

router.post("/", createUser);

router.put("/:userId", passport.authenticate("jwt", { session: false }),updateUser);

router.delete("/:userId", deleteUser);

router.post("/forget-password", forgetPassword);

router.post("/change-password", changePassword);

router.post("/login", login);


export default router;