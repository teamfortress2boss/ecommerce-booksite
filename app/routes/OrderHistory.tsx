import React from "react";
import { Link } from "react-router-dom";

type StoredOrder = {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  orderTime: string;
  total: number;
  [key: string]: unknown; // allow extra fields
};

const OrderHistory: React.FC = () => {
  const history: StoredOrder[] = JSON.parse(
    window.localStorage.getItem("orderHistory") || "[]"
  );

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order History</h1>

      {history.length === 0 ? (
        <div className="text-gray-600">
          <p>You have no previous orders.</p>
          <Link
            to="/"
            className="text-blue-600 hover:underline mt-3 inline-block"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-700">
                <th className="py-2">Order ID</th>
                <th className="py-2">Order #</th>
                <th className="py-2">Date</th>
                <th className="py-2">Total</th>
                <th className="py-2 text-right">View</th>
              </tr>
            </thead>

            <tbody>
              {history.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-mono">{order.orderId}</td>
                  <td className="py-2 font-mono">{order.orderNumber}</td>
                  <td className="py-2">
                    {order.orderDate} — {order.orderTime}
                  </td>
                  <td className="py-2 font-semibold">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-2 text-right">
                    <Link
                      to="/order-confirmation"
                      state={order}
                      className="text-blue-600 hover:underline"
                    >
                      View Receipt
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
