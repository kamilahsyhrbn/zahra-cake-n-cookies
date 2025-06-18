import express from "express";
import {
  getProvinces,
  getCities,
} from "../controller/rajaOngkir.controller.js";

const router = express.Router();

router.get("/provinces", getProvinces);
router.get("/cities", getCities);

export default router;
