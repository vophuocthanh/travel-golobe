import { Footer, Header } from '@/components/common'
import BookingForm from '@/components/common/hotel/booking-form/booking-form'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
//import FilterSidebar from './components/FilterSidebar'
import HotelListings from './components/HotelListings'

export default function HomeStay() {
  return (
    <>
      <div className="w-full bg-[#F5F5F5] pb-40">
        <Header />

        <div className="mx-auto container lg:mx-[5rem]">
          <div className="grid grid-cols-1 gap-6 pt-5 bg-gray-100 md:grid-cols-2">
            {/* Booking Form and Search Button */}
            <div className="flex flex-col items-center justify-center gap-10 p-6 mt-40 bg-white border border-gray-300 shadow-lg md:col-span-3 rounded-xl">
              <BookingForm />
              <Button className="px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out rounded-lg shadow-md bg-primary hover:bg-primary-dark">
                <Search />
              </Button>
            </div>
            {/* Hotel Listings */}
            <div className="col-span-1 md:col-span-2">
              <HotelListings />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
