import express from "express";
import {
  changePassword,
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/verifyToken.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.put("/change-password", protectedRoute, changePassword);

export default authRouter;
