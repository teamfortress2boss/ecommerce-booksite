import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/Context/CartContext";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } =
    useCart();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleConfirmClear = () => {
    clearCart();
    setShowClearModal(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
        <p className="text-gray-600">
          Your cart is empty.{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Continue shopping
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white shadow-sm p-4 rounded-lg"
          >
            <div>
              <h2 className="font-semibold text-lg text-black">{item.title}</h2>
              <p className="text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="w-16 border rounded px-2 py-1 text-center"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 border-t pt-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
          <button
            type="button"
            onClick={() => setShowClearModal(true)}
            className="text-sm text-red-600 hover:text-red-800 underline w-fit"
          >
            Clear cart
          </button>
        </div>

        <Link
          to="/checkout"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>

      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-2">Clear cart?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to remove all items from your cart? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClear}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, clear it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
