import axiosClient from '@/apis/axios-client'
import { AddBookingResponse, TourBookingDetail } from '@/shared/ts/interface/booking-tour.interface'

export const bookingTourApi = {
  getBooking() {
    const url = '/book/tour'
    return axiosClient.get(url)
  },
  getBookingDetail(id: string): Promise<TourBookingDetail> {
    const url = `/bookings/tour/${id}`
    return axiosClient.get(url)
  },
  addBookingTour(tourId: string, tourQuantity: number): Promise<AddBookingResponse> {
    const url = '/bookings/book/tour'
    return axiosClient.post(url, { tourId, tourQuantity })
  }
}
