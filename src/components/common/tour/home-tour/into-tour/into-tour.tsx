import { tourApi } from '@/apis/tour.api'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { TourResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function IntoTour() {
  const { t } = useTranslation()
  const { data: getAll, isLoading } = useQuery({
    queryKey: ['getAllTour'],
    queryFn: () => tourApi.getAll(1, 4)
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
      </div>
    )

  return (
    <SectionInViewUp>
      <div className='px-32 py-3 mb-20 rounded-2xl max-xl:px-20 max-lg:px-14 max-sm:px-8'>
        <div className='w-full '>
          <div className='flex items-center justify-between mb-5'>
            <div>
              <h2 className='mb-3 text-2xl font-medium'>{t('travel')}</h2>
              <p className='w-[70%] max-sm:w-[85%]'>{t('textTravel')}</p>
            </div>
            <Link to='/tour/all-tour'>
              <Button className='text-black bg-white border border-primary'>{t('see')}</Button>
            </Link>
          </div>
          <div className='flex justify-between w-full '>
            <Swiper
              className='flex flex-wrap justify-between'
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={40}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              autoplay={{
                delay: 3000
              }}
              loop={true}
              breakpoints={{
                1024: {
                  slidesPerView: 3, // Khi width >= 1024px thì hiện 3 hình
                },
                550: {
                  slidesPerView: 2, // Khi width >= 768px thì hiện 2 hình
                },
              }}
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
                        <p className='w-full overflow-hidden text-3xl font-semibold text-white whitespace-pre-line max-sm:text-xl max-xl:text-2xl text-ellipsis line-clamp-1'>
                          {item.description}
                        </p>
                        <p className='w-full overflow-hidden text-xl font-medium text-gray-300 whitespace-pre-line max-sm:text-sm text-ellipsis line-clamp-1'>
                          {item.name}
                        </p>
                      </div>
                      <p className='flex items-center justify-center text-2xl text-white max-xl:text-lg max-lg:text-sm'>
                        {formatCurrencyVND(item.totalAmount)}
                      </p>
                    </div>
                    <Button className='relative flex justify-center w-full text-white hover:border-spacing-3 max-sm:px-10'>{t('Booktour')}</Button>
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
