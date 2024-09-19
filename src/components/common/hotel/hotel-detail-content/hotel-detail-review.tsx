import { IconFlag } from '@/common/icons'
import { Button } from '@/components/ui/button'
import { CommentHotel } from '@/shared/ts/interface/comment-hotel.interface'
import { SetStateAction, useState } from 'react'

const reviewsPerPage = 5

interface HotelDetailReviewProps {
  data: CommentHotel[]
}

export default function HotelDetailReview({ data }: HotelDetailReviewProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / reviewsPerPage)

  const handleClick = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className='flex w-full mt-5'>
      <div className='w-full '>
        <div>
          <hr className='my-8 border-2 border-gray ' />
        </div>
        <div className='flex items-center justify-between '>
          <h1 className='mb-2 text-2xl font-semibold'>Review</h1>
          <Button className='px-4 py-2 text-black rounded-md w-[10rem] h-[3rem]'>Give your review</Button>
        </div>
        <div className='relative flex text-black w-[14rem] '>
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
                    <p className='font-bold'>
                      {item.rating} Amazing | {item.content}
                    </p>
                    <p className='text-gray-700 w-[85%]'>dasdsadsadsdas</p>
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
