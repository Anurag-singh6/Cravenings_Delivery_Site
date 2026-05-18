import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import Editmodal from "./userModols/modals/Editmodal";
import { ImCamera } from "react-icons/im";
import UserImage from "../../assets/customer.jpg";
import api from "../../config/Api";
import toast from "react-hot-toast";
import Resetpassmodal from "./userModols/modals/Resetpassmodal";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [isEditModol, setEditModol] = useState(false);
  const [isResetModal, setResetModel] = useState(false);
  const [preview, setpreview] = useState("");

  const changephoto = async (photo) => {
    const form_data = new FormData();

    form_data.append("image", photo);

    try {
      const res = await api.patch("/user/changePhoto", form_data);

      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const newPhotoURL = URL.createObjectURL(file);
    console.log(newPhotoURL);
    setpreview(newPhotoURL);
    changephoto(file);
  };
  return (
    <>
      <div className="bg-(--color-primary)/10 rounded-lg shadow-md p-4 sm:p-6 md:p-8 h-full">
        <div className="flex flex-col lg:flex-row justify-between gap-6 border p-4 rounded-3xl items-center border-gray-300 bg-white">
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row gap-5 items-center w-full">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="border rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 overflow-hidden">
                <img
                  src={preview || user?.photo?.url || UserImage}
                  alt="profile-image"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-2 right-1 border bg-white p-2 rounded-full group flex gap-3 shadow">
                <label
                  htmlFor="imageUpload"
                  className="text-(--color-primary) cursor-pointer group-hover:text-(--color-secondary)"
                >
                  <ImCamera />
                </label>

                <input
                  type="file"
                  name="imageUpload"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>

            {/* User Details */}
            <div className="text-center sm:text-left break-words">
              <div className="text-xl sm:text-2xl md:text-3xl text-(--color-primary) font-bold">
                {user.fullname}
              </div>

              <div className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold break-all">
                {user.email}
              </div>

              <div className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold">
                {user.mobileno}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
            <button
              className="px-4 py-2 rounded bg-(--color-secondary) text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-(--color-primary) w-full sm:w-auto"
              onClick={() => setEditModol(true)}
            >
              Edit
            </button>

            <button
              className="px-4 py-2 rounded bg-(--color-secondary) text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-(--color-primary) w-full sm:w-auto"
              onClick={() => setResetModel(true)}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>

      {isEditModol && <Editmodal onclose={() => setEditModol(false)} />}
      {isResetModal && <Resetpassmodal onclose={() => setResetModel(false)} />}
    </>
  );
};

export default Profile;
