import { FilterTour, Footer, Header, ProductTour } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { Label } from '@radix-ui/react-label'

import { tourApi } from '@/apis/tour.api'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { Sofa } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TourDate } from './TourDate'

export default function TourDetail() {
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined)
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
  const [filteredDepartDate, setFilteredDepartDate] = useState<string | undefined>(undefined)
  const [filteredReturnDate, setFilteredReturnDate] = useState<string | undefined>(undefined)
  const formattedDepartDate: string | undefined = departDate ? format(departDate, 'dd-MM-yyyy') : undefined
  const formattedReturnDate: string | undefined = returnDate ? format(returnDate, 'dd-MM-yyyy') : undefined

  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [rating, setRating] = useState<number | undefined>(undefined)

  const handlePriceRangeChange = (min: number | undefined, max: number | undefined) => {
    setMinPrice(min)
    setMaxPrice(max)
  }
  const handleRating = (val: number | undefined) => {
    setRating(val)
  }
  console.log(rating,"rating");
  
  const [searchTour, setSearchTour] = useState<string>('')
  const debouncedSearchTour = useDebounce<string>(searchTour, 500)

  const { data: getAllTour, isLoading } = useQuery({
    queryKey: [
      'getAllTourSearch',
      1,
      '',
      minPrice,
      maxPrice,
      debouncedSearchTour,
      '',
      rating,
      formattedDepartDate,
      formattedReturnDate
    ],
    queryFn: () =>
      tourApi.getAll(
        1,
        50,
        minPrice,
        maxPrice,
        debouncedSearchTour,
        '',
        rating,
        formattedDepartDate,
        formattedReturnDate
      ),
    enabled: !!debouncedSearchTour
  })
  console.log(getAllTour, 'getAllTour')
  const handleSearch = () => {
    setFilteredDepartDate(formattedDepartDate)
    setFilteredReturnDate(formattedReturnDate)
    if (!formattedDepartDate || !formattedReturnDate) {
      toast.error('Vui lòng nhập đầy đủ ngày khởi hành và ngày trở về.')
      return
    }
  }

  return (
    <div className='w-full'>
      <Header />
      <div className='flex items-center justify-center pt-5 '>
        <div className='flex flex-col items-center justify-center gap-10 p-6 mt-40 bg-white border border-gray-300 shadow-lg md:flex-row rounded-xl'>
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
                onChange={(e) => setSearchTour(e.target.value)}
              />
              <Sofa className='absolute left-3 top-[1rem] z-20 ' />
              {isLoading ? (
                <div className='absolute top-[4rem] left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md'>
                  Loading...
                </div>
              ) : (
                getAllTour &&
                debouncedSearchTour && (
                  <div className='absolute top-[4rem] left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md h-32 overflow-y-auto'>
                    {getAllTour?.data
                      ?.filter((tour) => tour.name?.toLowerCase().includes(debouncedSearchTour.toLowerCase()))
                      .map((tour) => (
                        <div key={tour.id} className='p-2 cursor-pointer hover:bg-gray-100'>
                          <Link to={`/tour/${tour.id}`}>{tour.name} </Link>
                        </div>
                      ))}
                  </div>
                )
              )}
            </div>
            <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
              <TourDate date={departDate} setDate={setDepartDate} />
            </div>
            <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
              <TourDate date={returnDate} setDate={setReturnDate} />
            </div>
          </div>
          <Button
            className='px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out rounded-lg shadow-md '
            onClick={handleSearch}
          >
            <Search />
          </Button>
        </div>
      </div>
      <div className='flex justify-between gap-4 mx-[6rem] mt-8'>
        <FilterTour
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          handlePriceRangeChange={handlePriceRangeChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleRating={handleRating}
          rating={rating}
        />
        <ProductTour
          departDate={filteredDepartDate}
          returnDate={filteredReturnDate}
          rating={rating}
          minPrice={minPrice}
          maxPrice={maxPrice}
          debouncedSearchTour={debouncedSearchTour}
        />
      </div>
      <Footer />
    </div>
  )
}
