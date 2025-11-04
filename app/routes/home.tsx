import type { Route } from "./+types/home";
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';

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
  const [search, setSearch] = useState('');

  async function fetchBooks() {
    setIsLoading(true);
    let { data: products, error } = await supabase
      .from("products")
      .select("id, imageUrl, title, author, price");
    if (error) {
      console.log("Supabase Fetch Error:", error);
      setFeaturedBooks([]);
    } else {
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
