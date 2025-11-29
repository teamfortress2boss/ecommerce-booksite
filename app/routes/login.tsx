import { supabase } from "~/utils/supabase";
import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const {
      data: { user },
      error: supabaseError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (supabaseError) {
      console.error("Login Error:", supabaseError.message);
      setError(
        supabaseError.message || "An unexpected error occurred during login."
      );
    } else if (user) {
      console.log("User logged in successfully:", user);
      navigate("/");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white text-gray-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-300 disabled:opacity-50 disabled:hover:bg-gray-900"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <NavLink
            to="/forgot-password"
            className="text-gray-700 hover:text-gray-900 hover:underline"
          >
            Forgot Password?
          </NavLink>
        </div>
        <div className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?
          <NavLink
            to="/signup"
            className="text-gray-700 hover:text-gray-900 hover:underline"
          >
            {" "}Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
}
