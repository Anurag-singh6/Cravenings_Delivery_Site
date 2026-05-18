import express from "express";
import {
  UserChangePhoto,
  UserUpdate,
  UserResetPassword,
  UserPlaceOrder,
  UserAllOrders,
} from "../controllers/usercontroller.js";
import { protect } from "../middlewares/authmiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.put("/update", protect, UserUpdate);
router.patch("/changePhoto", protect, upload.single("image"), UserChangePhoto);
router.patch("/resetpassword", protect, UserResetPassword);

router.post("/placeorder", protect, UserPlaceOrder);

router.get("/placedorders", protect, UserAllOrders);

export default router;
