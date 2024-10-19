import axiosClient from '@/apis/axios-client'
import { HotelParams, ListResponse } from '@/shared/ts/interface'
import { HotelAdd, HotelResponseType, HotelUpdate } from '@/shared/ts/interface/data.interface'

export const hotelApi = {
  getAll(
    page?: number | string,
    items_per_page?: number | string,
    search?: string,
    sort_by_price?: string,
    min_price?: number,
    max_price?: number,
    star_number?: number
  ): Promise<ListResponse<HotelResponseType>> {
    const url = '/hotel-crawl/crawl'

    const params: HotelParams = {
      items_per_page: Number(items_per_page),
      page: Number(page)
    }

    if (search && search !== '') {
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

    if (star_number !== undefined) {
      params.star_number = star_number
    }

    return axiosClient.get(url, { params })
  },

  getById(id: string | undefined): Promise<HotelResponseType> {
    const url = `/hotel-crawl/crawl/${id}`
    return axiosClient.get(url)
  },
  addHotel(data: HotelAdd) {
    const url = '/hotel-crawl/crawl'
    return axiosClient.post(url, data)
  },
  updateHotel(id: string | undefined, data: HotelUpdate) {
    const url = `/hotel/${id}`
    return axiosClient.put(url, data)
  },
  updateUnFavorite(id: string | undefined) {
    const url = `/hotel-crawl/${id}/unfavorite`
    return axiosClient.post(url)
  },
  updateFavorite(id: string | undefined) {
    const url = `/hotel-crawl/${id}/favorite`
    return axiosClient.post(url)
  },
  deleteHotel(id: string) {
    const url = `/hotel-crawl/crawl/${id}`
    return axiosClient.delete(url)
  }
}
