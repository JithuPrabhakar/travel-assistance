import { apiSlice } from './apiSlice'

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: '/api/upload-by-link',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useUploadImageMutation } = hotelApiSlice
