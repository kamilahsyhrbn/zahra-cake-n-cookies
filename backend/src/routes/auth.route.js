import express from "express";
import {
  changePassword,
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.put("/change-password", changePassword);

export default authRouter;
