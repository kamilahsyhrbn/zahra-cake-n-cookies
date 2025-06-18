import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        isReviewed: { type: Boolean, default: false },
      },
    ],
    shipping: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      province: { type: String, required: true },
      city: { type: String, required: true },
      courier: { type: String, required: true },
      service: { type: String, required: true },
      cost: { type: Number, required: true },
      estimation: { type: String, required: true },
    },
    totalWeight: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "delivered", "completed", "cancelled"],
      default: "pending",
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("Order", orderSchema);
