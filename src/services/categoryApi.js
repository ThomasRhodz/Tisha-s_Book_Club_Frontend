import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi ({
    reducerPath:"categoryApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.GATSBY_API_URL}),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        addCategory: builder.mutation({
            query(body) {
                return {
                    url: '/categories',
                    method: 'POST',
                    body,
                };        
            },
            invalidatesTags: ['Category'],
        }),
        getCategories: builder.query({
            query(params) {
                return {
                    url: '/categories',
                    method: 'GET',
                    params,
                };      
            },
            providesTags: ['Category'],
        }),
        getLastCategory: builder.query({
            query(body) {
                return {
                    url: '/categories/last',
                    method: 'GET',
                    body,
                };   
            },
            providesTags: ['Category'],
        }),
        getExactCategory: builder.query({
            query(params) {
                return {
                    url: '/categories/exact',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Category'],
        }),
        getCategory: builder.query({
            query(body) {
                const {id, data} = body;
                return {
                    url: `/categories/${id}`,
                    method: 'GET',
                    body: data,
                };     
            },
            providesTags: ['Category'],
        }),
        updateCategories: builder.mutation({
            query(body) {
                const {id, data} = body;
                return {
                    url: `/categories/${id}`,
                    method: 'PUT',
                    body: data,
                };     
            },
            invalidatesTags: ['Category'],
        }),

        deleteCategory: builder.mutation({
            query(id) {
                return {
                    url: `/categories/${id}`,
                    method: 'DELETE',
                };     
            },
            invalidatesTags: ['Category'],
        })
    })
})

export const {useAddCategoryMutation, useGetCategoryQuery, useGetCategoriesQuery, useGetLastCategoryQuery, useGetExactCategoryQuery, useUpdateCategoriesMutation, useDeleteCategoryMutation} = categoryApi;