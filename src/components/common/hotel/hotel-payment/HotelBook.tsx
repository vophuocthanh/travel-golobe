import { Button } from '@/components/ui/button'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { HotelBookingResponse } from '@/shared/ts/interface/booking-hotel.interface'
import { useTranslation } from 'react-i18next'
interface hotelType {
  hotel: HotelBookingResponse
  loading: boolean
  onClick?: () => void
}

export default function HotelBook({ hotel, loading, onClick }: hotelType) {
  const { t } = useTranslation()
  return (
    <div>
      <div>
        <div key={hotel.id} className='flex items-center mb-4'>
          <img src={hotel.image} alt={hotel.hotel_names} className='object-cover h-20 rounded-md w-25' />
          <div className='ml-4'>
            <p className='text-gray-500'>{hotel.hotel_names}</p>
            <h2 className='text-xl font-semibold'>{hotel.hotel_names}</h2>
            <div className='flex items-center mt-3'>
              <p className='flex items-center justify-center h-[2.5rem] text-xs font-medium border rounded w-[3.5rem] border-primary'>
                {hotel.star_number}
              </p>
              <span className='ml-2 text-lg'>Very Good</span>
              <span className='ml-1 text-lg text-gray-500'>({hotel.number_rating} reviews)</span>
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
          <p className='text-lg text-gray-500'>{t('Prices')}</p>
          <p className='text-lg font-semibold'>{formatCurrencyVND(hotel.price)}</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>{t('Discount')}</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>{t('Taxes')}</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>{t('ServiceFee')}</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
        <div className='mt-4 border-t'></div>
        <div className='flex justify-between mt-4'>
          <p className='text-lg font-semibold'>{t('Total')}</p>
          <p className='text-lg font-bold'>{formatCurrencyVND(hotel.price)}</p>
        </div>
      </div>
      <Button onClick={onClick} loading={loading} className='w-full mt-4'>
        {t('Payment')}
      </Button>
    </div>
  )
}
