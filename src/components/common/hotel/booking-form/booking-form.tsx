import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { CalendarDays, Sofa, User } from 'lucide-react'
import { hotelApi } from '@/apis/hotel.api'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function BookingForm() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)

  const { data: getHotelAll, isLoading } = useQuery({
    queryKey: ['getHotelAllSearch', debouncedSearchTerm],
    queryFn: () => hotelApi.getAll(1, 50, debouncedSearchTerm),
    enabled: !!debouncedSearchTerm
  })
  console.log(getHotelAll?.data, "123");

  return (
    <div className='flex flex-wrap justify-between p-4 space-x-2'>
      <div className='relative w-[20rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute p-1.5 dark:p-0 text-gray-800 dark:text-gray-300 bg-white transform -translate-y-1/2 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 top-1 left-4 z-10 text-sm rounded'        >
          Enter Destination
        </Label>
        <Input
          className='max-w-md w-[24rem] border border-black dark:border-gray-600 p-2 h-[3.5rem] pt-4 pl-12 dark:bg-gray-800 dark:text-gray-300'
          placeholder='Istanbul, Turkey'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Sofa className='absolute left-3 top-[1rem] z-20 text-black dark:text-gray-300' />

        {isLoading ? (
          <div className='absolute top-[4rem] left-0 w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-md'>
            Loading...
          </div>
        ) : (
          getHotelAll &&
          debouncedSearchTerm && (
            <div className='absolute top-[4rem] left-0 w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-md h-40 overflow-y-auto'>
              {getHotelAll?.data
                ?.filter((hotel) => hotel.hotel_names?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
                .map((hotel) => (
                  <div key={hotel.id} className='p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'>
                    <Link to={`/hotel/${hotel.id}`} className='dark:text-gray-300'>{hotel.hotel_names}</Link>
                  </div>
                ))}
            </div>
          )
        )}
      </div>

      {/* Check-in */}
      <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute p-1.5 dark:p-0 text-gray-800 dark:text-gray-300 bg-white transform -translate-y-1/2 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 top-1 left-4 z-10 text-sm rounded'        >
          Check In
        </Label>
        <Input className='max-w-md w-[24rem] border border-black dark:border-gray-600 p-2 h-[3.5rem] pt-4 dark:bg-gray-800 dark:text-gray-300' placeholder='Fri 12/2' />
        <CalendarDays className='absolute right-3 top-3.5 text-black dark:text-gray-300' />
      </div>

      {/* Check-out */}
      <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute p-1.5 dark:p-0 text-gray-800 dark:text-gray-300 bg-white transform -translate-y-1/2 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 top-1 left-4 z-10 text-sm rounded'        >
          Check Out
        </Label>
        <Input className='max-w-md w-[24rem] border border-black dark:border-gray-600 p-2 h-[3.5rem] pt-4 dark:bg-gray-800 dark:text-gray-300' placeholder='Fri 20/2' />
        <CalendarDays className='absolute right-3 top-3.5 text-black dark:text-gray-300' />
      </div>

      <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor='rooms'
          className='absolute p-1.5 dark:p-0 text-gray-800 dark:text-gray-300 bg-white transform -translate-y-1/2 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 top-1 left-4 z-10 text-sm rounded'

        >
          Rooms & Guests
        </Label>

        <Input
          className='max-w-md w-[24rem] border border-black dark:border-gray-600 p-2 h-[3.5rem] pt-4 pl-12 dark:bg-gray-800 dark:text-gray-300'
          placeholder='1 room ,2 guests'
        />
        <User className='absolute left-3 top-3.5 z-20 text-black dark:text-gray-300' />


      </div>
    </div>
  )
}

