import Contact from "../models/contactmodel.js";
import Menu from "../models/menuSchema.js";
import User from "../models/usermodel.js";

export const UserContact = async (req, res, next) => {
  try {
    const { fullname, email, mobileno, message } = req.body;

    if (!fullname || !email || !mobileno || !message) {
      const error = new Error("All Fields Required");
      error.statuscode = 400;
      return next(error);
    }

    const NewUser = await Contact.create({
      fullname,
      email,
      mobileno,
      message,
    });

    console.log(NewUser);

    res.status(201).json({ message: "Thanks for Contacting us...!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await User.find({ role: "manager" }).select(
      "-password",
    ); //- password not shown

    res.status(200).json({
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch {
    next(error);
  }
};

export const GetRestaurantMenuData = async (req, res, next) => {
  try {
    const {id} = req.params;

    if (!id) {
      const error = new Error("All feids required");
      error.statuscode = 400;
      return next(error);
    }

    const restaurantMenudata = await Menu
      .find({
        resturantID: id,
      })
      .sort({ updatedAt: -1 });
      //.populate("resturantID");

    res
      .status(200)
      .json({ message: "Menu fetched Successfully", data: restaurantMenudata });
  } catch (error) {
    next(error);
  }
};
