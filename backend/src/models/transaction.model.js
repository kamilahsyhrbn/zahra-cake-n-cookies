import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({});

export default mongoose.model("Transaction", transactionSchema);
