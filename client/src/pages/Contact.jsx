import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import Loading from "../components/Loading";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobileno: "",
    message: "",
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
      message: "",
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
      const res = await api.post("/public/contact", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">We speedly contact you...!</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <form
              onSubmit={handleSubmit}
              onReset={handleClearForm}
              className="p-4 sm:p-6 md:p-8"
            >
              {/* Personal Information */}
              <div className="mb-6 sm:mb-8 md:mb-10">
                <div className="space-y-3 sm:space-y-4">
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
                      className="w-full h-fit px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
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
                    className="w-full h-fit px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
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
                    className="w-full h-fit px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                  <textarea
                    name="message"
                    id=""
                    cols="30"
                    rows="8 sm:rows-10"
                    onChange={handleChange}
                    required
                    value={formData.message}
                    placeholder="Write a message"
                    disabled={isLoading}
                    className="w-full h-fit px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 border-t-2 border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition duration-300 transform hover:scale-105 shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200"
                >
                  {isLoading ? "Submitting" : "Submit"}
                </button>
                <button
                  type="reset"
                  disabled={isLoading}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-gray-400 transition duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-200"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-600 mt-6 sm:mt-8 text-xs sm:text-sm">
            All fields marked are mandatory. We respect your privacy
          </p>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12">
          <iframe
            src={
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7332.93931664844!2d77.39792768471686!3d23.225990496381705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c42ea9cec95d1%3A0xde148b7ff762e1cd!2sSagar%20Gaire%20%2C%20Platinum%20Plaza!5e0!3m2!1sen!2sin!4v1773243896722!5m2!1sen!2sin"
            }
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px]"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
