import { IconHotelpay } from '@/common/icons'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { TourBookingDetail } from '@/shared/ts/interface/booking-tour.interface'
import { MapPin, MoveLeft, MoveRight } from 'lucide-react'
import moment from 'moment'

interface ITourPaymentDetail {
  data?: TourBookingDetail
}

export default function TourInfo({ data }: ITourPaymentDetail) {
  const formattedEndDate = moment(data?.end_date).format('DD/MM/YYYY')
  const formattedStartDate = moment(data?.start_date).format('DD/MM/YYYY')

  return (
    <div className='gap-6 '>
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-3xl font-semibold dark:text-white'>{data?.name}</h2>
          <h2 className='text-2xl font-bold text-red-500'>{formatCurrencyVND(data?.price)}</h2>
        </div>

        <div className='p-4 border rounded-lg bg-gray-50 dark:bg-gray-500'>
          <div className='flex items-center space-x-4'>
            <img src={data?.image} alt='asdsadsad' className='object-cover w-16 h-16 rounded-md' />
            <div>
              <h3 className='text-lg font-semibold line-clamp-3 dark:text-white'>{data?.description}</h3>

              <div className='flex'>
                <MapPin className='w-4 h-4 mr-2 text-black dark:text-white' />
                <p className='text-sm text-gray-500 dark:text-white'>{data?.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <div className='text-center'>
            <p className='font-medium text-md dark:text-white'>{formattedStartDate}</p>
            <p className='text-sm text-gray-500 dark:text-white'>Ngày đi</p>
          </div>
          <div className='flex items-center space-x-6'>
            <MoveLeft className='w-11 h-11 dark:text-white' style={{ strokeWidth: 0.5 }} />
            <div className='flex justify-center w-10 dark:text-white'>
              <IconHotelpay />
            </div>
            <MoveRight className='w-11 h-11 dark:text-white' style={{ strokeWidth: 0.5 }} />
          </div>
          <div className='text-center'>
            <p className='font-medium text-md dark:text-white'>{formattedEndDate}</p>
            <p className='text-sm text-gray-500 dark:text-white'>Ngày về</p>
          </div>
        </div>
        <hr className='w-full mt-2 border-black border-1 dark:border-white' />
      </div>
    </div>
  )
}
