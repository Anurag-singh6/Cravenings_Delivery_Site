import React from "react";

const Resturantorders = () => {
  return (
    <>
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6 h-full overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Orders</h2>
          <div className="text-center text-gray-500 py-8 sm:py-10 md:py-12">
            <p className="text-sm sm:text-base md:text-lg">Orders will be displayed and managed here</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resturantorders;
