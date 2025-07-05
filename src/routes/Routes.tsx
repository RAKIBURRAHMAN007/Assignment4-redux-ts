import App from "@/App";
import AddBook from "@/components/Modules/AddBook";
import AllBooks from "@/components/Modules/AllBooks";
import BookDetails from "@/components/Modules/BookDetails";

import Home from "@/components/Modules/Home/Home";
import ErrorPage from "@/components/shared/ErrorPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/books",
        Component: AllBooks,
      },
      {
        path: "/create-book",
        Component: AddBook,
      },
      {
        path: "/books/:id",
        Component: BookDetails,
      },
    ],
  },
]);
export default router;
