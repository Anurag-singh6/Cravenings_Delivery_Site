import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import Managereditmodal from "./../resturantDashboard/managerModols/modals/Managereditmodal";
import { ImCamera } from "react-icons/im";
import { FaMapLocationDot, FaWallet } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { BiSolidBank } from "react-icons/bi";
import UserImage from "../../assets/customer.jpg";
import api from "../../config/Api";
import toast from "react-hot-toast";
import ManagerResetpass from "./../resturantDashboard/managerModols/modals/ManagerResetpass";

const Managerprofile = () => {
  const { user, setUser } = useAuth();

  const [isEditModol, setEditModol] = useState(false);
  const [isResetModal, setResetModel] = useState(false);
  const [preview, setpreview] = useState("");

  const changephoto = async (photo) => {
    const form_data = new FormData();

    form_data.append("image", photo);

    try {
      const res = await api.patch("/restaurant/changePhoto", form_data);

      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotourl = URL.createObjectURL(file);
      setpreview(newPhotourl);
      setTimeout(() => {
        changephoto(file);
      }, 1000);
    }
  };
  const renderField = (label, value) => (
    <div className="flex flex-col sm:flex-row sm:justify-between py-2 px-2 sm:px-3 border-b border-gray-200 last:border-b-0 text-xs sm:text-sm gap-2 sm:gap-0">
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className="text-gray-900 font-semibold break-all">
        {value && value !== "N/A" ? (
          value
        ) : (
          <span className="text-gray-400">Not provided</span>
        )}
      </span>
    </div>
  );
  return (
    <>
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6 h-full overflow-y-auto space-y-3 sm:space-y-4 md:space-y-6">
        {/* Header Section with Photo and Basic Info */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Photo Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="border-4 border-gray-300 rounded-full w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 overflow-hidden bg-gray-100">
                  <img
                    src={preview || user?.photo?.url || UserImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-2 right-2 bg-(--color-secondary) text-white p-2 sm:p-3 rounded-full hover:bg-(--color-secondary-hover) cursor-pointer transition transform hover:scale-110"
                >
                  <ImCamera size={14} className="sm:block hidden" />
                  <ImCamera size={12} className="sm:hidden" />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 text-center">
                Click camera to change photo
              </p>
            </div>

            {/* Basic Info Section */}
            <div className="flex justify-between w-full">
              <div className="w-full">
                <div className="mb-4 sm:mb-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-(--color-primary) mb-2">
                    {user?.fullname || "Manager Name"}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-(--color-secondary) text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold capitalize">
                      {user?.role || "manager"}
                    </span>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        user?.isActive === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user?.isActive || "active"}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-gray-600 font-medium">Email:</span>
                    <span className="text-gray-900 break-all">
                      {user?.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-gray-600 font-medium">Phone:</span>
                    <span className="text-gray-900">
                      {user?.mobileno || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => setEditModol(true)}
                    className="px-4 sm:px-6 py-2 bg-(--color-secondary) text-white rounded-lg hover:bg-(--color-secondary-hover) transition font-semibold text-sm sm:text-base"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setResetModel(true)}
                    className="px-4 sm:px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold text-sm sm:text-base"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-(--color-secondary) rounded"></span>
            Personal Information
          </h2>
          <div className="space-y-1">
            {renderField("Date of Birth", user?.dob)}
            {renderField("Gender", user?.gender)}
            {renderField("Address", user?.address)}
            {renderField("City", user?.city)}
            {renderField("PIN Code", user?.pin)}
          </div>
        </div>

        {/* Location Section */}
        {(user?.geoLocation?.lat !== "N/A" ||
          user?.geoLocation?.lon !== "N/A") && (
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <FaMapLocationDot className="text-(--color-secondary)" />
              Geo Location
            </h2>
            <div className="space-y-1">
              {renderField("Latitude", user?.geoLocation?.lat)}
              {renderField("Longitude", user?.geoLocation?.lon)}
            </div>
          </div>
        )}

        {/* Payment Details - UPI Section */}
        {user?.paymentDetails?.upi !== "N/A" && (
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <FaWallet className="text-(--color-secondary)" />
              Payment Details
            </h2>
            <div className="space-y-1">
              {renderField("UPI ID", user?.paymentDetails?.upi)}
            </div>
          </div>
        )}

        {/* Bank Account Details Section */}
        {(user?.paymentDetails?.account_number !== "N/A" ||
          user?.paymentDetails?.ifs_Code !== "N/A") && (
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <BiSolidBank className="text-(--color-secondary)" />
              Bank Account Details
            </h2>
            <div className="space-y-1">
              {renderField(
                "Account Number",
                user?.paymentDetails?.account_number
              )}
              {renderField("IFSC Code", user?.paymentDetails?.ifs_Code)}
            </div>
          </div>
        )}

        {/* Restaurant Information Section */}
        {(user?.restaurantName !== "N/A" || user?.cuisine !== "N/A") && (
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              Restaurant Information
            </h2>
            <div className="space-y-1">
              {renderField("Restaurant Name", user?.restaurantName)}
              {renderField("Cuisine Type", user?.cuisine)}
            </div>
          </div>
        )}

        {/* Business Documents Section */}
        {Object.values(user?.documents || {}).some((doc) => doc !== "N/A") && (
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <FaFileAlt className="text-(--color-secondary)" />
              Business Documents
            </h2>
            <div className="space-y-1">
              {renderField("GST Certificate", user?.documents?.gst)}
              {renderField("FSSAI License", user?.documents?.fssai)}
              {renderField("RC (Registration)", user?.documents?.rc)}
              {renderField("Driving License", user?.documents?.dl)}
              {renderField("UIDAI", user?.documents?.uidai)}
              {renderField("PAN", user?.documents?.pan)}
            </div>
          </div>
        )}

        {/* Account Metadata */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3">
            Account Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-600">
            <div>
              <span className="font-medium text-xs sm:text-sm">Account ID:</span>
              <p className="text-gray-500 font-mono text-xs break-all">
                {user?._id}
              </p>
            </div>
            <div>
              <span className="font-medium text-xs sm:text-sm">Member Since:</span>
              <p className="text-gray-900 text-xs sm:text-sm">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-IN")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isEditModol && <Managereditmodal onclose={() => setEditModol(false)} />}
      {isResetModal && (
        <ManagerResetpass onclose={() => setResetModel(false)} />
      )}
    </>
  );
};

export default Managerprofile;
