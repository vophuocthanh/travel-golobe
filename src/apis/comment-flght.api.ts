import axiosClient from '@/apis/axios-client'

export const commentFlightApi = {
  getComments(flightId: string){
    const url = `/flight-comment/${flightId}/reviews`
    return axiosClient.get(url)
  },
  addComment(flightId: string, content: string, rating: number) {
    const url = `/flight-comment/${flightId}/reviews`
    return axiosClient.post(url, { flightId, content, rating })
  }
}
