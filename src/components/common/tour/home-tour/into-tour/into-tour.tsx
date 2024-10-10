import { tourApi } from '@/apis/tour.api'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { TourResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function IntoTour() {
  const { data: getAll } = useQuery({
    queryKey: ['getAllTour'],
    queryFn: () => tourApi.getAll(1, 5)
  })
  console.log(getAll?.data, 'datatour')
  return (
    <SectionInViewUp>
      <div className='px-32 py-3 mb-20 rounded-2xl'>
        <div className='w-full '>
          <div className='flex items-center justify-between mb-5'>
            <div>
              <h2 className='mb-3 text-2xl font-medium'>Fall into travel</h2>
              <p className='w-[70%]'>
                Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the
                travel tools to get you to your destination.
              </p>
            </div>
            <Link to='/tour/all-tour'>
              <Button className='text-black bg-white border border-primary'>See All</Button>
            </Link>
          </div>
          <div className='flex justify-between '>
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
              {getAll?.data.map((item: TourResponseType) => (
                <SwiperSlide
                  key={item.id}
                  className='hover:transform hover:-translate-y-1 relative flex flex-col justify-end h-[30rem] p-4 bg-center bg-cover w-[18rem] rounded-lg'
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <Link to={`/tour/${item.id}`}>
                    <div className='absolute inset-x-0 bottom-0 rounded-b-lg h-1/3 bg-gradient-to-t from-gray-900 to-transparent'></div>
                    <div className='relative flex justify-between w-full gap-4 mb-4'>
                      <div className='flex flex-col items-end'>
                        <p className='w-full overflow-hidden text-3xl font-semibold text-white whitespace-pre-line text-ellipsis line-clamp-1'>
                          {item.description}
                        </p>
                        <p className='w-full overflow-hidden text-xl font-medium text-gray-300 whitespace-pre-line text-ellipsis line-clamp-1'>
                          {item.name}
                        </p>
                      </div>
                      <p className='flex items-center justify-center text-2xl text-white'>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                      </p>
                    </div>
                    <Button className='relative w-full text-white hover:border-spacing-3'>Book a Hotel</Button>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </SectionInViewUp>
  )
}
