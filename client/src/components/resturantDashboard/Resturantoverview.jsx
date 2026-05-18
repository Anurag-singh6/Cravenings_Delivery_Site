import React from "react";
import { FaShoppingCart, FaUsers, FaRupeeSign, FaStar } from "react-icons/fa";

const Resturantoverview = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "0",
      icon: <FaShoppingCart className="text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Orders",
      value: "0",
      icon: <FaUsers className="text-green-500" />,
      bgColor: "bg-green-100",
    },
    {
      title: "Total Earnings",
      value: "₹0",
      icon: <FaRupeeSign className="text-yellow-500" />,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Rating",
      value: "4.5",
      icon: <FaStar className="text-orange-500" />,
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <>
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6 h-full overflow-y-auto space-y-4 sm:space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <div className="min-w-0">
                  <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">
                    {stat.title}
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-2 sm:p-3 md:p-4 rounded-lg text-lg sm:text-xl md:text-2xl flex-shrink-0`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
            Recent Orders
          </h2>
          <div className="text-center text-gray-500 py-6 sm:py-8">
            No recent orders to display
          </div>
        </div>

        {/* Performance Chart Section */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
            Weekly Performance
          </h2>
          <div className="text-center text-gray-500 py-6 sm:py-8">
            Performance chart will be displayed here
          </div>
        </div>
      </div>
    </>
  );
};

export default Resturantoverview;
