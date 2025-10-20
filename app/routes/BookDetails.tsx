import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";
const supabaseUrl = "https://mbptntdjgaaxbkutvkst.supabase.co";
const supabasekey = "sb_publishable_bl0foT0cUlXywsYFTu3CPQ_usJlIQx-";
const supabase = createClient(supabaseUrl, supabasekey);

import type { Book } from "~/utils/types";

export default function BookDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      let { data: book, error } = await supabase
        .from("products")
        .select("id, imageUrl, title, author, price, summary")
        .eq("id", parseInt(id as string, 10))
        .single();

      if (error) {
        console.log("Supabase Fetch Error:", error);
      } else {
        setBook(book as Book);
      }

      setLoading(false);
    }
    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-gray-400 text-xl">
          Book not found or failed to load.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6 flex justify-center">
      <div className="max-w-5xl w-full bg-gray-800 rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Book Cover */}
        <div className="flex justify-center items-start">
          <img
            src={book.imageUrl}
            alt={`${book.title} cover`}
            className="object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Book Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-gray-400 mb-4 text-lg">
              by <span className="text-white font-medium">{book.author}</span>
            </p>
            <p className="text-gray-300 mb-6">
              {book.summary || "No summary available for this title."}
            </p>
          </div>

          <div>
            <div className="text-2xl font-bold text-blue-400 mb-2">
              ${book.price.toFixed(2)}
            </div>
            <span className="text-sm text-gray-500 line-through">
              List price: $17.99
            </span>

            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                Add to Cart
              </button>
              <button className="text-red-400 hover:text-red-600 transition duration-300">
                ❤️ Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
