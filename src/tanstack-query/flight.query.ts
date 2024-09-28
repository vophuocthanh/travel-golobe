import { flightApi } from '@/apis/flight.api'
import { useQuery } from '@tanstack/react-query'

export const useGetFlightList = () => {
  return useQuery({
    queryKey: ['flightList'],
    queryFn: () => flightApi.getAll(1, 10,''), // Provide default values for page and limit
    staleTime: 60 * 1000
  })
}

export const useGetFlightDetail = (id: string) => {
  return useQuery({
    queryKey: ['flightDetail', id],
    queryFn: () => flightApi.getById(id),
    staleTime: 60 * 1000
  })
}
