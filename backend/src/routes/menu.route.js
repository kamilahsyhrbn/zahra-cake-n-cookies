import express from "express";
import {
  createMenu,
  deleteMenu,
  getAllMenus,
  getMenuById,
  likeUnlikeMenu,
  searchMenu,
  updateMenu,
} from "../controller/menu.controller.js";

const menuRouter = express.Router();

menuRouter.post("/", createMenu);
menuRouter.get("/", getAllMenus);
menuRouter.get("/search", searchMenu);
menuRouter.get("/:id", getMenuById);
menuRouter.put("/:id", updateMenu);
menuRouter.delete("/:id", deleteMenu);
menuRouter.post("/like/:id", likeUnlikeMenu);
menuRouter.get("/like/:id", likeUnlikeMenu);

export default menuRouter;
