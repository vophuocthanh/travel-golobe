import axiosClient from '@/apis/axios-client'

export const bookingHotelApi = {
  getBooking() {
    const url = '/book/hotel'
    return axiosClient.get(url)
  },
  addBookingHotel(hotelId: string) {
    const url = '/bookings/book/hotel'
    return axiosClient.post(url, { hotelId })
  }
}
