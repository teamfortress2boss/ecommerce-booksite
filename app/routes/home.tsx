import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

import React from "react";
import BookCard from "../components/BookCard";
import type { Book } from "~/utils/types";

function HomePage() {
  const featuredBooks: Book[] = [
    {
      id: 1,
      title: "The Last Ember",
      author: "Author Name 1",
      price: "25.00",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Exile",
      author: "Author Name 2",
      price: "18.50",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Flavor Fusion",
      author: "Author Name 3",
      price: "30.25",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Cosmic Adventures",
      author: "Author Name 4",
      price: "22.00",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search books..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
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

      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Featured Books
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
