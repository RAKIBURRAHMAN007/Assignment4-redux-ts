import type { IBook } from "@/interfaces/IBook";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { Link } from "react-router";

const Books = () => {
  const { isError, isLoading, data } = useGetBooksQuery({ page: 1, limit: 6 });

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Failed to load books.</p>;

  const books = data?.data ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
        Featured Books
      </h1>
      <p className="mb-8 text-center sm:text-left text-gray-700 max-w-xl mx-auto sm:mx-0">
        Borrow books from the collection and explore all available books by
        clicking the button at the bottom.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.slice(0, 6).map((book: IBook) => (
          <div
            key={book._id}
            className="border rounded-lg p-5 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-3">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p className="text-sm text-gray-600 mb-4">{book.description}</p>
            <p
              className={`font-semibold ${
                book.available ? "text-green-600" : "text-red-600"
              }`}
            >
              {book.available ? "Available" : "Not Available"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Copies: {book.copies}</p>
          </div>
        ))}
      </div>

      {/* All Books Button */}
      <div className="mt-10 flex justify-center">
        <Link
          to="/books"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition"
        >
          View All Books
        </Link>
      </div>
    </div>
  );
};

export default Books;
