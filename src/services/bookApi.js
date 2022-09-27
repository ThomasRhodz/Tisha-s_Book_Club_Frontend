import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bookApi = createApi ({
    reducerPath:"bookApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.GATSBY_API_URL}),
    tagTypes: ['Book'],
    endpoints: (builder) => ({
        addBook: builder.mutation({
            query(body) {
                return {
                    url: '/books',
                    method: 'POST',
                    body,
                };   
            },
            invalidatesTags: ['Book'],
        }),
        getBooks: builder.query({
            query(params) {
                return {
                    url: '/books',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Book', 'Category'],
        }),
        getExactBook: builder.query({
            query(params) {
                return {
                    url: '/books/exact',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Book', 'Category'],
        }),
        getExactBookISBN: builder.query({
            query(params) {
                return {
                    url: '/books/exactISBN',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Book', 'Category'],
        }),
        getLastBook: builder.query({
            query(body) {
                return {
                    url: '/books/last',
                    method: 'GET',
                    body,
                };   
            },
            providesTags: ['Book', 'Category'],
        }),
        updateBooks: builder.mutation({
            query(body) {
                const {id, data} = body;
                return {
                    url: `/books/${id}`,
                    method: 'PATCH',
                    body: data,

                };     
            },
            invalidatesTags: ['Book'],
        }),

        deleteBook: builder.mutation({
            query(id) {
                return {
                    url: `/books/${id}`,
                    method: 'DELETE',
                };     
            },
            invalidatesTags: ['Book'],
        }),

    })
})

export const {useAddBookMutation, useGetBooksQuery, useGetExactBookQuery, useGetExactBookISBNQuery, useGetLastBookQuery, useUpdateBooksMutation, useDeleteBookMutation} = bookApi;