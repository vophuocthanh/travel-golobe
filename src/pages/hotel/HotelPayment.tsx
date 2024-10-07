import { bookingHotelApi } from '@/apis/booking-hotel.api';
import { Footer, Header } from '@/components/common';
import SectionInViewRight from '@/components/common/animation/SectionInViewRight';
import HotelBook from '@/components/common/hotel/hotel-payment/HotelBook';
import HotelForm from '@/components/common/hotel/hotel-payment/HotelForm';
import HotelInfo from '@/components/common/hotel/hotel-payment/HotelInfo';
import HotelOptions from '@/components/common/hotel/hotel-payment/HotelOptions';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function HotelPayment() {
  const { id } = useParams()

  const { data: getbyIdBooking } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => bookingHotelApi.getByIdBookingHotel(id || ''),
  });

  console.log("id đây" + id);
  console.log(getbyIdBooking)

  return (
    <div className='w-full bg-gray-100'>
      <Header />
      <SectionInViewRight>
        <main className='pt-20 px-[5rem]'>
          <section>
            <h1 className='flex items-center justify-center p-5 text-3xl font-semibold'>Hotel Payment</h1>
            <div className='flex items-center space-x-2'>
              <div className='items-start flex-1 w-full mt-2 mb-2'>
                <div className='flex items-center space-x-2 text-gray-800 text-md'>
                  <p className='text-red-400'>Turkey</p>
                  <ChevronRight className='w-4 h-4' />
                  <p className='text-red-400'>Istanbul</p>
                  <ChevronRight className='w-4 h-4' />
                  <p>{getbyIdBooking?.hotel_names}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
                <HotelInfo />
              </div>
              <div className="col-span-1 p-6 mt-6 bg-white rounded-lg shadow-md">
                <HotelBook />
              </div>
              <div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
                <HotelOptions />
              </div>
              <div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
                <HotelForm />
              </div>
            </div>
          </section>
        </main>
      </SectionInViewRight>
      <div className='mt-[15rem]'>
        <Footer />
      </div>
    </div>
  );
}
