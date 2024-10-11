import axiosClient from '@/apis/axios-client'
import { TourParams,ListResponse } from '@/shared/ts/interface'
import { TourResponseType } from '@/shared/ts/interface/data.interface'
import { TourResponse } from '@/shared/utils/data-response'

export const tourApi = {
  getAll(
    page?: number | string, 
    items_per_page?: number | string,
    search?: string,

  ): Promise<ListResponse<TourResponseType>>{
    const url = '/tour'

    const params: TourParams = {
      items_per_page: Number(items_per_page),
      page: Number(page),
    }
    if (search && search !== '') {
      params.search = search
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
