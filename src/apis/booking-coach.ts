import axiosClient from '@/apis/axios-client'
import { BookingResponse } from '@/shared/ts/interface/booking-coach.interface'
export const bookingCoachApi = {
  getBooking() {
    const url = '/book/hotel'
    return axiosClient.get(url)
  },
  getBookingDetail(id: string): Promise<BookingResponse> {
    const url = `/bookings/road-vehicle/${id}`
    return axiosClient.get(url)
  },
  addBookingCoach(roadVehicleId: string, roadVehicleQuantity: number): Promise<BookingResponse> {
    const url = '/bookings/book/road-vehicle'
    return axiosClient.post(url, { roadVehicleId, roadVehicleQuantity })
  }
}
