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
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Favorite from '../components/Favorite'
import { useState } from 'react'

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate();

  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => hotelApi.getById(id)
  })

  const [flightQuantity, setFlightQuantity] = useState(1)

  const mutationBookingHotel = useMutation({
    mutationFn: () => bookingHotelApi.addBookingHotel(id || '', flightQuantity),
    onSuccess: (data) => {
      const bookingId = data.id;
      toast.success(`Booking success 🚀🚀⚡⚡! ${bookingId}`);
      navigate(`/hotel/hotel-payment/${bookingId}`);
    },
    onError: () => {
      toast.error('Booking failed 😭😭😭😭!');
    }
  });

  function handleBookingHotel() {
    mutationBookingHotel.mutate();
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
              <div className='flex justify-end space-x-2'>
                <Favorite idHotel={id} />
                <div className='flex items-center justify-center w-10 h-10 text-xs font-medium transition-colors border rounded cursor-pointer border-primary'>
                  <IconLink />
                </div>
                <div className='flex border border-gray-300 rounded'>
                  <button
                    onClick={() => setFlightQuantity(Math.max(1, flightQuantity - 1))}
                    className='px-4 py-2 bg-gray-200 text-black rounded-l hover:bg-gray-300'
                  >
                    -
                  </button>
                  <input
                    type='text'
                    value={flightQuantity}
                    onChange={(e) => setFlightQuantity(Math.max(1, Number(e.target.value)))}
                    min="1"
                    className='w-16 text-center border-t border-b border-gray-300 focus:outline-none'
                  />
                  <button
                    onClick={() => setFlightQuantity(flightQuantity + 1)}
                    className='px-4 py-2 bg-gray-200 text-black rounded-r hover:bg-gray-300'
                  >
                    +
                  </button>
                </div>
                <Button onClick={handleBookingHotel}>Book now</Button>
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
