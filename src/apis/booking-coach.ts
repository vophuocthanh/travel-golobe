import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { BillingCoachResponseAdmin, BillingCoachView, BookingCoachResponse } from '@/shared/ts/interface/booking-coach.interface'
export const bookingCoachApi = {
  getBooking() {
    const url = '/bookings/book/road-vehicle'
    return axiosClient.get(url)
  },
  getBookingCoach( page: number | string, items_per_page: number | string): Promise<ListResponse<BillingCoachResponseAdmin>>{
    const url = `/bookings/book/road-vehicle`;
    return axiosClient.get(url, {
      params: {
        page: Number(page),
        items_per_page: Number(items_per_page),
      },
    });
  },
  getBookingDetail(id: string): Promise<BillingCoachView> {
    const url = `/bookings/road-vehicle/${id}`
    return axiosClient.get(url)
  },
  addBookingCoach(roadVehicleId: string, roadVehicleQuantity: number): Promise<BookingCoachResponse> {
    const url = '/bookings/book/road-vehicle'
    return axiosClient.post(url, { roadVehicleId, roadVehicleQuantity })
  }
}
