import { flightApi } from '@/apis/flight.api'
import IconSreach from '@/common/icons/IconSreach'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'
import { DatePickerWithPresets } from '../../calendar/calendar-date'
import FilterSection from './FilterSection'
import FlightCard from './FlightCard'

export default function ContentAllFlight() {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  const [departDate, setDepartDate] = useState<Date | undefined>(undefined)
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
  const [filteredDepartDate, setFilteredDepartDate] = useState<string | undefined>(undefined)
  const [filteredReturnDate, setFilteredReturnDate] = useState<string | undefined>(undefined)
  const formattedDepartDate: string | undefined = departDate ? format(departDate, 'dd-MM-yyyy') : undefined
  const formattedReturnDate: string | undefined = returnDate ? format(returnDate, 'dd-MM-yyyy') : undefined
  const handleApplyFilter = (min: number | undefined, max: number | undefined) => {
    setMinPrice(min)
    setMaxPrice(max)
  }
  const [searchTo, setSearchTo] = useState('')
  const [searchFrom, setSearchFrom] = useState('')
  const [tempSearchTo, setTempSearchTo] = useState('')
  const [tempSearchFrom, setTempSearchFrom] = useState('')
  const [selectBrands, setSelectBrands] = useState<string[]>([])

  const { data: getFlightCountBrand } = useQuery({
    queryKey: ['getFlightCountBrand'],
    queryFn: () => flightApi.getCountBrands()
  })

  const handleCheckSelectBrand = (brand: string) => {
    setSelectBrands([brand])
  }

  const handleSearch = () => {
    setSearchFrom(tempSearchFrom)
    setSearchTo(tempSearchTo)
    setFilteredDepartDate(formattedDepartDate)
    setFilteredReturnDate(formattedReturnDate)
  }

  return (
    <div className={`flex flex-row  mx-[6rem] mt-10 space-y-2 gap-2 h-[120rem]`}>
      <div className='flex-none w-full ml-2 mt-14 '>
        <div className='bg-[#FFFFFF] flex flex-row justify-between w-full h-[6rem] rounded-md  hover:cursor-pointer'>
          <div className='flex items-center justify-center w-full h-[11rem] overflow-hidden relative bg-gray-100'>
            <div className='flex items-center justify-center bg-white rounded-lg shadow-md shadow-slate-300 w-full h-[8rem]'>
              <div className='grid items-center justify-center grid-cols-9 gap-4 pl-8'>
                <div className='relative w-full col-span-2 ml-4 '>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    From
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-primary focus:border-primary sm:text-md'
                    placeholder='Search for city or airport'
                    onChange={(e) => setTempSearchFrom(e.target.value)}
                  />
                </div>
                <div className='relative w-full col-span-2 ml-5'>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    To
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full  pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-primary focus:border-primary sm:text-md'
                    placeholder='Search for city or airport'
                    onChange={(e) => setTempSearchTo(e.target.value)}
                  />
                </div>
                <div className='relative z-10 w-full col-span-2 ml-5'>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    Depart
                  </label>
                  <div className='flex  text-lg w-full mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-primary focus:border-primary sm:text-md'>
                    <DatePickerWithPresets date={departDate} setDate={setDepartDate} />
                  </div>
                </div>
                <div className='relative z-10 w-full col-span-2 ml-5'>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    Return
                  </label>
                  <div className='flex text-lg w-full mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-primary focus:border-primary sm:text-md'>
                    <DatePickerWithPresets date={returnDate} setDate={setReturnDate} />
                  </div>{' '}
                </div>
                <div className='w-full col-span-1 ml-5'>
                  <Button className='h-[3rem] mt-1 w-[3.8rem]' onClick={handleSearch}>
                    <IconSreach />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-row gap-8 '>
          <FilterSection
            onApplyFilter={handleApplyFilter}
            brandFlight={selectBrands}
            handleSelectBrand={handleCheckSelectBrand}
            data={getFlightCountBrand?.data}
          />
          <div className='w-full h-full'>
            <FlightCard
              searchFrom={searchFrom}
              searchTo={searchTo}
              returnDate={filteredReturnDate}
              departDate={filteredDepartDate}
              minPrice={minPrice}
              maxPrice={maxPrice}
              brandFlight={selectBrands}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
