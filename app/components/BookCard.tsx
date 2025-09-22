import type { Book } from "~/utils/types";

const BookCard = (book: Book) => {
  return (
    <div className="bg-white rounded-lg p-6 max-w-sm h-[600px] flex flex-col justify-between">
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-64 overflow-hidden">
          <img
            src={book.imageUrl}
            alt={`${book.title} book cover`}
            className="w-full h-full object-cover rounded-md shadow-lg"
          />
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold leading-tight">{book.title}</h2>
        </div>

        <div className="flex flex-col items-center  justify-start mb-6">
          <p className="text-gray-600 mt-1">
            by <span className="font-medium">{book.author}</span>
          </p>
          <div className="text-xl font-bold text-gray-800">${book.price}</div>
          <div className="ml-4 flex flex-col items-center">
            <span className="text-sm text-gray-400 line-through">
              List price: $17.99
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <button className="bg-white text-black hover:bg-gray-900 cursor-pointer font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:text-white border-black border-2 transition ease-iout duration-300 ">
          Add to Cart
        </button>
        <button className="text-gray-500 hover:text-red-500 transition-colors duration-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
