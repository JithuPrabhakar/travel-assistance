import { apiSlice } from './apiSlice'

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: '/upload-by-link',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useUploadImageMutation } = hotelApiSlice
