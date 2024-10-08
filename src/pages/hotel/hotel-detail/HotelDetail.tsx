import { bookingHotelApi } from '@/apis/booking-hotel.api'
import { commentHotelApi } from '@/apis/comment-hotel.api'
import { hotelApi } from '@/apis/hotel.api'
import { IconLink } from '@/common/icons'
import { Footer, Header } from '@/components/common'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import HotelDetailAmenities from '@/components/common/hotel/hotel-detail-content/hotel-detail-amenities'
import HotelDetailMap from '@/components/common/hotel/hotel-detail-content/hotel-detail-map'
import HotelDetailOverview from '@/components/common/hotel/hotel-detail-content/hotel-detail-overview'
import HotelDetailReview from '@/components/common/hotel/hotel-detail-content/hotel-detail-review'
import HotelDetailRoom from '@/components/common/hotel/hotel-detail-content/hotel-detail-room'
import { Button } from '@/components/ui/button'
import ReadOnlyRating from '@/pages/home-stay/components/ReadOnlyRating'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronRight, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Favorite from '../components/Favorite'

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => hotelApi.getById(id)
  })
  const [hotelQuantity, setHotelQuantity] = useState(1)

  const mutationHotelBooking = useMutation({
    mutationFn: () => bookingHotelApi.addBookingHotel(id || '', hotelQuantity),
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
    mutationHotelBooking.mutate()
  }

  const { data: getCommentHotel } = useQuery({
    queryKey: ['getComments', id],
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
                <div className='flex items-center gap-2 mt-5'>
                  <Button className='text-black bg-white border hover:text-white border-primary'>
                    {getbyId?.score_hotels}
                  </Button>
                  <p className='font-bold'>{ratingStatus}</p>
                  <p>{getCommentHotel?.total} reviews</p>
                </div>
              </div>
            </div>
            <div className='flex-1 text-right'>
              <p className='text-[32px] font-bold text-[#FF8682]'>{formatCurrency(getbyId?.price?.toString())}</p>
              <div className='flex items-center justify-end gap-2 space-x-2'>
                <p>Còn {getbyId?.number_of_seats_remaining} phòng</p>
                <Favorite idHotel={id} />
                <div className='flex items-center justify-center w-10 h-10 text-xs font-medium transition-colors border rounded cursor-pointer border-primary'>
                  <IconLink />
                </div>
                <div className='flex border border-gray-300 rounded'>
                  <button
                    onClick={() => setHotelQuantity(Math.max(1, hotelQuantity - 1))}
                    className='px-4 py-2 text-black bg-gray-200 rounded-l hover:bg-gray-300'
                  >
                    -
                  </button>
                  <input
                    type='text'
                    value={hotelQuantity}
                    onChange={(e) => setHotelQuantity(Math.max(1, Number(e.target.value)))}
                    min='1'
                    className='w-16 text-center border-t border-b border-gray-300 focus:outline-none'
                  />
                  <button
                    onClick={() => setHotelQuantity(hotelQuantity + 1)}
                    className='px-4 py-2 text-black bg-gray-200 rounded-r hover:bg-gray-300'
                  >
                    +
                  </button>
                </div>
                <Button onClick={handleBookHotel}>Book now</Button>
              </div>
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
          <HotelDetailRoom Room={getbyId?.rooms || []} />
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
