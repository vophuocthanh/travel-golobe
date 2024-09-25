import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import SectionInViewUp from '../../animation/SectionInViewUp'
import { useQuery } from '@tanstack/react-query'
import { hotelApi } from '@/apis/hotel.api'
import { hoteldetail3 } from '@/assets/images'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';



interface Travel {
  id: string,
  hotel_names?: string,
  location?: string,
  price?: number,
  score_hotels?: string | number,
  number_rating: string | number,
  star_number?: number,
  received_time?: string,
  giveback_time?: string,
  description?: string,
  hotel_link?: string,
  place?: string,
  image?: string,
  image_2?: string,
  image_3?: string,
  image_4?: string,
  image_5?: string
}

export default function FallIntroTravel() {

  const { data: getAll } = useQuery({
    queryKey: ['getAllHotel'],
    queryFn: () => hotelApi.getAll(1, 4)
  })

  return (
    <SectionInViewUp>
      <div className='mt-32'>
        <div className='mx-32 '>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl'> Fall intro travel</h1>
          <div className='flex flex-wrap justify-between '>
            <p className='w-[970px] text-xl mb-8'>
              Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the
              travel tools to get you to your destination.
            </p>
            <Link to='/hotel/home-stay'>
              <Button className='text-black bg-white border border-primary'>See All</Button>
            </Link>
          </div>
          <Link to='/hotel/home-stay'>
            <Swiper className='flex flex-wrap justify-between'
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={10}
              slidesPerView={3}
              pagination={{ clickable: true }}
              navigation

              autoplay={{
                delay: 3000,
              }}
              loop={true}
            >
              {getAll?.data.slice(0, 6).map((travel: Travel) => (
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
                    <p className='flex items-center justify-center text-3xl text-white'>{travel.price}</p>
                  </div>

                  <Button className='relative text-white hover:border-spacing-3'>Book a Hotel</Button>
                </SwiperSlide>
              ))}
            </Swiper>
          </Link>
        </div>
      </div>
    </SectionInViewUp>
  )
}
