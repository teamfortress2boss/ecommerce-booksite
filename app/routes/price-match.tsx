import type { Route } from "./+types/home";
import { useState, type FormEvent } from "react";

export default function PriceMatch() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [competitorPrice, setCompetitorPrice] = useState("");
  const [competitorLink, setCompetitorLink] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl text-white">
        <h2 className="text-4xl font-bold text-center mb-6">
          Price Match Guarantee
        </h2>

        <p className="text-gray-300 text-center mb-8">
          Found a better price elsewhere? Let us know and we’ll match it! Fill
          out the form below and our team will review your request within 24
          hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Book Title"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Competitor Price (e.g. $12.99)"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={competitorPrice}
            onChange={(e) => setCompetitorPrice(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Link to Competitor Listing"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={competitorLink}
            onChange={(e) => setCompetitorLink(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Price Match Request
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Questions? Email us at{" "}
          <span className="text-blue-400">support@campusbookstore.com</span>
        </div>
      </div>
    </div>
  );
}
