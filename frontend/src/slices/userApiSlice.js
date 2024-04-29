import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/api/users',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/api/users/auth',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/users/logout',
        method: 'POST',
      }),
    }),
    allUsers: builder.query({
      query: () => ({
        url: 'api/users/all',
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useAllUsersQuery,
  useDeleteUserMutation,
} = userApiSlice
