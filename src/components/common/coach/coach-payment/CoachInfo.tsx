import { imgcoach } from '@/assets/images'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { BookingCoachResponse } from '@/shared/ts/interface/booking-coach.interface'
import { formatDateStandard } from '@/shared/utils/date-utils'
import { Bus, MoveLeft, MoveRight, RockingChair, Timer, UtensilsCrossed, Wifi } from 'lucide-react'

interface CoachInfo {
  data: BookingCoachResponse
}

export default function CoachInfo({ data }: CoachInfo) {
  return (
    <div className='gap-6'>
      <div className='mb-[2rem]'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='mb-3 text-2xl font-semibold'>{data?.brand}</h2>
            <p className='font-medium text-gray-500 text-md'>{formatDateStandard(data?.start_day)}</p>
          </div>
          <div>
            <h2 className='mb-3 text-3xl font-bold text-red-500'>{formatCurrencyVND(data?.price || 0)}</h2>
            <p className='flex font-medium text-md'>{data?.start_time}</p>
          </div>
        </div>

        <div className='flex items-center justify-between my-4'>
          <div className='flex items-center px-8 py-4 space-x-6 border rounded-lg'>
            {/* <img src={data.image ?? ''} alt='' className='w-20 rounded-md' /> */}
            <img src={imgcoach} alt='' className='w-20 rounded-md' />
            <div>
              <p className='text-2xl font-bold'>{data?.brand}</p>
              <p className='text-base font-medium'>{data?.number_of_seat}</p>
            </div>
          </div>

          <div className='flex items-center p-6'>
            <div className='flex items-center space-x-6'>
              <Bus className='w-6 h-6' />
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
          <div className='flex flex-col items-center space-x-4'>
            <p className='text-2xl font-semibold'>{data?.start_time}</p>
            <p className='text-base font-medium'>{data?.take_place}</p>
          </div>

          <div className='flex items-center space-x-4 '>
            <MoveLeft className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
            <div className='flex justify-center w-10'>
              <Bus />
            </div>
            <MoveRight className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
          </div>

          <div className='flex flex-col items-center space-x-4'>
            <p className='text-2xl font-semibold'>{data?.end_time}</p>
            <p className='text-base font-medium'>{data?.destination}</p>
          </div>
        </div>
        <hr className='w-full mt-2 border-black border-1' />
      </div>
    </div>
  )
}
