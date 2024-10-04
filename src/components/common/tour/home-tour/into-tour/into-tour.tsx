import { tourApi } from '@/apis/tour.api'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { Tour } from '@/shared/ts/interface/comment-tour.interface'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'



export default function IntoTour() {
  const { data: getAll } = useQuery({
    queryKey: ['getAllTour'],
    queryFn: () => tourApi.getAll(1,5)
  })
  console.log(getAll?.data, 'datatour')



  return (
    <SectionInViewUp>
      <div className='mt-32'>
        <div className='mx-32 '>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl'> Fall intro travel</h1>
          <div className='flex flex-wrap justify-between '>
            <p className='w-[970px] text-xl mb-8'>
              Going somewhere to celebrate this season? Whether you’re gng home or somewhere to roam, we’ve got the
              travel tools to get you to your destination.
            </p>
            <Link to='/tour/all-tour'>
              <div className='w-full p-3 text-center text-black border rounded-lg border-primary hover:bg-slate-200 ' >See All</div>
            </Link>
          </div>
          <Link to=''>
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
              {getAll?.data.slice(0, 6).map((item: Tour) => (
                <SwiperSlide
                  key={item.id}
                  className='hover:transform hover:-translate-y-1 relative flex flex-col justify-end h-[30rem] p-4 bg-center bg-cover w-[18rem] rounded-lg'
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className='absolute inset-x-0 bottom-0 rounded-b-lg h-1/3 bg-gradient-to-t from-gray-900 to-transparent'></div>

                  <div className='flex items-center justify-between p-2 mb-3 bg-white rounded-lg opacity-60'>
                  <div className=''>
                      <h3 className='overflow-hidden text-xl font-medium whitespace-pre-line text-ellipsis line-clamp-1'>
                        {item.description}
                      </h3>
                      <p className='overflow-hidden font-medium whitespace-pre-line text-ellipsis line-clamp-1'>
                        {item.name}
                      </p>
                    </div>
                    <h3 className='text-xl font-medium '>${item.price}</h3>
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


