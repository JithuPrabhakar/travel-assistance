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
    uploadPhotos: builder.mutation({
      query: (data) => ({
        url: '/api/upload',
        method: 'POST',
        body: data,
      }),
      config: {
        headers: {
          'Content-Type': 'multipart/form-data;  boundary=boundary-string',
        },
      },
    }),
  }),
})

export const { useUploadImageMutation, useUploadPhotosMutation } = hotelApiSlice
