import { bookingHotelApi } from '@/apis/booking-hotel.api'
import { paymentApi } from '@/apis/payment.api'
import { Footer, Header } from '@/components/common'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import HotelBook from '@/components/common/hotel/hotel-payment/HotelBook'
import HotelForm from '@/components/common/hotel/hotel-payment/HotelForm'
import HotelInfo from '@/components/common/hotel/hotel-payment/HotelInfo'
import HotelOptions from '@/components/common/hotel/hotel-payment/HotelOptions'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function HotelPayment() {
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(false)


  const { data: getBookingHotelDetails } = useQuery({
    queryKey: ['getBookedHotelDetails', id],
    queryFn: () => bookingHotelApi.getBookingDetail(id || '')
  })
  const mutationAddMomoBooking = useMutation({
    mutationFn: () => paymentApi.addMomo(id || '')
  })
  const handleAddMomoBooking = () => {
    setLoading(true)
    mutationAddMomoBooking.mutate(undefined, {
      onSuccess: (data) => {
        const paymentUrl = data.paymentUrl.paymentUrl
        window.location.href = paymentUrl
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }

  console.log('getBookingHotelDetails:', getBookingHotelDetails)
  return (
    <div className='w-full bg-gray-100'>
      <Header />
      <SectionInViewRight>
        <main className='pt-20 px-[5rem] dark:bg-slate-700 dark:text-white'>
          <section>
            <h1 className='flex items-center justify-center p-5 text-3xl font-semibold '>Hotel Payment</h1>
            <div className='flex items-center space-x-2'>
              <div className='items-start flex-1 w-full mt-2 mb-2'>
                <div className='flex items-center space-x-2 text-gray-800 text-md'>
                  <p className='text-red-400'>Turkey</p>
                  <ChevronRight className='w-4 h-4' />
                  <p className='text-red-400'>Istanbul</p>
                  <ChevronRight className='w-4 h-4' />
                  <p className='d dark:text-white'>{getBookingHotelDetails?.hotel_names}</p>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-6 '>
              <div className='col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md dark:border dark:border-white dark:bg-slate-900 dark:text-white'>
                {getBookingHotelDetails && <HotelInfo hotel={getBookingHotelDetails} />}
              </div>
              <div className='col-span-1 p-6 mt-6 bg-white rounded-lg shadow-md dark:border dark:border-white dark:bg-slate-900 dark:text-white'>
                {getBookingHotelDetails && <HotelBook loading={loading} onClick={handleAddMomoBooking} hotel={getBookingHotelDetails} />}
              </div>
              <div className='col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md dark:border dark:border-white dark:bg-slate-900 dark:text-white'>
                <HotelOptions />
              </div>
              <div className='col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md dark:border dark:border-white dark:bg-slate-900 dark:text-white'>
                <HotelForm />
              </div>
            </div>
          </section>
        </main>
      </SectionInViewRight>
      <div className='pt-[15rem] dark:bg-slate-700'>
        <Footer />
      </div>
    </div>
  )
}
