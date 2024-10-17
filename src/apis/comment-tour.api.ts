/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { CommentTourForm } from '@/shared/ts/interface/comment-tour.interface'

export const commentTourApi = {
  getComments(tourId: string): Promise<ListResponse<any>> {
    const url = `/tour-comment/${tourId}/reviews`
    return axiosClient.get(url)
  },
  addComment(tourId: string, content: string, rating: number) {
    const url = `/tour-comment/${tourId}/reviews`
    return axiosClient.post(url, { tourId, content, rating })
  },
  updateComment(commentId: string, data: CommentTourForm) {
    const url = `/tour-comment/reviews/${commentId}`
    return axiosClient.put(url, data)
  },
  deleteComment(tourId: string, commentId: string) {
    const url = `/tour-comment/${tourId}/reviews/${commentId}`
    return axiosClient.delete(url)
  }
}
