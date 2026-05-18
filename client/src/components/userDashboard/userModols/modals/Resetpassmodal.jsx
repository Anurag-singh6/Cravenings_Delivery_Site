import React, { useState } from "react";
import api from "../../../../config/Api";
import toast from "react-hot-toast";

const Resetpassmodal = ({ onclose }) => {
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
      const res = await api.patch("/user/resetpassword", formData);
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
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-100">
        <div className="bg-white w-full max-w-full sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between gap-3 px-4 py-4 sm:px-6 border-b border-gray-300 items-start sm:items-center sticky top-0 bg-white">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Reset Password
            </h1>
            <button
              onClick={() => onclose()}
              className="text-gray-600 hover:text-red-900 text-2xl transition"
              aria-label="Close reset password modal"
            >
              ⊗
            </button>
          </div>

          {/* old password and new password */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            {/* personal information */}
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Old Password *
                  </label>
                  <input
                    type="password"
                    name="oldpassword"
                    value={formData.oldpassword}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password *
                  </label>
                  <input
                    type="password"
                    name="newpassword"
                    value={formData.newpassword}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    name="confirmpass"
                    value={formData.confirmpass}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
            {/*form action */}
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

export default Resetpassmodal;
