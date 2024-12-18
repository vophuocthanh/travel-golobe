import { bookingHotelApi } from '@/apis/booking-hotel.api'
import { commentHotelApi } from '@/apis/comment-hotel.api'
import { hotelApi } from '@/apis/hotel.api'
import { Footer, Header } from '@/components/common'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import HotelDetailAmenities from '@/components/common/hotel/hotel-detail-content/hotel-detail-amenities'
import HotelDetailMap from '@/components/common/hotel/hotel-detail-content/hotel-detail-map'
import HotelDetailOverview from '@/components/common/hotel/hotel-detail-content/hotel-detail-overview'
import HotelDetailReview from '@/components/common/hotel/hotel-detail-content/hotel-detail-review'
import HotelDetailRoom from '@/components/common/hotel/hotel-detail-content/hotel-detail-room'
import ShareButtons from '@/components/common/share/share-link'
import { Button } from '@/components/ui/button'
import ReadOnlyRating from '@/pages/home-stay/components/ReadOnlyRating'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DatePicker, Space } from 'antd'
import { ChevronRight, MapPin } from 'lucide-react'
import moment from 'moment'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Favorite from '../components/Favorite'

export default function HotelDetail() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const roomSectionRef = useRef<HTMLDivElement | null>(null)
  const [loadingBooking, setLoadingBooking] = useState(false)

  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => hotelApi.getById(id)
  })
  const [hotelQuantity, setHotelQuantity] = useState(1)
  const [roomId, setRoomId] = useState('')

  const handleValueChange = (value: string) => {
    setRoomId(value)
  }
  const { RangePicker } = DatePicker

  const [checkInDate, setCheckInDate] = useState<string | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null)
  const isLoggedIn = Boolean(localStorage.getItem('access_token'))

  const mutationHotelBooking = useMutation({
    mutationFn: () => {
      if (!isLoggedIn) {
        navigate('/login')
        return Promise.reject(new Error('User not logged in'))
      }
      return bookingHotelApi.addBookingHotel(id || '', hotelQuantity, roomId, checkInDate, checkOutDate)
    },
    onSuccess: (data) => {
      const bookingId = data.id
      toast.success(`Hotel booked successfully with Booking ID: ${bookingId}`)
      navigate(`/hotel/home-stay/hotel-payment/${bookingId}`)
    },
    onError: () => {
      if (isLoggedIn) {
        toast.error('Failed to book Hotel')
      } else {
        toast.error('Please you must login to book ')
      }
    }
  })

  const handleBookHotel = () => {
    if (roomId === '' || !checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out date and select room')
      roomSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      mutationHotelBooking.mutate()
      setLoadingBooking(true)
    }
  }

  const { data: getCommentHotel } = useQuery({
    queryKey: ['getCommentHotel', id],
    queryFn: () => commentHotelApi.getComments(id || '')
  })

  const totalComments = getCommentHotel?.total ?? 0
  const averageRating =
    totalComments > 0
      ? (getCommentHotel?.data.reduce((acc, cur) => acc + cur.rating, 0) / totalComments).toFixed(1)
      : '0'

  const getRatingStatus = (rating: number) => {
    if (rating <= 2) {
      return 'Not Good'
    } else if (rating <= 4) {
      return 'Good'
    } else {
      return 'Very Good'
    }
  }
  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'N/A'
    const numberValue = parseFloat(value)
    return isNaN(numberValue)
      ? 'N/A'
      : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberValue)
  }

  const ratingStatus = getRatingStatus(Number(averageRating))

  const hotelUrl = `https://travel-golobe.vercel.app/hotel/${id}`
  const hotelTitle = getbyId?.description || 'Chia sẻ tour thú vị này!'
  return (
    <div className="w-full">
      <Header />
      <SectionInViewRight>
        <main className="container pt-20 mx-auto">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="w-full mt-8 mb-8">
              <div className="flex items-center space-x-2 text-gray-800 text-md">
                <Link to="/hotel" className="text-red-400">
                  Hotel
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link to="/hotel/home-stay" className="text-red-400">
                  Hotel All
                </Link>
                <ChevronRight className="w-4 h-4" />
                <p>{getbyId?.hotel_names}</p>
              </div>
              <div className="flex mt-8">
                <h1 className="mr-5 text-3xl font-bold">{getbyId?.hotel_names}</h1>
                <div className="flex items-center mt-2">
                  <ReadOnlyRating rating={Number(getbyId?.star_number)} />
                  <span className="mt-1 ml-2">{Number(getbyId?.star_number)} Star Hotel</span>
                </div>
              </div>
              <div className="mt-5">
                <p className="flex text-gray-500 text-md">
                  <MapPin className="w-4 h-4 mr-2 text-black" />
                  {getbyId?.location}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[32px] font-bold text-[#FF8682]">{formatCurrency(getbyId?.price?.toString())}</p>
              <div className="">
                <div className="grid items-center justify-end grid-cols-1 gap-10 sm:grid-cols-2 lg:flex lg:gap-1">
                  {/* Room availability info */}
                  <div className="flex items-center justify-center lg:justify-end lg:gap-2 lg:space-x-2">
                    <p className="flex items-center justify-center px-4 py-1 text-sm text-black border rounded border-primary lg:border-none">
                      {t('Availab')} {getbyId?.number_of_seats_remaining} {t('rooms')}
                    </p>
                  </div>

                  {/* Favorite and Share buttons */}
                  <div className="flex flex-col items-center justify-center gap-1 sm:flex-row">
                    <Favorite idHotel={id} />
                    <ShareButtons url={hotelUrl} title={hotelTitle} />
                  </div>

                  {/* Quantity control */}
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <div className="flex border rounded border-primary">
                      <Button
                        onClick={() => setHotelQuantity(Math.max(1, hotelQuantity - 1))}
                        className="px-4 py-2 m-[1px] text-white"
                      >
                        -
                      </Button>
                      <input
                        type="text"
                        value={hotelQuantity}
                        onChange={(e) =>
                          setHotelQuantity(
                            Math.min(Math.max(1, Number(e.target.value)), getbyId?.number_of_seats_remaining ?? 0)
                          )
                        }
                        min="1"
                        className="w-16 text-center focus:outline-none"
                      />
                      <Button
                        onClick={() =>
                          setHotelQuantity(Math.min(hotelQuantity + 1, getbyId?.number_of_seats_remaining ?? 0))
                        }
                        className="px-4 py-1 m-[1px] text-white"
                        disabled={
                          getbyId?.number_of_seats_remaining === hotelQuantity ||
                          getbyId?.number_of_seats_remaining === 0
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Book Hotel Button */}
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={handleBookHotel}
                      disabled={getbyId?.number_of_seats_remaining === 0}
                      loading={loadingBooking}
                      className="mt-2 sm:mt-0 sm:ml-2"
                    >
                      {t('BookHotel')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-x-4">
              <Button className="text-black bg-white border hover:bg-primary hover:text-white border-primary">
                {getbyId?.score_hotels}
              </Button>
              <div>
                <p className="text-lg font-bold text-gray-700">{ratingStatus}</p>
                <p className="text-gray-500">{getCommentHotel?.total} reviews</p>
              </div>
            </div>

            <div className="m-4">
              <label htmlFor="date-range-picker" className="block mb-2 text-sm font-medium text-gray-700">
                {t('Select')}:
              </label>
              <Space direction="vertical" size={12}>
                <RangePicker
                  id="date-range-picker"
                  format="DD-MM-YYYY"
                  onChange={(dates) => {
                    if (dates && dates.length === 2) {
                      setCheckInDate(dates[0]?.format('DD-MM-YYYY') || null)
                      setCheckOutDate(dates[1]?.format('DD-MM-YYYY') || null)
                    }
                  }}
                  disabledDate={(current) => current && current < moment().subtract(0, 'days').startOf('day')}
                />
              </Space>
            </div>
          </div>
          <div className="items-start w-full mt-5 mb-8">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Large image on the left */}
              <div className="w-full col-span-1 md:col-span-2">
                <img src={getbyId?.image} alt="hotel" className="w-full h-[41rem] object-cover" />
              </div>

              {/* Smaller images on the right */}
              <div className="grid col-span-1 gap-4">
                <img src={getbyId?.image_2} alt="hotel" className="w-full h-[20rem] object-cover" />
                <img src={getbyId?.image_3} alt="hotel" className="w-full h-[20rem] object-cover" />
              </div>
              <div className="grid col-span-1 gap-4">
                <img src={getbyId?.image_4} alt="hotel" className="w-full h-[20rem] object-cover" />
                <img src={getbyId?.image_5} alt="hotel" className="w-full h-[20rem] object-cover" />
              </div>
            </div>
          </div>

          <HotelDetailOverview
            ratingStatus={ratingStatus}
            description={getbyId?.description || ''}
            averrange={Number(averageRating) ?? 0}
            total={getCommentHotel?.total || 0}
          />
          <div ref={roomSectionRef}>
            <HotelDetailRoom Room={getbyId?.rooms || []} onValueChange={handleValueChange} />
          </div>
          <HotelDetailMap />
          <HotelDetailAmenities />
          <HotelDetailReview
            data={getCommentHotel?.data ?? []}
            hotelId={id || ''}
            total={getCommentHotel?.total || 0}
          />
        </main>
      </SectionInViewRight>
      <div className="mt-[15rem] bottom-0">
        <Footer />
      </div>
    </div>
  )
}
