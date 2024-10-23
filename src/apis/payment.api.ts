/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { PaymentResponse } from '@/shared/ts/interface/booking-tour.interface'
import { MoMoPaymentResponse, PaymentDetail } from '@/shared/ts/interface/momo.interface'

export const paymentApi = {
  getPaymentStatus(orderId: string, requestId: string): Promise<any> {
    const url = `momo/payment-status?orderId=${orderId}&requestId=${requestId}`
    return axiosClient.get(url)
  },
  addMomo(bookingId: string): Promise<PaymentResponse> {
    const url = '/momo/payment'
    return axiosClient.post(url, { bookingId })
  },
  momoIpn(data: MoMoPaymentResponse): Promise<MoMoPaymentResponse> {
    const url = '/momo/ipn'
    return axiosClient.post(url, data)
  },
  getPaymentUser(): Promise<ListResponse<any>> {
    const url = '/momo/user'
    return axiosClient.get(url)
  },
  getAllPayemnt() {
    const url = '/momo/payment'
    return axiosClient.get(url)
  },
  getPaymentById(id: string): Promise<PaymentDetail> {
    const url = `/momo/payment/${id}`
    return axiosClient.get(url)
  }
}
