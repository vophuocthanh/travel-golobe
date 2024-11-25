import { flightApi } from '@/apis/flight.api'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
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
  const { data: getAll, isLoading } = useQuery({
    queryKey: ['getAllFlight'],
    queryFn: () => flightApi.getAll(1, 4)
  })

  if (isLoading)
    return (
      <div className="items-center mx-auto mt-10 space-y-4 max-w-[105rem]">
        <Skeleton width="100%" height="2.5rem" />
        <Skeleton width="100%" height="2.5rem" />
        <Skeleton width="100%" height="2.5rem" />
        <Skeleton width="100%" height="2.5rem" />
        <Skeleton width="100%" height="2.5rem" />
        <Skeleton width="100%" height="2.5rem" />
        <Skeleton width="100%" height="2.5rem" />
        <Skeleton width="100%" height="2.5rem" />
      </div>
    )

  return (
    <SectionInViewRight>
      <div className="xl:mt-[5rem] max-sm:mt-10">
        <div className="lg:mx-4 xl:relative xl:mx-36">
          <h1 className="pt-0 mb-4 font-medium xl:flex xl:items-start xl:justify-start xl:text-3xl max-lg:text-sm max-sm:text-center ">
            {t('travelFlight')}
          </h1>
          <div className="flex flex-wrap mb-4 xl:justify-between xl:relative xl:flex-wrap max-sm:text-center max-sm:items-center max-sm:justify-center">
            <p className="xl:w-[970px] sm:w-[400px] xl:text-xl mb-8 sm:mb-0 font-light xs:truncate max-sm:text-center ">
              {t('textTravelFlight')}
            </p>
            <Link to="/vehicle/flight/all-flight" className="">
              <Button className="text-black bg-white border border-primary ">{t('see')}</Button>
            </Link>
          </div>

          <div className="flex w-full gap-8 max-sm:m-4 max-sm:w-[93%]">
            <Swiper
              className="flex flex-wrap justify-between"
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              autoplay={{
                delay: 3000
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1, // Hiển thị 1 card khi màn hình nhỏ hơn 640px
                  spaceBetween: 10 // Khoảng cách giữa các card ở màn hình nhỏ
                },
                1024: {
                  slidesPerView: 3, // Hiển thị 3 card khi màn hình lớn hơn 1024px
                  spaceBetween: 30 // Khoảng cách giữa các card ở màn hình lớn
                }
              }}
            >
              {getAll?.data.slice(0, 6).map((flight: FlightResponseType) => (
                <SwiperSlide
                  key={flight.id}
                  className="hover:transform hover:-translate-y-1 relative flex flex-col justify-end h-[30rem] p-4 bg-center bg-cover xl:w-[14rem] rounded-lg "
                  style={{ backgroundImage: `url(${flight.image})` }}
                >
                  <Link to={`/vehicle/flight/${flight.id}`} key={flight.id}>
                    <div className="absolute inset-x-0 bottom-0 rounded-b-lg h-1/3 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <div className="flex text-xl font-semibold text-white">
                      <p className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{flight.take_place}</p>
                      <p className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis"> - {flight.trip_to}</p>
                    </div>
                    <p className="w-full text-gray-300">{flight.trip_time}</p>
                    <div className="relative flex justify-between w-full gap-4 mb-4">
                      <div className="flex flex-row items-end w-[50%]">
                        <p className="w-full text-lg font-semibold text-white">
                          {flight.start_time}-{flight.end_time}
                        </p>
                      </div>
                      <p className="flex items-center justify-center text-lg text-white">
                        {formatCurrencyVND(flight.price)}
                      </p>
                    </div>
                  </Link>
                  <Button className="relative text-white hover:border-spacing-3">{t('BookFlight')}</Button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
