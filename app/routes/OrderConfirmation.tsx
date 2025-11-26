import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { CartItem } from "../components/Context/CartContext";

type OrderState = {
  items: CartItem[];
  total: number;
  orderId: string;
  orderNumber: string;
  orderDate: string;
  orderTime: string;
  customer?: {
    fullName: string;
    email: string;
    address: string;
  };
};

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const order = location.state as OrderState | null;

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          No recent order found
        </h1>
        <p className="text-gray-600 mb-4">
          It looks like you got here by accident. You can browse books and place
          an order from the bookstore.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const { items, total, orderId, orderNumber, orderDate, orderTime } = order;

  const taxRate = 0.07;
  const tax = +(total * taxRate).toFixed(2);
  const subtotal = +(total - tax).toFixed(2);

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <div className="text-center border-b border-dashed pb-4 mb-4">
        <h1 className="text-2xl font-bold tracking-wide text-gray-800">
          Mustang Bookstore
        </h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
          Order Receipt
        </p>
      </div>

      <div className="text-sm text-gray-700 mb-4 space-y-1">
        <p>
          <span className="font-medium">Order ID:</span>{" "}
          <span className="font-mono">{orderId}</span>
        </p>
        <p>
          <span className="font-medium">Order Number:</span>{" "}
          <span className="font-mono">{orderNumber}</span>
        </p>
        <p>
          <span className="font-medium">Date:</span>{" "}
          <span className="font-mono">{orderDate}</span>
        </p>
        <p>
          <span className="font-medium">Time:</span>{" "}
          <span className="font-mono">{orderTime}</span>
        </p>
      </div>

      <div className="border-y border-dashed py-3 mb-4">
        <p className="text-sm text-gray-700">
          Thank you for your purchase! Your order has been received and will be
          processed by the Campus Bookstore.
        </p>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-2 tracking-wide uppercase">
        Items
      </h2>
      <div className="text-sm mb-4">
        <div className="flex justify-between border-b border-gray-200 pb-1 mb-1 font-medium">
          <span className="w-1/2">Title</span>
          <span className="w-1/6 text-center">Qty</span>
          <span className="w-1/6 text-right">Each</span>
          <span className="w-1/6 text-right">Total</span>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between py-1 border-b border-gray-100"
          >
            <span className="w-1/2 pr-2 truncate" title={item.title}>
              {item.title}
            </span>
            <span className="w-1/6 text-center">{item.quantity}</span>
            <span className="w-1/6 text-right">
              ${item.price.toFixed(2)}
            </span>
            <span className="w-1/6 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="text-sm space-y-1 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-mono">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">
            Tax ({(taxRate * 100).toFixed(0)}%)
          </span>
          <span className="font-mono">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-300 pt-2 mt-1">
          <span className="font-semibold">Total Paid</span>
          <span className="font-mono font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-600 mt-2 pt-2 border-t border-dashed">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          &larr; Back to Home
        </Link>
        <span>Keep this receipt for your records.</span>
      </div>
    </div>
  );
};

export default OrderConfirmation;
