import { bookingCoachApi } from '@/apis/booking-coach'
import { Footer, Header } from '@/components/common'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import CoachBook from '@/components/common/coach/coach-payment/CoachBook'
import CoachForm from '@/components/common/coach/coach-payment/CoachForm'
import CoachInfo from '@/components/common/coach/coach-payment/CoachInfo'
import CoachOptions from '@/components/common/coach/coach-payment/CoachOptions'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { useParams } from 'react-router-dom'

export default function CoachPayment() {

  const { id } = useParams()

  const { data: getBookingCoachDeTails } = useQuery({
    queryKey: ['getBookedCoachDetails', id],
    queryFn: () => bookingCoachApi.getBookingDetail(id || '')
  })
  console.log('getBookedCoachDetails:', getBookingCoachDeTails)
  
  return (
    <div className='w-full bg-gray-100'>
      <Header />
      <SectionInViewRight> 
      <main className='pt-20 px-[5rem]'>
        <section>
          <h1 className='flex items-center justify-center p-5 text-3xl font-semibold'>Coach Payment</h1>
          <div className='flex items-center space-x-2'>
            <div className='items-start flex-1 w-full mt-2 mb-2'>
              <div className='flex items-center space-x-2 text-gray-800 text-md'>
                <p className='text-red-400'>Turkey</p>
                <ChevronRight className='w-4 h-4' />
                <p className='text-red-400'>Istanbul</p>
                <ChevronRight className='w-4 h-4' />
                <p>{getBookingCoachDeTails?.location}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
            {getBookingCoachDeTails && <CoachInfo data={getBookingCoachDeTails} />}
          </div>
          <div className="col-span-1 p-6 mt-6 bg-white rounded-lg shadow-md">
          {getBookingCoachDeTails && <CoachBook data={getBookingCoachDeTails} />}
          </div>
          <div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
            <CoachOptions/>
          </div><div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
            <CoachForm/>
          </div>
          
          </div>
        
        </section>
      </main>
      </SectionInViewRight>
      <div className='mt-[15rem]'>
        <Footer />
      </div>
    </div>
  )
}
