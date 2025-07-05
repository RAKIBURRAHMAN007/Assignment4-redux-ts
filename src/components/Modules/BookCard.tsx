import { useState, useEffect } from "react";
import type { IBook } from "@/interfaces/IBook";
import Swal from "sweetalert2";

import { FaInfoCircle, FaEdit, FaTrash, FaBookOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import {
  useCreateBorrowBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
} from "@/redux/api/baseApi";

import { toast } from "react-toastify";

interface BookCardProps {
  book: IBook;
}

const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editBook, { isLoading }] = useEditBookMutation();
  const [DeleteBook] = useDeleteBookMutation();
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [borrowBook] = useCreateBorrowBookMutation();
  const borrowForm = useForm({
    defaultValues: {
      quantity: 1,
      dueDate: "",
    },
  });

  const form = useForm<IBook>({
    defaultValues: book,
  });

  useEffect(() => {
    if (open) {
      form.reset(book);
    }
  }, [open, book, form]);

  const onSubmit = async (data: IBook) => {
    try {
      await editBook({ id: book._id, bookData: data }).unwrap();

      toast.success("Book updated successfully!");
      setOpen(false);
    } catch (error) {
      toast.error(
        "Failed to update book: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  };

  const handleBorrowSubmit = async (data: {
    quantity: number;
    dueDate: string;
  }) => {
    try {
      await borrowBook({
        book: book._id,
        quantity: data.quantity,
        dueDate: data.dueDate,
      }).unwrap();
      toast.success("Book borrowed successfully!");
      setBorrowOpen(false);
      borrowForm.reset();
      navigate("/borrow-summary");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.error || "Borrow failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="border rounded-lg p-5 shadow hover:shadow-lg transition flex flex-col justify-between h-full cursor-default relative">
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

      <div className="mt-4 flex space-x-3 justify-center md:justify-start">
        <Link
          to={`/books/${book._id}`}
          title="Details"
          className="p-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full text-sm flex items-center justify-center transition"
          aria-label="View Details"
        >
          <FaInfoCircle size={16} />
        </Link>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              title="Edit"
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm flex items-center justify-center transition"
              aria-label="Edit Book"
              type="button"
              disabled={isLoading}
            >
              <FaEdit size={16} />
            </button>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl">
            <DialogTitle className="text-2xl font-bold mb-2">
              Edit Book
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mb-4">
              Update the book information below.
            </DialogDescription>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Book Title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Author Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Short description..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 9781234567890" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FICTION">Fiction</SelectItem>
                          <SelectItem value="NON_FICTION">
                            Non-Fiction
                          </SelectItem>
                          <SelectItem value="SCIENCE">Science</SelectItem>
                          <SelectItem value="HISTORY">History</SelectItem>
                          <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                          <SelectItem value="FANTASY">Fantasy</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="copies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Copies</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Number of copies"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <button
          onClick={async () => {
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
              DeleteBook(book._id);
              Swal.fire("Deleted!", "The book has been deleted.", "success");
            }
          }}
          title="Delete"
          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm flex items-center justify-center transition"
          aria-label="Delete Book"
          disabled={isLoading}
        >
          <FaTrash size={16} />
        </button>

        <Dialog open={borrowOpen} onOpenChange={setBorrowOpen}>
          <DialogTrigger asChild>
            <button
              disabled={!book.available || book.copies === 0 || isLoading}
              title={
                book.available && book.copies > 0 ? "Borrow" : "Unavailable"
              }
              className={`p-2 rounded-full text-sm flex items-center justify-center transition ${
                book.available && book.copies > 0
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-400 cursor-not-allowed text-gray-700"
              }`}
              aria-label="Borrow Book"
            >
              <FaBookOpen size={16} />
            </button>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-md rounded-xl">
            <DialogTitle className="text-xl font-bold mb-2">
              Borrow Book
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mb-4">
              Fill out the form to borrow this book.
            </DialogDescription>

            <Form {...borrowForm}>
              <form
                onSubmit={borrowForm.handleSubmit(handleBorrowSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={borrowForm.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={book.copies}
                          {...field}
                          placeholder="Enter quantity"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={borrowForm.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setBorrowOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Borrowing..." : "Confirm Borrow"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BookCard;
