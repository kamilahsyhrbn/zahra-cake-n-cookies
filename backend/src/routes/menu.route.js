import express from "express";
import {
  createMenu,
  deleteMenu,
  getAllMenus,
  getBestSellingMenu,
  getMenuById,
  getRecommendationMenus,
  likeUnlikeMenu,
  searchMenu,
  updateMenu,
} from "../controller/menu.controller.js";
import { adminOnly, protectedRoute } from "../middleware/verifyToken.js";
import { uploadMultiple } from "../middleware/uploadImage.js";

const menuRouter = express.Router();

menuRouter.post("/", protectedRoute, adminOnly, uploadMultiple, createMenu);
menuRouter.get("/", getAllMenus);
menuRouter.get("/best-selling", getBestSellingMenu);
menuRouter.get("/recommendation/:id", getRecommendationMenus);
menuRouter.get("/search", searchMenu);
menuRouter.get("/:id", getMenuById);
menuRouter.post("/like/:id", protectedRoute, likeUnlikeMenu);
menuRouter.put("/:id", protectedRoute, adminOnly, uploadMultiple, updateMenu);
menuRouter.delete("/:id", protectedRoute, adminOnly, deleteMenu);

export default menuRouter;
