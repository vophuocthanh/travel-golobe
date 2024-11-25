import IconSreach from '@/common/icons/IconSreach'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { useState } from 'react'
import { DatePickerWithPresets } from '../../calendar/calendar-date'
import FilterSectionCoach from './FilterSectionCoach';
import CoachCard from './CoachCard'
import { useLocation } from 'react-router-dom'
import { coachApi } from '@/apis/coach.api'
import { useQuery } from '@tanstack/react-query'
import { Filter } from 'lucide-react'

export default function ContentAllCoach() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchToFromQuery = query.get('searchTo');
  const searchFromFromQuery = query.get('searchFrom');
  const departDateFromQuery = query.get('departDate');
  const returnDateFromQuery = query.get('returnDate');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [filteredDepartDate, setFilteredDepartDate] = useState<string | undefined>(undefined)
  const [filteredReturnDate, setFilteredReturnDate] = useState<string | undefined>(undefined)
  const [searchTo, setSearchTo] = useState(searchToFromQuery || '');
  const [searchFrom, setSearchFrom] = useState(searchFromFromQuery || '');
  const [tempSearchFrom, setTempSearchFrom] = useState('')
  const [tempSearchTo, setTempSearchTo] = useState('')
  const [departDate, setDepartDate] = useState(departDateFromQuery ? new Date(departDateFromQuery) : undefined);
  const [returnDate, setReturnDate] = useState(returnDateFromQuery ? new Date(returnDateFromQuery) : undefined);
  const formattedDepartDate: string | undefined = departDate ? format(departDate, 'dd-MM-yyyy') : undefined
  const formattedReturnDate: string | undefined = returnDate ? format(returnDate, 'dd-MM-yyyy') : undefined
  const [selectBrands, setSelectBrands] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false) 
  const handleApplyFilter = (min: number | undefined, max: number | undefined) => {
    setMinPrice(min)
    setMaxPrice(max)
  }
  
  const { data: getCoachCountBrand } = useQuery({
    queryKey: ['getCoachCountBrand'],
    queryFn: () => coachApi.getCountBrands()
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

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }
  
  return (
    <div className='flex-none w-full p-4'>
      <div className='flex items-center justify-center w-full lg:w-[70%] lg:h-[10rem] h-[15rem] overflow-hidden relative bg-gray-100 mx-auto'>
        <div className='flex items-center justify-center bg-white rounded-lg shadow-lg shadow-slate-300 w-full lg:h-[8rem] h-[20rem]'>
          <div className='grid items-center grid-cols-4 gap-4 mx-3 lg:grid-cols-9'>
            <div className='relative w-full col-span-2 lg:ml-5'>
              <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 text-sm lg:text-md '>
                From
              </label>
              <Input
                type='text'
                className='block text-sm lg:text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                onChange={(e) => setTempSearchFrom(e.target.value)}
                placeholder='Nhập nơi đi...'
              />
            </div>
            <div className='relative w-full col-span-2 lg:ml-5'>
              <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 text-sm lg:text-md'>
                To
              </label>
              <Input
                type='text'
                className='block text-sm lg:text-lg w-full pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                onChange={(e) => setTempSearchTo(e.target.value)}
                placeholder='Nhập nơi đến...' 
              />
            </div>
            <div className='relative z-10 w-full col-span-2 lg:ml-5'>
              <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 text-sm lg:text-md '>
                Depart
              </label>
              <div className='text-sm lg:text-lg w-full mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'>
                <DatePickerWithPresets date={departDate} setDate={setDepartDate} />
              </div>
            </div>
            <div className='relative z-10 w-full col-span-2 lg:ml-5'>
              <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 text-sm lg:text-md'>
                Return
              </label>
              <div className=' text-sm lg:text-lg w-full mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'>
                <DatePickerWithPresets date={returnDate} setDate={setReturnDate} />
              </div>
            </div>
            <div className='w-full col-span-1 lg:ml-5 '>
              <Button className='h-[3rem] mt-1 w-[3.8rem]' onClick={handleSearch}>
                <IconSreach />
              </Button>
            </div>
            <div className='mt-1 lg:hidden'>
              <Button onClick={toggleFilter} className='flex items-center h-[3rem]'>
                <Filter className='mr-2' /> Lọc
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-row lg:mx-[6rem] gap-2  ${isFilterOpen ? 'relative' : ''}`}>
        <div className={`lg:block lg:w-[30%] ${isFilterOpen ? 'absolute z-20 bg-white w-full h-full lg:bg-transparent' : 'hidden'}`}>
          <FilterSectionCoach
            onApplyFilter={handleApplyFilter}
            brandCoach={selectBrands}
            data={getCoachCountBrand?.data}
            handleSelectBrand={handleCheckSelectBrand}
          />
        </div>

        <div className='flex flex-col gap-8 lg:w-[70%] ml-auto w-full'>
          <CoachCard
            searchFrom={searchFrom}
            searchTo={searchTo}
            brandCoach={selectBrands}
            returnDate={filteredReturnDate}
            departDate={filteredDepartDate}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
      </div>
    </div>
  )
}
