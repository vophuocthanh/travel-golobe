import axiosClient from '@/apis/axios-client'
import { ListResponse } from '@/shared/ts/interface'
import { CommentHotelForm, ReplyCommentForm } from '@/shared/ts/interface/comment-hotel.interface'

export const commentHotelApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getComments(hotelId: string): Promise<ListResponse<any>> {
    const url = `/hotel-comment/${hotelId}/reviews`
    return axiosClient.get(url)
  },
  addComment(data: CommentHotelForm, hotelId: string) {
    const url = `/hotel-comment/${hotelId}/reviews`
    return axiosClient.post(url, data)
  },
  updateComment(commentId: string, data: CommentHotelForm) {
    const url = `/hotel-comment/review/${commentId}`
    return axiosClient.put(url, data)
  },
  deleteComment(hotelId: string, commentId: string) {
    const url = `/hotel-comment/${hotelId}/review/${commentId}`
    return axiosClient.delete(url)
  },
  replyComment(commentId: string, hotelId: string, data: ReplyCommentForm) {
    const url = `/hotel-comment/${hotelId}/review/${commentId}/replies`
    return axiosClient.post(url, data)
  },
  getReplyComment(commentId: string) {
    const url = `/hotel-comment/${commentId}/replies`
    return axiosClient.get(url)
  }
}
