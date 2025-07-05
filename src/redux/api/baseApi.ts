import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l2-assignment-3-ten.vercel.app",
  }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/api/books?page=${page}&limit=${limit}`,
      providesTags: ["books"],
    }),
    getBooksDetails: builder.query({
      query: (id) => `/api/books/${id}`,
      providesTags: ["books"],
    }),
    CreateBook: builder.mutation({
      query: (bookData) => ({
        url: "/api/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    EditBook: builder.mutation({
      query: ({ id, bookData }) => ({
        url: `/api/books/${id}`,
        method: "PATCH",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});
export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useGetBooksDetailsQuery,
  useEditBookMutation,
} = baseApi;
