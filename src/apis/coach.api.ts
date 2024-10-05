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


  favoriteFLightID(id: string | undefined): Promise<void> {
    const url = `/road-vehicle/${id}/favorite`
    return axiosClient.post(url)
  },

  unfavoriteFLightID(id: string | undefined): Promise<void> {
    const url = `/road-vehicle/${id}/unfavorite`
    return axiosClient.post(url)
  },
  getById(id: string | undefined): Promise<CoachResponseType> {
    const url = `/road-vehicle/crawl/${id}`
    return axiosClient.get(url)
  },
  addFlight(data: CoachResponseType) {
    const url = 'coach'
    return axiosClient.post(url, data)
  },
  putFlight(id: string, data: CoachResponseType) {
    const url = `/coach/${id}`
    return axiosClient.put(url, data)
  },
  deleteFlight(id: string) {
    const url = `/coach/${id}`
    return axiosClient.delete(url)
  },
  // isFavorite
  getFavoriteFlights() {
    const url = `/road-vehicle/favorites`
    return axiosClient.get(url)
  }
}
