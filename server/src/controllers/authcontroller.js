import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import { gentoken, getotptoken } from "../utils/authtoken.js";
import OTP from "../models/otpmodel.js";
import { sendotpemail } from "../utils/emailservice.js";

export const UserRegister = async (req, res, next) => {
  try {
    const { fullname, email, mobileno, password, role } = req.body;

    if (!fullname || !email || !mobileno || !password || !role) {
      const error = new Error("All Fields Required");
      error.statuscode = 400;
      return next(error);
    }

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      const error = new Error("Email Already registered");
      error.statuscode = 409;
      return next(error);
    }

    //encrpt password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    //save photo
    const photoURL = `https://placehold.co/600x400?text=${fullname
      .charAt(0)
      .toUpperCase()}`;
    const photo = {
      url: photoURL,
    };

    //save data to packets

    const NewUser = await User.create({
      fullname,
      email,
      mobileno,
      password: hashpassword,
      role,
      photo,
    });

    //send response to fontend

    console.log(NewUser);

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Fields Required");
      error.statuscode = 400;
      return next(error);
    }

    //check user registed or not
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      const error = new Error("Email not registered");
      error.statuscode = 401;
      return next(error);
    }

    //password verfiy

    const isverfiy = await bcrypt.compare(password, existinguser.password);
    if (!isverfiy) {
      const error = new Error("User Not Authorized");
      error.statuscode = 401;
      return next(error);
    }
    //token genration
    gentoken(existinguser, res);

    //send message to frontend
    res.status(200).json({ message: "Login Successfully", data: existinguser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UserLogout = async (req, res, next) => {
  try {
    res.clearCookie("parleG");
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UserGenOTP = async (req, res, next) => {
  try {
    //fetch data from frontend
    const { email } = req.body;

    if (!email) {
      const error = new Error("All feilds required");
      error.statuscode = 400;
      return next(error);
    }

    //check user registered or not
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      const error = new Error("Email not registered");
      error.statuscode = 401;
      return next(error);
    }

    const otp = Math.floor(Math.random() * 1000000).toString();
    console.log(typeof otp);

    //encrypt the otp
    const salt = await bcrypt.genSalt(10);
    const hashotp = await bcrypt.hash(otp, salt);

    console.log(hashotp);

    await OTP.create({
      email,
      otp: hashotp,
      createdAt: new Date(),
    });

    await sendotpemail(email, otp);

    res.status(200).json({ message: "OTP send on registered email" });
  } catch (error) {
    next(error);
  }
};

export const UserVerfiyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      const error = new Error("All Fields Required");
      error.statuscode = 400;
      return next(error);
    }

    //check db otp
    const existinguserOtp = await OTP.findOne({ email });
    if (!existinguserOtp) {
      const error = new Error("OTP Match error. Please Retry");
      error.statuscode = 401;
      return next(error);
    }

    //otp verfiy with db

    const isverfiy = await bcrypt.compare(otp, existinguserOtp.otp);
    if (!isverfiy) {
      const error = new Error("OTP Match error. Please Retry");
      error.statuscode = 401;
      return next(error);
    }
    await existinguserOtp.deleteOne();

    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      const error = new Error("Email not registered");
      error.statuscode = 401;
      return next(error);
    }

    //token genration
    getotptoken(existinguser, res);

    //send message to frontend
    res.status(200).json({ message: "OTP verfied successfull" });
  } catch {
    next(error);
  }
};

export const UserForgetPassword = async (req, res, next) => {
  try {
    const { newpassword } = req.body;
    const currentuser = req.user;

    if (!newpassword) {
      const error = new Error("All fields Required");
      error.statuscode = 400;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(newpassword, salt);

    currentuser.password = hashpass;
    await currentuser.save();

    res
      .status(200)
      .clearCookie("otpToken")
      .json({ message: "Password Changed. Please Login again" });
  } catch (error) {
    next(error);
  }
};
