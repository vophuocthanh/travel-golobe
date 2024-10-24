import { hotelApi } from '@/apis/hotel.api'
import { hoteldetail3 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SectionInViewUp from '../../animation/SectionInViewUp'
import { HotelResponseType } from '@/shared/ts/interface/data.interface'
import { useTranslation } from 'react-i18next';


export default function FallIntroTravel() {
  const { t } = useTranslation();
  const { data: getAll } = useQuery({
    queryKey: ['getAllHotel'],
    queryFn: () => hotelApi.getAll(1, 6)
  })
  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'N/A'
    const numberValue = parseFloat(value)
    return isNaN(numberValue)
      ? 'N/A'
      : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberValue)
  }
  return (
    <SectionInViewUp>
      <div className='mt-32'>
        <div className='mx-32 '>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl'> {t('travelHotel')}</h1>
          <div className='flex flex-wrap justify-between '>
            <p className='w-[970px] text-xl mb-8'>
            {t('textTravelHotel')}
            </p>
            <Link to='/hotel/home-stay'>
              <Button className='text-black bg-white border border-primary'>{t('see')}</Button>
            </Link>
          </div>
          <Link to='/hotel/home-stay'>
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
                  style={{ backgroundImage: `url(${hoteldetail3})` }}
                >
                  <div className='absolute inset-x-0 bottom-0 rounded-b-lg h-1/3 bg-gradient-to-t from-gray-900 to-transparent'></div>

                  <div className='relative flex justify-between w-full gap-4 mb-4'>
                    <div className='flex flex-col items-end'>
                      <p className='w-full text-3xl font-semibold text-white'>{travel.place}</p>
                      <p className='w-full text-gray-300'>{travel.hotel_names}</p>
                    </div>
                    <p className='flex items-center justify-center text-3xl text-white'>{formatCurrency(travel.price?.toString())}</p>
                  </div>

                  <Button className='relative text-white hover:border-spacing-3'>{t('BookHotel')}</Button>
                </SwiperSlide>
              ))}
            </Swiper>
          </Link>
        </div>
      </div>
    </SectionInViewUp>
  )
}
