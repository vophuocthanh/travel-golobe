import axiosClient from '@/apis/axios-client'
import { FlightResponseType } from '@/shared/ts/interface/data.interface'

export const flightApi = {
  getAll(page: number | string, limit: number | string) {
    const url = '/flight'
    return axiosClient.get(url, {
      params: {
        _page: page,
        _limit: limit
      }
    });
    },
  getById(id: string | undefined) : Promise<FlightResponseType> {
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
