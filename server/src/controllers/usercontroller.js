import User from "../models/usermodel.js";
import Order from "../models/ordermodel.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";

export const UserUpdate = async (req, res, next) => {
  try {
    //logic{{
    const {
      fullname,
      email,
      mobileno,
      gender,
      dob,
      address,
      city,
      pin,
      documents,
      paymentDetails,
      geoLocation,
    } = req.body;
    const currentuser = req.user;

    if (!fullname || !email || !mobileno) {
      const error = new Error("All fields required");
      error.statuscode = 400;
      return next(error);
    }
    if (!city || !pin) {
      const error = new Error("City and PIN Code are required");
      error.statuscode = 400;
      return next(error);
    }
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const error = new Error("Invalid email format");
      error.statuscode = 400;
      return next(error);
    }
    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(mobileno.replace(/\D/g, ""))) {
      const error = new Error("Mobile number must be 10 digits");
      error.statuscode = 400;
      return next(error);
    }
    // Validate PIN code (6 digits)
    if (!/^\d{6}$/.test(pin)) {
      const error = new Error("PIN code must be 6 digits");
      error.statuscode = 400;
      return next(error);
    }
    // Validate PAN format if provided
    if (
      documents?.pan &&
      documents.pan !== "N/A" &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(documents.pan)
    ) {
      const error = new Error("Invalid PAN format");
      error.statuscode = 400;
      return next(error);
    }
    // Validate UPI format if provided
    if (
      paymentDetails?.upi &&
      paymentDetails.upi !== "N/A" &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(paymentDetails.upi)
    ) {
      const error = new Error("Invalid UPI format");
      error.statuscode = 400;
      return next(error);
    }

    // Update personal information
    currentuser.fullname = fullname;
    currentuser.email = email.toLowerCase();
    currentuser.mobileno = mobileno;
    currentuser.gender = gender || currentuser.gender;
    currentuser.dob = dob || currentuser.dob;
    currentuser.address = address || currentuser.address;
    currentuser.city = city;
    currentuser.pin = pin;

    //first way
    // currentuser.fullname = fullname;
    // currentuser.email = email;
    // currentuser.mobileno = mobileno;
    // await currentuser.save();

    // console.log("New Data", currentuser);

    // Update nested documents
    if (documents) {
      currentuser.documents = {
        gst: documents.gst || currentuser.documents?.gst || "N/A",
        fssai: documents.fssai || currentuser.documents?.fssai || "N/A",
        rc: documents.rc || currentuser.documents?.rc || "N/A",
        dl: documents.dl || currentuser.documents?.dl || "N/A",
        uidai: documents.uidai || currentuser.documents?.uidai || "N/A",
        pan: documents.pan || currentuser.documents?.pan || "N/A",
      };
    }

    // Update payment details
    if (paymentDetails) {
      currentuser.paymentDetails = {
        upi: paymentDetails.upi || currentuser.paymentDetails?.upi || "N/A",
        account_number:
          paymentDetails.account_number ||
          currentuser.paymentDetails?.account_number ||
          "N/A",
        ifs_Code:
          paymentDetails.ifs_Code ||
          currentuser.paymentDetails?.ifs_Code ||
          "N/A",
      };
    }

    // Update geo location
    if (geoLocation) {
      currentuser.geoLocation = {
        lat: geoLocation.lat || currentuser.geoLocation?.lat || "N/A",
        lon: geoLocation.lon || currentuser.geoLocation?.lon || "N/A",
      };
    }
    console.log("Old Data", currentuser); //json format
    await currentuser.save();
    console.log("new data ", currentuser);

    //second way
    // const updateuser = await User.findByIdAndUpdate(
    //   { _id: currentuser._id },
    //   {
    //     fullname,
    //     email,
    //     mobileno,
    //     gender,
    //     dob,
    //     address,
    //     city,
    //     documents,
    //     paymentDetails,
    //     geoLocation,
    //   },
    //   { new: true }
    // );

    res
      .status(200)
      .json({ message: "user update successfull", data: currentuser });
  } catch (error) {
    next(error);
  }
};

export const UserChangePhoto = async (req, res, next) => {
  try {
    //console.log("body: ", req.body);

    const currentuser = req.user;
    const dp = req.file;
    console.log("file: ", req.file);

    if (!dp) {
      const error = new Error("Profile Picture Required");
      error.statuscode(400);
      return next(error);
    }

    if (currentuser.photo.publicID) {
      //delete the old photo from cloudinary
      await cloudinary.uploader.destroy(currentuser.photo.publicID);
    }

    //upload the photo from cloudinary
    const b64 = Buffer.from(dp.buffer).toString("base64");
    console.log(b64.slice(0, 100));
    const dataURI = `data:${dp.mimetype};base64,${b64}`;
    console.log("data", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "Cravings/User",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image uploaded successfully ", result);
    currentuser.photo.url = result.secure_url;
    currentuser.photo.publicID = result.public_id;

    await currentuser.save();

    res.status(200).json({ message: "Photo Updated", data: currentuser });
  } catch (error) {
    next(error);
  }
};

export const UserResetPassword = async (req, res, next) => {
  try {
    const { oldpassword, newpassword } = req.body;
    const currentuser = req.user;

    if (!oldpassword || !newpassword) {
      const error = new Error("All feilds required");
      error.statuscode = 400;
      return next(error);
    }

    const isverified = await bcrypt.compare(oldpassword, currentuser.password);
    if (!isverified) {
      const error = new Error("Old Password didn't match");
      error.statuscode = 401;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(newpassword, salt);

    currentuser.password = hashpassword;

    await currentuser.save();

    res.status(200).json({ message: "Password Reset Successfull" });
  } catch (error) {
    next(error);
  }
};

export const UserPlaceOrder = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const { restaurantId, items, orderValue, status, review } = req.body;

    console.log({ restaurantId, items, orderValue, status, review });

    if (!restaurantId || !items || !orderValue || !status) {
      const error = new Error("All fields required");
      error.statuscode = 400;
      return next(error);
    }

    const order = await Order.create({
      orderNumber: `ORD-${Date.now()}`,
      restaurantId,
      userId: currentUser._id,
      items,
      orderValue,
      status,
      review: review || "N/A",
    });

    const newOrder = await order.populate([
      {path: "restaurantId"},
      {path: "userId"},
    ])
    res
      .status(201)
      .json({ message: "Order Placed Successfully", data: newOrder });
  } catch (error) {
    next(error);
  }
};

export const UserAllOrders = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const orders = await Order.find({ userId: currentUser._id })
      .populate("restaurantId")
      .populate("riderId")
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "All orders fetched Successfully", data: orders });
  } catch (error) {
    next(error);
  }
};
