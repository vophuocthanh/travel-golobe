export interface CommentHotel {
  id: string
  content: string
  rating: number
  createdAt: string
  updateAt: string
  userId: string
  hotelId: string
  user: {
    id: string
    name: string
    email: string
    avatar: string
  }
}

export interface CommentHotelForm {
  content: string
  rating: number
  hotelId: string
}

export interface ReplyCommentForm {
  content: string
}
