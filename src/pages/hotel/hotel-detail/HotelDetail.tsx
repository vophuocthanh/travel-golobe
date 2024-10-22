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
import { ChevronRight, MapPin } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Favorite from '../components/Favorite'
import { Space, DatePicker } from 'antd';
import moment from 'moment'

export default function HotelDetail() {
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
  const { RangePicker } = DatePicker;


  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);


  const mutationHotelBooking = useMutation({
    mutationFn: () => bookingHotelApi.addBookingHotel(id || '', hotelQuantity, roomId, checkInDate, checkOutDate),
    onSuccess: (data) => {
      const bookingId = data.id
      toast.success(`Hotel booked successfully with Booking ID: ${bookingId}`)
      navigate(`/hotel/home-stay/hotel-payment/${bookingId}`)
    },
    onError: () => {
      toast.error('Failed to book flight')
    }
  })

  const handleBookHotel = () => {
    setLoadingBooking(true)
    if (roomId === '') {
      roomSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      mutationHotelBooking.mutate()
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
    <div className='w-full'>
      <Header />
      <SectionInViewRight>
        <main className='pt-20 px-[5rem]'>
          <div className='flex items-center space-x-4'>
            <div className='items-start flex-1 w-full mt-8 mb-8'>
              <div className='flex items-center space-x-2 text-gray-800 text-md'>
                <p className='text-red-400'>Turkey</p>
                <ChevronRight className='w-4 h-4' />
                <p className='text-red-400'>Istanbul</p>
                <ChevronRight className='w-4 h-4' />
                <p>{getbyId?.hotel_names}</p>
              </div>
              <div className='flex mt-8 '>
                <h1 className='mr-5 text-3xl font-bold'>{getbyId?.hotel_names}</h1>
                <div className='flex items-center mt-2'>
                  <ReadOnlyRating rating={Number(getbyId?.star_number)} />
                  <span className='mt-1 ml-2'>{Number(getbyId?.star_number)} Star Hotel</span>
                </div>
              </div>
              <div className='mt-5'>
                <p className='flex text-gray-500 text-md'>
                  <MapPin className='w-4 h-4 mr-2 text-black' />
                  {getbyId?.location}
                </p>
              </div>
            </div>
            <div className='flex-1 text-right'>
              <p className='text-[32px] font-bold text-[#FF8682]'>{formatCurrency(getbyId?.price?.toString())}</p>
              <div className='flex items-center justify-end gap-2 space-x-2'>
                <p className='flex items-center px-2 py-1 text-lg text-black border rounded border-primary '>
                  Còn {getbyId?.number_of_seats_remaining} chổ ngồi
                </p>
                <Favorite idHotel={id} />
                <ShareButtons url={hotelUrl} title={hotelTitle} />
                <div className='flex border rounded border-primary'>
                  <Button
                    onClick={() => setHotelQuantity(Math.max(1, hotelQuantity - 1))}
                    className='px-4 py-2 m-[1px] text-white'
                  >
                    -
                  </Button>
                  <input
                    type='text'
                    value={hotelQuantity}
                    onChange={(e) =>
                      setHotelQuantity(
                        Math.min(Math.max(1, Number(e.target.value)), getbyId?.number_of_seats_remaining ?? 0)
                      )
                    }
                    min='1'
                    className='w-16 text-center focus:outline-none'
                  />
                  <Button
                    onClick={() =>
                      setHotelQuantity(Math.min(hotelQuantity + 1, getbyId?.number_of_seats_remaining ?? 0))
                    }
                    className='px-4 py-1 m-[1px] text-white'
                    disabled={
                      getbyId?.number_of_seats_remaining === hotelQuantity || getbyId?.number_of_seats_remaining === 0
                    }
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={handleBookHotel}
                  disabled={getbyId?.number_of_seats_remaining === 0}
                  loading={loadingBooking}
                >
                  Book now
                </Button>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-x-4">
              <Button className="text-black bg-white border hover:bg-primary hover:text-white border-primary">
                {getbyId?.score_hotels}
              </Button>
              <div>
                <p className="font-bold text-lg text-gray-700">{ratingStatus}</p>
                <p className="text-gray-500">{getCommentHotel?.total} reviews</p>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="date-range-picker" className="block text-sm font-medium text-gray-700 mb-2">
                Chọn ngày:
              </label>
              <Space direction="vertical" size={12}>
                <RangePicker
                  id="date-range-picker"
                  className="custom-date-picker border border-gray-300 rounded-lg p-2 w-full md:w-auto"
                  format="DD-MM-YYYY"
                  onChange={(dates) => {
                    if (dates && dates.length === 2) {
                      setCheckInDate(dates[0]?.format('DD-MM-YYYY') || null);
                      setCheckOutDate(dates[1]?.format('DD-MM-YYYY') || null);
                    }
                  }}
                  disabledDate={(current) =>
                    current && current < moment().subtract(0, 'days').startOf('day')
                  }
                />
              </Space>
            </div>
          </div>
          <div className='items-start w-full mt-5 mb-8'>
            <div className='grid w-full grid-cols-4 gap-4'>
              <div className='grid w-full col-span-2'>
                <img
                  src='https://ik.imagekit.io/tvlk/blog/2023/09/khach-san-view-bien-da-nang-1.jpg?tr=dpr-2,w-675'
                  alt='hotel'
                  className='w-full h-[41rem]'
                />
              </div>
              <div className='grid col-span-1 gap-4'>
                <img
                  src='https://www.kkday.com/vi/blog/wp-content/uploads/khach-san-Da-Nang-ft.jpg'
                  alt='hotel'
                  className='w-full h-[20rem]'
                />
                <img
                  src='https://owa.bestprice.vn/images/combos/658_370/combo-da-nang-3n2d-minh-toan-ocean-hotel-4-ve-may-bay-khu-hoi-5fce0306ee446.jpg'
                  alt='hotel'
                  className='w-full h-[20rem]'
                />
              </div>
              <div className='grid col-span-1 gap-4'>
                <img
                  src='https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10039783-066fe52d5f3ccb8e0aebb2dba564747b.jpeg'
                  alt='hotel'
                  className='w-full h-[20rem]'
                />
                <img
                  src='https://reviewvilla.vn/wp-content/uploads/2022/05/TOP-20-NHA-NGHI-DA-NANG-CHAT-LUONG-TOT-NHAT-2022-2.3.jpg'
                  alt='hotel'
                  className='w-full h-[20rem]'
                />
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
      <div className='mt-[15rem] bottom-0'>
        <Footer />
      </div>
    </div>
  )
}
