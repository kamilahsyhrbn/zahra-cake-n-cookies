import express from "express";
import {
  getProvinces,
  getCities,
  getCosts,
} from "../controller/rajaOngkir.controller.js";

const router = express.Router();

router.get("/provinces", getProvinces);
router.get("/cities", getCities);
router.post("/shipping-cost", getCosts);

export default router;
