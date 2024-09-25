import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { flightApi } from '@/apis/flight.api'
import { flightreview1 } from '@/assets/images'
import { Pagination, PaginationContent, PaginationItem, PaginationEllipsis } from '@/components/ui/pagination' // Đảm bảo import component Pagination

interface FlightCardProps {
  id: string
  image: string
  price: string
  rating: string
  reviews: string
  brand: string
  trip_time: string
  images: string
  start_time: string
  end_time: string
  trip_to: string
  take_place: string
  create_at?: string
  destination: string
  isFavorite: boolean
  onToggleFavorite: () => void
}

const formatPrice = (price: string) => {
  const numberPrice = parseFloat(price)
  return numberPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

const FlightCard: React.FC<FlightCardProps> = ({ isFavorite, onToggleFavorite }) => {
  const [page, setPage] = useState(1)

  const { data: getAll } = useQuery({
    queryKey: ['getAllHotel', page],
    queryFn: () => flightApi.getAll(page, 4)
  })

  const totalPages = Math.ceil(314 / 4)
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <>
      {getAll?.data.map((flight: FlightCardProps) => (
        <div key={flight.id} className='flex w-full h-[23rem] rounded-xl overflow-hidden'>
          <div className='w-[40%] bg-white relative'>
            <img src={flightreview1} alt='Flight' className='object-cover w-[90%] h-34 ml-8 mt-4' />
            <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-6 right-2'>
              9 images
            </p>
          </div>
          <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
            <div className='flex flex-col w-full h-full '>
              <div className='w-full h-[75%] border-b-2 border-gray-400'>
                <div className='flex flex-row w-full h-full'>
                  <div className='w-[70%] flex flex-col gap-4'>
                    <div className='flex items-center gap-2 mt-8'>
                      <Button className='bg-white border border-primary'>4.2</Button>
                      <p className='font-bold'>Very good</p>
                      <p>54 reviews</p>
                    </div>

                    <div className='mb-4'>
                      <div className='flex items-center mb-2'>
                        <div className='flex-grow'>
                          <div className='flex items-center justify-center gap-4 text-black'>
                            <div className='text-2xl '>
                              {flight.start_time} - {flight.end_time}
                            </div>
                            <div></div>

                            <div className='text-2xl'>Trip Time: {flight.trip_time}</div>
                          </div>
                        </div>
                      </div>
                      <div className='flex w-[30rem]'>
                        <p className='text-left text-gray-500 mr-[4rem] ml-9'>
                          <div className='flex '>
                            <p className='flex mb-2 font-bold text-black'>From : </p> {flight.take_place}
                          </div>
                          <div className='flex'>
                            <p className='font-bold text-black'>To : </p> {flight.destination}
                          </div>
                        </p>
                      </div>
                      <div className='flex mt-8 ml-6 text-xl'>
                        <p className='mr-2 font-bold text-black '>Brand: </p> {flight.brand}
                      </div>
                    </div>
                  </div>
                  <div className='w-[30%] pt-4 text-right mr-5'>
                    <p className='text-xl text-[#FF8682] font-bold'>{formatPrice(flight.price)}</p>
                    <p className='mt-40 font-medium text-right text-black-500'>Trip To: {flight.trip_to}</p>
                  </div>
                </div>
              </div>
              <div className='w-full h-[25%] flex'>
                <div className='flex flex-row items-center w-full gap-4'>
                  <Button
                    className={isFavorite ? 'bg-white border border-primary' : 'bg-primary text-white w-[3.6rem] '}
                    onClick={onToggleFavorite}
                  >
                    <Heart />
                  </Button>
                  <Link to={`/flight/${flight.id}`} className='w-[35rem]'>
                    <Button className='w-full mx-4 text-white'>View Deals</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className='flex justify-around mt-6'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className='text-white'>
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                onClick={() => handlePageChange(1)}
                className={page === 1 ? 'bg-blue-500 text-white' : ''} // Nút trang đầu
              >
                1
              </Button>
            </PaginationItem>
            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page > 1 && page < totalPages && (
              <PaginationItem>
                <Button
                  onClick={() => handlePageChange(page)}
                  className={page === page ? 'bg-blue-500 text-white' : ''} // Nút trang hiện tại
                >
                  {page}
                </Button>
              </PaginationItem>
            )}
            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {totalPages > 1 && (
              <PaginationItem>
                <Button
                  onClick={() => handlePageChange(totalPages)}
                  className={page === totalPages ? 'bg-blue-500 text-white' : ''}
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            )}
            <PaginationItem>
              <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className='text-white'>
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default FlightCard
