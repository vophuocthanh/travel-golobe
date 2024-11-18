import { flight, hotel, tour } from '@/assets/images'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { dataPerfect } from '@/shared/lib/data-type'
import { Link } from 'react-router-dom'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from 'react-i18next'



export default function Perfect() {
  const { t } = useTranslation()
  const dataSlide = [
    {
      id: 1,
      name: t('Flights'),
      title: t('textFlights'),
      image: flight,
      button: t('ShowFlights'),
      path: '/vehicle/flight'
    },
    {
      id: 2,
      name: t('Hotels'),
      title: t('textHotels'),
      image: hotel,
      button: t('ShowHotels'),
      path: '/hotel'
    },
    {
      id: 3,
      name: t('Tours'),
      title: t('textTour'),
      image: tour,
      button: t('Showtour'),
      path: '/tour'
    },
    {
      id: 4,
      name: t('Coachs'),
      title: t('textcoach'),
      image: 'https://thacoauto.vn/storage/xe-bus-giuong-nam-thaco-su-dung-dong-co-volvo-resize.jpg',
      button: t('Showcoach'),
      path: '/vehicle/coach'
    }
  ]
  return (
    <SectionInViewRight>
      <div className='mx-auto mb-40 max-w-7xl'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col space-y-2'>
            <h1 className='text-3xl font-medium'> {t('trip')}</h1>
            <p className='text-[#112211]'>{t('textTrip')}</p>
          </div>
          <Button className='text-black bg-white border border-emerald-300 hover:text-white hover:shadow-md hover:transition-all'>
            {t('see')}
          </Button>
        </div>
        <div className='flex flex-wrap justify-center w-full gap-8 mt-10 mb-20'>
          {dataPerfect.map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-4 px-4 py-2 bg-white shadow-xl cursor-pointer w-96 rounded-2xl'
            >
              <img src={item.image} alt='img' className='w-20 h-20 rounded-2xl' />
              <div className='flex flex-col space-y-2'>
                <h1>{item.name}</h1>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='relative z-0 flex gap-4'>
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={10}
            slidesPerView={1} // mặc định là 1 slide
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 3000
            }}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 3
              }
            }}
          >
            {dataSlide.map((slide, index) => (
              <SwiperSlide key={index} className='flex w-full'>
                <div className='w-[28rem]'>
                  <img src={slide.image} alt='hotel' className='w-[28rem] h-[36rem] rounded-2xl object-cover' />
                  <div className='absolute flex flex-col space-y-4 items-center justify-center bottom-5 w-[28rem]'>
                    <h1 className='text-3xl font-medium text-white'>{slide.name}</h1>
                    <p className='text-center text-white w-[90%]'>{slide.title}</p>
                    <Link to={slide.path}>
                      <Button className='w-32 text-white'>{slide.button}</Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </SectionInViewRight>
  )
}
