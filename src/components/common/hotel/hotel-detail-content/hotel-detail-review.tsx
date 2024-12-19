import { commentHotelApi } from '@/apis/comment-hotel.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAuth } from '@/hooks/useAuth'
import ReadOnlyRating from '@/pages/home-stay/components/ReadOnlyRating'
import BasicRating from '@/pages/home-stay/components/StarRating'
//import BasicRating from '@/pages/home-stay/components/StarRating'
import { CommentHotel, CommentHotelForm } from '@/shared/ts/interface/comment-hotel.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CornerRightDown, TableOfContents } from 'lucide-react'
import { SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const reviewsPerPage = 5

interface HotelDetailReviewProps {
  data: CommentHotel[]
  hotelId: string
  total: number
}

export default function HotelDetailReview({ data, hotelId, total }: HotelDetailReviewProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  const totalPages = Math.ceil(data.length / reviewsPerPage)

  const [reply, setReply] = useState<{ [key: string]: string }>({})
  const [isReplyVisible, setIsReplyVisible] = useState<{ [key: string]: boolean }>({})
  const [rating, setRating] = useState<number | null>(0)
  const [comment, setComment] = useState('')
  const { id } = useParams<{ id: string | undefined }>()
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleClick = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber)
  }

  const [commentId, setCommentId] = useState<string | null>(null)

  const { data: getReplyComment } = useQuery({
    queryKey: ['getReplyComment', commentId],
    queryFn: () => commentHotelApi.getReplyComment(commentId ?? ''),
    enabled: !!commentId
  })
  const handleReplyIconClick = (commentId: string) => {
    setCommentId(commentId)
    queryClient.invalidateQueries({ queryKey: ['getReplyComment', commentId] })
  }
  console.log('getReplyComment:', getReplyComment)

  const mutationReview = useMutation({
    mutationFn: (data: CommentHotelForm) => commentHotelApi.addComment(data, id ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCommentHotel'] })
      setComment('')
      setRating(0)
      setLoading(false)
    },
    onError: (error) => {
      alert('Có lỗi xảy ra: ' + error.message)
    }
  })

  const deleteComment = useMutation({
    mutationFn: (commentId: string) => commentHotelApi.deleteComment(id ?? '', commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCommentHotel'] })
      toast.success('Xoá bình luận thành công!')
    },
    onError: (error) => {
      toast.error('Có lỗi xảy ra: ' + error.message)
    }
  })

  const handleDeleteComment = (commentId: string) => {
    deleteComment.mutate(commentId)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.trim() !== '' && rating !== null) {
      setLoading(true)
      mutationReview.mutate({ hotelId, content: comment, rating })
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }
    return date.toLocaleString('en-GB', options).replace(',', '')
  }

  const handleReplyClick = (commentId: string) => {
    setIsReplyVisible((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
  }

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>, commentId: string) => {
    e.preventDefault()
    setReply((prev) => ({ ...prev, [commentId]: '' }))
    setIsReplyVisible((prev) => ({ ...prev, [commentId]: false }))
  }

  const getRatingStatus = (rating: number) => {
    if (rating < 3) {
      return 'Not Good'
    } else if (rating < 4) {
      return 'Good'
    } else {
      return 'Very Good'
    }
  }

  const averageRating =
    data.length > 0 ? (data.reduce((sum, item) => sum + item.rating, 0) / data.length).toFixed(1) : '0.0'

  const ratingStatus = getRatingStatus(Number(averageRating))

  return (
    <div className="flex w-full mt-5">
      <div className="w-full ">
        <div>
          <hr className="my-8 border-2 border-gray " />
        </div>
        <div className="items-center ">
          <h1 className="mb-2 text-2xl font-semibold">{t('Reviews')}</h1>
          {isAuthenticated ? (
            <form onSubmit={handleSubmit} className="flex items-center space-x-4 ">
              <div className="w-full p-2 border border-gray-300 rounded-md">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type your message here."
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-5">
                    <label htmlFor="">{t('Satisfaction')}</label>
                    <BasicRating setRating={setRating} />
                  </div>
                  <Button className="px-4 py-1 text-white rounded-md w-[10rem]" loading={loading}>
                    {t('Reviews')}
                  </Button>
                </div>
              </div>
            </form>
          ) : null}
        </div>
        <div className="relative flex text-black w-[14rem] pt-5">
          <p className="absolute left-0 text-5xl font-semibold">{averageRating}</p>
          <div className="absolute right-0">
            <p>{ratingStatus}</p>
            <p>{total}  {t('reviews')}</p>
          </div>
        </div>
        <div className="w-full py-2">
          <ul className="py-6 mx-auto mt-10 space-y-4 ">
            {data?.map((item, index) => (
              <li className="p-4 bg-white rounded shadow" key={index}>
                <div className="relative flex flex-col items-start space-x-0 sm:flex-row sm:items-center sm:space-x-4">
                  <img
                    src={item.user.avatar}
                    alt="avatar"
                    className="w-12 h-12 mb-2 rounded-full sm:mb-0 sm:mr-4"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-bold">{item.user.name} - {formatDateTime(item.createdAt)}</p>
                    <p>{item.content}</p>
                    <ReadOnlyRating rating={item.rating} />
                  </div>

                  <div className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0">
                    <Popover>
                      <PopoverTrigger asChild>
                        <TableOfContents className="w-6 h-6 cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-24">
                        <Button onClick={() => handleDeleteComment(item.id)}>{t('Delete')}</Button>
                      </PopoverContent>
                    </Popover>
                  </div>



                  <div onClick={() => handleReplyClick(item.id)} className="absolute flex items-center justify-center space-x-2 top-8 right-2 sm:relative sm:bottom-0 sm:right-10">
                    <p className="text-blue-500 cursor-pointer">
                      {t('Reply')}
                    </p>
                    <CornerRightDown className="w-6 h-6 cursor-pointer" onClick={() => handleReplyIconClick(item.id)} />
                  </div>
                </div>

                {isReplyVisible[item.id] && (
                  <form onSubmit={(e) => handleReplySubmit(e, item.id)} className="mt-2">
                    <Input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={reply[item.id] || ''}
                      onChange={(e) => setReply((prev) => ({ ...prev, [item.id]: e.target.value }))}
                      placeholder="Type your reply here..."
                    />
                    <Button type="submit" className="flex px-4 py-2 mt-2 ml-auto text-white rounded-md">
                      {t('Send')}
                    </Button>
                  </form>
                )}
              </li>

            ))}
          </ul>
          <div className="flex items-center justify-center mt-6 gap-x-[4rem]">
            <Button
              className="px-3 py-1 bg-gray-300 rounded"
              disabled={currentPage === 1}
              onClick={() => handleClick(currentPage - 1)}
            >
              &lt;
            </Button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <Button
              className="px-3 py-1 bg-gray-300 rounded"
              disabled={currentPage === totalPages}
              onClick={() => handleClick(currentPage + 1)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
