import axiosClient from '@/apis/axios-client'
import { TourParams,ListResponse } from '@/shared/ts/interface'
import { TourResponseType } from '@/shared/ts/interface/data.interface'
import { TourResponse } from '@/shared/utils/data-response'

export const tourApi = {
  getAll(
    page?: number | string, 
    items_per_page?: number | string,
    search?: string,
    sort_by_price?: string,
    min_price?: number,
    max_price?: number,
    rating?: number,
    start_day?: string, 
    end_day?: string,
  ): Promise<ListResponse<TourResponseType>>{
    const url = '/tour'

    const params: TourParams = {
      items_per_page: Number(items_per_page),
      page: Number(page),
      min_price: min_price,
      max_price: max_price,
    }
    if (start_day && end_day) {
      params.start_day = String(start_day)
      params.end_day = String(end_day)
    }
    if (search && search !== '') {
      params.search = search
    }
    if (sort_by_price) {
      params.sort_by_price = sort_by_price
    }

    if (rating !== undefined) {
      params.rating = rating
    }
    return axiosClient.get(url, {params})
  },
  getById(id: string | undefined): Promise<TourResponseType> {
    const url = `/tour/${id}`
    return axiosClient.get(url)
  },
  addTour(data: TourResponse) {
    const url = '/tour'
    return axiosClient.post(url, data)
  },
  updateTour(id: string, data: TourResponse) {
    const url = `/tour/${id}`
    return axiosClient.put(url, data)
  },
  deleteTour(id: string) {
    const url = `/tour/${id}`
    return axiosClient.delete(url)
  },
  favoriteTourID(id: string | undefined):Promise<TourResponseType> {
    const url = `/tour/${id}/favorite`
    
    return axiosClient.post(url)
  },
  unfavoriteTourID(id: string | undefined):Promise<TourResponseType> {
    const url = `/tour/${id}/unfavorite`
    return axiosClient.post(url)
  },
  getFavoriteTours() {
    const url = `/tour/favorite`
    return axiosClient.get(url)
  },
}
