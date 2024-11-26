import { IconFlight } from '@/common/icons'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { TourInfoResponse } from '@/shared/ts/interface/data.interface'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

interface IVehicle {
  data?: TourInfoResponse
}

export default function Vehicle({ data }: IVehicle) {
  const { t } = useTranslation()

  const startDate = moment(data?.start_date).format('DD/MM/YYYY')
  const endDate = moment(data?.end_date).format('DD/MM/YYYY')

  const getAirportCode = (str: string) => {
    const match = str.match(/\((.*?)\)/)
    return match ? match[1] : ''
  }

  const destination: string = data?.road_vehicle.details.destination
    ? getAirportCode(data?.road_vehicle.details.destination)
    : ' '
  const takePlace: string = data?.road_vehicle.details.take_place
    ? getAirportCode(data?.road_vehicle.details.take_place)
    : ' '

  return (
    <div className='mt-16 '>
      <h2 className='mb-8 text-3xl font-semibold text-center'>{t('DEPARTURE')} </h2>
      <div className='px-5 py-10 rounded-md shadow-2xl'>
        <div className=''>
          <h2 className='text-2xl font-medium text-center text-sky-500'>{t('TRANSPORTATION')}</h2>
          <div className='flex justify-between gap-20 py-4 max-sm:flex-col'>
            <div className='w-full'>
              <div className='flex-col items-center justify-center gap-[1rem] w-full'>
                <div className='flex justify-between py-2'>
                  <div className='flex max-xl:flex-col '>
                    <h4 className='text-lg font-medium max-lg:text-base'>{t('DepartureDate')} </h4>
                    <p className='flex items-center text-center max-lg:text-base'>- {startDate}</p>
                  </div>
                  <div className='flex'>
                    <IconFlight />
                    <h3 className='text-lg font-medium max-lg:text-base text-sky-500'>{data?.time_trip}</h3>
                  </div>
                </div>
                <div className='flex justify-between w-full py-2'>
                  <p className='text-lg font-medium'>{data?.road_vehicle.details.start_time}</p>
                  <p className='text-lg font-medium'>{data?.road_vehicle.details.end_time}</p>
                </div>
                <div className='flex flex-row items-center justify-center'>
                  <div className=' row--transport'></div>
                </div>
                <div className='relative flex flex-row justify-between w-full py-2'>
                  <p className='text-lg font-medium'>{destination}</p>
                  <div>
                    <p>{data?.road_vehicle.details.brand}</p>
                  </div>
                  <p className='text-lg font-medium'>{takePlace}</p>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <div className='flex-col items-center justify-center gap-[1rem] w-full'>
                <div className='flex justify-between py-2'>
                  <div className='flex max-xl:flex-col '>
                    <h4 className='text-lg font-medium max-lg:text-base'>{t('ReturnDate')} </h4>
                    <p className='flex items-center text-center max-lg:text-base'>- {endDate}</p>
                  </div>
                  <div className='flex'>
                    <IconFlight />
                    <h3 className='text-lg font-medium max-lg:text-base text-sky-500'>{data?.time_trip}</h3>
                  </div>
                </div>
                <div className='flex justify-between w-full py-2'>
                  <p className='text-lg font-medium'>{data?.road_vehicle.details.start_time}</p>
                  <p className='text-lg font-medium'>{data?.road_vehicle.details.end_time}</p>
                </div>
                <div className='flex flex-row items-center justify-center'>
                  <div className=' row--transport'></div>
                </div>
                <div className='relative flex flex-row justify-between w-full py-2'>
                  <p className='text-lg font-medium'>{takePlace}</p>
                  <div>
                    <p>{data?.road_vehicle.details.brand}</p>
                  </div>
                  <p className='text-lg font-medium'>{destination}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className='py-8 text-2xl font-medium text-center border-t-2 text-sky-500 '>{t('TOURPRICE')}</h2>
          <div className='flex justify-between gap-20 py-4 max-sm:flex-col'>
            <div className='w-full'>
              <div className='flex-col items-center justify-center gap-[1rem] w-full'>
                <div className='flex justify-between py-2'>
                  <div className=''>
                    <h4 className='text-lg font-medium'>{t('Adults')}</h4>
                    <p className='flex items-center text-center'> ({t('older')})</p>
                  </div>
                  <div className='flex'>
                    <h3 className='text-lg font-medium text-red-600'>{formatCurrencyVND(data?.adult_price)}</h3>
                  </div>
                </div>
                <div className='flex justify-between py-2'>
                  <div className=''>
                    <h4 className='text-lg font-medium'>{t('Children')}</h4>
                    <p className='flex items-center text-center'> ({t('Ages')})</p>
                  </div>
                  <div className='flex'>
                    <h3 className='text-lg font-medium text-red-600'>{formatCurrencyVND(data?.child_price)}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <div className='flex-col items-center justify-center gap-[1rem] w-full'>
                <div className='flex justify-between py-2'>
                  <div className=''>
                    <h4 className='text-lg font-medium'>{t('Infants')}</h4>
                    <p className='flex items-center text-center'> ({t('Under')})</p>
                  </div>
                  <div className='flex'>
                    <h3 className='text-lg font-medium text-red-600'>{formatCurrencyVND(data?.baby_price)}</h3>
                  </div>
                </div>
                <div className='flex justify-between py-2'>
                  <div className=''>
                    <h4 className='text-lg font-medium'>{t('Room')}</h4>
                  </div>
                  <div className='flex'>
                    <h3 className='text-lg font-medium text-red-600'>{formatCurrencyVND(data?.baby_price)}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
