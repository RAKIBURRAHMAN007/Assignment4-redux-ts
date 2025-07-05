import { useState } from "react";
import { useGetBooksQuery } from "@/redux/api/baseApi";

import type { IBook } from "@/interfaces/IBook";
import BookCard from "./BookCard";

const AllBooks = () => {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { isError, isLoading, data } = useGetBooksQuery({ page, limit });

  const books = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Failed to load books.</p>;

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
        All Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBooks;
