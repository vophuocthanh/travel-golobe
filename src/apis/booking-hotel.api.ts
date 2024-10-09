import axiosClient from '@/apis/axios-client'
import { HotelBookingResponse } from '@/shared/ts/interface/booking-hotel.interface'

export const bookingHotelApi = {
  getBooking() {
    const url = '/book/hotel'
    return axiosClient.get(url)
  },
  getBookingDetail(id: string): Promise<HotelBookingResponse> {
    const url = `/bookings/hotel/${id}`
    return axiosClient.get(url)
  },
  addBookingHotel(hotelCrawlId: string, hotelQuantity: number): Promise<HotelBookingResponse> {
    const url = '/bookings/book/hotel'
    return axiosClient.post(url, { hotelCrawlId, hotelQuantity })
  }
}
