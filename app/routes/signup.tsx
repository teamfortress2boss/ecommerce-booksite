import { supabase } from "~/utils/supabase";
import { useNavigate } from "react-router";
import { useState, type FormEvent } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSignUp(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (supabaseError) {
      console.error("Sign Up Error:", supabaseError.message);
      setError(
        supabaseError.message || "An unexpected error occurred during sign up."
      );
    } else {
      setMessage(
        "Success! Please check your email to confirm your account and log in."
      );
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-600 text-white p-3 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
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
            minLength={6}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white text-gray-900"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-300 disabled:opacity-50 disabled:hover:bg-gray-900"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-gray-700 hover:text-gray-900 hover:underline cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}
