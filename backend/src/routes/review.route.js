import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  updateReview,
} from "../controller/review.controller.js";
import { protectedRoute } from "../middleware/verifyToken.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getAllReviews);
reviewRouter.post("/", protectedRoute, createReview);
reviewRouter.put("/:id", protectedRoute, updateReview);
reviewRouter.delete(
  "/:menuId/:reviewId/:orderId",
  protectedRoute,
  deleteReview
);

export default reviewRouter;
