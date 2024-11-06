import { flightApi } from '@/apis/flight.api'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { FlightResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
export default function FlightReview1() {
  const { t } = useTranslation()
  const { data: getAll } = useQuery({
    queryKey: ['getAllFlight'],
    queryFn: () => flightApi.getAll(1, 4)
  })

  return (
    <SectionInViewRight>
      <div className='mt-[5rem]'>
        <div className='relative mx-36'>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-3xl font-medium'>{t('travelFlight')}</h1>
          <div className='flex flex-wrap justify-between '>
            <p className='w-[970px] text-xl mb-8 font-light'>{t('textTravelFlight')}</p>
            <Link to='/vehicle/flight/all-flight' className=''>
              <Button className='absolute right-0 text-black bg-white border border-primary top-8'>{t('see')}</Button>
            </Link>
          </div>
          <div className='w-full ]'>
            <Swiper
              className='flex flex-wrap justify-between '
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={3}
              pagination={{ clickable: true }}
              navigation
              autoplay={{
                delay: 3000
              }}
              loop={true}
            >
              {getAll?.data.slice(0, 6).map((flight: FlightResponseType) => (
                <SwiperSlide
                  key={flight.id}
                  className='hover:transform hover:-translate-y-1 relative flex flex-col justify-end h-[30rem] p-4 bg-center bg-cover w-[14rem] rounded-lg'
                  style={{ backgroundImage: `url(${flight.image})` }}
                >
                  <Link to={`/vehicle/flight/${flight.id}`} key={flight.id}>
                    <div className='absolute inset-x-0 bottom-0 rounded-b-lg h-1/3 bg-gradient-to-t from-gray-900 to-transparent '></div>
                    <div className='flex text-xl font-semibold text-white'>
                      <p className='w-full overflow-hidden whitespace-nowrap overflow-ellipsis'>{flight.take_place}</p>
                      <p className='w-full overflow-hidden whitespace-nowrap overflow-ellipsis'> - {flight.trip_to}</p>
                    </div>
                    <p className='w-full text-gray-300'>{flight.trip_time}</p>
                    <div className='relative flex justify-between w-full gap-4 mb-4'>
                      <div className='flex flex-row items-end w-[50%]'>
                        <p className='w-full text-lg font-semibold text-white'>
                          {flight.start_time}-{flight.end_time}
                        </p>
                      </div>
                      <p className='flex items-center justify-center text-lg text-white'>
                        {formatCurrencyVND(flight.price)}
                      </p>
                    </div>
                  </Link>
                  <Button className='relative text-white hover:border-spacing-3'>{t('BookFlight')}</Button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
