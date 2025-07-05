import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import type { IBorrow } from "@/interfaces/IBorrow";

const BorrowSummary = () => {
  const { isError, isLoading, data } = useGetBorrowSummaryQuery({});

  const summary: IBorrow[] = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="flex justify-center items-center h-40 text-red-600">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>Failed to load summary data.</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        📚 Borrowed Books Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {summary.map((item, index) => (
          <Card
            key={index}
            className="rounded-xl shadow hover:shadow-lg border border-gray-200 transition"
          >
            <CardContent className="p-4">
              <h3
                className="text-lg font-semibold text-gray-900 mb-1 truncate"
                title={item.book.title}
              >
                {item.book.title}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                ISBN:{" "}
                <span className="font-medium break-all">{item.book.isbn}</span>
              </p>
              <p className="text-sm text-gray-700">
                Borrowed Quantity:{" "}
                <span className="font-semibold">{item.totalQuantity}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BorrowSummary;
