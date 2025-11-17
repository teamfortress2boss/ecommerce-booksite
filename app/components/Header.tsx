// src/components/Header.js
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { supabase } from "~/utils/supabase";
import { useNavigate } from "react-router";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user);
    });
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center border-b border-gray-200">
        <img
          src="/mustang.png"
          alt="Mustang Bookstore Logo"
          className="h-10 w-10 mr-2"
        />
        <h1 className="text-xl font-bold text-gray-800">Mustang Bookstore</h1>
        {isAuthenticated ? (
          <div className="flex space-x-4">
            <NavLink
              to="/account"
              className="text-white hover:text-blue-600 bg-black rounded px-2 py-1"
            >
              Account
            </NavLink>
            <button
              onClick={() => {
                supabase.auth.signOut();
                navigate("/login");
              }}
              className="text-white hover:text-blue-600 bg-black rounded px-2 py-1"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <NavLink
              to="/login"
              className="text-white hover:text-blue-600 bg-black rounded px-2 py-1"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="text-black hover:text-blue-600 rounded px-2 py-1"
            >
              Sign up
            </NavLink>
          </div>
        )}
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
          Contact Us
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
