import React, { useEffect, useState } from "react";
import api from "../../config/Api";
import Loading from "../Loading";
import {
  FaShoppingCart,
  FaHourglassHalf,
  FaRupeeSign,
  FaTruck,
} from "react-icons/fa";

const Useroverview = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/placedorders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 1000 * 60); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  // compute statistics
  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (o) => o.status && o.status !== "completed" && o.status !== "cancelled"
  ).length;
  const totalSpent = orders.reduce(
    (sum, o) => sum + (o.orderValue?.total || 0),
    0
  );

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <FaShoppingCart className="text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Orders",
      value: activeOrders,
      icon: <FaHourglassHalf className="text-green-500" />,
      bgColor: "bg-green-100",
    },
    {
      title: "Total Spent",
      value: `₹${totalSpent}`,
      icon: <FaRupeeSign className="text-yellow-500" />,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Last Order Status",
      value: orders[0]?.status || "N/A",
      icon: <FaTruck className="text-orange-500" />,
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto space-y-6">
      {isLoading ? (
        <div className="w-full">
          <Loading />
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-4 rounded-lg text-2xl`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Orders
            </h2>
            {!orders || orders.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No recent orders to display
              </div>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Order #
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Total
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 3).map((order, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {order.orderNumber || order._id?.substring(0, 8)}
                        </td>
                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold">
                          ₹{order.orderValue.total || 0}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Useroverview;