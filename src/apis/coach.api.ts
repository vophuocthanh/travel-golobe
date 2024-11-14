import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { CoachResponseType } from '@/shared/ts/interface/data.interface'
import { ParamsType } from '@/shared/ts/interface/params-type-coach'

export const coachApi = {
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
  ): Promise<ListResponse<CoachResponseType>> {
    const url = '/road-vehicle/crawl'
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

  favoriteCoachID(id: string | undefined): Promise<void> {
    const url = `/road-vehicle/${id}/favorite`
    return axiosClient.post(url)
  },

  unfavoriteCoachID(id: string | undefined): Promise<void> {
    const url = `/road-vehicle/${id}/unfavorite`
    return axiosClient.post(url)
  },
  getById(id: string | undefined): Promise<CoachResponseType> {
    const url = `/road-vehicle/crawl/${id}`
    return axiosClient.get(url)
  },
  addCoach(data: CoachResponseType) {
    const url = '/road-vehicle/crawl'
    return axiosClient.post(url, data)
  },
  putCoach(id: string, data: CoachResponseType) {
    const url = `/road-vehicle/crawl/${id}`
    return axiosClient.put(url, data)
  },
  deleteCoach(id: string) {
    const url = `/road-vehicle/crawl/${id}`
    return axiosClient.delete(url)
  },
  // isFavorite
  getFavoriteCoach() {
    const url = `/road-vehicle/favorites`
    return axiosClient.get(url)
  },
  getCountBrands() {
    const url = '/road-vehicle/crawl/count-place'
    return axiosClient.get(url)
  }
}
