import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const protect = async (req, res, next) => {
  try {
    const biscut = req.cookies.parleG;
    console.log("Token recevied in cookies : ", biscut);

    const chai = jwt.verify(biscut, process.env.JWT_SECRET);
    console.log(chai);
    if (!chai) {
      const error = new Error("Unauthorized! Login again");
      error.statuscode = 401;
      return next(error);
    }
    const verfieduser = await User.findById(chai.id);
    if (!verfieduser) {
      const error = new Error("Unauthorized Login again");
      error.statuscode = 401;
      return next(error);
    }

    req.user = verfieduser;

    next();
  } catch (error) {
    next(error);
  }
};

export const AdminProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      const error = new Error("Unauthorized Only admin can do this");
      error.statuscode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const PartnerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "partner") {
      const error = new Error("Unauthorized Only rider can do this");
      error.statuscode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const ManagerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "manager") {
      const error = new Error("Unauthorized Only manager can do this");
      error.statuscode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const CustomerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "customer") {
      const error = new Error("Unauthorized Only user can do this");
      error.statuscode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const otproctect = async (req, res, next) => {
  try {
    const token = req.cookies.otpToken;
    console.log("Token recevied in cookies:", token);

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    if (!decode) {
      const error = new Error("Unauthorized! Please try again");
      error.statuscode = 401;
      return next(error);
    }

    const verfieduser = await User.findById(decode.id);
    if (!verfieduser) {
      const error = new Error("Unauthorized! Please try again");
      error.statuscode = 401;
      return next(error);
    }

    req.user = verfieduser;
    next();
  } catch (error) {
    next(error);
  }
};
