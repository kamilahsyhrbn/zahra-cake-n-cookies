import express from "express";
import {
  deleteAccount,
  getAllAdmins,
  getAllUsers,
  getLikedMenu,
  getUserById,
  updateUser,
} from "../controller/user.controller.js";
import { adminOnly, protectedRoute } from "../middleware/verifyToken.js";
import { uploadSingle } from "../middleware/uploadImage.js";

const userRouter = express.Router();

userRouter.get("/", protectedRoute, adminOnly, getAllUsers);
userRouter.get("/admin", protectedRoute, adminOnly, getAllAdmins);
userRouter.get("/liked", protectedRoute, getLikedMenu);
userRouter.get("/:id", protectedRoute, getUserById);
userRouter.put("/:id", protectedRoute, uploadSingle, updateUser);
userRouter.delete("/:id", protectedRoute, deleteAccount);

export default userRouter;
