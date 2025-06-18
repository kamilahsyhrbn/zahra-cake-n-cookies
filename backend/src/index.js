import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import menuRouter from "./routes/menu.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import transactionRouter from "./routes/transaction.route.js";
import reviewRouter from "./routes/review.route.js";
import rajaOngkirRouter from "./routes/rajaOngkir.route.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/rajaOngkir", rajaOngkirRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
