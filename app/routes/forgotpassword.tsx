import { supabase } from "~/utils/supabase";
import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { data: user, error: supabaseError } =
      await supabase.auth.resetPasswordForEmail(email);

    setLoading(false);

    if (supabaseError) {
      console.error("Error:", supabaseError.message);
      setError(
        supabaseError.message ||
          "An unexpected error occurred when sending reset link."
      );
    } else if (user) {
      setSuccess("If your account exists, an email with a reset link has been sent.");
    } else {
      setError("Failed to send reset email. Please try again.");
    }

    setEmail("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Reset Your Password
        </h2>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600 text-white p-3 rounded-lg mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-300 disabled:opacity-50 disabled:hover:bg-gray-900"
            disabled={loading}
          >
            {loading ? "Sending email..." : "Send reset email"}
          </button>
        </form>
      </div>
    </div>
  );
}
