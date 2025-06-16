import express from "express";
import {
  createTransaction,
  handleMidtransCallback,
} from "../controller/transaction.controller.js";

const transactionRouter = express.Router();

transactionRouter.post("/", createTransaction);
transactionRouter.post("/midtrans-callback", handleMidtransCallback);

export default transactionRouter;
