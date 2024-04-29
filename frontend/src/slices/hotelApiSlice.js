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
    getAllHotels: builder.query({
      query: () => ({
        url: `/api/places/all`,
      }),
    }),
    getHotelById: builder.query({
      query: (id) => ({
        url: `/api/places/${id}`,
      }),
    }),
    deleteHotel: builder.mutation({
      query: (id) => ({
        url: `/api/places/${id}`,
        method: 'DELETE',
      }),
    }),
    bookHotel: builder.mutation({
      query: (data) => ({
        url: `/api/bookings`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/api/bookings/${id}`,
        method: 'DELETE',
      }),
    }),
    getBookedHotels: builder.query({
      query: () => ({
        url: `/api/bookings`,
      }),
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: `/api/bookings/all`,
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
  useGetAllHotelsQuery,
  useBookHotelMutation,
  useGetBookedHotelsQuery,
  useGetAllBookingsQuery,
  useDeleteBookingMutation,
  useDeleteHotelMutation,
} = hotelApiSlice
