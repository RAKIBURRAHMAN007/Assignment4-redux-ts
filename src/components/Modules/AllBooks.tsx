import { useEffect, useState } from "react";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/interfaces/IBook";
import BookCard from "./BookCard";
import { useSearchParams } from "react-router";

const AllBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1");
  const [page, setPage] = useState(initialPage);
  const limit = 6;

  const { isError, isLoading, data } = useGetBooksQuery({ page, limit });
  const books = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading book details...</p>
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Failed to load books....</p>
      </div>
    );

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
