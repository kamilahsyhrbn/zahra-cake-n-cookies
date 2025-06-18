import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
} from "../controller/cart.controller.js";
import { protectedRoute } from "../middleware/verifyToken.js";

const cartRouter = express.Router();

cartRouter.post("/", protectedRoute, addToCart);
cartRouter.get("/", protectedRoute, getCart);
cartRouter.delete("/clear", protectedRoute, clearCart);
cartRouter.delete("/:id", protectedRoute, removeCartItem);

export default cartRouter;
