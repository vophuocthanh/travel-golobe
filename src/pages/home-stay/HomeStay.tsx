import { Footer, Header } from '@/components/common'
import BookingForm from '@/components/common/hotel/booking-form/booking-form'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useState } from 'react'
//import FilterSidebar from './components/FilterSidebar'
import HotelListings from './components/HotelListings'

export default function HomeStay() {
  const [isOpenSort, setIsOpenSort] = useState(false)

  const containerHeight = isOpenSort ? 'h-[160rem]' : 'h-[120rem]'
  return (
    <div className='w-full bg-[#F5F5F5]'>
      <Header />

      <div className='flex items-center justify-center pt-5 bg-gray-100'>
        <div className='flex flex-col items-center justify-center gap-10 p-6 mt-40 bg-white border border-gray-300 shadow-lg md:flex-row rounded-xl'>
          <BookingForm />
          <Button className='px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out rounded-lg shadow-md '>
            <Search />
          </Button>
        </div>
      </div>

      <div className={`flex flex-row  mx-[6rem] mt-5 space-y-2  ${containerHeight}`}>
        <HotelListings isOpenSort={isOpenSort} setIsOpenSort={setIsOpenSort} />
      </div>
      <Footer />
    </div>
  )
}
