import { imgcoach } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { BookingCoachResponse } from '@/shared/ts/interface/booking-coach.interface'

interface CoachBookProps {
  onClick?: () => void
  data?: BookingCoachResponse
  loading?: boolean
}

export default function CoachBook({ onClick, data, loading }: CoachBookProps) {
  return (
    <div>
      <div>
        <div className='flex items-center mb-4'>
          <img src={imgcoach || ''} alt={data?.brand} className='object-fill w-32 h-32 rounded-md' />
          <div className='ml-4'>
            <p className='text-gray-500'>{data?.brand}</p>
            <h2 className='text-xl font-semibold'>{data?.brand}</h2>
            <div className='flex flex-col'>
              <span className='ml-1 text-lg text-gray-500'>{data?.destination}</span>
              <p className='flex items-center justify-center w-[8rem] h-[2.5rem] text-xs font-medium border rounded px-6 border-primary'>
                {data?.number_of_seat}
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
          <p className='text-lg font-semibold'> {formatCurrencyVND(data?.price || 0)}</p>
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
          <p className='text-lg font-bold'>{formatCurrencyVND(data?.price || 0)}</p>
        </div>
        <Button onClick={onClick} loading={loading} className='w-full mt-4 text-md'>
          Thanh toán
        </Button>
      </div>
    </div>
  )
}
