import { useGetBooksDetailsQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const { isError, isLoading, data } = useGetBooksDetailsQuery(id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading book details...</p>
      </div>
    );

  if (isError || !data?.data)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">Failed to load book details.</p>
      </div>
    );

  const book = data.data;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-900">
        {book.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Basic info */}
        <div>
          <p className="text-lg mb-2">
            <span className="font-semibold">Author:</span> {book.author}
          </p>

          <p className="text-lg mb-2">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>

          <p className="text-lg mb-2">
            <span className="font-semibold">ISBN:</span> {book.isbn}
          </p>

          <p className="text-lg mb-2">
            <span className="font-semibold">Copies Available:</span>{" "}
            {book.copies}
          </p>

          <p
            className={`inline-block font-semibold px-3 py-1 rounded-full text-sm ${
              book.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {book.available ? "Available" : "Not Available"}
          </p>
        </div>

        {/* Right: Description */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {book.description || "No description available."}
          </p>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Created at: {new Date(book.createdAt).toLocaleDateString()}</p>
        <p>Last updated: {new Date(book.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BookDetails;
