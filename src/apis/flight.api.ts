import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { FlightResponseType } from '@/shared/ts/interface/data.interface'

export const flightApi = {
  getAll(
    page: number | string,
    items_per_page: number | string,
    sort_by_price: string,
    min_price?: number,
    max_price?: number,
    start_day?: string,
    end_day?: string
  ): Promise<ListResponse<FlightResponseType>> {
    const url = '/flight-crawl/crawl'
    if (!start_day || !end_day) {
      return axiosClient.get(url, {
        params: {
          items_per_page: Number(items_per_page),
          page: Number(page),
          sort_by_price: String(sort_by_price),
          min_price: min_price,
          max_price: max_price
        }
      })
    }
    return axiosClient.get(url, {
      params: {
        items_per_page: Number(items_per_page),
        page: Number(page),
        sort_by_price: String(sort_by_price),
        min_price: min_price,
        max_price: max_price,
        start_day: String(start_day),
        end_day: String(end_day)
      }
    })
  },
  getById(id: string | undefined): Promise<FlightResponseType> {
    const url = `/flight-crawl/crawl/${id}`
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
  },
  // isFavorite
  getFavoriteFlights() {
    const url = `/flight-crawl/favorites`
    return axiosClient.get(url)
  }
}
