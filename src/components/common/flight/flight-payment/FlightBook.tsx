import { bookingFlightApi } from '@/apis/booking-flight'
import { Button } from '@/components/ui/button'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { BookingResponse } from '@/shared/ts/interface/booking-flight.interface'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
interface FlightBookProps {
  data: BookingResponse
  onClick?: () => void
  loading?: boolean
}

export default function FlightBook({ onClick, data, loading }: FlightBookProps) {
  const { t } = useTranslation()
  const { id } = useParams()
  const { data: getBookingFlightDetails } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => bookingFlightApi.getBookingDetail(id || '')
  })
  return (
    <div>
      <div>
        <div className="flex items-center mb-4 max-sm:flex-col">
          <img src={getBookingFlightDetails?.flightCrawls.image} className="object-cover w-32 h-32 rounded-md" />
          <div className="ml-4">
            <p className="text-gray-500 ">{getBookingFlightDetails?.brand}</p>
            <h2 className="text-xl font-semibold">{data.brand}</h2>
            <div className="flex flex-col mt-3 max-sm:justify-center max-sm:items-center">
              <span className="ml-1 text-lg text-gray-500 max-sm:text-sm max-sm:text-center">
                {getBookingFlightDetails?.flightCrawls.destination}
              </span>
              <p className="flex items-center justify-center w-20 h-[2.5rem] text-xs font-medium border rounded px-6 border-primary max-sm:justify-center max-sm:items-center">
                {getBookingFlightDetails?.flightCrawls.baggage_weight}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 border-t"></div>
      <p className="text-gray-600 xl:text-lg max-sm:text-sm max-sm:text-center">
        {t('booking')} <span className="font-bold text-black">golobe</span>
      </p>
      <div className="my-4 border-t"></div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{t('PriceDetails')}</h3>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-500">{t('Prices')}</p>
          <p className="text-lg font-semibold">{formatCurrencyVND(data.price || 0)}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-500">{t('Discount')}</p>
          <p className="text-lg font-semibold">0</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-500">{t('Taxes')}</p>
          <p className="text-lg font-semibold">0</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-500">{t('ServiceFee')}</p>
          <p className="text-lg font-semibold">0</p>
        </div>
        <div className="mt-4 border-t"></div>
        <div className="flex justify-between mt-4">
          <p className="text-lg font-semibold">{t('Total')}</p>
          <p className="text-lg font-bold">{formatCurrencyVND(data.price || 0)}</p>
        </div>
        <Button className="w-full mt-5" onClick={onClick} loading={loading}>
          {t('Payment')}
        </Button>
      </div>
    </div>
  )
}
