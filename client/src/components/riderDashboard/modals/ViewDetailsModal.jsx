import React from "react";
import api from "../../../config/Api";
import toast from "react-hot-toast";

const ViewDetailsModal = ({ order, onClose }) => {
  const handleAcceptOrder = async () => {
    try {
      const res = await api.patch(`/rider/acceptorder/${order._id}`);
      toast.success(res.data.message);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-full sm:max-w-xl md:max-w-2xl shadow-lg overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Order Details</h2>
        <div className="space-y-3 text-sm sm:text-base text-gray-700">
          <p>
            <span className="font-semibold">Order Number:</span>{" "}
            {order?.orderNumber || order?._id?.substring(0, 8)}
          </p>
          <p>
            <span className="font-semibold">Customer:</span>{" "}
            {order?.userId?.fullname || "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Restaurant:</span>{" "}
            {order?.restaurantId?.restaurantName ||
              order?.restaurantId?.fullname ||
              "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Total Amount:</span>{" "}
            ₹{order?.orderValue?.total || 0}
          </p>
          <p>
            <span className="font-semibold">Restaurant Distance:</span>{" "}
            {order?.distanceFromRider || 0} KM
          </p>
          <p>
            <span className="font-semibold">Order Status:</span>{" "}
            {order?.status || "Unknown"}
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            Close
          </button>
          <button
            onClick={handleAcceptOrder}
            className="w-full bg-(--color-secondary-hover) text-white px-4 py-2 rounded-md transition"
          >
            Accept Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
