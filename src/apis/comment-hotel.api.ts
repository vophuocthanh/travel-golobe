import axiosClient from '@/apis/axios-client'

export const commentHotelApi = {
  getComments(hotelId: string) {
    const url = `/hotel-comment/${hotelId}/reviews`
    return axiosClient.get(url)
  },
  addComment(hotelId: string, content: string, rating: number) {
    const url = `/hotel-comment/${hotelId}/reviews`
    return axiosClient.post(url, { hotelId, content, rating })
  }
}
