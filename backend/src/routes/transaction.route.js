import express from "express";
import {
  createTransaction,
  handleMidtransNotification,
} from "../controller/transaction.controller.js";

const transactionRouter = express.Router();

transactionRouter.post("/", createTransaction);
transactionRouter.post("/midtrans-callback", handleMidtransNotification);

export default transactionRouter;
