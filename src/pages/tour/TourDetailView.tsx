import { bookingTourApi } from '@/apis/booking-tour.api'
import { commentTourApi } from '@/apis/comment-tour.api'
import { tourApi } from '@/apis/tour.api'

import { IconDeparture, IconDepartureDate, IconNumberSeats, IconTime, IconTourCode } from '@/common/icons'
import { Footer, Header } from '@/components/common'
import ShareButtons from '@/components/common/share/share-link'
import Information from '@/components/common/tour/detail-tour/infomation/infomation'
import Schedule from '@/components/common/tour/detail-tour/schedule/schedule'
import TourDetailReview from '@/components/common/tour/detail-tour/tour-detail-review'
import Vehicle from '@/components/common/tour/detail-tour/vehicle/vehicle'
import Favorite from '@/components/common/tour/favorite/favorite'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronRight, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function TourDetailView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [tourQuantity, setTourQUantity] = useState(1)
  const [loadingBooking, setLoadingBooking] = useState(false)

  const { data: getbyId } = useQuery({
    queryKey: ['getByIdTour', id],
    queryFn: () => tourApi.getById(id)
  })

  const { data: getCommentTour } = useQuery({
    queryKey: ['getCommentTour', id],
    queryFn: () => commentTourApi.getComments(id || '')
  })

  const mutationAddBookingTour = useMutation({
    mutationFn: () => bookingTourApi.addBookingTour(id || '', tourQuantity)
  })

  const handleIncreaseQuantity = () => {
    setTourQUantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecreaseQuantity = () => {
    if (tourQuantity > 1) {
      setTourQUantity((prevQuantity) => prevQuantity - 1)
    }
  }

  const handleBookingTour = () => {
    setLoadingBooking(true)
    mutationAddBookingTour.mutate(undefined, {
      onSuccess: (data) => {
        const bookingId = data.id
        toast.success('Đặt tour thành công')
        navigate(`/tour/all-tour/tour-payment/${bookingId}`)
      },
      onError: () => {
        toast.error('Đặt tour thất bại')
      },
      onSettled: () => {
        setLoadingBooking(false)
      }
    })
  }

  const tourUrl = `https://travel-golobe.vercel.app/tour/${id}`
  const tourTitle = getbyId?.description || 'Chia sẻ tour thú vị này!'

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1)
  }, [])

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'N/A'
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  }

  const formatDateTime = formatDate(getbyId?.start_date)

  const price = getbyId?.totalAmount
  const formattedPrice = price ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 VND'

  const getRatingStatus = (rating: number) => {
    if (rating <= 2) {
      return 'Not Good'
    } else if (rating <= 4) {
      return 'Good'
    } else {
      return 'Very Good'
    }
  }

  const totalComments = getCommentTour?.total ?? 0
  const averageRating =
    totalComments > 0
      ? (getCommentTour?.data.reduce((acc, cur) => acc + cur.rating, 0) / totalComments).toFixed(1)
      : '0'

  const ratingStatus = getRatingStatus(Number(averageRating))
  return (
    <>
      {
        <div className='dark:bg-gray-700'>
          <Header />
          <div className='container px-4 mx-auto pt-28 pb-36'>
            {/* Header Section */}
            <section className='mb-12'>
              <div className='flex items-center mb-4 space-x-2 text-sm text-gray-600'>
                <p className='text-red-400'>Today</p>
                <ChevronRight className='w-4 h-4 text-gray-500 dark:text-white' />
                <p className='text-red-400'>Istanbul</p>
                <ChevronRight className='w-4 h-4 text-gray-500 dark:text-white' />
                <p className='overflow-hidden whitespace-pre-line text-ellipsis line-clamp-1 w-[30%] dark:text-white'>
                  {getbyId?.description}
                </p>
              </div>
              <div className='flex flex-col p-6 bg-white rounded-lg shadow-md md:flex-row dark:bg-gray-900 dark:border dark:border-white'>
                <div className='flex-1 mb-6 md:mb-0'>
                  <p className='overflow-hidden text-3xl font-bold text-gray-800 whitespace-pre-line text-ellipsis line-clamp-2 dark:text-white'>
                    {getbyId?.description}
                  </p>
                  <div className='flex items-center mt-2 space-x-2 text-sm text-gray-500 dark:text-white'>
                    <MapPin className='w-4 h-4 dark:text-white' />
                    <p>{getbyId?.name}</p>
                  </div>
                  <div className='flex items-center mt-4 space-x-2'>
                    <p className='flex items-center justify-center w-12 h-8 text-sm font-semibold border rounded-lg border-primary text-primary'>
                      4.2
                    </p>
                    <p className='text-sm text-gray-600 dark:text-white'>
                      <span className='font-semibold'>{ratingStatus}</span> {getCommentTour?.total} reviews
                    </p>
                  </div>
                </div>
                <div className='flex-none space-y-2 text-right'>
                  <div className='flex items-center space-x-2'>
                    <div className='flex items-center space-x-4 bg-white border rounded border-primary '>
                      <Button
                        onClick={handleDecreaseQuantity}
                        disabled={getbyId?.number_of_seats_remaining === 0}
                        className='w-10 px-2 py-1 text-lg text-black border rounded dark:bg-primary dark:hover:bg-gray-800 dark:hover:text-white'
                      >
                        -
                      </Button>
                      <p className='text-lg font-semibold'>{tourQuantity}</p>
                      <Button
                        onClick={handleIncreaseQuantity}
                        disabled={
                          getbyId?.number_of_seats_remaining === tourQuantity ||
                          getbyId?.number_of_seats_remaining === 0
                        }
                        className='w-10 px-2 py-1 text-lg text-black border rounded dark:bg-primary dark:hover:bg-gray-800 dark:hover:text-white'
                      >
                        +
                      </Button>
                    </div>
                    <Favorite id={id} />

                    <ShareButtons url={tourUrl} title={tourTitle} />
                  </div>
                </div>
              </div>
            </section>

            {/* Image Gallery */}
            <div className='flex justify-between'>
              <div className='w-[68%]'>
                <section className='mb-12'>
                  {loading ? (
                    <div className='flex items-center justify-center w-full h-screen text-center'>
                      <Skeleton className='w-full h-full rounded-full' />
                      <div className='flex items-center justify-center w-full h-full text-center'>
                        <Skeleton className='w-full h-full' />
                        <div className='fixed inset-0 flex items-center justify-center'>{/* <IconLoader /> */}</div>
                        <Skeleton className='w-full h-full' />
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6 '>
                      <div className='w-full space-y-4 '>
                        <img
                          src={getbyId?.image_5 ?? undefined}
                          alt='Flight'
                          className='object-cover w-full h-[150px] rounded-lg shadow-lg '
                        />
                        <img
                          src={getbyId?.image_3 ?? undefined}
                          alt='Flight'
                          className='object-cover w-full h-[150px] rounded-lg shadow-lg '
                        />
                        <img
                          src={getbyId?.image_4 ?? undefined}
                          alt='Flight'
                          className='object-cover w-full h-[150px] rounded-lg shadow-lg '
                        />
                        <img
                          src={getbyId?.image_5 ?? undefined}
                          alt='Flight'
                          className='object-cover w-full h-[150px] rounded-lg shadow-lg '
                        />
                      </div>
                      <img
                        src={getbyId?.image}
                        alt='Tour'
                        className='w-full md:w-[75%] h-auto object-cover rounded-lg shadow-lg'
                      />
                    </div>
                  )}
                  <Vehicle data={getbyId} />

                  {/* Thông tin */}
                  <Information dataInfo={getbyId} />

                  <Schedule data={getbyId} />
                </section>

                <hr className='mb-12 border-t border-gray-300' />

                <section>
                  <div className='mb-8'>
                    <p className='mb-4 text-2xl font-bold dark:text-white'>Overview</p>
                    <p className='text-base font-medium text-gray-700 dark:text-white'>{getbyId?.description}</p>
                  </div>

                  <hr className='mb-12 border-t border-gray-300' />

                  <div className='flex mb-8 space-x-6'>
                    <div className='flex flex-col items-center p-6 text-center text-white rounded-lg shadow-md bg-primary'>
                      <p className='text-4xl font-bold'>4.2</p>
                      <p className='text-base font-semibold'>Very Good</p>
                      <p className='text-sm'>371 reviews</p>
                    </div>
                    <div className='flex flex-col items-center p-6 text-center border rounded-lg shadow-md border-primary'>
                      <p className='text-4xl font-bold dark:text-white'>4.2</p>
                      <p className='text-base font-semibold dark:text-white'>Very Good</p>
                      <p className='text-sm dark:text-white'>371 reviews</p>
                    </div>
                  </div>

                  <hr className='mb-12 border-t border-gray-300' />

                  <div>
                    <p className='mb-4 text-2xl font-bold dark:text-white'>Available</p>
                  </div>

                  <hr className='mb-12 border-t border-gray-300' />

                  <div>
                    <p className='text-xl font-bold dark:text-white'>Amenities/Map</p>
                    <div className='grid grid-cols-2 p-4 gap-y-2 gap-x-4'>
                      <div className='flex items-center space-x-80'>
                        <div className='flex space-x-2'>
                          <MapPin className='w-5 h-5 dark:text-white' />
                          <span className=' dark:text-white'>name</span>
                        </div>
                        <div className='flex space-x-2 '>
                          <MapPin className='w-5 h-5 dark:text-white' />
                          <span className=' dark:text-white'>name</span>
                        </div>
                      </div>
                      <button className='text-blue-500'>+24 more</button>
                    </div>
                  </div>

                  <hr className='mb-12 border-t border-gray-300' />

                  <div>
                    <div className='flex items-center justify-between mb-4'>
                      <p className='text-2xl font-bold dark:text-white'>Location/Map</p>
                      <Button className='text-white bg-primary dark:bg-primary'>View on Google Maps</Button>
                    </div>

                    <div>
                      <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.82334438999!2d108.22030047552775!3d16.07465433929193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218307d81c91d%3A0xbc7c14cab8a09c8!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBEdXkgVMOa!5e0!3m2!1svi!2s!4v1627566941055!5m2!1svi!2s'
                        width='100%'
                        height='450'
                        allowFullScreen
                        loading='lazy'
                        className='rounded-lg shadow-md'
                      ></iframe>
                    </div>
                  </div>

                  <hr className='mb-12 border-t border-gray-300' />
                  <hr className='mb-12 border-t border-gray-300' />

                  <div>
                    <p className='mb-4 text-2xl font-bold dark:text-white'>Reviews</p>
                    <div className='flex flex-col space-y-4'>
                      <TourDetailReview
                        data={getCommentTour?.data ?? []}
                        tourId={id || ''}
                        total={getCommentTour?.total || 0}
                      />
                    </div>
                  </div>
                </section>
              </div>

              <div className='w-[30%] shadow-2xl h-[420px] sticky top-[10rem] rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center justify-between '>
                    <div className='text-2xl font-semibold'>Giá:</div>
                    <div>
                      <span className='text-2xl font-semibold text-red-500'>{formattedPrice} </span>/ Khách
                    </div>
                  </div>
                  <div className='flex py-4'>
                    <div className='mr-2'>
                      <IconTourCode />
                    </div>
                    <div className='mr-2 text-xl'>Mã tour:</div>
                    <div className='flex items-center justify-center font-medium text-center text-sky-500'>
                      {getbyId?.tour_code}
                    </div>
                  </div>
                  <div className='flex py-4'>
                    <div className='mr-2'>
                      <IconDeparture />
                    </div>
                    <div className='mr-2 text-xl'>Khởi hành:</div>
                    <div className='flex items-center justify-center font-medium text-center text-sky-500'>
                      {getbyId?.starting_gate}
                    </div>
                  </div>
                  <div className='flex py-4'>
                    <div className='mr-2'>
                      <IconDepartureDate />
                    </div>
                    <div className='mr-2 text-xl'>Ngày khởi hành:</div>
                    <div className='flex items-center justify-center font-medium text-center text-sky-500'>
                      {formatDateTime}
                    </div>
                  </div>
                  <div className='flex py-4'>
                    <div className='mr-2'>
                      <IconTime />
                    </div>
                    <div className='mr-2 text-xl'>Thời gian:</div>
                    <div className='flex items-center justify-center font-medium text-center text-sky-500'>
                      {getbyId?.time_trip}
                    </div>
                  </div>
                  <div className='flex py-4'>
                    <div className='mr-2'>
                      <IconNumberSeats />
                    </div>
                    <div className='mr-2 text-xl'>Số chỗ còn:</div>
                    <div className='flex items-center justify-center font-medium text-center text-sky-500'>
                      {getbyId?.number_of_seats_remaining} chỗ
                    </div>
                  </div>
                  <Button
                    className='w-full'
                    loading={loadingBooking}
                    onClick={handleBookingTour}
                    disabled={getbyId?.number_of_seats_remaining === 0}
                  >
                    Đặt tour
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      }
    </>
  )
}
