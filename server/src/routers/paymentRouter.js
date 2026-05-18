import express from "express";
import { protect } from "../middlewares/authmiddleware.js";
import {
  RazorpayGetKey,
  RazorPayCreateOrder,
  RazorPayVerifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/getRazorpayKey", protect, RazorpayGetKey);

router.post("/createOrder", RazorPayCreateOrder);

router.post("/verifyPayment", protect, RazorPayVerifyPayment);

export default router;
