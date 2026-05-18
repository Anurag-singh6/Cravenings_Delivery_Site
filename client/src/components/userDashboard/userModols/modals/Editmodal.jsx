import React from "react";
import { useState } from "react";
import { useAuth } from "../../../../context/Authcontext";
import api from "../../../../config/Api";

const Editmodal = ({ onclose }) => {
  const { user, setUser, setLogin } = useAuth();
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    mobileno: user?.mobileno || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    address: user?.address || "",
    city: user?.city || "",
    pin: user?.pin || "",
    documents: {
      uidai: user?.documents?.uidai || "",
      pan: user?.documents?.pan || "",
    },
    paymentDetails: {
      upi: user?.paymentDetails?.upi || "",
      account_number: user?.paymentDetails?.account_number || "",
      ifs_Code: user?.paymentDetails?.ifs_Code || "",
    },
    geoLocation: {
      lat: user?.geoLocation?.lat || "",
      lon: user?.geoLocation?.lon || "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validateError, setValidationError] = useState({});
  const [message, setmessage] = useState({ type: "", text: "" });

  const validate = () => {
    let Error = {};

    if (!formData.fullname.trim()) {
      Error.fullname = "Full Name is Required.";
    }
    if (!formData.email.trim()) {
      Error.email = "Email is Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Error.email = "Please enter a valid email.";
    }

    if (!formData.mobileno.trim()) {
      Error.mobileno = "Mobile Number is Required.";
    } else if (!/^\d{10}$/.test(formData.mobileno.replace(/\D/g, ""))) {
      Error.mobileno = "Mobile Number must be 10 digit.";
    }

    if (!formData.city.trim()) {
      Error.city = "City is Required.";
    }

    if (!formData.pin.trim()) {
      Error.pin = "Pin code is Required.";
    } else if (!/^\d{6}$/.test(formData.pin)) {
      Error.pin = "Pin code must be 6 digits";
    }

    if (
      formData.documents.pan &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.documents.pan)
    ) {
      Error.pan = "Invaild PAN format.";
    }

    if (
      formData.paymentDetails.upi &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(formData.paymentDetails.upi)
    ) {
      Error.upi = "Invalid upi format";
    }

    setValidationError(Error);

    return Object.keys(Error).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    //clear error for this field when starts typing
    if (validateError[name]) {
      setFormData({ ...validateError, [name]: "" });
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [field]: value,
      },
    });
    //clear error for this field
    if (validateError[field]) {
      setValidationError({ ...validateError, [field]: "" });
    }
  };

  const fetchLocation = (e) => {
    e.preventDefault(); //stop submit
    console.log("fetch Location");
    navigator.geolocation.getCurrentPosition((result) => {
      console.log(
        "Location: ",
        result.coords.latitude,
        result.coords.longitude
      );
      setFormData({
        ...formData,
        geoLocation: {
          ...formData["geoLocation"],
          lat: result.coords.latitude,
          lon: result.coords.longitude,
        },
      });
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    console.log(formData);
    setIsLoading(true);

    if (!validate()) {
      setmessage({ type: "error", text: "Please fix the validateError above" });
      return;
    }

    setIsLoading(true);
    setmessage({ type: "", text: "" });

    try {
      const res = await api.put("/user/update", formData);
      if (res.data?.data) {
        sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
        setUser(res.data.data);
        setLogin(true);
        setmessage({ type: "success", text: "Profile updated succesfully!" });
        setTimeout(() => onclose(), 1500);
      }
    } catch (error) {
      console.log(error);
      setmessage({
        type: "error",
        text: error.response?.data?.message || "Fail to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-100">
        <div className="bg-white w-full max-w-full sm:max-w-3xl md:max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between gap-3 px-4 py-4 sm:px-6 border-b border-gray-300 items-start sm:items-center sticky top-0 bg-white">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Edit Profile
            </h1>
            <button
              onClick={() => onclose()}
              className="text-gray-600 hover:text-red-900 text-2xl transition"
              aria-label="Close edit profile modal"
            >
              ⊗
            </button>
          </div>
          {message.text && (
            <div
              className={`mx-6 mt-4 p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validateError.fullname
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {validateError.fullname && (
                    <p className="text-xs text-red-600 mt-1">
                      {validateError.fullname}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    disabled
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Email cannot be changed
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileno"
                    placeholder="Mobile Number"
                    value={formData.mobileno}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validateError.mobileno
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {validateError.mobileno && (
                    <p className="text-xs text-red-600 mt-1">
                      {validateError.mobileno}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/*address */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Address
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        validateError.city
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter City"
                    />
                    {validateError.city && (
                      <p className="text-red-600 text-xs mt-1">
                        {validateError.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pin"
                      value={formData.pin}
                      onChange={handleInputChange}
                      className={`w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        validateError.pin ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="6-digit pin"
                      maxLength="6"
                    />
                    {validateError.pin && (
                      <p className="text-red-600 text-xs mt-1">
                        {validateError.pin}
                      </p>
                    )}
                  </div>
                  <div className="flex items-end">
                    <div className="flex flex-col sm:flex-row items-center w-full gap-3">
                      <button
                        className="w-full sm:w-auto border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm font-medium hover:bg-gray-50 transition"
                        onClick={fetchLocation}
                      >
                        Get Live Location
                      </button>
                      <span className="text-sm text-gray-600">
                        {formData.geoLocation.lat !== "N/A" &&
                        formData.geoLocation.lon !== "N/A"
                          ? "Location captured"
                          : "Location not captured"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Documents */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadharr (UIDAI)
                  </label>
                  <input
                    type="text"
                    value={formData.documents.uidai}
                    onChange={(e) =>
                      handleNestedChange("documents", "uidai", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="12-digit UIDAI number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN
                  </label>
                  <input
                    type="text"
                    value={formData.documents.pan}
                    onChange={(e) =>
                      handleNestedChange("documents", "pan", e.target.value)
                    }
                    className={`w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validateError.pan ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="PAN number"
                    maxLength="10"
                  />
                  {validateError.pan && (
                    <p className="text-red-600 text-xs mt-1">
                      {validateError.pan}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Payement details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={formData.paymentDetails.upi}
                    onChange={(e) =>
                      handleNestedChange(
                        "paymentDetails",
                        "upi",
                        e.target.value
                      )
                    }
                    className={`w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validateError.upi ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="username@bank"
                  />
                  {validateError.upi && (
                    <p className="text-red-600 text-xs mt-1">
                      {validateError.upi}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.paymentDetails.account_number}
                    onChange={(e) =>
                      handleNestedChange(
                        "paymentDetails",
                        "account_number",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bank account number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IFS Code
                  </label>
                  <input
                    type="text"
                    value={formData.paymentDetails.ifs_Code}
                    onChange={(e) =>
                      handleNestedChange(
                        "paymentDetails",
                        "ifs_Code",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="IFS code"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-300">
              <button
                type="button"
                onClick={() => onclose()}
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">⟳</span> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Editmodal;
