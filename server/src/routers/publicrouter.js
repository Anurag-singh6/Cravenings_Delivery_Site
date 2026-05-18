import express from "express";
import {
  UserContact,
  GetAllRestaurants,
  GetRestaurantMenuData,
} from "../controllers/publicController.js";

const router = express.Router();
router.post("/contact", UserContact);
router.get("/allRestaurants", GetAllRestaurants);
router.get("/restaurant/menu/:id", GetRestaurantMenuData);
export default router;
