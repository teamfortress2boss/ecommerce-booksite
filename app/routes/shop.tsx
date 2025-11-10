import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "~/utils/supabase";

import BookCard from "../components/BookCard";
import type { Book } from "~/utils/types";

export default function Shop() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookResults, setBookResults] = useState<Book[]>([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

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

  async function fetchBooksByFilters() {
    setLoading(true);

    let query = supabase
      .from("products")
      .select("id, imageUrl, title, author, price");

    if (search.trim()) {
      query = query.ilike("title", `%${search.trim()}%`);
    }

    if (priceFilter) {
      const parsedPrice = parseFloat(
        priceFilter.replace("$", "").replace("+", "")
      );
      query = query.lte("price", parsedPrice);
    }

    if (categoryFilter) {
      query = query.eq("category", categoryFilter);
    }

    if (availabilityFilter) {
      if (availabilityFilter === "in-stock") {
        query = query.eq("in_stock", true);
      }
      if (availabilityFilter === "digital-only") {
        query = query.eq("digital_only", true);
      }
    }

    if (sortFilter === "price-asc") {
      query = query.order("price", { ascending: true });
    } else if (sortFilter === "price-desc") {
      query = query.order("price", { ascending: false });
    } else if (sortFilter === "title-asc") {
      query = query.order("title", { ascending: true });
    } else if (sortFilter === "title-desc") {
      query = query.order("title", { ascending: false });
    } else if (sortFilter === "author-asc") {
      query = query.order("author", { ascending: true });
    } else if (sortFilter === "author-desc") {
      query = query.order("author", { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase Filter Error:", error);
      setBookResults([]);
    } else {
      setBookResults(data as Book[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (priceFilter || categoryFilter || sortFilter || availabilityFilter) {
      fetchBooksByFilters();
    } else {
      setBookResults([]);
    }
  }, [priceFilter, categoryFilter, sortFilter, availabilityFilter]);

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
            onKeyPress={(e) => e.key === "Enter" && fetchBooksByTitle()}
          />
          <button
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={fetchBooksByTitle}
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option>Price</option>
            <option>10$</option>
            <option>20$</option>
            <option>30$</option>
            <option>40$</option>
            <option>50$+</option>
          </select>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>Category</option>
            <option>Classic</option>
            <option>Dystopian</option>
            <option>Fantasy</option>
            <option>Fiction</option>
            <option>Historical Fiction</option>
            <option>Horror</option>
            <option>Magical Realism</option>
            <option>Memoir</option>
            <option>Mystery</option>
            <option>Philosophical Fiction</option>
            <option>Post-Apocalyptic</option>
            <option>Science Fiction</option>
            <option>Thriller</option>
          </select>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="author-asc">Author (A-Z)</option>
            <option value="author-desc">Author (Z-A)</option>
          </select>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="">Availability</option>
            <option value="in-stock">In Stock</option>
            <option value="pre-order">Pre-order</option>
            <option value="digital-only">Digital Only</option>
          </select>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={() => {
              setPriceFilter("");
              setCategoryFilter("");
              setSortFilter("");
              setAvailabilityFilter("");
              setBookResults([]);
            }}
          >
            Reset Filters
          </button>
        </div>
      </section>

      <section className="bg-white p-6 w-full ml-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Search Results
        </h2>
        {bookResults.length === 0 && !loading && (
          <p className="text-center text-gray-500">
            No books found. Try adjusting your filters or search.
          </p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-6 mx-auto">
          {bookResults.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
}
