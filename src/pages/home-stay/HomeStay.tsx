import { Footer, Header } from '@/components/common'
import BookingForm from '@/components/common/hotel/booking-form/booking-form'
import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
import { Search } from 'lucide-react'

// import ReactSlider from 'react-slider'

import FilterSidebar from './components/FilterSidebar'
import { useState } from 'react'
import HotelListings from './components/HotelListings'

export default function HomeStay() {
  const [isOpenSort, setIsOpenSort] = useState(false)

  const containerHeight = isOpenSort ? 'h-[160rem]' : 'h-[120rem]'
  return (
    <div className='w-full bg-[#F5F5F5]'>
      <Header />

      <div className='flex '>
        <div className='flex flex-row items-center justify-center gap-10 mt-32 bg-[#FFFFFF] p-2 border mx-[6rem] rounded-xl border-b border-gray-400 '>
          {' '}
          <BookingForm />
          <Button className='mr-8'>
            <Search />
          </Button>
        </div>
      </div>

      <div className={`flex flex-row  mx-[6rem] mt-10 space-y-2  ${containerHeight}`}>
        <FilterSidebar />
        <HotelListings isOpenSort={isOpenSort} setIsOpenSort={setIsOpenSort} />
      </div>
      <Footer />
    </div>
  )
}
