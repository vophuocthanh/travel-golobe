import { Footer, Header } from '@/components/common'
import BookingForm from '@/components/common/hotel/booking-form/booking-form'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
//import FilterSidebar from './components/FilterSidebar'
import HotelListings from './components/HotelListings'

export default function HomeStay() {
  return (
    <>
      <div className='w-full bg-[#F5F5F5] pb-40 dark:bg-gray-700'>
        <Header />

        <div className='flex items-center justify-center pt-5 bg-gray-100 dark:bg-gray-700'>
          <div className='flex flex-col items-center justify-center gap-10 p-6 mt-40 bg-white border dark:bg-gray-900 border-gray-300 shadow-lg md:flex-row rounded-xl'>
            <BookingForm />
            <Button className='px-6 py-2 font-semibold text-white dark:bg-gray-700 dark:text-white transition-all duration-300 ease-in-out rounded-lg shadow-md '>
              <Search />
            </Button>
          </div>
        </div>

        <div className={`flex flex-row  mx-[6rem] mt-5 space-y-2`}>
          <HotelListings />
        </div>
      </div>
      <Footer />
    </>


  )
}
