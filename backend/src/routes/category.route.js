import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controller/category.controller.js";
import { adminOnly, protectedRoute } from "../middleware/verifyToken.js";
import { uploadSingle } from "../middleware/uploadImage.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  protectedRoute,
  adminOnly,
  uploadSingle,
  createCategory
);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", protectedRoute, adminOnly, getCategoryById);
categoryRouter.put(
  "/:id",
  protectedRoute,
  adminOnly,
  uploadSingle,
  updateCategory
);
categoryRouter.delete("/:id", protectedRoute, adminOnly, deleteCategory);

export default categoryRouter;
