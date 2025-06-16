import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
} from "../controller/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);
cartRouter.delete("/", clearCart);
cartRouter.delete("/:id", removeCartItem);

export default cartRouter;
