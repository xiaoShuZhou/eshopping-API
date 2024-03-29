
import express from "express";
import passport from "passport";

import { createUser, deleteUser, getUser, getAllUsers, updateUser,login } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:userId", getUser);

router.post("/", createUser);

router.put("/:userId", passport.authenticate("jwt", { session: false }),updateUser);

router.delete("/:userId", deleteUser);

router.post("/login", login);


export default router;