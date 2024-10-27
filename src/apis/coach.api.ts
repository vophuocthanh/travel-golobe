import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { CoachResponseType } from '@/shared/ts/interface/data.interface'
import { ParamsType } from '@/shared/ts/interface/params-type-coach'

export const coachApi = {
  getAll(
    page: number | string,
    items_per_page: number | string,
    sort_by_price?: string,
    brand?: string,
    min_price?: number,
    max_price?: number,
    start_day?: string,
    end_day?: string,
    take_place?: string,
    destination?: string,
  ): Promise<ListResponse<CoachResponseType>> {
    const url = '/road-vehicle/crawl'
    const params: ParamsType = {
      items_per_page: Number(items_per_page),
      page: Number(page),
      take_place,
      destination, 
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
    if (take_place && destination) {
      params.take_place = String(take_place)
      params.destination = String(destination)
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
  }
}
