import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { CalendarDays, Sofa, User } from 'lucide-react'

import { hotelApi } from '@/apis/hotel.api'
import { useDebounce } from '@/hooks/useDebounce'
import { HotelResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

export default function BookingForm() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)
  const [pageHotel, setPageHotel] = useState(1)
  const [hotels, setHotels] = useState<HotelResponseType[]>([])

  const {
    data: getHotelAll,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['getHotelAllSearch', debouncedSearchTerm],
    queryFn: () => hotelApi.getAll(pageHotel, 1000, debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
    refetchOnWindowFocus: true
  })

  useEffect(() => {
    if (getHotelAll?.data) {
      setHotels((prev) => [
        ...prev,
        ...getHotelAll.data.filter((hotel) => hotel.place?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      ])
    }
  }, [debouncedSearchTerm, getHotelAll])

  const loadMore = () => {
    setPageHotel((prevPage) => prevPage + 1)
  }

  return (
    <div className='flex flex-wrap justify-between p-4 space-x-2'>
      <div className='relative w-[20rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute z-10 p-3 text-sm text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4'
        >
          Enter Destination
        </Label>
        <Input
          className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4 pl-12'
          placeholder='Istanbul, Turkey'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Sofa className='absolute left-3 top-[1rem] z-20 ' />

        {isLoading ? (
          <div className='absolute top-[4rem] left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md'>
            Loading...
          </div>
        ) : (
          getHotelAll &&
          debouncedSearchTerm && (
            <>
              <InfiniteScroll
                dataLength={hotels.length}
                next={loadMore}
                hasMore={!isFetching && getHotelAll?.data?.length === 20}
                loader={<h4>Loading more hotels...</h4>}
                height={200}
                endMessage={<p>You have seen all hotels</p>}
              >
                <div className='absolute top-[4rem] left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md h-40 overflow-y-auto'>
                  {getHotelAll?.data
                    ?.filter((hotel) => hotel.place?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
                    .map((hotel) => (
                      <div key={hotel.id} className='p-2 cursor-pointer hover:bg-gray-100'>
                        <Link to={`/hotel/${hotel.id}`}>{hotel.hotel_names}</Link>
                      </div>
                    ))}
                </div>
              </InfiniteScroll>
            </>
          )
        )}
      </div>

      <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm'
        >
          Check In
        </Label>
        <Input className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4' placeholder='Fri 12/2' />
        <CalendarDays className='absolute right-3 top-3.5' />
      </div>
      <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm'
        >
          Check Out
        </Label>
        <Input className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4' placeholder='Fri 20/2' />
        <CalendarDays className='absolute right-3 top-3.5' />
      </div>
      <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm'
        >
          Rooms & Guests
        </Label>
        <Input
          className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4 pl-12'
          placeholder='1 room ,2 guest'
        />
        <User className='absolute left-3 top-3.5 z-20' />
      </div>
    </div>
  )
}
