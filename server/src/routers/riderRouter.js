import express from "express";
import multer from "multer";
import { PartnerProtect, protect } from "../middlewares/authmiddleware.js";
import {
  RiderGetAvailableOrder,
  RiderGetCompletedOrder,
  RiderGetOngoingOrder,
  RiderAcceptOrder,
  RiderUpdate,
  RiderChangePhoto,
  RiderResetPassword,
} from "../controllers/riderController.js";

const router = express.Router();
const upload = multer();

router.post("/availableOrder", protect, PartnerProtect, RiderGetAvailableOrder);
router.get("/ongoingOrder", protect, PartnerProtect, RiderGetOngoingOrder);
router.get("/completedOrder", protect, PartnerProtect, RiderGetCompletedOrder);
router.patch("/acceptorder/:id", protect, PartnerProtect, RiderAcceptOrder);

router.patch("/changePhoto", protect, upload.single("image"), RiderChangePhoto);
router.put("/update", protect, RiderUpdate);
router.patch("/resetpassword", protect, RiderResetPassword);

export default router;
