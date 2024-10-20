import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { CoachResponseType } from '@/shared/ts/interface/data.interface'

export const coachApi = {
  getAll(
    page: number | string,
    items_per_page: number | string,
    sort_by_price: string,
    min_price?: number,
    max_price?: number,
    start_day?: string,
    end_day?: string
  ): Promise<ListResponse<CoachResponseType>> {
    const url = '/road-vehicle/crawl'
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
  }
}
