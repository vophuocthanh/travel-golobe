import { Button } from '@/components/ui/button'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { TourBookingDetail } from '@/shared/ts/interface/booking-tour.interface'
import { useTranslation } from 'react-i18next'
interface ITourBook {
  onClick?: () => void
  data?: TourBookingDetail
  loading?: boolean
}

export default function TourBook({ onClick, data, loading }: ITourBook) {
  const { t } = useTranslation()
  return (
    <div>
      <div>
        <div key={data?.id} className='flex items-center mb-4'>
          <img src={data?.image} alt={data?.name} className='object-cover h-20 rounded-md w-25' />
          <div className='ml-4'>
            <p className='overflow-hidden text-gray-500 whitespace-pre-line text-ellipsis line-clamp-2'>
              {data?.description}
            </p>
            <h2 className='overflow-hidden text-xl font-semibold whitespace-pre-line text-ellipsis line-clamp-1'>
              {data?.name}
            </h2>
            <div className='flex items-center mt-3'>
              <p className='flex items-center justify-center h-[2.5rem] text-xs font-medium border rounded w-[3.5rem] border-primary'>
                {data?.rating}
              </p>
              <span className='ml-2 text-lg'>Very Good</span>
              <span className='ml-1 text-lg text-gray-500'>(10 reviews)</span>
            </div>
          </div>
        </div>
      </div>
      <div className='my-4 border-t'></div>
      <p className='text-lg text-gray-600'>
        {t('booking')} <span className='font-bold text-black'>golobe</span>
      </p>
      <div className='my-4 border-t'></div>
      <div className='mt-4'>
        <h3 className='text-lg font-semibold'>{t('PriceDetails')}</h3>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>{t('Transportations')}</p>
          <p className='text-lg font-semibold'>{formatCurrencyVND(data?.road_vehicle?.details?.price)}</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>{t('HotelPrice')}</p>
          <p className='text-lg font-semibold'>{formatCurrencyVND(data?.hotelDetails?.price)}</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>{t('TourPrice')}</p>
          <p className='text-lg font-semibold'>{formatCurrencyVND(data?.originalTourPrice)}</p>
        </div>
        <div className='mt-4 border-t'></div>
        <div className='flex justify-between mt-4'>
          <p className='text-lg font-semibold'>{t('Total')}</p>
          <p className='text-lg font-bold'>{formatCurrencyVND(data?.totalAmount)}</p>
        </div>
        <Button onClick={onClick} loading={loading} className='w-full mt-4'>
          {t('Payment')}
        </Button>
      </div>
    </div>
  )
}
