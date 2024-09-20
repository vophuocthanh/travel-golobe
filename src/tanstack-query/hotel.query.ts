import { hotelApi } from '@/apis/hotel.api'
import { useQuery } from '@tanstack/react-query'

export const useGetHotelList = () => {
  return useQuery({
    queryKey: ['hotelList'],
    queryFn: () => hotelApi.getAll(1, 10), // Provide default values for page and limit
    staleTime: 60 * 1000
  })
}

export const useGetHotelDetail = (id: string) => {
  return useQuery({
    queryKey: ['hotelDetail', id],
    queryFn: () => hotelApi.getById(id),
    staleTime: 60 * 1000
  })
}