import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { FlightResponseType } from '@/shared/ts/interface/data.interface'
import { ParamsType } from '@/shared/ts/interface/params-type-flight'

export const flightApi = {
  getAll(
    page: number | string,
    items_per_page: number | string,
    sort_by_price?: string,
    brand?: string,
    min_price?: number,
    max_price?: number,
    start_day?: string,
    end_day?: string
  ): Promise<ListResponse<FlightResponseType>> {
    const url = '/flight-crawl/crawl'
    const params: ParamsType = {
      items_per_page: Number(items_per_page),
      page: Number(page)
    }

    if (sort_by_price) {
      params.sort_by_price = sort_by_price
    }

    if (min_price !== undefined) {
      params.min_price = min_price
    }

    if (max_price !== undefined) {
      params.max_price = max_price
    }

    if (brand) {
      params.brand = String(brand)
    }
    if (start_day && end_day) {
      params.start_day = String(start_day)
      params.end_day = String(end_day)
    }

    return axiosClient.get(url, { params })
  },

  favoriteFLightID(id: string | undefined): Promise<void> {
    const url = `/flight-crawl/${id}/favorite`
    return axiosClient.post(url)
  },

  unfavoriteFLightID(id: string | undefined): Promise<void> {
    const url = `/flight-crawl/${id}/unfavorite`
    return axiosClient.post(url)
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
