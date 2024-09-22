import axiosClient from '@/apis/axios-client'

export const commentTourApi = {
  getComments(tourId: string){
    const url = `/tour-comment/${tourId}/reviews`
    return axiosClient.get(url)
  },
  addComment(tourId: string, content: string, rating: number) {
    const url = `/tour-comment/${tourId}/reviews`
    return axiosClient.post(url, { tourId, content, rating })
  }
}
