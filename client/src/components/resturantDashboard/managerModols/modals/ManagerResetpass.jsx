import React, { useState } from "react";
import api from "../../../../config/Api";
import toast from "react-hot-toast";

const ManagerResetpass = ({ onclose }) => {
  const [formData, setformData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpass: "",
  });
  const [validateError, setValidationError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    //validation

    try {
      const res = await api.patch("/restaurant/resetPassword", formData);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[95vh] overflow-y-auto rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex justify-between px-4 sm:px-6 py-4 border-b border-gray-300 items-center sticky top-0 bg-white z-10">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Reset Password
            </h1>

            <button
              onClick={() => onclose()}
              className="text-gray-600 hover:text-red-900 text-xl sm:text-2xl transition"
            >
              ⊗
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            <div>
              <div className="space-y-4">
                {/* Old Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Old Password *
                  </label>

                  <input
                    type="password"
                    name="oldpassword"
                    value={formData.oldpassword}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validateError.oldpassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {validateError.oldpassword && (
                    <p className="text-xs text-red-600 mt-1">
                      {validateError.oldpassword}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password *
                  </label>

                  <input
                    type="password"
                    name="newpassword"
                    value={formData.newpassword}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validateError.newpassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {validateError.newpassword && (
                    <p className="text-xs text-red-600 mt-1">
                      {validateError.newpassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password *
                  </label>

                  <input
                    type="password"
                    name="confirmpass"
                    value={formData.confirmpass}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validateError.confirmpass
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {validateError.confirmpass && (
                    <p className="text-xs text-red-600 mt-1">
                      {validateError.confirmpass}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-300">
              <button
                type="button"
                onClick={() => onclose()}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
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

export default ManagerResetpass;
