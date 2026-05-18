import React from "react";

const RiderTransaction = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Rider Transactions
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-7">
          Your transaction activity and payment history will appear here in a responsive view.
        </p>
      </div>
    </div>
  );
};

export default RiderTransaction