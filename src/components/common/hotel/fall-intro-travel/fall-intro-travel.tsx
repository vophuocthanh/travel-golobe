import { hotelApi } from '@/apis/hotel.api'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { HotelResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SectionInViewUp from '../../animation/SectionInViewUp'

export default function FallIntroTravel() {
  const { t } = useTranslation()
  const { data: getAll, isLoading } = useQuery({
    queryKey: ['getAllHotel'],
    queryFn: () => hotelApi.getAll(1, 6)
  })

  if (isLoading)
    return (
      <div className='items-center mx-auto space-y-4 max-w-[105rem]'>
        <Skeleton width='100%' height='2.5rem' />
        <Skeleton width='100%' height='2.5rem' />
        <Skeleton width='100%' height='2.5rem' />
        <Skeleton width='100%' height='2.5rem' />
        <Skeleton width='100%' height='2.5rem' />
        <Skeleton width='100%' height='2.5rem' />
        <Skeleton width='100%' height='2.5rem' />
        <Skeleton width='100%' height='2.5rem' />
      </div>
    )

  return (
    <SectionInViewUp>
      <div className='mt-32'>
        <div className='mx-32 '>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl'> {t('travelHotel')}</h1>
          <div className='flex flex-wrap justify-between '>
            <p className='w-[970px] text-xl mb-8'>{t('textTravelHotel')}</p>
            <Link to='/hotel/home-stay'>
              <Button className='text-black bg-white border border-primary'>{t('see')}</Button>
            </Link>
          </div>
          <Swiper
            className='flex flex-wrap justify-between'
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={40}
            slidesPerView={3}
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 3000
            }}
            loop={true}
          >
            {getAll?.data.map((travel: HotelResponseType) => (
              <SwiperSlide
                key={travel.id}
                className='hover:transform hover:-translate-y-1 relative flex flex-col justify-end h-[30rem] p-4 bg-center bg-cover w-[18rem] rounded-lg'
                style={{ backgroundImage: `url(${travel.image})` }}
              >
                <Link to={`/hotel/${travel.id}`}>
                  <div className='absolute inset-x-0 bottom-0 rounded-b-lg h-1/3 bg-gradient-to-t from-gray-900 to-transparent'></div>
                  <div className='relative flex items-center justify-between w-full gap-4 mb-4'>
                    <div className='flex flex-col items-end'>
                      <p className='w-full text-3xl font-semibold text-white line-clamp-1'>{travel.hotel_names}</p>
                      <p className='w-full text-gray-300'>{travel.place}</p>
                    </div>
                    <p className='flex items-center justify-center text-3xl text-white'>
                      {formatCurrencyVND(travel.price)}
                    </p>
                  </div>

                  <Button className='relative w-full text-white hover:border-spacing-3'>{t('BookHotel')}</Button>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </SectionInViewUp>
  )
}
