import React, { useEffect, useState } from "react";
import api from "../../config/Api";
import Loading from "../Loading";

const Transaction = () => {
  const [isLoading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/placedorders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Error fetching transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const totalSpent = orders.reduce(
    (sum, o) => sum + (o.orderValue?.total || 0),
    0
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto">
      {isLoading ? (
        <div className="w-full">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Transaction Summary
            </h2>
            <p className="text-gray-700">
              Total Orders: <strong>{orders.length}</strong>
            </p>
            <p className="text-gray-700">
              Total Spent: <strong>₹{totalSpent}</strong>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Payment History
            </h2>
            {!orders || orders.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">No transactions available</p>
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
                        Amount
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {order.orderNumber || order._id?.substring(0, 8)}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold">
                          ₹{order.orderValue?.total || 0}
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

export default Transaction;