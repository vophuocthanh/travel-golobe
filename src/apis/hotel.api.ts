import axiosClient from '@/apis/axios-client'
import { HotelParams, ListResponse } from '@/shared/ts/interface'
import { HotelResponseType } from '@/shared/ts/interface/data.interface'

export const hotelApi = {
  getAll(
    page?: number | string,
    items_per_page?: number | string,
    search?: string
  ): Promise<ListResponse<HotelResponseType>> {
    const url = '/hotel-crawl/crawl'

    const params: HotelParams = {
      items_per_page: Number(items_per_page),
      page: Number(page)
    }

    if (search) {
      params.search = String(search)
    }

    return axiosClient.get(url, { params })
  },
  getAllByPrice(
    page: number | string,
    items_per_page: number | string,
    sort_by_price: string,
    min_price?: number,
    max_price?: number
  ): Promise<ListResponse<HotelResponseType>> {
    const url = '/hotel-crawl/crawl'

    return axiosClient.get(url, {
      params: {
        items_per_page: Number(items_per_page),
        page: Number(page),
        sort_by_price: String(sort_by_price),
        min_price: String(min_price),
        max_price: String(max_price)
      }
    })
  },
  getPrice(max_price: number | string, min_price: number | string): Promise<ListResponse<HotelResponseType>> {
    const url = '/hotel-crawl/crawl'

    return axiosClient.get(url, {
      params: {
        max_price: Number(max_price),
        main_price: Number(min_price)
      }
    })
  },
  getById(id: string | undefined): Promise<HotelResponseType> {
    const url = `/hotel-crawl/crawl/${id}`
    return axiosClient.get(url)
  },
  addHotel(data: HotelResponseType) {
    const url = '/hotel'
    return axiosClient.post(url, data)
  },
  updateHotel(id: string, data: HotelResponseType) {
    const url = `/hotel/${id}`
    return axiosClient.put(url, data)
  },
  deleteHotel(id: string) {
    const url = `/hotel/${id}`
    return axiosClient.delete(url)
  },
  // isFavorite
  getFavoriteHotels() {
    const url = `/hotel-crawl/favorites`
    return axiosClient.get(url)
  }
}
