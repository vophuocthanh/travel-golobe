import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { FlightResponseType } from '@/shared/ts/interface/data.interface'
import { ParamsType } from '@/shared/ts/interface/params-type-flight'
import { FlightRequest, FlightRespone } from '@/shared/utils/data-response'

export const flightApi = {
  getAll(
    page: number | string,
    items_per_page: number | string,
    search?: string,
    sort_by_price?: string,
    brand?: string,
    min_price?: number,
    max_price?: number,
    start_day?: string,
    end_day?: string,
    search_from?: string,
    search_to?: string
  ): Promise<ListResponse<FlightResponseType>> {
    const url = '/flight-crawl/crawl'
    const params: ParamsType = {
      items_per_page: Number(items_per_page),
      page: Number(page)
    }

    if (search) {
      params.search = search
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

    if (search_from && search_to) {
      params.search_from = search_from
      params.search_to = search_to
    }

    if (search_from && search_to && start_day && end_day) {
      params.search_from = search_from
      params.search_to = search_to
      params.start_day = start_day
      params.end_day = end_day
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
  addFlight(data: FlightRequest) {
    const url = 'flight-crawl/crawl'
    return axiosClient.post(url, data)
  },
  putFlight(id: string | undefined, data: FlightRespone) {
    const url = `/flight-crawl/crawl/${id}`
    return axiosClient.put(url, data)
  },
  deleteFlight(id: string) {
    const url = `/flight-crawl/crawl/${id}`
    return axiosClient.delete(url)
  },
  // isFavorite
  getFavoriteFlights() {
    const url = `/flight-crawl/favorites`
    return axiosClient.get(url)
  },
  // get count place
  getCountBrands() {
    const url = '/flight-crawl/crawl/count-place'
    return axiosClient.get(url)
  }
}
