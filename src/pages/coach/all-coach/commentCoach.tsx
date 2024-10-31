import { commentFlightApi } from '@/apis/comment-flght.api'
import { IconFlag } from '@/common/icons'
import { Button } from '@/components/ui/button'
import ReadOnlyRating from '@/pages/home-stay/components/ReadOnlyRating'
import BasicRating from '@/pages/home-stay/components/StarRating'
import { CommenCoach } from '@/shared/ts/interface/comment-coach.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
const reviewsPerPage = 5

interface CoachDetailReviewProps {
  data: CommenCoach[]
}

export default function CoachDetailReview({ data }: CoachDetailReviewProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { t } = useTranslation()

  const totalPages = Math.ceil(data.length / reviewsPerPage)

  const handleClick = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber)
  }

  const [rating, setRating] = useState<number | null>(0)
  const [comment, setComment] = useState('')
  const { id } = useParams<{ id: string | undefined }>()
  const queryClient = useQueryClient()

  const mutationReview = useMutation({
    mutationFn: ({ flightId, content, rating }: { flightId: string; content: string; rating: number }) =>
      commentFlightApi.addComment(flightId, content, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getComments'] })
      setComment('')
      setRating(0)
    },
    onError: (error) => {
      alert('Có lỗi xảy ra: ' + error.message)
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.trim() !== '' && rating !== null) {
      const flightId = id ?? ''
      mutationReview.mutate({ flightId, content: comment, rating })
    }
  }

  return (
    <div className='flex w-full mt-5'>
      <div className='w-full '>
        <div>
          <hr className='my-8 border-2 border-gray ' />
        </div>
        <div className='items-center'>
          <h1 className='mb-2 text-2xl font-semibold'>{t('Reviews')}</h1>
          <form onSubmit={handleSubmit} className='flex items-center space-x-4'>
            <div className='w-full p-2 border border-gray-300 rounded-md'>
              <textarea
                className='w-full p-2 border border-gray-300 rounded-md'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Type your message here.'
              />
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-5'>
                  <label htmlFor=''>Satisfaction Level.</label>
                  <BasicRating setRating={setRating} />
                </div>
                <Button className='px-4 py-2 text-black rounded-md w-[10rem] h-[3rem]'>{t('Reviews')}</Button>
              </div>
            </div>
          </form>
        </div>
        <div className='relative flex text-black w-[14rem] pt-5 '>
          <p className='absolute left-0 text-5xl font-semibold'>4.2</p>
          <div className='absolute right-0'>
            <p>Very good</p>
            <p>371 verified reviews</p>
          </div>
        </div>
        <div className='w-full py-2'>
          <ul className='py-6 mx-auto mt-10 space-y-4 '>
            {data?.map((item, index) => (
              <li className='p-4 bg-white rounded shadow ' key={index}>
                <div className='relative flex items-center space-x-4'>
                  <img
                    src='https://images.unsplash.com/photo-1519564337578-2598cfe4dc80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt=''
                    className='w-12 h-12 mr-2 rounded-full'
                  />
                  <div>
                    <p className='font-bold'>Amazing | {item.content}</p>
                    <ReadOnlyRating rating={item.rating} />
                  </div>
                  <div className='absolute top-2 right-2'>
                    <IconFlag />
                  </div>
                </div>
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
