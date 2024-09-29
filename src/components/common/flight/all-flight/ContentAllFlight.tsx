import { useState } from 'react'
import FilterSection from './FilterSection'
import FlightCard from './FlightCard'
import { Input } from '@/components/ui/input'
import { IconVector, IconVectorDown } from '@/common/icons'
import IconSreach from '@/common/icons/IconSreach'
import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '../../calendar/calendar-date'

import { DateRange } from 'react-day-picker'
import { addDays, format } from 'date-fns'
import { toast } from 'sonner'

export default function ContentAllFlight() {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [fromDate, setFromDate] = useState<string | undefined>(undefined)
  const [toDate, setToDate] = useState<string | undefined>(undefined)

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20)
  })

  const handleDateChange = (from: string | undefined, to: string | undefined) => {
    setFromDate(from)
    setToDate(to)
  }
  const handleApplyFilter = (min: number | undefined, max: number | undefined) => {
    setMinPrice(min)
    setMaxPrice(max)
  }

  const handleSearch = () => {
    const hasFlights = (from: string, to: string) => {
      return !from && !to
    }

    if (date) {
      const fromDate = date.from ? format(date.from, 'dd-MM-yyyy') : ''
      const toDate = date.to ? format(date.to, 'dd-MM-yyyy') : ''
      handleDateChange(fromDate, toDate)

      if (!hasFlights(fromDate, toDate)) {
        toast.error('Không có chuyến bay nào trong ngày đã chọn!')
        setFromDate(undefined)
        setToDate(undefined)
        setDate(undefined)
      }
    }
  }
  console.log(date)

  return (
    <div className={`flex flex-row  mx-[6rem] mt-10 space-y-2 gap-2 h-[120rem]`}>
      <FilterSection onApplyFilter={handleApplyFilter} />
      <div className='flex-none w-[70%] ml-2 mt-14  '>
        <div className='bg-[#FFFFFF] flex flex-row justify-between w-full h-[6rem] rounded-md  hover:cursor-pointer'>
          <div className='flex items-center justify-center w-full h-[11rem] overflow-hidden relative bg-gray-100'>
            <div className='flex items-center justify-center bg-white rounded-lg shadow-md shadow-slate-300 w-full h-[8rem]'>
              <div className='grid items-center grid-cols-9 gap-4'>
                <div className='relative w-full col-span-3 ml-4'>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    From - To
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='Lahore - Karachi'
                  />
                  <div className='absolute right-3 top-4'>
                    <IconVector />
                  </div>
                </div>
                <div className='relative w-full col-span-2 ml-5'>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    Trip
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full  pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='Return'
                  />
                  <div className='absolute right-3 top-6'>
                    <IconVectorDown />
                  </div>
                </div>
                <div className='relative z-10 w-full col-span-3 ml-5'>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    Depart - Return
                  </label>

                  <DatePickerWithRange
                    date={date}
                    setDate={setDate}
                    className='z-0 block text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md '
                  />
                </div>
                <div className='w-full col-span-1 ml-4'>
                  <Button className='h-[3rem] mt-1 w-[3.8rem]' onClick={handleSearch}>
                    <IconSreach />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-8 '>
          <FlightCard
            toDate={toDate}
            fromDate={fromDate}
            minPrice={minPrice}
            maxPrice={maxPrice}
            isFavorite={false}
            onToggleFavorite={() => {
              throw new Error('Function not implemented.')
            }}
          />
        </div>
      </div>
    </div>
  )
}
