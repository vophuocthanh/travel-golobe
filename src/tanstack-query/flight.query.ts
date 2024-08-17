import { flightApi } from '@/apis/flight.api'
import { useQuery } from '@tanstack/react-query'

export const useGetFlightList = () => {
  return useQuery({
    queryKey: ['flightList'],
    queryFn: () => flightApi.getAll(),
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
