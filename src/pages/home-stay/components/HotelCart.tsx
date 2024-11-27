import { hotelApi } from '@/apis/hotel.api'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { HotelResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { Coffee, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ReadOnlyRating from './ReadOnlyRating'
interface HotelCardProps {
  priceRangeMax: number | undefined
  priceRangeMin: number | undefined
  sortByPrice: string
  starNumber?: number | undefined
  selectedPlaces?: string[]
}

const HotelCard: React.FC<HotelCardProps> = ({
  priceRangeMax,
  priceRangeMin,
  sortByPrice,
  starNumber,
  selectedPlaces
}) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const { data: getAll, isLoading } = useQuery({
    queryKey: ['getAllHotel', page, sortByPrice, priceRangeMin, priceRangeMax, starNumber, selectedPlaces],
    queryFn: () =>
      hotelApi.getAll(page, 4, '', sortByPrice, priceRangeMin, priceRangeMax, starNumber, selectedPlaces?.join(','))
  })

  const totalPages = Math.ceil((getAll?.total ?? 0) / 4)
  const handleClick = (newPage: number) => {
    setPage(newPage)
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[30rem]'>
        <div className='w-8 h-8 border-4 border-[#a185f4] rounded-full border-t-transparent animate-spin'></div>
      </div>
    )
  }

  return (
    <>
      {(getAll?.data.length ?? 0) > 0 ? (
        getAll?.data.map((item: HotelResponseType) => (
          <div
            key={item.id}
            className='grid grid-cols-1 md:grid-cols-3 w-full h-auto rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-1'
          >
            {/* Left Section (Image) */}
            <div className='relative col-span-1 md:col-span-1'>
              <img src={item.image} alt='Hotel' className='object-cover w-full h-full rounded-l-xl' />
              <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                9 images
              </p>
            </div>

            {/* Right Section (Hotel Details) */}
            <div className='col-span-1 md:col-span-2 p-4 bg-white'>
              <div className='flex flex-col w-full h-full'>
                <div className='flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 border-b-2 border-gray-400 pb-4'>
                  <div className='col-span-2 flex flex-col gap-4'>
                    <p className='pt-2 text-2xl font-bold text-ellipsis overflow-hidden'>
                      {item.hotel_names}
                    </p>
                    <div className='flex text-gray-500 text-md'>
                      <MapPin className='mr-1 text-black' />
                      <span className='text-ellipsis overflow-hidden'>{item.location}</span>
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
                  <div className='col-span-1 text-right'>
                    <p className='text-3xl text-[#FF8682] font-bold'>{formatCurrencyVND(item.price)}</p>
                    <p className='text-gray-400'>excl. tax</p>
                  </div>
                </div>

                {/* Button and Details Section */}
                <div className='flex w-full mt-2'>
                  <div className='flex items-center justify-center w-full gap-4'>
                    <Link to={`/hotel/${item.id}`} className='w-full'>
                      <Button className='w-full text-white bg-primary'>{t('ViewDeals')}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>


        ))
      ) : (
        <div className='flex items-center justify-center h-[30rem]'>
          <div className='w-8 h-8 border-4 border-[#a185f4] rounded-full border-t-transparent animate-spin'></div>
        </div>
      )}
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
