import { commentTourApi } from '@/apis/comment-tour.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAuth } from '@/hooks/useAuth'
import ReadOnlyRating from '@/pages/home-stay/components/ReadOnlyRating'
import BasicRating from '@/pages/home-stay/components/StarRating'
import { CommentTour, CommentTourForm } from '@/shared/ts/interface/comment-tour.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CornerRightDown, TableOfContents } from 'lucide-react'
import { SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const reviewsPerPage = 5

interface TourDetailReviewProps {
  data: CommentTour[]
  tourId: string
  total: number
}

export default function TourDetailReview({ data, tourId, total }: TourDetailReviewProps) {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
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

  const mutationReview = useMutation({
    mutationFn: (data: CommentTourForm) => commentTourApi.addComment(id ?? '', data.content, data.rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCommentTour'] })
      setComment('')
      setRating(0)
      setLoading(false)
    },
    onError: (error) => {
      alert('Có lỗi xảy ra: ' + error.message)
    }
  })

  const deleteComment = useMutation({
    mutationFn: (commentId: string) => commentTourApi.deleteComment(id ?? '', commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCommentTour'] })
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
      mutationReview.mutate({ tourId, content: comment, rating })
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
    <div className='flex w-full mt-5'>
      <div className='w-full '>
        <div>
          <hr className='my-8 border-2 border-gray ' />
        </div>
        <div className='items-center '>
          <h1 className='mb-2 text-2xl font-semibold'>{t('Reviews')}</h1>
          {isAuthenticated ? (
            <form onSubmit={handleSubmit} className='flex items-center space-x-4 '>
              <div className='w-full p-2 border border-gray-300 rounded-md'>
                <textarea
                  className='w-full p-2 border border-gray-300 rounded-md'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder='Type your message here.'
                />
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-5'>
                    <label htmlFor=''>{t('Level')}</label>
                    <BasicRating setRating={setRating} />
                  </div>
                  <Button className='px-4 py-1 text-white rounded-md w-[10rem]' loading={loading}>
                    {t('Reviews')}
                  </Button>
                </div>
              </div>
            </form>
          ) : null}
        </div>
        <div className='relative flex text-black w-[14rem] pt-5'>
          <p className='absolute left-0 text-5xl font-semibold'>{averageRating}</p>
          <div className='absolute right-0'>
            <p>{ratingStatus}</p>
            <p>{total} verified reviews</p>
          </div>
        </div>
        <div className='w-full py-2'>
          <ul className='py-6 mx-auto mt-10 space-y-4 '>
            {data?.map((item, index) => (
              <li className='p-4 bg-white rounded shadow ' key={index}>
                <div className='relative flex items-center space-x-4'>
                  <img src={item.users?.avatar} alt='avatar' className='w-12 h-12 mr-2 rounded-full' />
                  <div>
                    <p className='font-bold'>
                      {item.users?.name} - {formatDateTime(item.createdAt)}
                    </p>
                    <p>{item.content}</p>
                    <ReadOnlyRating rating={item.rating} />
                  </div>
                  <div className='absolute top-2 right-2'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <TableOfContents className='w-6 h-6 cursor-pointer' />
                      </PopoverTrigger>
                      <PopoverContent className='w-24'>
                        <Button onClick={() => handleDeleteComment(item.id)}>{t('Delete')}</Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className='absolute bottom-1 right-16'>
                    <CornerRightDown className='w-6 h-6' />
                  </div>
                  <div className='absolute bottom-1 right-2'>
                    <p onClick={() => handleReplyClick(item.id)} className='text-blue-500 cursor-pointer'>
                      {t('Reply')}
                    </p>
                  </div>
                </div>
                {isReplyVisible[item.id] && (
                  <form onSubmit={(e) => handleReplySubmit(e, item.id)} className='mt-2'>
                    <Input
                      type='text'
                      className='w-full p-2 border border-gray-300 rounded-md'
                      value={reply[item.id] || ''}
                      onChange={(e) => setReply((prev) => ({ ...prev, [item.id]: e.target.value }))}
                      placeholder='Type your reply here...'
                    />
                    <Button type='submit' className='flex px-4 py-2 mt-2 ml-auto text-white rounded-md'>
                      {t('Send')}
                    </Button>
                  </form>
                )}
              </li>
            ))}
          </ul>
          <div className='flex items-center justify-center mt-6 gap-x-[4rem]'>
            <Button
              className='px-3 py-1 bg-gray-300 rounded'
              disabled={currentPage === 1}
              onClick={() => handleClick(currentPage - 1)}
            >
              &lt;
            </Button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <Button
              className='px-3 py-1 bg-gray-300 rounded'
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
