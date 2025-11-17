import type { FormEvent } from "react";
import { useState } from "react";
import type { Route } from "./+types/home";
import { supabase } from "~/utils/supabase";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setSuccessMessage("");

    const { error } = await supabase.functions.invoke("resend-email", {
      method: "POST",
      body: {
        to: email,
        subject: `Contacting from E-Commerce Website (${name})`,
        html: message,
      },
    });

    if (error) {
      console.error(error.message);
      setSuccessMessage("Something went wrong. Please try again later.");
      return;
    }

    setName("");
    setEmail("");
    setMessage("");

    setSuccessMessage("Message sent successfully!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-400">
      <div className="bg-yellow-900 p-8 rounded-lg shadow-lg w-full max-w-2xl text-white">
        <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>

        <p className="text-gray-300 text-center mb-8">
          We'd love to hear from you! Whether you have a question, feedback, or
          just want to say hello, drop us a message below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-600 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-600 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 border border-gray-600 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>

        {successMessage && (
          <p className="mt-4 text-center text-green-400 animate-fade-in">
            {successMessage}
          </p>
        )}

        <div className="mt-6 text-center text-sm text-white">
          Prefer email? Reach us at{" "}
          <span className="text-blue-400">support@mustangbookstore.com</span>
        </div>
      </div>
    </div>
  );
}
