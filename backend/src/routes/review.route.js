import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
} from "../controller/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/:id", getAllReviews);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
