import axiosClient from '@/apis/axios-client'
import { ListResponse, TourParams } from '@/shared/ts/interface'
import { TourResponseType } from '@/shared/ts/interface/data.interface'
import { TourRequest, TourResponse } from '@/shared/utils/data-response'

export const tourApi = {
  getAll(
    page?: number | string,
    items_per_page?: number | string,
    min_price?: number,
    max_price?: number,
    search?: string,
    sort_by_price?: string,
    rating?: number | undefined,
    start_date?: string,
    end_date?: string
  ): Promise<ListResponse<TourResponseType>> {
    const url = '/tour'

    const params: TourParams = {
      items_per_page: Number(items_per_page),
      page: Number(page),
      min_price: min_price,
      max_price: max_price
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
    if (start_date && end_date) {
      params.start_date = String(start_date)
      params.end_date = String(end_date)
    }
    return axiosClient.get(url, { params })
  },
  getById(id: string | undefined): Promise<TourResponseType> {
    const url = `/tour/${id}`
    return axiosClient.get(url)
  },
  addTour(data: TourRequest) {
    const url = '/tour'
    return axiosClient.post(url, data)
  },
  updateTour(id: string | undefined, data: TourResponse) {
    const url = `/tour/${id}`
    return axiosClient.put(url, data)
  },
  deleteTour(id: string | undefined) {
    const url = `/tour/${id}`
    return axiosClient.delete(url)
  },
  favoriteTourID(id: string | undefined): Promise<TourResponseType> {
    const url = `/tour/${id}/favorite`

    return axiosClient.post(url)
  },
  unfavoriteTourID(id: string | undefined): Promise<TourResponseType> {
    const url = `/tour/${id}/unfavorite`
    return axiosClient.post(url)
  },
  getFavoriteTours() {
    const url = `/tour/favorite`
    return axiosClient.get(url)
  }
}
