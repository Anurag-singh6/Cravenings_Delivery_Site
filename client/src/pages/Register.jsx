import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { Link } from "react-router-dom";


const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobileno: "",
    password: "",
    confirmpassword: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullname: "",
      email: "",
      mobileno: "",
      password: "",
      confirmpassword: "",
      role: "",
    });
  };

  const validate = () => {
    let Error = {};

    if (formData.fullname.length < 3) {
      Error.fullname = "Name should be More than 3 characters";
    } else {
      if (!/^[A-Za-z ]+$/.test(formData.fullname)) {
        Error.fullname = "Only Contain A-Z, a-z and space";
      }
    }

    if (
      !/^[\w\.]+@(gmail|outlook|yahoo)\.(com|in|co.in)$/.test(formData.email)
    ) {
      Error.email = "Use Proper Email Format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileno)) {
      Error.mobileno = "Only Indian Mobile Number allowed";
    }
    if (!formData.role) {
      Error.role = "Role is required";
    }

    setValidationError(Error);

    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Fill the Form Correctly");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indiago-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto sm:max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 px-2 sm:px-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Registration
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              You are 1 step away to stop your Cravings
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <form
              onSubmit={handleSubmit}
              onReset={handleClearForm}
              className="p-6 sm:p-8"
            >
              {/* Personal Information */}
              <div className="mb-10">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      I am
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="role"
                          id="manager"
                          checked={formData.role === "manager"}
                          value={"manager"}
                          onChange={handleChange}
                          className="h-4 w-4"
                        />
                        Resturant Manager
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="role"
                          id="partner"
                          checked={formData.role === "partner"}
                          value={"partner"}
                          onChange={handleChange}
                          className="h-4 w-4"
                        />
                        Delivery Partner
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="role"
                          id="customer"
                          checked={formData.role === "customer"}
                          value={"customer"}
                          onChange={handleChange}
                          className="h-4 w-4"
                        />
                        Customer
                      </label>
                    </div>
                    {validationError.role && (
                      <span className="text-xs text-red-500">
                        {validationError.role}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="fullname"
                      id=""
                      placeholder="Full Name"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                    />
                    {validationError.fullname && (
                      <span className="text-xs text-red-500">
                        {validationError.fullname}
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    name="email"
                    id=""
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                  {validationError.email && (
                    <span className="text-xs text-red-500">
                      {validationError.email}
                    </span>
                  )}
                  <input
                    type="tel"
                    name="mobileno"
                    id=""
                    placeholder="Mobile Number"
                    maxLength="10"
                    value={formData.mobileno}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                  {validationError.mobileno && (
                    <span className="text-xs text-red-500">
                      {validationError.mobileno}
                    </span>
                  )}
                  <input
                    type="password"
                    name="password"
                    id=""
                    value={formData.password}
                    placeholder="Create Password"
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                  <input
                    type="password"
                    name="confirmpassword"
                    id=""
                    value={formData.confirmpassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-8 border-t-2 border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition duration-300 transform hover:scale-105 shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200"
                >
                  {isLoading ? "Submitting" : "Submit"}
                </button>
                <button
                  type="reset"
                  disabled={isLoading}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-lg hover:bg-gray-400 transition duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-200"
                >
                  Clear Form
                </button>
              </div>
              <p className="mt-10 text-center text-sm/6 text-red-400 font-bold">
                Already a member?
                <Link
                  to={"/login"}
                  className="font-semibold text-indigo-600 hover:text-indigo-300"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-600 mt-8 text-sm">
            All fields marked are mandatory. We respect your privacy
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
