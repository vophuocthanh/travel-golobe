/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/apis/axios-client'
import { MoMoPaymentResponse } from '@/shared/ts/interface/momo.interface'

export const paymentApi = {
  getPaymentStatus(orderId: string, requestId: string): Promise<any> {
    const url = `momo/payment-status?orderId=${orderId}&requestId=${requestId}`
    return axiosClient.get(url)
  },
  addMomo(bookingId: string): Promise<any> {
    const url = '/momo/payment'
    return axiosClient.post(url, { bookingId })
  },
  momoIpn(data: MoMoPaymentResponse): Promise<MoMoPaymentResponse> {
    const url = '/momo/ipn'
    return axiosClient.post(url, data)
  }
}
