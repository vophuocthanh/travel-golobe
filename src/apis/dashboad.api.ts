import axiosClient from '@/apis/axios-client'

export const dashboardApi = {
  getCountUser() {
    const url = '/user/count-user'
    return axiosClient.get(url)
  },
  getCountPaymentDone() {
    const url = '/momo/count-payment-success'
    return axiosClient.get(url)
  },
  getCountTour() {
    const url = '/tour/count-tour'
    return axiosClient.get(url)
  },
  getCountBooking() {
    const url = '/bookings/count-booking'
    return axiosClient.get(url)
  }
}
