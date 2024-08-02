import axiosClient from '@/apis/axios-client'
import { TourResponse } from '@/shared/utils/data-response'

export const tourApi = {
  getAll() {
    const url = '/tour'
    return axiosClient.get(url)
  },
  getById(id: string) {
    const url = `/tour/${id}`
    return axiosClient.get(url)
  },
  addTour(data: TourResponse) {
    const url = '/tour'
    return axiosClient.post(url, data)
  },
  updateTour(id: string, data: TourResponse) {
    const url = `/tour/${id}`
    return axiosClient.put(url, data)
  },
  deleteTour(id: string) {
    const url = `/tour/${id}`
    return axiosClient.delete(url)
  }
}
