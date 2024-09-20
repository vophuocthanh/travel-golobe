import { Footer, Header } from '@/components/common'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import FlightBook from '@/components/common/flight/flight-payment/FlightBook'
import FlightForm from '@/components/common/flight/flight-payment/FlightForm'
import FlightInfo from '@/components/common/flight/flight-payment/FlightInfo'
import FlightOptions from '@/components/common/flight/flight-payment/FlightOptions'
import { ChevronRight } from 'lucide-react'

export default function FlightPayment() {
  return (
    <div className='w-full bg-gray-100'>
      <Header />
      <SectionInViewRight> 
      <main className='pt-20 px-[5rem]'>
        <section>
          <h1 className='flex items-center justify-center p-5 text-3xl font-semibold'>Flight Payment</h1>
          <div className='flex items-center space-x-2'>
            <div className='items-start flex-1 w-full mt-2 mb-2'>
              <div className='flex items-center space-x-2 text-gray-800 text-md'>
                <p className='text-red-400'>Turkey</p>
                <ChevronRight className='w-4 h-4' />
                <p className='text-red-400'>Istanbul</p>
                <ChevronRight className='w-4 h-4' />
                <p>CVK Park Bosphorus Hotel Istanbul</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
            <FlightInfo/>
          </div>
          <div className="col-span-1 p-6 mt-6 bg-white rounded-lg shadow-md">
            <FlightBook/>
          </div>
          <div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
            <FlightOptions/>
          </div><div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
            <FlightForm/>
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
