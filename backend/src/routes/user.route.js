import express from "express";
import {
  deleteAccount,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteAccount);

export default userRouter;
