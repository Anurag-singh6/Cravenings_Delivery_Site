import express from "express";
import multer from "multer";

import {
  ResturantAddMenuItem,
  GetRestaurantMenuItems,
  RestaurantEditMenuItem,
  RestaurantUpdate,
  RestaurantChangePhoto,
  RestaurantResetPassword,
  GetAllPlacedOrder,
} from "../controllers/resturantcontroller.js";
import { ManagerProtect, protect } from "../middlewares/authmiddleware.js";

const router = express.Router();
const upload = multer();

router.post(
  "/addMenuItem",
  protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  ResturantAddMenuItem
);
router.get("/menuItem", protect, ManagerProtect, GetRestaurantMenuItems);

router.put(
  "/updateMenuItem/:id",
  protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantEditMenuItem
);

router.put("/update", protect, ManagerProtect, RestaurantUpdate);
router.patch(
  "/changePhoto",
  protect,
  ManagerProtect,
  upload.single("image"),
  RestaurantChangePhoto
);
router.patch(
  "/resetPassword",
  protect,
  ManagerProtect,
  RestaurantResetPassword
);

router.get("/placedOrders", protect, ManagerProtect, GetAllPlacedOrder);

export default router;
