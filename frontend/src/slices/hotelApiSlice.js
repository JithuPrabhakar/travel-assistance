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
          'Content-type': 'multipart/form-data;  boundary=boundary-string',
        },
      },
    }),
    saveHotel: builder.mutation({
      query: (data) => ({
        url: `/api/places`,
        method: 'POST',
        body: data,
      }),
    }),
    getHotels: builder.query({
      query: (id) => ({
        url: `/api/places?id=${id}`,
      }),
    }),
    getHotelById: builder.query({
      query: (id) => ({
        url: `/api/places/${id}`, // Use route parameter directly
      }),
    }),
  }),
})

export const {
  useUploadImageMutation,
  useUploadPhotosMutation,
  useSaveHotelMutation,
  useGetHotelsQuery,
  useGetHotelByIdQuery,
} = hotelApiSlice
