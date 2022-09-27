import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi ({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl: 'insert_url'}),
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query(body) {
                return {
                    url: 'insert_url',
                    method: 'POST',
                    body,
                };
                   
            }
        })
    })
})

export const {useUsersQuery, useAddUserMutation} = userApi;