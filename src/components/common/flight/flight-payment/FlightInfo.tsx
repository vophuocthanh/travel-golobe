import { IconFlight } from '@/common/icons'
import { BookingResponse } from '@/shared/ts/interface/booking-flight.interface'
import { MoveLeft, MoveRight, Plane, RockingChair, Timer, UtensilsCrossed, Wifi } from 'lucide-react'

interface FlightInfo {
  data: BookingResponse
}

export default function FlightInfo({ data }: FlightInfo) {
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'N/A'
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  }

  const formatDateTime = formatDate(data.start_day)
  return (
    <div className='gap-6'>
      <div className='mb-[2rem]'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='mb-3 text-2xl font-semibold'>{data.brand}</h2>
            <p className='font-medium text-gray-500 text-md'>{formatDateTime}</p>
          </div>
          <div>
            <h2 className='mb-3 text-3xl font-bold text-red-500'>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price || 0)}
            </h2>
            <p className='flex font-medium text-md'>{data.start_time}</p>
          </div>
        </div>

        <div className='flex items-center justify-between my-4'>
          <div className='flex items-center px-8 py-4 space-x-6 border rounded-lg'>
            <img src={data.image ?? ''} alt='' className='w-20 rounded-md' />
            <div>
              <p className='text-2xl font-bold'>{data.brand}</p>
            </div>
          </div>

          <div className='flex items-center p-6'>
            <div className='flex items-center space-x-6'>
              <Plane className='w-6 h-6' />
              <span className='h-6 border-l border-gray-400'></span>
              <Wifi className='w-6 h-6' />
              <span className='h-6 border-l border-gray-400'></span>
              <Timer className='w-6 h-6' />
              <span className='h-6 border-l border-gray-400'></span>
              <UtensilsCrossed className='w-6 h-6' />
              <span className='h-6 border-l border-gray-400'></span>
              <RockingChair className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center space-x-20'>
          <div className='flex items-center space-x-4'>
            <p className='text-2xl font-semibold'>{data.start_time}</p>
            <p className='text-base font-medium'>{data.baggage_weight}</p>
          </div>

          <div className='flex items-center space-x-4'>
            <MoveLeft className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
            <div className='flex justify-center w-10'>
              <IconFlight />
            </div>
            <MoveRight className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
          </div>

          <div className='flex items-center space-x-4'>
            <p className='text-2xl font-semibold'>{data.end_time}</p>
            <p className='text-base font-medium'>{data.brand}</p>
          </div>
        </div>
        <hr className='w-full mt-2 border-black border-1' />
      </div>
    </div>
  )
}
