import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    midtransOrderId: {
      type: String,
      required: true,
      unique: true,
    },
    transactionStatus: String,
    paymentType: String,
    grossAmount: String,
    fraudStatus: String,
    vaNumbers: [{ bank: String, va_number: String }],
    ewalletType: String,
    paymentCode: String,
    pdfUrl: String,
    rawData: Object,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema);
