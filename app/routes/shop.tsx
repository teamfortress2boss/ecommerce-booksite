import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";
const supabaseUrl = "https://mbptntdjgaaxbkutvkst.supabase.co";
const supabasekey = "sb_publishable_bl0foT0cUlXywsYFTu3CPQ_usJlIQx-";
const supabase = createClient(supabaseUrl, supabasekey);

import BookCard from "../components/BookCard";
import type { Book } from "~/utils/types";

export default function Shop() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookResults, setBookResults] = useState<Book[]>([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [search, setSearch] = useState("");

  async function fetchBooksByTitle() {
    setLoading(true);
    let { data: books, error } = await supabase
      .from("products")
      .select("id, imageUrl, title, author, price")
      .ilike("title", `%${search as string}%`);
    if (error) {
      console.log("Supabase Fetch Error:", error);
      setBookResults([]);
    } else {
      setBookResults(books as Book[]);
    }
    setLoading(false);
  }

  async function fetchBooksByAuthor() {
    setLoading(true);
    let { data: books, error } = await supabase
      .from("products")
      .select("id, imageUrl, title, author, price, summary")
      .ilike("author", `%${search as string}%`);

    if (error) {
      console.log("Supabase Fetch Error:", error);
      setBookResults([]);
    } else {
      setBookResults(books as Book[]);
    }
    setLoading(false);
  }

  if (loading) {
        return <div className="p-8 text-center">Loading books...</div>;
    }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search books..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchBooksByTitle()}
          />
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={fetchBooksByTitle}>
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
            <option>Price</option>
            <option>10$</option>
            <option>20$</option>
            <option>30$</option>
            <option>40$</option>
            <option>50$+</option>
          </select>
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
            <option>Category</option>
            <option>Educational</option>
            <option>Sci-Fi</option>
            <option>Detective</option>
            <option>Romantic</option>
            <option>Thriller</option>
            <option>Drama</option>
            <option>Noir</option>
          </select>
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
            <option>Author</option>
            <option>Most Popular</option>
            <option>Alphabetical (A-Z)</option>
            <option>Reversed (Z-A)</option>
          </select>
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
            <option>Availability</option>
            <option>In Stock</option>
            <option>Pre-order</option>
            <option>Digital Only</option>
          </select>
        </div>
      </section>

      <section className="bg-white p-6 w-full ml-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Search Results
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-6 mx-auto">
          {bookResults.map(book =>
            <BookCard key={book.id} {...book} />
          )}
        </div>
      </section>
    </div>
  );
}
