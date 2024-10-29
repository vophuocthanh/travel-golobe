import { bookingFlightApi } from '@/apis/booking-flight'
import { flightApi } from '@/apis/flight.api'
import { flightdetail1, flightdetail2, flightdetail3, ticket_economy } from '@/assets/images'
import { IconFlight } from '@/common/icons'
import { Footer, Header } from '@/components/common'
import Favorite from '@/components/common/flight/all-flight/favorite'
import FlightTicketSelection from '@/components/common/flight/all-flight/FlightTicketSelection'
import ShareButtons from '@/components/common/share/share-link'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@radix-ui/react-checkbox'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  ChevronRight,
  Link2,
  MapPin,
  MoveLeft,
  MoveRight,
  Plane,
  RockingChair,
  Timer,
  UtensilsCrossed,
  Wifi
} from 'lucide-react'
import { useRef, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useTranslation } from 'react-i18next'
import 'swiper/css'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
export default function FlightDetail() {
  const { t } = useTranslation()
  const slides = [
    { content: flightdetail1 },
    { content: flightdetail2 },
    { content: flightdetail3 },
    { content: flightdetail1 },
    { content: flightdetail2 },
    { content: flightdetail3 },
    { content: flightdetail1 },
    { content: flightdetail2 },
    { content: flightdetail3 },
    { content: flightdetail1 },
    { content: flightdetail2 },
    { content: flightdetail3 },
    { content: flightdetail1 },
    { content: flightdetail2 },
    { content: flightdetail3 },
    { content: flightdetail1 },
    { content: flightdetail2 },
    { content: flightdetail3 }
  ]
  const [flightQuantity, setFlightQuantity] = useState(1)

  const [selectedTicket, setSelectedTicket] = useState('')

  const SectionRef = useRef<HTMLDivElement | null>(null)

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => flightApi.getById(id || '')
  })
  const [loadingBooking, setLoadingBooking] = useState(false)
  const price = getbyId?.price
  const formattedPrice = price ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 VND'

  const mutationFlightBooking = useMutation({
    mutationFn: () => bookingFlightApi.addBookingFlight(id || '', flightQuantity, selectedTicket),
    onSuccess: (data) => {
      const bookingId = data.id
      toast.success(`Flight booked successfully with Booking ID: ${bookingId}`)
      navigate(`/vehicle/flight/all-flight/flight-payment/${bookingId}`)
    },
    onError: () => {
      toast.error('Failed to book flight')
    }
  })

  const handleBookFlight = () => {
    if (selectedTicket === '') {
      toast.error('Vui lòng chọn vé trước khi đặt.')
      SectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setLoadingBooking(true)
      mutationFlightBooking.mutate()
    }
  }

  const handleTicketSelection = (id: string) => {
    setSelectedTicket(id)
  }

  const flightUrl = `https://travel-golobe.vercel.app/tour/${id}`
  const flightTitle = 'Chia sẻ chyến bay thú vị này!'

  return (
    <>
      <Header />
      <div className='container mx-auto pt-28 pb-72'>
        <section>
          <div className='flex items-center space-x-2 text-sm text-gray-600'>
            <Link to='/vehicle/flight' className='text-red-400'>
              Flight
            </Link>
            <ChevronRight className='w-4 h-4' />
            <Link to='/vehicle/flight/all-flight' className='text-red-400'>
              Flight All
            </Link>
            <ChevronRight className='w-4 h-4' />
            <p className='text-lg text-primary'>{getbyId?.brand}</p>
          </div>
          <div className='flex justify-between p-4'>
            <div>
              <p className='text-2xl font-bold text-[#FF8682]'>{getbyId?.brand}</p>
              <div className='flex flex-row items-center justify-center pt-5 space-x-2'>
                <div className='flex items-center'>
                  <p className='font-semibold text-xxs'>{getbyId?.take_place}</p>
                </div>
                <Plane className='w-6 h-6 text-primary' />
                <div className='flex items-center'>
                  <p className='font-semibold text-xxs'>{getbyId?.destination}</p>
                </div>
              </div>
              <div className='flex items-center mt-1 space-x-2 text-sm'>
                {/* <MapPin className='w-4 h-4' /> */}
                <p></p>
              </div>
              <div className='flex items-center mt-2 space-x-2'>
                <p className='flex items-center justify-center h-10 text-xs font-medium border rounded cursor-pointer w-11 border-primary hover:bg-primary'>
                  4.2
                </p>
                <p className='font-2xl normal text-'>
                  <span className='font-bold'>Very Good </span>
                  54 reviews
                </p>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-[32px] font-bold text-[#FF8682] text-right'>{formattedPrice} </p>
              <div className='flex space-x-2'>
                <p className='mt-2 text-lg font-bold text-black'>
                  {t('Availab')} {getbyId?.number_of_seats_remaining} {t('Ticket')}
                </p>
                <Favorite id={getbyId?.id} />
                <div className='flex border rounded border-primary'>
                  <Button
                    className='w-10 px-4 py-2 font-bold text-black rounded-l bg-primary hover:bg-green-200'
                    onClick={() => setFlightQuantity(Math.max(1, flightQuantity - 1))}
                    disabled={getbyId?.number_of_seats_remaining === 0}
                  >
                    -
                  </Button>
                  <input
                    value={flightQuantity}
                    type='text'
                    min='1'
                    className='h-10 text-center border-t border-b border-gray-300 w-14 focus:outline-none'
                    onChange={(e) =>
                      setFlightQuantity(Math.max(1, Number(e.target.value), getbyId?.number_of_seats_remaining ?? 0))
                    }
                  />
                  <Button
                    onClick={() =>
                      setFlightQuantity(Math.min(flightQuantity + 1, getbyId?.number_of_seats_remaining ?? 0))
                    }
                    className='w-10 px-4 py-2 text-black rounded-r bg-primary hover:bg-green-200'
                    disabled={
                      getbyId?.number_of_seats_remaining === 0 || getbyId?.number_of_seats_remaining === flightQuantity
                    }
                  >
                    +
                  </Button>
                </div>
                <p className='flex items-center justify-center w-10 h-10 text-xs font-medium transition-colors border rounded cursor-pointer border-primary'>
                  <Link2 className={`w-4 h-4`} />
                </p>

                <ShareButtons url={flightUrl} title={flightTitle} />
                <Button
                  onClick={handleBookFlight}
                  disabled={getbyId?.number_of_seats_remaining === 0}
                  loading={loadingBooking}
                >
                  {t('BookFlight')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className='mb-8'>
          <img src={getbyId?.image} alt='Flight Banner' className='object-cover w-full h-[30rem] rounded-xl' />
        </section>

        <section className='mb-8'>
          <div className='flex justify-between p-4'>
            <p className='text-2xl font-bold text-gray-800'>{t('Economy')}</p>
            <div className='flex space-x-6'>
              <label className='flex items-center space-x-2'>
                <Checkbox />
                <span className='text-lg font-medium'>{t('economy')}</span>
              </label>
              <label className='flex items-center space-x-2'>
                <Checkbox />
                <span className='text-lg font-medium'>{t('First')}</span>
              </label>
              <label className='flex items-center space-x-2'>
                <Checkbox />
                <span className='text-lg font-medium'>{t('Business')}</span>
              </label>
            </div>
          </div>

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
                    className='rounded-lg shadow-md w-[120px] h-[120px]'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className='h-auto p-6 mb-10 space-y-4 rounded-lg bg-primary'>
            <p className='text-2xl font-bold '>{t('Emirates')}</p>
            <div className='flex flex-col space-y-4'>
              <div className='flex items-center space-x-3'>
                <Timer className='w-5 h-5 text-white' />
                <p className='text-sm text-gray-200'>{t('installation')}</p>
              </div>
              <div className='flex items-center space-x-3'>
                <Timer className='w-5 h-5 text-white' />
                <p className='text-sm text-gray-200'>{t('screening')}</p>
              </div>
            </div>
          </div>

          <div ref={SectionRef}>
            {/* <FlightDaySelection day={day} setDay={setDay}></FlightDaySelection> */}
            <FlightTicketSelection
              tickets={getbyId?.Ticket || []}
              ticketEconomy={ticket_economy}
              onTicketSelect={handleTicketSelection}
            />
          </div>

          <div className='p-6 mb-10 bg-white border shadow-md rounded-xl'>
            <div className='flex justify-between'>
              <p className='text-xl font-bold'>
                {new Date(getbyId?.start_day || '').toLocaleDateString('vi-VN')} {' -->  '}
                {new Date(getbyId?.end_day || '').toLocaleDateString('vi-VN')}
              </p>

              <p className='text-lg font-medium'>{getbyId?.brand}</p>
            </div>

            <div className='pt-6'>
              <div className='flex justify-between'>
                <div className='flex items-center px-8 py-4 space-x-6 border rounded-lg'>
                  <img src={getbyId?.image} alt='' className='w-20 rounded-md' />
                  <div>
                    <p className='text-2xl font-bold'>{getbyId?.brand}</p>
                    <p className='text-sm font-medium'>Airbus A320</p>
                  </div>
                </div>
                <div className='flex items-center p-6'>
                  <div className='flex items-center space-x-6'>
                    <Plane className='w-6 h-6' />
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
              <div className='flex items-center justify-center space-x-20'>
                <div className='flex items-center space-x-4'>
                  <p className='text-2xl font-semibold'>{getbyId?.start_time}</p>
                  <p className='text-base font-medium'>Newark(EWR)</p>
                </div>

                <div className='flex items-center space-x-4'>
                  <MoveLeft className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
                  <IconFlight />
                  <MoveRight className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
                </div>

                <div className='flex items-center space-x-4'>
                  <p className='text-2xl font-semibold'>{getbyId?.end_time}</p>
                  <p className='text-base font-medium'>Newark(EWR)</p>
                </div>
              </div>

              <div className='flex flex-row items-center justify-center pt-5'>
                <div className='flex items-center space-x-4'>
                  <Plane className='w-6 h-6 text-primary' />
                  <p className='text-2xl font-semibold'>{getbyId?.take_place}</p>
                </div>
                <div className='flex items-center px-4 space-x-6'>
                  <MoveLeft className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
                  <IconFlight />
                  <MoveRight className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
                </div>

                <div className='flex items-center space-x-4'>
                  <MapPin className='w-6 h-6 text-primary' />
                  <p className='text-2xl font-semibold'>{getbyId?.destination}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
