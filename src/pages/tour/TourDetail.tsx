import { tourApi } from '@/apis/tour.api'
import { FilterTour, Footer, Header, ProductTour } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { Label } from '@radix-ui/react-label'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Search, Sofa } from 'lucide-react'
import { useState } from 'react'
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
  const [searchTour, setSearchTour] = useState<string>('')
  const debouncedSearchTour = useDebounce<string>(searchTour, 500)
  const [selectUniqueStartingGate, setSelectUniqueStartingGate] = useState<string[]>([])
  const [selectUniqueRoadVehicle, setSelectUniqueRoadVehicle] = useState<string[]>([])

  const handlePriceRangeChange = (min: number | undefined, max: number | undefined) => {
    setMinPrice(min)
    setMaxPrice(max)
  }
  const handleRating = (val: number | undefined) => {
    setRating(val)
  }

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
        '',
        minPrice,
        maxPrice,
        debouncedSearchTour,
        rating,
        formattedDepartDate,
        formattedReturnDate
      ),
    enabled: !!debouncedSearchTour
  })
  const handleSearch = () => {
    setFilteredDepartDate(formattedDepartDate)
    setFilteredReturnDate(formattedReturnDate)
    if (!formattedDepartDate || !formattedReturnDate) {
      toast.error('Vui lòng nhập đầy đủ ngày khởi hành và ngày trở về.')
      return
    }
  }

  const { data: getUniqueStagingGate } = useQuery({
    queryKey: ['getUniqueStagingGate'],
    queryFn: () => tourApi.getUniqeStartingGate()
  })

  const { data: getUniqueRoadVehicle } = useQuery({
    queryKey: ['getUniqueRoadVehicle'],
    queryFn: () => tourApi.getUniqueRoadVehicle()
  })

  const handleSelectUniqueStartingGate = (val: string) => {
    setSelectUniqueStartingGate([val])
  }

  const handleSelectUniqueRoadVehicle = (val: string) => {
    setSelectUniqueRoadVehicle([val])
  }

  return (
    <div className="w-full">
      <Header />
      <div className="flex items-center justify-center pt-5 max-sm:px-10 ">
        <div className="flex flex-col items-center justify-center gap-10 p-6 mt-40 bg-white border border-gray-300 shadow-lg md:flex-row rounded-xl">
          <div className="flex flex-wrap justify-between gap-4 py-4">
            <div className="relative max-sm:w-full  col-span-2 h-[4rem]">
              <Label
                htmlFor=""
                className="absolute z-10 p-3 text-sm text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4"
              >
                Enter Destination
              </Label>
              <Input
                className="max-w-md sm:w-[16rem] max-sm:w-full  border border-[#E2E8F0] p-2 h-[4rem] pt-4 pl-12"
                placeholder="Istanbul, Turkey"
                onChange={(e) => setSearchTour(e.target.value)}
              />
              <Sofa className="absolute left-3 top-[1rem] z-20 " />
              {isLoading ? (
                <div className="absolute top-[4rem]  left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md">
                  Loading...
                </div>
              ) : (
                getAllTour &&
                debouncedSearchTour && (
                  <div className="absolute max-sm:z-10 top-[4rem] mb-32 left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md h-32 overflow-y-auto">
                    {getAllTour?.data
                      ?.filter((tour) => tour.name?.toLowerCase().includes(debouncedSearchTour.toLowerCase()))
                      .map((tour) => (
                        <div key={tour.id} className="p-2 cursor-pointer hover:bg-gray-100">
                          <Link to={`/tour/${tour.id}`}>{tour.name} </Link>
                        </div>
                      ))}
                  </div>
                )
              )}
            </div>
            <div className="relative lg:w-[14rem] max-sm:w-full col-span-2  sm:ml-5 h-[4rem]">
              <TourDate date={departDate} setDate={setDepartDate} />
              {departDate && (
                <button
                  className="absolute text-red-500 transform -translate-y-1/2 top-1/2 right-2 hover:text-red-700"
                  onClick={() => {
                    setDepartDate(undefined)
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            <div className="relative max-sm:z-1 lg:w-[14rem] max-sm:w-full col-span-2 sm:ml-5 h-[4rem]">
              <TourDate date={returnDate} setDate={setReturnDate} />
              {returnDate && (
                <button
                  className="absolute text-red-500 transform -translate-y-1/2 top-1/2 right-2 hover:text-red-700"
                  onClick={() => {
                    setReturnDate(undefined)
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          <Button
            className="px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out rounded-lg shadow-md "
            onClick={handleSearch}
          >
            <Search />
          </Button>
        </div>
      </div>
      <div className="flex justify-between max-sm:mx-[1rem]  gap-4 max-md:mx-[2rem] max-lg:mx-[3rem] max-md:flex-col max-xl:mx-[3rem] mx-[6rem] min-h-[56rem] mt-8">
        <FilterTour
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          handlePriceRangeChange={handlePriceRangeChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleRating={handleRating}
          rating={rating}
          data={getUniqueStagingGate?.data}
          handleSelectUniqueStartingGate={handleSelectUniqueStartingGate}
          handleSelectUniqueRoadVehicle={handleSelectUniqueRoadVehicle}
          dataRoadVehicle={getUniqueRoadVehicle?.data}
        />
        <ProductTour
          departDate={filteredDepartDate}
          returnDate={filteredReturnDate}
          rating={rating}
          minPrice={minPrice}
          maxPrice={maxPrice}
          debouncedSearchTour={debouncedSearchTour}
          selectUniqueStartingGate={selectUniqueStartingGate}
          selectUniqueRoadVehicle={selectUniqueRoadVehicle}
        />
      </div>
      <Footer />
    </div>
  )
}
