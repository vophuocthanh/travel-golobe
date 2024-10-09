import { bannercoach, coachdetail1, coachdetail2, coachdetail3 } from '@/assets/images'
import { Footer, Header } from '@/components/common'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Bus,
  BusFront,
  ChevronRight,
  HeartIcon,
  MapPin,
  MoveLeft,
  MoveRight,
  RockingChair,
  Timer,
  UtensilsCrossed,
  Wifi
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'swiper/css'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import CoachDetailReview from './commentCoach'
import { coachApi } from '@/apis/coach.api'
import { commentCoachApi } from '@/apis/comment-coach.api'
import { IconLink } from '@/common/icons'
import { bookingCoachApi } from '@/apis/booking-coach'
import { toast } from 'sonner'


export default function CoachDetail() {
  const [liked, setLiked] = useState(false)
  const [roadVehicleQuantity, setRoadVehicleQuantity] = useState(1) // Khởi tạo số lượng là 1


  const handleClick = () => {
    setLiked(!liked)
  }

  const slides = [
    { content: coachdetail1 },
    { content: coachdetail2 },
    { content: coachdetail3 },
    { content: coachdetail1 },
    { content: coachdetail2 },
    { content: coachdetail3 },
    { content: coachdetail1 },
    { content: coachdetail2 },
    { content: coachdetail3 },
    { content: coachdetail1 },
    { content: coachdetail2 },
    { content: coachdetail3 },
    { content: coachdetail1 },
    { content: coachdetail2 },
    { content: coachdetail3 },
    { content: coachdetail1 },
    { content: coachdetail2 },
    { content: coachdetail3 }
  ]

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  
  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => coachApi.getById(id || '')
  })
  const { data: getCommentCoach } = useQuery({
    queryKey: ['getComments', id],
    queryFn: () => commentCoachApi.getComments(id || '')
  })
  
  const price = getbyId?.price
  const formattedPrice = price ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 VND'
  
  

  const mutationCoachBooking = useMutation({
    mutationFn: () => bookingCoachApi.addBookingCoach(id || '', roadVehicleQuantity),
    onSuccess: (data) => {
      const bookingId = data.id;
      toast.success(`Coach booked successfully with Booking ID: ${bookingId}`)
      navigate(`/vehicle/coach/all-coach/coach-payment/${bookingId}`)
    },
      onError: () => {
      toast.error('Failed to book coach')
    }
  })

  const handleIncreaseQuantity = () => {
    setRoadVehicleQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecreaseQuantity = () => {
    if (roadVehicleQuantity > 1) {
      setRoadVehicleQuantity((prevQuantity) => prevQuantity - 1)
    }
  }
  const handleBookCoach = () => {
    mutationCoachBooking.mutate()
  }
  
  return (
    <>
      <Header />
      <div className='container mx-auto pt-28 pb-72'>
        <section>
          <div className='flex items-center space-x-2 text-sm text-gray-600'>
            <p>Today</p>
            <ChevronRight className='w-4 h-4' />
            <p>Istanbul</p>
            <ChevronRight className='w-4 h-4' />
            <p>{getbyId?.location}</p>
          </div>
          <div className='flex justify-between p-4'>
            <div>
              <p className='text-2xl font-bold'>{getbyId?.brand}</p>
              <div className='flex items-center mt-1 space-x-2 text-sm'>
                <MapPin className='w-4 h-4' />
                <p>{getbyId?.destination}</p>
              </div>
              <div className='flex items-center mt-2 space-x-2'>
                <p className='flex items-center justify-center w-10 h-8 text-xs font-medium border rounded border-primary'>
                  4.2
                </p>
                <p className='text-xs font-normal'>
                  <span className='font-bold'>Very Good </span>
                  54 reviews
                </p>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-[32px] text-right font-bold text-[#FF8682]'>{formattedPrice}</p>
              <div className='flex space-x-2'>
                <p className='flex items-center px-2 py-1 text-lg text-black border rounded border-primary '>Còn {getbyId?.number_of_seats_remaining} chổ ngồi</p>
                <div className='flex items-center space-x-4 bg-white border rounded border-primary '>
                  <Button onClick={handleDecreaseQuantity} disabled={getbyId?.number_of_seats_remaining === 0} className='w-10 px-2 py-1 text-lg text-black border rounded'>
                    -
                  </Button>
                  <p className='text-lg font-semibold'>{roadVehicleQuantity}</p>
                  <Button onClick={handleIncreaseQuantity} disabled={getbyId?.number_of_seats_remaining === 0} className='w-10 px-2 py-1 text-lg text-black border rounded'>
                    +
                  </Button>
                </div>
                <p
                  className='flex items-center justify-center w-10 h-10 text-xs font-medium transition-colors border rounded cursor-pointer border-primary'
                  onClick={handleClick}
                >
                  <HeartIcon className={`w-4 h-4 ${liked ? 'text-red-600' : ''}`} />
                </p>
                <p className='flex items-center justify-center w-10 h-10 text-xs font-medium transition-colors border rounded cursor-pointer border-primary'>
                  <IconLink/>
                </p>
                  <Button className='text-black' onClick={handleBookCoach} disabled={getbyId?.number_of_seats_remaining === 0}>Book now</Button>
              </div>
            </div>
          </div>
        </section>

        <section className='mb-8'>
          <img src={bannercoach} alt='Coach Banner' className='object-cover w-full h-[30rem] rounded-xl' />
        </section>

        <section className='mb-8'>
          <div className='mb-10'>
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={10}
              slidesPerView={4}
              pagination={{ clickable: true }}
              navigation
              breakpoints={{
                1024: {
                  slidesPerView: 9,
                  spaceBetween: 20
                }
              }}
              autoplay={{
                delay: 3000
              }}
              loop={true}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index} className='flex justify-center'>
                  <img
                    src={slide.content}
                    alt={`Slide ${index + 1}`}
                    className='rounded-lg shadow-md w-[120px] h-[90px] object-fill'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className='h-auto p-6 mb-10 space-y-4 rounded-lg bg-primary'>
            <p className='text-2xl font-bold '>Coach Service Health and Safety Policies</p>
            <div className='flex flex-col space-y-4'>
              <div className='flex items-center space-x-3'>
                <Timer className='w-5 h-5 text-white' />
                <p className='text-sm text-gray-200'>Pre-Trip Cleaning: Coaches are thoroughly cleaned before every trip, with extra care on high-touch surfaces.</p>
              </div>
              <div className='flex items-center space-x-3'>
                <Timer className='w-5 h-5 text-white' />
                <p className='text-sm text-gray-200'>Air Filtration: Coaches are fitted with HEPA filters to purify the air, removing up to 99.97% of particles.</p>
              </div>
              <div className='flex items-center space-x-3'>
                <Timer className='w-5 h-5 text-white' />
                <p className='text-sm text-gray-200'>Health Screening: Passengers must complete a short health questionnaire before boarding to ensure safe travel for all.</p>
              </div>
            </div>
          </div>

          <div className='p-6 mb-10 bg-white border shadow-md rounded-xl'>
            <div className='flex justify-between'>
              <p className='text-xl font-bold'>{getbyId?.start_time} {getbyId?.start_day ? new Date(getbyId.start_day).toLocaleDateString('vi-VN') : 'N/A'}</p>
              <p className='text-lg font-medium'>{getbyId?.brand}</p>
            </div>

            <div className='gap-4'>
              <div className='flex justify-between mt-5'>
                <div className='flex items-center px-8 py-4 space-x-6 border rounded-lg'>
                  <img src={getbyId?.images} alt='' className='w-16' />
                  <div>
                    <p className='text-2xl font-bold'>{getbyId?.brand}</p>
                    <p className='text-sm font-medium'>{getbyId?.number_of_seat}</p>
                  </div>
                </div>
                <div className='flex items-center p-6'>
                  <div className='flex items-center space-x-6'>
                    <BusFront className='w-6 h-6' />
                    <span className='h-6 border-l border-gray-400'></span>
                    <Wifi className='w-6 h-6' />
                    <span className='h-6 border-l border-gray-400'></span>
                    <Timer className='w-6 h-6' />
                    <span className='h-6 border-l border-gray-400'></span>
                    <UtensilsCrossed className='w-6 h-6' />
                    <span className='h-6 border-l border-gray-400'></span>
                    <RockingChair className='w-6 h-6' />
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center mt-5 space-x-20'>
                <div className='flex flex-col'>
                  <div className='flex items-center space-x-4'>
                    <p className='text-2xl font-semibold'>{getbyId?.start_time}</p>
                    <p className='text-base font-medium'>Newark(EWR)</p>
                  </div>
                  <p>{getbyId?.take_place}</p>
                </div>

                <div className='flex items-center space-x-4'>
                  <MoveLeft className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
                  <Bus className='w-6 h-6'/>
                  <MoveRight className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
                </div>

                <div className='flex flex-col'>
                  <div className='flex items-center space-x-4'>
                    <p className='text-2xl font-semibold'>{getbyId?.end_time}</p>
                    <p className='text-base font-medium'>Newark(EWR)</p>
                  </div>
                  <p>{getbyId?.destination}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CoachDetailReview data={getCommentCoach?.data ?? []} />
      </div>
      <Footer />
    </>
  )
}
