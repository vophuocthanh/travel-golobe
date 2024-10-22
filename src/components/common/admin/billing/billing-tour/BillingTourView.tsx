import { bookingTourApi } from '@/apis/booking-tour.api'
import { tour_into1 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeftToLine } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function BillingTourView() {
  const { billingID } = useParams()
  const navigate = useNavigate()
  const [billingData, setBillingData] = useState({
    id: 'm5gr84i9',
    billingTime: '2003-05-21',
    plan: 'Basic',
    amount: 316,
    status: 'success',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    tour: 'Vietnam Adventure',
    tourLocation: 'Hanoi, Vietnam'
  })

  const { data: billingTourData1 } = useQuery({
    queryKey: ['getDetailsBilliingTour'],
    queryFn: () => bookingTourApi.getBookingDetail(billingID ?? '')
  })
  const formatDate = (dateString: string) => {
    const date = new Date(dateString || '')
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    }).format(date)
  }

  console.log('dataaaaaaaaa:', billingTourData1)

  const handleBack = () => {
    navigate('/admin/billing')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setBillingData({ ...billingData, [name]: value })
  }

  const formatCurrency = (amount: number | bigint) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return (
    <div className='w-full p-4 mb-5 bg-gray-100'>
      <h1 className='mb-2 text-2xl font-bold text-center'>View Billing {billingID}</h1>
      <Button className='flex mb-4 mr-auto text-white' onClick={handleBack}>
        <ArrowLeftToLine className='mr-1' />
        Quay lại
      </Button>
      <form className='space-y-6'>
        <div className='p-6 bg-white rounded-lg shadow-lg'>
          <h2 className='mb-4 text-xl font-bold border-b'>Customer Information</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[10rem] h-[10rem] col-span-1 flex mx-auto'>
              <img
                src={billingTourData1?.user.avatar}
                alt='customer avatar'
                className='w-full h-full border-2 border-gray-300 rounded-full'
              />
            </div>
            <div className='grid grid-cols-2 col-span-2 gap-4'>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-gray-700'>Name Customer</label>
                <Input
                  type='text'
                  name='customerName'
                  value={billingTourData1?.user.name}
                  placeholder='Customer Name'
                  onChange={handleChange}
                  className='p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500'
                  disabled
                />
              </div>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-gray-700'>ID Customer</label>
                <Input
                  type='id'
                  name=''
                  placeholder='Customer Email'
                  value={billingTourData1?.user.id}
                  onChange={handleChange}
                  className='p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-lg'>
          <h2 className='mb-4 text-xl font-bold border-b'>Tour Information</h2>
          <div className='w-[10rem] h-[10rem] col-span-1 flex mx-auto my-auto justify-center items-center'>
            <img src={tour_into1} alt='tour image' className='w-full h-full border-2 border-gray-300 rounded' />
          </div>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='grid grid-cols-3 col-span-4 gap-4'>
              <div className='col-span-1'>
                <p className='font-semibold'>Tour</p>
                <p className='p-2 text-sm border rounded shadow-sm'>{billingTourData1?.name}</p>
                <p className='font-semibold'>Price Tour:</p>
                <p className='p-2 text-sm border rounded shadow-sm'>
                  {billingTourData1?.price ? formatCurrency(billingTourData1.price) : ''}
                </p>
                <p className='font-semibold'>start_date</p>
                <p className='p-2 text-sm border rounded shadow-sm'>
                  {' '}
                  {billingTourData1?.start_date ? formatDate(billingTourData1.start_date) : 'N/A'}
                </p>
                <p className='font-semibold'>end_date</p>
                <p className='p-2 text-sm border rounded shadow-sm'>
                  {' '}
                  {billingTourData1?.end_date ? formatDate(billingTourData1.end_date) : 'N/A'}
                </p>
              </div>
              <div className='col-span-1'>
                <p className='font-semibold'>Hotel</p>
                <p className='p-2 text-sm border rounded shadow-sm'>{billingTourData1?.hotelDetails.hotel_names}</p>
                <p className='font-semibold'>Price Hotel</p>
                <p className='p-2 text-sm border rounded shadow-sm'>
                  {billingTourData1?.hotelDetails.price ? formatCurrency(billingTourData1.hotelDetails.price) : ''}
                </p>
              </div>
              <div className='col-span-1 mt-2 '>
                <p className='font-semibold'>Vehicle:</p>
                <p className='p-2 text-sm border rounded shadow-sm'>{billingTourData1?.road_vehicle.type}</p>
                <p className='mt-2 font-semibold'>Branch:</p>
                <p className='p-2 text-sm border rounded shadow-sm'>{billingTourData1?.road_vehicle.details.brand}</p>
                <p className='mt-2 font-semibold'>Price Flight:</p>
                <p className='p-2 text-sm border rounded shadow-sm'>
                  {billingTourData1?.road_vehicle.details.price
                    ? formatCurrency(billingTourData1.road_vehicle.details.price)
                    : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
