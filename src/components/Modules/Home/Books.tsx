import type { IBook } from "@/interfaces/IBook";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { Link } from "react-router";
import BookCard from "../BookCard";

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
          <BookCard key={book._id} book={book}></BookCard>
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
