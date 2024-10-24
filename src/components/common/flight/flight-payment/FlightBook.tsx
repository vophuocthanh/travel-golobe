import { bookingFlightApi } from '@/apis/booking-flight'
import { Button } from '@/components/ui/button'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { BookingResponse } from '@/shared/ts/interface/booking-flight.interface'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

interface FlightBookProps {
  data: BookingResponse
  onClick?: () => void
  loading?: boolean
}

export default function FlightBook({ onClick, data, loading }: FlightBookProps) {
  const { id } = useParams()
  const { data: getBookingFlightDetails } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => bookingFlightApi.getBookingDetail(id || '')
  })
  return (
    <div>
      <div>
        <div className='flex items-center mb-4'>
          <img src={getBookingFlightDetails?.flightCrawls.image} className='object-cover w-32 h-32 rounded-md' />
          <div className='ml-4'>
            <p className='text-gray-500'>{getBookingFlightDetails?.brand}</p>
            <h2 className='text-xl font-semibold'>{data.brand}</h2>
            <div className='flex flex-col mt-3'>
              <span className='ml-1 text-lg text-gray-500'>{getBookingFlightDetails?.flightCrawls.destination}</span>
              <p className='flex items-center justify-center w-20 h-[2.5rem] text-xs font-medium border rounded px-6 border-primary'>
                {getBookingFlightDetails?.flightCrawls.baggage_weight}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='my-4 border-t'></div>
      <p className='text-lg text-gray-600'>
        Your booking is protected by <span className='font-bold text-black'>golobe</span>
      </p>
      <div className='my-4 border-t'></div>
      <div className='mt-4'>
        <h3 className='text-lg font-semibold'>Price Details</h3>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>Price</p>
          <p className='text-lg font-semibold'>{formatCurrencyVND(data.price || 0)}</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>Discount</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>Taxes</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>Service Fee</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
        <div className='mt-4 border-t'></div>
        <div className='flex justify-between mt-4'>
          <p className='text-lg font-semibold'>Total</p>
          <p className='text-lg font-bold'>{formatCurrencyVND(data.price || 0)}</p>
        </div>
        <Button className='w-full mt-5' onClick={onClick} loading={loading}>
          Thanh Toán
        </Button>
      </div>
    </div>
  )
}
