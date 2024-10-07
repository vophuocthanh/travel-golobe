import axiosClient from '@/apis/axios-client'
import { HotelBooking } from '@/shared/ts/interface/booking-hotel'
import axios from 'axios'

export const bookingHotelApi = {
  getBooking() {
    const url = '/book/hotel'
    return axiosClient.get(url)
  },
  getByIdBookingHotel(bookingId: string):Promise<HotelBooking>{
    const url =`/bookings/hotel/${bookingId}`
    return axios.get(url)
  },
  addBookingHotel(hotelCrawlId: string, flightQuantity: number):Promise<HotelBooking> {
    const url = '/bookings/book/hotel'
    return axiosClient.post(url, { hotelCrawlId, flightQuantity })
  }
}
