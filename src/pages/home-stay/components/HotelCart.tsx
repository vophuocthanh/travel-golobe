import { hotelApi } from '@/apis/hotel.api'
import { hoteldetail3 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { HotelResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { Coffee, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReadOnlyRating from './ReadOnlyRating'

interface HotelCardProps {
  priceRangeMax: number | undefined
  priceRangeMin: number | undefined
  sortByPrice: string
  starNumber?: number | undefined
}

const HotelCard: React.FC<HotelCardProps> = ({ priceRangeMax, priceRangeMin, sortByPrice, starNumber }) => {
  const [page, setPage] = useState(1)
  const { data: getAll } = useQuery({
    queryKey: ['getAllHotel', page, sortByPrice, priceRangeMin, priceRangeMax, starNumber],
    queryFn: () => hotelApi.getAll(page, 4, '', sortByPrice, priceRangeMin, priceRangeMax, starNumber)
  })

  const totalPages = Math.ceil((getAll?.total ?? 0) / 4)
  const handleClick = (newPage: number) => {
    setPage(newPage)
  }

  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'N/A'
    const numberValue = parseFloat(value)
    return isNaN(numberValue)
      ? 'N/A'
      : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberValue)
  }

  return (
    <>
      {getAll?.data.map((item: HotelResponseType) => (
        <div
          key={item.id}
          className='flex w-full h-[20rem] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-1'
        >
          <div className='w-[35%] bg-blue-300 flex-3 relative'>
            <img src={hoteldetail3} alt='Hotel' className='object-cover w-full h-full rounded-l-xl' />
            <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
              9 images
            </p>
          </div>
          <div className='w-[65%] flex-7 h-full p-4 bg-white'>
            <div className='flex flex-col w-full h-full'>
              <div className='flex flex-row w-full h-[75%] border-b-2 border-gray-400 pb-4'>
                <div className='w-[70%] flex flex-col gap-4'>
                  <p className='pt-2 overflow-hidden text-2xl font-bold whitespace-nowrap overflow-ellipsis'>
                    {item.hotel_names}
                  </p>
                  <div className='flex text-gray-500 text-md '>
                    <MapPin className='w-4 h-4 mr-1 text-black ' />
                    <span className='overflow-hidden whitespace-nowrap overflow-ellipsis'>{item.location}</span>
                  </div>
                  <div className='flex gap-2'>
                    <ReadOnlyRating rating={Number(item.star_number)} />
                    <div className='flex items-center gap-1'>
                      <p className='font-bold'>20+</p>
                      <Coffee className='font-bold text-black' />
                      <p>Amenities</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button className='text-white'>{item.score_hotels}</Button>
                    <p className='font-bold'>Very good</p>
                    <p>371 reviews</p>
                  </div>
                </div>
                <div className='w-[30%] pt-4 text-right'>
                  <p className='text-3xl text-[#FF8682] font-bold'>{formatCurrency(item.price?.toString())}</p>
                  <p className='mr-3 text-gray-400'>excl. tax</p>
                </div>
              </div>
              <div className='flex w-full mt-2'>
                <div className='flex items-center justify-center w-full gap-4'>
                  <Link to={`/hotel/${item.id}`} className='w-full'>
                    <Button className='w-full text-white bg-primary'>View Place</Button>
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
              <Button
                className='px-4 py-2 text-white rounded min-w-[100px] text-center'
                disabled={page === 1}
                onClick={() => handleClick(page - 1)}
              >
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                className={`px-4 py-2 text-white bg-gray-300 ${page == 1 ? 'bg-primary' : ''}`}
                onClick={() => handleClick(1)}
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
                  className={`px-4 py-2 text-white bg-gray-300 ${page > 1 ? 'bg-primary' : ''}`}
                  onClick={() => handleClick(page)}
                >
                  {page}1
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
                  className={`px-4 py-2 text-white bg-gray-300 ${page == totalPages ? 'bg-primary' : ''}`}
                  onClick={() => handleClick(totalPages)}
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            )}
            <PaginationItem>
              <Button
                className='px-4 text-white py-2 min-w-[100px]'
                onClick={() => handleClick(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default HotelCard
