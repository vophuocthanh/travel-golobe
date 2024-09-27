import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface';
import { HotelResponseType } from '@/shared/ts/interface/data.interface'

export const hotelApi = {
  getAll(page: number | string, items_per_page: number | string): Promise<ListResponse<HotelResponseType>>  {
    const url = '/hotel-crawl/crawl';
    
    return axiosClient.get(url, {
      params: {
        items_per_page: Number(items_per_page),
        page: Number(page), 
      }
    })
  },
  getById(id: string |undefined) :Promise<HotelResponseType> {
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
  }
}
