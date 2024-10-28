import axiosClient from '@/apis/axios-client'
import { ListResponseFlight } from '@/shared/ts/interface'
import { BookingResponse } from '@/shared/ts/interface/booking-flight.interface'
import { FlightBillingResponseType } from '@/shared/ts/interface/data.interface'

export const bookingFlightApi = {
  getBooking() {
    const url = '/book/flight'
    return axiosClient.get(url)
  },
  getBookingFlight(
    page: number | string,
    items_per_page: number | string
  ): Promise<ListResponseFlight<FlightBillingResponseType>> {
    const url = `/bookings/book/flight`
    return axiosClient.get(url, {
      params: {
        page: Number(page),
        items_per_page: Number(items_per_page)
      }
    })
  },

  getBookingDetail(id: string): Promise<BookingResponse> {
    const url = `/bookings/flight/${id}`
    return axiosClient.get(url)
  },
  addBookingFlight(flightCrawlId: string, flightQuantity: number, ticketFlighttId: string): Promise<BookingResponse> {
    const url = '/bookings/book/flight'
    return axiosClient.post(url, { flightCrawlId, flightQuantity, ticketFlighttId })
  }
}
