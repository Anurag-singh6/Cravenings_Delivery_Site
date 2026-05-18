import cloudinary from "../config/cloudinary.js";
import Order from "../models/ordermodel.js";
import { calculateDistance } from "../utils/riderUtility.js";
import bcrypt from "bcrypt"

export const RiderGetAvailableOrder = async (req, res, next) => {
  try {
    //console.log("RiderGetAvailableOrder called with body: ", req.body);
    const { lat, lon } = req.body;
    //console.log("Latitude: ", lat, " Longitude: ", lon);

    const availableOrders = await Order.find({
      riderId: null,
      status: {
        $ne: "pending",
        $ne: "cancelled",
        $ne: "delivered",
        $ne: "rejected",
      }, //$ne means Not Equal. It Exclude orders that are pending, cancelled, delivered or rejected
    })
      .populate("userId")
      .populate("restaurantId");

    // console.log(
    //   "Available Orders before distance calculation: ",
    //   availableOrders
    // );

    const AvailableOrderWithDistance = await calculateDistance(
      availableOrders,
      lat,
      lon
    );

    //console.log("Available Orders With Distance: ", AvailableOrderWithDistance);

    res.status(200).json({
      message: "Available Orders Fetched Successfully",
      data: AvailableOrderWithDistance,
    });
  } catch (error) {
    next(error);
  }
};

export const RiderGetOngoingOrder = async (req, res, next) => {
  try {
    const currentuser = req.user;
    const ongoingOrders = await Order.find({
      riderId: currentuser._id,
      status: {
        $in: ["accepted", "preparing", "ready", "pickedUp", "onTheWay"],
      }, // $in means "is in". It includes orders that are accepted, preparing, ready, pickedUp or onTheWay
    })
      .populate("userId")
      .populate("restaurantId");

    res.status(200).json({
      message: "Ongoing Orders Fetched Successfully",
      data: ongoingOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const RiderGetCompletedOrder = async (req, res, next) => {
  try {
    const currentuser = req.user;
    const completedOrders = await Order.find({
      riderId: currentuser._id,
      status: {
        $in: ["delivered", "refused", "damaged", "cancelled", "rejected"],
      }, // $in means "is in". It include orders that are delivered, refused, damaged, cancelled or rejected
    })
      .populate("userId")
      .populate("restaurantId");

    res.status(200).json({
      message: "Completed Orders Fetched Successfully",
      data: completedOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const RiderAcceptOrder = async (req, res, next) => {
  try {
    const riderId = req.user._id;

    const orderID = req.params.id;

    const currentOrder = await Order.findById(orderID);

    if (!currentOrder) {
      const error = new Error("Order Not Found");
      error.statusCode = 404;
      return next(error);
    }

    currentOrder.riderId = riderId;
    await currentOrder.save();

    res.status(200).json({ message: "Order Assingned to you" });
  } catch (error) {
    next(error);
  }
};

export const RiderChangePhoto = async (req, res, next) => {
  try {
    //console.log("body", req.body)
    const currentUser = req.user;
    const dp = req.file;

    //console.log("request file ",req.file);

    if (!dp) {
      const error = new Error("Profile Picture required");
      error.statuscode = 400;
      return next(error);
    }

    console.log("DP", dp);

    if (currentUser.photo.publicID) {
      await cloudinary.uploader(currentUser.photo.publicID);
    }

    const b64 = Buffer.from(dp.buffer).toString("base64");
    //console.log(b64.slice(0,100));
    const dataURI = `data:${dp.mimetype};base64,${b64}`;
    console.log("DataURI", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "Cravings/User",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image Uploaded successfully: ", result);
    currentUser.photo.url = result.secure_url;
    currentUser.photo.publicID = result.public_id;

    await currentUser.save();

    res.status(200).json({ message: "Photo Updated", data: currentUser });
  } catch (error) {
    next(error);
  }
};

export const RiderUpdate = async (req, res, next) => {
  try {
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
    const currentUser = req.user;

    if (!fullname || !email || !mobileno) {
      const error = new Error(
        "Full Name, Email, and Mobile Number are required"
      );
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
    currentUser.fullname = fullname;
    currentUser.email = email.toLowerCase();
    currentUser.mobileno = mobileno;
    currentUser.gender = gender || currentUser.gender;
    currentUser.dob = dob || currentUser.dob;
    currentUser.address = address || currentUser.address;
    currentUser.city = city;
    currentUser.pin = pin;

    // Update nested documents
    if (documents) {
      currentUser.documents = {
        gst: "N/A", // Not applicable for riders
        fssai: "N/A", // Not applicable for riders
        rc: documents.rc || currentUser.documents?.rc || "N/A",
        dl: documents.dl || currentUser.documents?.dl || "N/A",
        uidai: documents.uidai || currentUser.documents?.uidai || "N/A",
        pan: documents.pan || currentUser.documents?.pan || "N/A",
      };
    }

    // Update payment details
    if (paymentDetails) {
      currentUser.paymentDetails = {
        upi: paymentDetails.upi || currentUser.paymentDetails?.upi || "N/A",
        account_number:
          paymentDetails.account_number ||
          currentUser.paymentDetails?.account_number ||
          "N/A",
        ifs_Code:
          paymentDetails.ifs_Code ||
          currentUser.paymentDetails?.ifs_Code ||
          "N/A",
      };
    }

    // Update geo location
    if (geoLocation) {
      currentUser.geoLocation = {
        lat: geoLocation.lat || currentUser.geoLocation?.lat || "N/A",
        lon: geoLocation.lon || currentUser.geoLocation?.lon || "N/A",
      };
    }

    console.log("OldData: ", req.user);
    await currentUser.save();
    console.log("NewData:", currentUser);

    res
      .status(200)
      .json({ message: "Rider Updated Successfully", data: currentUser });
  } catch (error) {
    next(error);
  }
};

export const RiderResetPassword = async (req, res, next) => {
  try {
    const { oldpassword, newpassword } = req.body;
    const currentUser = req.user;

    if (!oldpassword || !newpassword) {
      const error = new Error("All feilds required");
      error.statuscode = 400;
      return next(error);
    }

    const isVerified = await bcrypt.compare(oldpassword, currentUser.password);
    if (!isVerified) {
      const error = new Error("Old Password didn't match");
      error.statuscode = 401;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newpassword, salt);

    currentUser.password = hashPassword;

    await currentUser.save();

    res.status(200).json({ message: "Password Reset Successful" });
  } catch (error) {
    next(error);
  }
};
