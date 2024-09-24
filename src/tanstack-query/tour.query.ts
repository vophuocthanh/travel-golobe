import { tourApi } from '@/apis/tour.api'
import { useQuery } from '@tanstack/react-query'

export const useGetTourList = () => {
  return useQuery({
    queryKey: ['tourList'],
    queryFn: () => tourApi.getAll(1, 10),
    staleTime: 60 * 1000
  })
}

export const useGetTourDetail = (id: string) => {
  return useQuery({
    queryKey: ['tourDetail', id],
    queryFn: () => tourApi.getById(id),
    staleTime: 60 * 1000
  })
}
