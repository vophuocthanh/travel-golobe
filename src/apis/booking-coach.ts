import axiosClient from '@/apis/axios-client'
import { BookingResponse } from '@/shared/ts/interface/booking-flight.interface'
export const bookingCoachApi = {
  getBooking() {
    const url = '/book/hotel'
    return axiosClient.get(url)
  },
  getBookingDetail(id: string): Promise<BookingResponse> {
    const url = `/bookings/flight/${id}`
    return axiosClient.get(url)
  },
  addBookingFlight(flightCrawlId: string, flightQuantity: number): Promise<BookingResponse> {
    const url = '/bookings/book/flight'
    return axiosClient.post(url, { flightCrawlId, flightQuantity })
  }
}
