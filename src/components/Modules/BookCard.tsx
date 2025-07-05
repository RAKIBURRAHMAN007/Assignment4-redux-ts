import type { IBook } from "@/interfaces/IBook";

interface BookCardProps {
  book: IBook;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="border rounded-lg p-5 shadow hover:shadow-lg transition flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>ISBN:</strong> {book.isbn}
        </p>

        <p
          className={`font-semibold ${
            book.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {book.available ? "Available" : "Not Available"}
        </p>
        <p className="text-sm text-gray-500 mt-1">Copies: {book.copies}</p>
      </div>

      <div className="mt-4 flex space-x-2">
        <button
          // onClick={() => onEdit && onEdit(book)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Edit
        </button>

        <button
          // onClick={() => onDelete && onDelete(book._id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
        >
          Delete
        </button>

        <button
          // onClick={() => onBorrow && onBorrow(book)}
          disabled={!book.available || book.copies === 0}
          className={`flex-1 font-semibold py-2 rounded-md transition ${
            book.available && book.copies > 0
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-400 cursor-not-allowed text-gray-700"
          }`}
        >
          Borrow
        </button>
      </div>
    </div>
  );
};

export default BookCard;
