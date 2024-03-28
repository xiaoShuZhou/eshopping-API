
import express from "express";

import { createUser, deleteUser, getUser, getAllUsers, updateUser,login } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:userId", getUser);

router.post("/", createUser);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

router.post("/login", login);


export default router;