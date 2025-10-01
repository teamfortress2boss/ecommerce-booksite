import type { Route } from "./+types/home";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://mbptntdjgaaxbkutvkst.supabase.co'
const supabasekey = 'sb_publishable_bl0foT0cUlXywsYFTu3CPQ_usJlIQx-'
const supabase = createClient(supabaseUrl, supabasekey)

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Campus Bookstore" },
    { name: "description", content: "" },
  ];
}

import BookCard from "../components/BookCard";
import type { Book } from "~/utils/types";

function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchBooks() {
            setIsLoading(true);
            let { data: products, error } = await supabase
                .from('products')
                .select('id, imageUrl, title, author, price');
            if (error) {
                console.log("Supabase Fetch Error:", error);
                setFeaturedBooks([]);
            }
            else {
                setFeaturedBooks(products as Book[]);
            }
            setIsLoading(false);
          }

    useEffect(() => {
        fetchBooks();
    }, []); 
    
    if (isLoading) {
        return <div className="p-8 text-center">Loading books...</div>;
    }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search books..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={fetchBooks}>
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Price</option>
            <option>10$</option>
            <option>20$</option>
            <option>30$</option>
            <option>40$</option>
            <option>50$+</option>
          </select>
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Category</option>
            <option>Educational</option>
            <option>Sci-Fi</option>
            <option>Detective</option>
            <option>Romantic</option>
            <option>Thriller</option>
            <option>Drama</option>
            <option>Noir</option>
          </select>
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Author</option>
            <option>Most Popular</option>
            <option>Alphabetical (A-Z)</option>
            <option>Reversed (Z-A)</option>
          </select>
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Availability</option>
            <option>In Stock</option>
            <option>Pre-order</option>
            <option>Digital Only</option>
          </select>
        </div>
      </section>

      <section className="bg-white p-6 w-full ml-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Featured Books
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-6 mx-auto">
          {featuredBooks.map(book =>
            <BookCard key={book.id} {...book} />
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
