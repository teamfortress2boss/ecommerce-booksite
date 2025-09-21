import type { Book } from "~/utils/types";

function BookCard(book: Book) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{book.author}</p>
        <p className="text-xl font-bold text-blue-600 mt-3">${book.price}</p>
      </div>
    </div>
  );
}

export default BookCard;
