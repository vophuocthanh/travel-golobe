import { tourApi } from '@/apis/tour.api'

import { IconDeparture, IconDepartureDate, IconNumberSeats, IconTime, IconTourCode } from '@/common/icons'
import { Footer, Header } from '@/components/common'
import Information from '@/components/common/tour/detail-tour/infomation/infomation'
import Schedule from '@/components/common/tour/detail-tour/schedule/schedule'
import Vehicle from '@/components/common/tour/detail-tour/vehicle/vehicle'
import Favorite from '@/components/common/tour/favorite/favorite'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight, Link2, MapPin, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function TourDetailView() {
  const { id } = useParams<{ id: string }>()
  console.log(id, 'id')

  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => tourApi.getById(id)
  })
  console.log(getbyId?.description, 'log')

  const reviews = [
    {
      rating: 5.0,
      title: 'Amazing',
      author: 'Omar Siphron',
      content:
        'Loremm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      rating: 5.0,
      title: 'Amazing',
      author: 'Cristofer Ekstrom Bothman',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ]
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Giả lập thời gian tải dữ liệu
    setTimeout(() => {
      setLoading(false)
    }, 1)
  }, [])

  return (
    <>
      {
        <div>
          <Header />
          <div className='container px-4 mx-auto pt-28 pb-36'>
            {/* Header Section */}
            <section className='mb-12'>
              <div className='flex items-center mb-4 space-x-2 text-sm text-gray-600'>
                <p className='text-red-400'>Today</p>
                <ChevronRight className='w-4 h-4 text-gray-500' />
                <p className='text-red-400'>Istanbul</p>
                <ChevronRight className='w-4 h-4 text-gray-500' />
                <p className='overflow-hidden whitespace-pre-line text-ellipsis line-clamp-1 w-[30%]'>
                  {getbyId?.description}
                </p>
              </div>
              <div className='flex flex-col p-6 bg-white rounded-lg shadow-md md:flex-row'>
                <div className='flex-1 mb-6 md:mb-0'>
                  <p className='overflow-hidden text-3xl font-bold text-gray-800 whitespace-pre-line text-ellipsis line-clamp-2'>
                    {getbyId?.description}
                  </p>
                  <div className='flex items-center mt-2 space-x-2 text-sm text-gray-500'>
                    <MapPin className='w-4 h-4' />
                    <p>{getbyId?.name}</p>
                  </div>
                  <div className='flex items-center mt-4 space-x-2'>
                    <p className='flex items-center justify-center w-12 h-8 text-sm font-semibold border rounded-lg border-primary text-primary'>
                      4.2
                    </p>
                    <p className='text-sm text-gray-600'>
                      <span className='font-semibold'>Very Good</span> 54 reviews
                    </p>
                  </div>
                </div>
                <div className='flex-none space-y-4 text-right'>
                  <div className='flex space-x-4'>
                    <Favorite id={id} />
                    <div className='flex items-center justify-center w-12 h-12 text-sm font-medium transition-colors border rounded-full cursor-pointer border-primary hover:bg-gray-100'>
                      <Link2 className='w-5 h-5 text-gray-500' />
                    </div>
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
                          src={getbyId?.image_2}
                          alt='Flight'
                          className='object-cover w-full h-[150px] rounded-lg shadow-lg '
                        />
                        <img
                          src={getbyId?.image_3}
                          alt='Flight'
                          className='object-cover w-full h-[150px] rounded-lg shadow-lg '
                        />
                        <img
                          src={getbyId?.image_4}
                          alt='Flight'
                          className='object-cover w-full h-[150px] rounded-lg shadow-lg '
                        />
                        <img
                          src={getbyId?.image_5}
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
                  <Vehicle />

                  {/* Thông tin */}
                  <Information />

                  <Schedule />
                </section>

                <hr className='mb-12 border-t border-gray-300' />

                <section>
                  <div className='mb-8'>
                    <p className='mb-4 text-2xl font-bold'>Overview</p>
                    <p className='text-base font-medium text-gray-700'>{getbyId?.description}</p>
                  </div>

                  <hr className='mb-12 border-t border-gray-300' />

                  <div className='flex mb-8 space-x-6'>
                    <div className='flex flex-col items-center p-6 text-center text-white rounded-lg shadow-md bg-primary'>
                      <p className='text-4xl font-bold'>4.2</p>
                      <p className='text-base font-semibold'>Very Good</p>
                      <p className='text-sm'>371 reviews</p>
                    </div>
                    <div className='flex flex-col items-center p-6 text-center border rounded-lg shadow-md border-primary'>
                      <p className='text-4xl font-bold'>4.2</p>
                      <p className='text-base font-semibold'>Very Good</p>
                      <p className='text-sm'>371 reviews</p>
                    </div>
                  </div>

                  <hr className='mb-12 border-t border-gray-300' />

                  <div>
                    <p className='mb-4 text-2xl font-bold'>Available</p>
                  </div>

                  <hr className='mb-12 border-t border-gray-300' />

                  <div>
                    <p className='text-xl font-bold'>Amenities/Map</p>
                    <div className='grid grid-cols-2 p-4 gap-y-2 gap-x-4'>
                      <div className='flex items-center space-x-80'>
                        <div className='flex space-x-2'>
                          <MapPin className='w-5 h-5' />
                          <span>name</span>
                        </div>
                        <div className='flex space-x-2 '>
                          <MapPin className='w-5 h-5' />
                          <span>name</span>
                        </div>
                      </div>
                      <button className='text-blue-500'>+24 more</button>
                    </div>
                  </div>

                  <hr className='mb-12 border-t border-gray-300' />

                  <div>
                    <div className='flex items-center justify-between mb-4'>
                      <p className='text-2xl font-bold'>Location/Map</p>
                      <Button className='text-white bg-primary'>View on Google Maps</Button>
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
                    <p className='mb-4 text-2xl font-bold'>Reviews</p>
                    <div className='flex flex-col space-y-4'>
                      {reviews.map((review, index) => (
                        <div key={index} className='p-4 border border-gray-300 rounded-lg shadow-md'>
                          <div className='flex items-center mb-2 space-x-2'>
                            <Star className='w-5 h-5 text-yellow-400' />
                            <p className='font-semibold'>
                              {review.rating} - {review.title}
                            </p>
                          </div>
                          <p className='mb-2 text-sm font-medium text-gray-700'>{review.author}</p>
                          <p className='text-sm'>{review.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <div className='w-[30%] shadow-2xl h-[420px] sticky top-[10rem] rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center justify-between '>
                    <div className='text-2xl font-semibold'>Giá:</div>
                    <div>
                      <span className='text-2xl font-semibold text-red-500'>7,990,000 đ </span>/ Khách
                    </div>
                  </div>
                  <div className='flex py-4'>
                    <div className='mr-2'>
                      <IconTourCode />
                    </div>
                    <div className='mr-2 text-xl'>Mã tour:</div>
                    <div className='flex items-center justify-center font-medium text-center text-sky-500'>
                      NNSGN133-079-021024VN-V
                    </div>
                  </div>
                  <div className='flex py-4'>
                    <div className='mr-2'>
                      <IconDeparture />
                    </div>
                    <div className='mr-2 text-xl'>Khởi hành:</div>
                    <div className='flex items-center justify-center font-medium text-center text-sky-500'>
                      TP. Hồ Chí Minh
                    </div>
                  </div>
                  <div className='flex py-4'>
                    <div className='mr-2'>
                      <IconDepartureDate />
                    </div>
                    <div className='mr-2 text-xl'>Ngày khởi hành:</div>
                    <div className='flex items-center justify-center font-medium text-center text-sky-500'>
                      02-10-2024
                    </div>
                  </div>
                  <div className='flex py-4'>
                    <div className='mr-2'>
                      <IconTime />
                    </div>
                    <div className='mr-2 text-xl'>Thời gian:</div>
                    <div className='flex items-center justify-center font-medium text-center text-sky-500'>5N4Đ</div>
                  </div>
                  <div className='flex py-4'>
                    <div className='mr-2'>
                      <IconNumberSeats />
                    </div>
                    <div className='mr-2 text-xl'>Số chỗ còn:</div>
                    <div className='flex items-center justify-center font-medium text-center text-sky-500'>9 chỗ</div>
                  </div>
                  <Link to={`/tour/all-tour/${getbyId?.id}/tour-payment`}>
                    <Button className='w-full'>Đặt tour</Button>
                  </Link>
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
