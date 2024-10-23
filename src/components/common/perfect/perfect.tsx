import { flight, hotel, tour } from '@/assets/images'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { dataPerfect } from '@/shared/lib/data-type'
import { Link } from 'react-router-dom'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const dataSlide = [
  {
    id: 1,
    name: 'Flights',
    title: 'Search Flights & Places Hire to our most popular',
    image: flight,
    button: 'Show flight',
    path: '/vehicle/flight'
  },
  {
    id: 2,
    name: 'Hotels',
    title: 'Search hotels & Places Hire to our most popular',
    image: hotel,
    button: 'Show hotel',
    path: '/hotel'
  },
  {
    id: 3,
    name: 'Tours',
    title: 'Search Tours & Places Hire to our most popular',
    image: tour,
    button: 'Show tour',
    path: '/tour'
  },
  {
    id: 4,
    name: 'Coach',
    title: 'Search Vehicles & Places Hire to our most popular',
    image: 'https://thacoauto.vn/storage/xe-bus-giuong-nam-thaco-su-dung-dong-co-volvo-resize.jpg',
    button: 'Show coach',
    path: '/vehicle/coach'
  }
]

export default function Perfect() {
  return (
    <SectionInViewRight>
      <div className='mx-auto mb-40 max-w-7xl'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col space-y-2'>
            <h1 className='text-3xl font-medium'>Plan your perfect trip</h1>
            <p className='text-[#112211]'>Search Flights & Places Hire to our most popular destinations</p>
          </div>
          <Button className='text-black bg-white border border-emerald-300 hover:text-white hover:shadow-md hover:transition-all'>
            See more places
          </Button>
        </div>
        <div className='flex flex-wrap w-full gap-8 mt-10 mb-20'>
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

        <div className='relative flex gap-4'>
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={10}
            slidesPerView={3}
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 3000
            }}
            loop={true}
          >
            {dataSlide.map((slide, index) => (
              <SwiperSlide key={index} className='flex w-full'>
                <div className='w-[28rem]'>
                  <img src={slide.image} alt='hotel' className='w-[28rem] h-[36rem] rounded-2xl object-cover' />
                  <div className='absolute flex flex-col space-y-4 items-center justify-center bottom-5 w-[28rem]'>
                    <h1 className='text-3xl font-medium text-white'>{slide.name}</h1>
                    <p className='text-center text-white'>{slide.title}</p>
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
