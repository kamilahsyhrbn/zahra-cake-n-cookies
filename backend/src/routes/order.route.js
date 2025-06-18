import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
} from "../controller/order.controller.js";
import { adminOnly, protectedRoute } from "../middleware/verifyToken.js";

const orderRouter = express.Router();

orderRouter.post("/", protectedRoute, createOrder);
orderRouter.get("/", protectedRoute, adminOnly, getAllOrders);
orderRouter.get("/user", protectedRoute, getOrderByUserId);
orderRouter.get("/:id", protectedRoute, getOrderById);
orderRouter.put("/:id", protectedRoute, updateOrderStatus);
orderRouter.delete("/:id", protectedRoute, deleteOrder);

export default orderRouter;
