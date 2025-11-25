import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const Checkout: React.FC = () => {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;

    const now = new Date();
    const orderId =
      "CB-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderNumber = String(
      Math.floor(100000 + Math.random() * 900000)
    );

    const orderDetails = {
      items: cartItems,
      total,
      orderId,
      orderNumber,
      orderDate: now.toLocaleDateString(),
      orderTime: now.toLocaleTimeString(),
      customer: {
        fullName,
        email,
        address,
      },
    };

    const existingHistory = JSON.parse(
      window.localStorage.getItem("orderHistory") || "[]"
    ) as typeof orderDetails[];
    existingHistory.push(orderDetails);
    window.localStorage.setItem("orderHistory", JSON.stringify(existingHistory));

    clearCart();

    navigate("/order-confirmation", { state: orderDetails });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="address">
            Shipping Address
          </label>
          <textarea
            id="address"
            name="address"
            required
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Complete Purchase
        </button>
      </form>
    </div>
  );
};

export default Checkout;
