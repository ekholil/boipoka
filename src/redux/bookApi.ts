import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-server-red.vercel.app/api/v1/",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books",
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
    signin: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useGetBooksQuery, useSignupMutation, useSigninMutation } =
  bookApi;
