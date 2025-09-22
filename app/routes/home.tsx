import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

import BookCard from "../components/BookCard";
import type { Book } from "~/utils/types";

function HomePage() {
  const featuredBooks: Book[] = [
    {
      id: 2,
      title: "The Particular Sadness of the Lemon Cake",
      author: "Aimee Bender",
      price: "18.50",
      imageUrl: "https://covers.openlibrary.org/b/isbn/9780385533225-L.jpg",
    },
    {
      id: 3,
      title: "Nineteen Eighty-Four",
      author: "George Orwell",
      price: "30.25",
      imageUrl: "https://covers.openlibrary.org/b/isbn/0198185219-L.jpg",
    },
    {
      id: 4,
      title: "At Bertram's Hotel",
      author: "Agatha Christie",
      price: "22.00",
      imageUrl: "https://covers.openlibrary.org/b/isbn/0002310015-L.jpg",
    },
    {
      id: 5,
      title: "I, ROBOT",
      author: "Isaac Asimov",
      price: "22.00",
      imageUrl: "https://covers.openlibrary.org/b/isbn/9780329143558-L.jpg",
    },
    {
      id: 6,
      title: "Coraline",
      author: "Neil Gaiman",
      price: "22.00",
      imageUrl: "https://covers.openlibrary.org/b/isbn/8374801174-L.jpg",
    },
    {
      id: 7,
      title: "The Hobby",
      author: "J. R. R. Tolkien",
      price: "22.00",
      imageUrl: "https://covers.openlibrary.org/b/isbn/0395520215-L.jpg",
    },
    {
      id: 1,
      title: "The Game",
      author: "Terry Sehott",
      price: "25.00",
      imageUrl: "https://covers.openlibrary.org/b/id/12547191-L.jpg",
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
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
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
          {featuredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
