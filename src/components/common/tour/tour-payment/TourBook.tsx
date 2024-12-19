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
        <div key={data?.id} className="flex items-center mb-4 max-md:flex-row max-lg:flex-col">
          <img
            src={data?.image}
            alt={data?.name}
            className="object-cover h-20 rounded-md max-lg:h-[8rem] max-md:w-[35%] max-lg:w-[100%] w-[35%]"
          />
          <div className="lg:ml-4 max-md:ml-4 max-lg:mt-5">
            {/* <p className='overflow-hidden text-gray-500 whitespace-pre-line text-ellipsis line-clamp-2'>
              {data?.description}
            </p> */}
            <h2 className="overflow-hidden text-xl font-semibold whitespace-pre-line ">{data?.name}</h2>
            {/* <div className='flex items-center mt-3'>
              <p className='flex items-center justify-center h-[2.5rem] text-xs font-medium border rounded w-[3.5rem] border-primary'>
                {data?.rating}
              </p>
              <span className='ml-2 text-lg max-xl:text-sm'>Very Good</span>
              <span className='ml-1 text-lg text-gray-500 max-xl:text-sm'>(10 reviews)</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="my-4 border-t"></div>
      <p className="text-lg text-gray-600">
        {t('booking')} <span className="font-bold text-black">golobe</span>
      </p>
      <div className="my-4 border-t"></div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold ">{t('PriceDetails')}</h3>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-500 max-md:text-lg max-lg:text-base">{t('Transportations')}</p>
          <p className="text-lg font-semibold max-md:text-lg max-lg:text-base">
            {formatCurrencyVND(data?.road_vehicle?.details?.price)}
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-500 max-md:text-lg max-lg:text-base">{t('HotelPrice')}</p>
          <p className="text-lg font-semibold max-md:text-lg max-lg:text-base">
            {formatCurrencyVND(data?.hotelDetails?.price)}
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-500 max-md:text-lg max-lg:text-base">{t('TourPrice')}</p>
          <p className="text-lg font-semibold max-md:text-lg max-lg:text-base">
            {formatCurrencyVND(data?.originalTourPrice)}
          </p>
        </div>
        <div className="mt-4 border-t"></div>
        <div className="flex justify-between mt-4">
          <p className="text-lg font-semibold">{t('Total')}</p>
          <p className="text-lg font-bold">{formatCurrencyVND(data?.price)}</p>
        </div>
        <Button onClick={onClick} loading={loading} className="w-full mt-4">
          {t('Payment')}
        </Button>
      </div>
    </div>
  )
}
