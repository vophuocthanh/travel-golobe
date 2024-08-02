import axiosClient from '@/apis/axios-client'
import { HotelResponseType } from '@/shared/ts/interface/data.interface'

export const hotelApi = {
  getAll() {
    const url = '/hotel'
    return axiosClient.get(url)
  },
  getById(id: string) {
    const url = `/hotel/${id}`
    return axiosClient.get(url)
  },
  addHotel(data: HotelResponseType) {
    const url = '/hotel'
    return axiosClient.post(url, data)
  },
  updateHotel(id: string, data: HotelResponseType) {
    const url = `/hotel/${id}`
    return axiosClient.put(url, data)
  },
  deleteHotel(id: string) {
    const url = `/hotel/${id}`
    return axiosClient.delete(url)
  }
}
