import { hotelApi } from '@/apis/hotel.api'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Coffee, Heart, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { hoteldetail3 } from '@/assets/images'
import ReadOnlyRating from './ReadOnlyRating'
import { useState } from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/Pagination'

interface HotelCardProps {
  isFavorite: boolean
  onFavoriteToggle: () => void
}

interface Item {
  id: string,
  hotel_names?: string,
  location?: string,
  price?: number,
  score_hotels?: string | number,
  number_rating: string | number,
  star_number?: number,
  received_time?: string,
  giveback_time?: string,
  description?: string,
  hotel_link?: string,
  place?: string,
  image?: string,
  image_2?: string,
  image_3?: string,
  image_4?: string,
  image_5?: string
}

const HotelCard: React.FC<HotelCardProps> = ({ isFavorite, onFavoriteToggle }) => {
  const [page, setPage] = useState(1);

  const { data: getAll } = useQuery({
    queryKey: ['getAllHotel', page],
    queryFn: () => hotelApi.getAll(page, 4),
  })

  const totalPages = Math.ceil(1100 / 4);
  const handleClick = (newPage: number) => {
    setPage(newPage);
  }

  console.log(page)
  return (
    <>
      {getAll?.data.map((item: Item) => (
        <div key={item.id} className='flex w-full h-[20rem] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-1'>
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
                  <p className='pt-2 text-2xl font-bold overflow-hidden whitespace-nowrap overflow-ellipsis'>{item.hotel_names}</p>
                  <p className='flex text-gray-500 text-md '>
                    <MapPin className='w-4 h-4 text-black mr-1 ' />
                    <p className='overflow-hidden whitespace-nowrap overflow-ellipsis'>
                      {item.location}
                    </p>
                  </p>
                  <div className='flex gap-2'>
                    <ReadOnlyRating rating={Number(item.score_hotels)} />
                    <div className='flex gap-1 items-center'>
                      <p className='font-bold'>20+</p>
                      <Coffee className='font-bold text-black' />
                      <p>Amenities</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button className='bg-white border border-primary'>4.2</Button>
                    <p className='font-bold'>Very good</p>
                    <p>371 reviews</p>
                  </div>
                </div>
                <div className='w-[30%] pt-4 text-right'>
                  <p className='text-3xl text-[#FF8682] font-bold'>{item.price} VNĐ/night</p>
                  <p className='mr-3 text-gray-400'>excl. tax</p>
                </div>
              </div>
              <div className='flex w-full mt-2'>
                <div className='flex items-center justify-center w-full gap-4'>
                  <Button
                    className={`flex items-center justify-center ${isFavorite ? 'bg-white border border-primary' : 'bg-primary text-white'}`}
                    onClick={onFavoriteToggle}
                  >
                    <Heart />
                  </Button>
                  <Link to={`/hotel/${item.id}`} className='w-full'>
                    <Button className='w-full bg-primary text-white'>View Place</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className='flex justify-around mt-6'>
        <Pagination>
          <PaginationContent >
            <PaginationItem>
              <Button
                className="px-4 py-2 rounded min-w-[100px] text-center" // Class thêm vào
                disabled={page === 1}
                onClick={() => handleClick(page - 1)}
              >
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                className="px-4 py-2 bg-gray-300" // Class thêm vào
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
                  className="px-4 py-2 bg-gray-300"
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
                  className="px-4 py-2 bg-gray-300"
                  onClick={() => handleClick(totalPages)}
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            )}
            <PaginationItem>
              <Button
                className="px-4 py-2 min-w-[100px]"
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

export default HotelCard;
