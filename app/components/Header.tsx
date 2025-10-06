// src/components/Header.js
import React from "react";
import { Link, NavLink } from "react-router";

/*function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Campus Bookstore</h1>
        <div className="flex space-x-4">
          <Link to="/account" className="text-blue-600 hover:text-blue-800">
            Account
          </Link>
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </div>
      </div>
      <nav className="container mx-auto px-4 py-2 flex space-x-6 text-gray-700 font-semibold">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/shop" className="hover:text-blue-600">
          Shop
        </Link>
        <Link to="/price-match" className="hover:text-blue-600">
          Price Match
        </Link>
        <Link to="/about" className="hover:text-blue-600">
          About
        </Link>
        <Link to="/contact" className="hover:text-blue-600">
          Contact
        </Link>
      </nav>
    </header>
  );
}*/

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Campus Bookstore</h1>
        <div className="flex space-x-4">
          <NavLink to="/account" className="text-blue-600 hover:text-blue-800">
            Account
          </NavLink>
          <NavLink to="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </NavLink>
        </div>
      </div>
      <nav className="container mx-auto px-4 py-2 flex space-x-6 text-gray-700 font-semibold">
        <NavLink to="/" className="hover:text-blue-600">
          Home
        </NavLink>
        <NavLink to="/shop" className="hover:text-blue-600">
          Shop
        </NavLink>
        <NavLink to="/price-match" className="hover:text-blue-600">
          Price Match
        </NavLink>
        <NavLink to="/about" className="hover:text-blue-600">
          About
        </NavLink>
        <NavLink to="/contact" className="hover:text-blue-600">
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
