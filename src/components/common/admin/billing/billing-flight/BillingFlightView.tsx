import { bookingFlightApi } from '@/apis/booking-flight'
import { flightdetail1 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDateStandard } from '@/shared/utils/date-utils'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeftToLine } from 'lucide-react'

import { useNavigate, useParams } from 'react-router-dom'

export default function BillingFlightView() {
  const { id } = useParams()

  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/admin/billing')
  }

  const { data: billingFlightData } = useQuery({
    queryKey: ['getBookingDetail'],
    queryFn: () => bookingFlightApi.getBookingDetail(id ?? '')
  })

  return (
    <div className='w-full p-2 mb-5'>
      <h1 className='mb-2 text-2xl font-bold'>Thanh toán chuyến bay {id}</h1>
      <Button className='flex mb-4 mr-auto text-white' onClick={handleBack}>
        <ArrowLeftToLine />
      </Button>
      <form className='space-y-4'>
        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='mb-4 text-xl font-bold'>Thông tin khách hàng</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[10rem] h-[10rem] col-span-1 flex mx-auto'>
              <img
                src={billingFlightData?.user.avatar}
                alt='customer avatar'
                className='w-full h-full border-2 border-gray-300 rounded-full'
              />
            </div>
            <div className='grid grid-cols-2 col-span-2 gap-4'>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-gray-700'>Tên khách hàng</label>
                <Input
                  type='text'
                  name='customerName'
                  value={billingFlightData?.user.name}
                  placeholder='Customer Name'
                  className='p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500'
                  disabled
                />
              </div>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-gray-700'>Mã khách hàng</label>
                <Input
                  type='id'
                  name=''
                  placeholder='Customer Email'
                  value={billingFlightData?.user.id}
                  className='p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='mb-4 text-xl font-bold'>Thông tin chuyến bay</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[10rem] p-2 h-[10rem] col-span-1 flex mx-auto my-auto'>
              <img src={flightdetail1} alt='hotel' className='w-full h-full rounded-full' />
            </div>
            <div className='col-span-2'>
              <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
                <div className='col-span-1'>
                  <p>Hãng máy bay</p>
                  <Input
                    type='text'
                    name='flightAirline'
                    placeholder=''
                    value={billingFlightData?.flightCrawls.brand}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>ID máy bay</p>
                  <Input
                    type='text'
                    name='flightPlane'
                    placeholder='Plane'
                    value={billingFlightData?.flightId}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>ID đặt</p>
                  <Input
                    type='text'
                    name='flightSeat'
                    placeholder='Seat Number'
                    value={billingFlightData?.bookingId}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>Tổng cộng tiền</p>
                  <Input
                    type='text'
                    name='flightDeparture'
                    placeholder='Departure Time'
                    value={billingFlightData?.totalAmount?.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>Ngày bắt đầu</p>
                  <Input
                    type='text'
                    name='start_time'
                    placeholder='Departure Time'
                    value={
                      billingFlightData?.flightCrawls.start_day
                        ? `${formatDateStandard(billingFlightData.flightCrawls.start_day)} -- ${
                            billingFlightData.flightCrawls.start_time
                          }`
                        : ''
                    }
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>Ngày kết thúc</p>
                  <Input
                    type='text'
                    name='start_time'
                    placeholder='Departure Time'
                    value={
                      billingFlightData?.flightCrawls.end_day
                        ? `${formatDateStandard(billingFlightData.flightCrawls.end_day)} -- ${
                            billingFlightData.flightCrawls.end_time
                          }`
                        : ''
                    }
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
