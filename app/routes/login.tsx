import type { Route } from "./+types/home";
import { useState, type FormEvent } from 'react';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    );
}