import axiosClient from '@/apis/axios-client'
import { BookingResponse } from '@/shared/ts/interface/booking-flight.interface'
export const bookingFlightApi = {
  getBooking() {
    const url = '/book/hotel'
    return axiosClient.get(url)
  },
  getBookingDetail(id: string): Promise<BookingResponse> {
    const url = `/bookings/flight/${id}`
    return axiosClient.get(url)
  },
  addBookingFlight(flightCrawlId: string, flightQuantity: number,ticketFlighttId:string): Promise<BookingResponse> {
    const url = '/bookings/book/flight'
    return axiosClient.post(url, { flightCrawlId, flightQuantity ,ticketFlighttId})
  }
}