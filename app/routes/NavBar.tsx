import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const Navbar: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-bold">
        Mustang Bookstore
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        <Link to="/orders" className="hover:underline">
          Order History
        </Link>

        <Link to="/cart" className="hover:underline flex items-center gap-1">
          Cart
          <span className="bg-white text-blue-600 rounded-full px-2 text-sm font-semibold">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
