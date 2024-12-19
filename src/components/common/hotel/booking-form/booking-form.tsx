import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Sofa, User } from 'lucide-react'

import { hotelApi } from '@/apis/hotel.api'
import { useDebounce } from '@/hooks/useDebounce'
import { HotelResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { DatePickerWithPresets } from '../../calendar/calendar-date'
import { useTranslation } from 'react-i18next'

export default function BookingForm() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)
  const [pageHotel, setPageHotel] = useState(1)
  const [hotels, setHotels] = useState<HotelResponseType[]>([])
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)

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
    <div className="flex flex-wrap w-full gap-4">
      {/* Destination */}
      <div className="relative w-full sm:w-[48%] lg:w-[23%] h-[4rem]">
        <Label
          htmlFor=""
          className="absolute z-10 p-3 text-sm text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4"
        >
          {t('Search')}
        </Label>
        <Input
          className="w-full border border-[#F3F4F6] p-2 h-[3.5rem] pt-4 pl-12"
          placeholder="Istanbul, Turkey"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Sofa className="absolute left-3 top-[23px] z-20" />
        {isLoading ? (
          <div className="absolute top-[4rem] left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md">
            Loading...
          </div>
        ) : (
          getHotelAll &&
          debouncedSearchTerm && (
            <InfiniteScroll
              dataLength={hotels.length}
              next={loadMore}
              hasMore={!isFetching && getHotelAll?.data?.length === 20}
              loader={<h4>Loading more hotels...</h4>}
              height={200}
              endMessage={<p>You have seen all hotels</p>}
            >
              <div className="absolute top-[4rem] left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md h-40 overflow-y-auto">
                {getHotelAll?.data?.map((hotel) => (
                  <div key={hotel.id} className="p-2 cursor-pointer hover:bg-gray-100">
                    <Link to={`/hotel/${hotel.id}`}>
                      {hotel.hotel_names} - {hotel.place}
                    </Link>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          )
        )}
      </div>

      {/* Check In */}
      <div className="relative w-full sm:w-[48%] lg:w-[23%] h-[4rem]">
        <Label
          htmlFor=""
          className="absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm"
        >
          Check In
        </Label>
        <DatePickerWithPresets date={checkIn} setDate={setCheckIn} />

      </div>

      {/* Check Out */}
      <div className="relative w-full sm:w-[48%] lg:w-[23%] h-[4rem]">
        <Label
          htmlFor=""
          className="absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm"
        >
          Check Out
        </Label>
        <DatePickerWithPresets date={checkOut} setDate={setCheckOut} />

      </div>

      {/* Rooms & Guests */}
      <div className="relative w-full sm:w-[48%] lg:w-[23%] h-[4rem]">
        <Label
          htmlFor=""
          className="absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm"
        >
          Rooms & Guests
        </Label>
        <Input
          className="w-full border border-[#F3F4F6] p-2 h-16 pt-4 pl-12"
          placeholder="1 room ,2 guest"
        />
        <User className="absolute left-3 top-[23px] z-20" />
      </div>
    </div>

  )
}
