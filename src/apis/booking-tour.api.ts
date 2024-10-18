import axiosClient from '@/apis/axios-client'
import {  ListResponseTour } from '@/shared/ts/interface'
import { AddBookingResponse, TourBookingDetail } from '@/shared/ts/interface/booking-tour.interface'
import { TourBillingResponseType } from '@/shared/ts/interface/data.interface'

export const bookingTourApi = {
  getBooking() {
    const url = '/book/tour'
    return axiosClient.get(url)
  },
  getBookingTour( page: number | string, items_per_page: number | string): Promise<ListResponseTour<TourBillingResponseType>>{
    const url = `/bookings/book/tour`;
    return axiosClient.get(url, {
      params: {
        page: Number(page),
        items_per_page: Number(items_per_page),
      },
    });
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
