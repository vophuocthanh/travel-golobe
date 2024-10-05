import axiosClient from '@/apis/axios-client'

export const commentCoachApi = {
  getComments(coachId: string){
    const url = `/coach-comment/${coachId}/reviews`
    return axiosClient.get(url)
  },
  addComment(coachId: string, content: string, rating: number) {
    const url = `/coach-comment/${coachId}/reviews`
    return axiosClient.post(url, { coachId, content, rating })
  }
}
