import express from "express";
import {
  getAllTransactions,
  getTransactionById,
  handleMidtransNotification,
  updateTransactionStatus,
} from "../controller/transaction.controller.js";
import { protectedRoute } from "../middleware/verifyToken.js";

const transactionRouter = express.Router();

transactionRouter.get("/", protectedRoute, getAllTransactions);
transactionRouter.get("/:id", protectedRoute, getTransactionById);
transactionRouter.get("/:orderId/status-update", updateTransactionStatus);
transactionRouter.post("/midtrans-callback", handleMidtransNotification);

export default transactionRouter;
