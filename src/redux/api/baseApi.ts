import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l2-assignment-3-ten.vercel.app",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/api/books",
    }),
  }),
});
export const { useGetBooksQuery } = baseApi;
