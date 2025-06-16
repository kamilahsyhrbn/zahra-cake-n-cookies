import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    menus: [
      {
        menu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
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

cartSchema.pre("save", function (next) {
  if (this.isModified("menus")) {
    this.updateTotalPrice().then(() => next());
  } else {
    next();
  }
});

cartSchema.methods.updateTotalPrice = function () {
  this.totalPrice = this.menus.reduce((total, item) => total + item.total, 0);
  return this.save();
};

export default mongoose.model("Cart", cartSchema);
