import axiosClient from '@/apis/axios-client'
import { FlightResponseType } from '@/ts/interface/data.interface'

export const flightApi = {
  getAll() {
    const url = '/flight'
    return axiosClient.get(url)
  },
  getById(id: string) {
    const url = `/flight/${id}`
    return axiosClient.get(url)
  },
  addFlight(data: FlightResponseType) {
    const url = 'flight'
    return axiosClient.post(url, data)
  },
  putFlight(id: string, data: FlightResponseType) {
    const url = `/flight/${id}`
    return axiosClient.put(url, data)
  },
  deleteFlight(id: string) {
    const url = `/flight/${id}`
    return axiosClient.delete(url)
  }
}
