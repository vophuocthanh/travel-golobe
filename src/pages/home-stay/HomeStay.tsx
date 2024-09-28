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

      <div className="flex justify-center items-center bg-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-20 bg-white p-6 border border-gray-300 rounded-xl shadow-lg">
          <BookingForm />
          <Button className=" text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-md">
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
