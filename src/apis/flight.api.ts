import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { FlightResponseType } from '@/shared/ts/interface/data.interface'


export const flightApi = {
  getAll(page: number | string, items_per_page: number | string): Promise<ListResponse<FlightResponseType>> {
    const url = '/flight-crawl/crawl'

    return axiosClient.get(url, {
      params: {
        items_per_page: Number(items_per_page),
        page: Number(page)
      }
    })
  },
  getById(id: string | undefined): Promise<FlightResponseType> {
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
