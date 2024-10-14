import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface';
import { HotelBookingResponse, PaymentHotel } from '@/shared/ts/interface/booking-hotel.interface'

export const bookingHotelApi  = {
  getBookingHotel(
    page?: number | string,
    items_per_page?: number | string,
  ): Promise<ListResponse<PaymentHotel>> {
    const url = '/bookings/book/hotel';
    return axiosClient.get(url, {
      params: {
        page: Number(page),
        items_per_page: Number(items_per_page
        ),
      },
    });
  },
  getBookingDetail(id: string): Promise<HotelBookingResponse> {
    const url = `/bookings/hotel/${id}`
    return axiosClient.get(url)
  },
  addBookingHotel(hotelCrawlId: string, hotelQuantity: number, roomId:string): Promise<HotelBookingResponse> {
    const url = '/bookings/book/hotel'
    return axiosClient.post(url, { hotelCrawlId, hotelQuantity, roomId })
  }
}
