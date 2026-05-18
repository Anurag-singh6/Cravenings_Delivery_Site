import express from "express";
import {
  UserRegister,
  UserLogin,
  UserLogout,
  UserGenOTP,
  UserVerfiyOtp,
  UserForgetPassword,
} from "../controllers/authcontroller.js";
import { otproctect } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);

router.post("/genOtp", UserGenOTP);
router.post("/verifyOtp", UserVerfiyOtp);
router.post("/forgetPassword", otproctect, UserForgetPassword);

export default router;
