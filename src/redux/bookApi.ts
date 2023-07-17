import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-server-red.vercel.app/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.accessToken;
      if (token) {
        headers.set("authorization", `${token.toString()}`);
      }
      return headers;
    },
  }),
  tagTypes: ["comments"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books",
    }),
    getSingleBook: builder.query({
      query: (id) => `books/${id}`,
      providesTags: ["comments"],
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
    createBook: builder.mutation({
      query: (body) => ({
        url: "books",
        method: "POST",
        body,
      }),
    }),
    deleteBook: builder.mutation({
      query: (body) => ({
        url: `books/${body}`,
        method: "DELETE",
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, body }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    postReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `review/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});
export const {
  useGetBooksQuery,
  useSignupMutation,
  useSigninMutation,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  usePostReviewMutation,
} = bookApi;
