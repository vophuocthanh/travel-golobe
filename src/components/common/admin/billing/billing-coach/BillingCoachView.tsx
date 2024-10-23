import { bookingCoachApi } from '@/apis/booking-coach'
import { coachdetail1 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeftToLine } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

export default function BillingCoachView() {
  const { id } = useParams()

  const { data: getBookingDetail, isLoading } = useQuery({
    queryKey: ['getBookingDetailCoach', id],
    queryFn: () => bookingCoachApi.getBookingDetail(id || ''),
    enabled: !!id
  })

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/admin/billing')
  }

  const getStatusClass = () => {
    switch (getBookingDetail?.status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELED':
        return 'bg-red-100 text-red-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      default:
        return '';
    }
  }

  const formatDateTime = (dateString: string, timeString: string) => {
    if (!dateString || !timeString) return ''
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? '' : `${date.toLocaleDateString('vi-VN')} ${timeString}`
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-full p-2 mb-5'>
      <h1 className='mb-2 text-2xl font-bold'>Coach Billing {id}</h1>
      <Button className='flex mb-4 mr-auto text-white' onClick={handleBack}>
        <ArrowLeftToLine />
      </Button>
      <form className='space-y-4'>
        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='mb-4 text-xl font-bold'>Customer Information</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[10rem] p-2 h-[10rem] col-span-1 flex mx-auto'>
              <img src={getBookingDetail?.user?.avatar || ''} alt='hotel' className='w-full h-full rounded-full' />
            </div>
            <div className='grid col-span-1 gap-x-6 gap-y-4 '>
              <Input
                type='text'
                name='id'
                placeholder='Customer ID'
                value={getBookingDetail?.user?.id || ''}
                className='p-2 border rounded '
                disabled
              />
              <Input
                type='text'
                name='name'
                placeholder='Customer Name'
                value={getBookingDetail?.user?.name || ''}
                className='p-2 border rounded '
                disabled
              />
            </div>
          </div>
        </div>

        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='mb-4 text-xl font-bold'>Coach Information</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[15rem] p-2 h-[10rem] col-span-1 flex mx-auto my-auto'>
              <img src={coachdetail1} alt='hotel' className='object-cover w-full h-full rounded-full' />
            </div>
            <div className='col-span-2'>
              <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
                <div className='col-span-1'>
                  <p>Name Coach</p>
                  <Input
                    type='text'
                    name='Coach Brand'
                    placeholder='Coach Brand'
                    value={getBookingDetail?.brand}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>Coach ID</p>
                  <Input
                    type='text'
                    name='coachId'
                    placeholder='Coach ID'
                    value={getBookingDetail?.roadVehicleId}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>Seat Number</p>
                  <Input
                    type='text'
                    name='number_of_seat'
                    placeholder='Seat Number'
                    value={getBookingDetail?.number_of_seat || ''}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>Road Vehicle Quantity</p>
                  <Input
                    type='text'
                    name='roadVehicleQuantity'
                    placeholder='roadVehicleQuantity'
                    value={getBookingDetail?.roadVehicleQuantity}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>Number Of Seats Remaining</p>
                  <Input
                    type='text'
                    name='number_of_seats_remaining'
                    placeholder='Number Of Seats Remaining'
                    value={getBookingDetail?.number_of_seats_remaining}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>Departure Time</p>
                  <Input
                    type='text'
                    name='start_time'
                    placeholder='Departure Time'
                    value={formatDateTime(getBookingDetail?.start_day || '', getBookingDetail?.start_time || '')}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
                <div className='col-span-1'>
                  <p>Arrival Time</p>
                  <Input
                    type='text'
                    name='start_time'
                    placeholder='Arrival Time'
                    value={formatDateTime(getBookingDetail?.end_day || '', getBookingDetail?.end_time || '')}
                    className='p-2 border rounded'
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='mb-4 text-xl font-bold'>Billing Information</h2>
          <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
            <div className='col-span-1'>
              <p>Billing ID</p>
              <Input
                type='text'
                name='id'
                placeholder='Billing ID'
                value={id}
                className='p-2 border rounded'
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p>Trip Time</p>
              <Input
                type='text'
                name='trip_time'
                placeholder='trip_time'
                className='p-2 border rounded'
                value={getBookingDetail?.trip_time}
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p>Take Place</p>
              <Input type='text' value={getBookingDetail?.take_place || ''}
              name='take_place' placeholder='Take Place' className='p-2 border rounded' disabled />
            </div>
            <div className='col-span-1'>
              <p>Location</p>
              <Input
                type='text'
                name='plan'
                placeholder='Plan'
                className='p-2 border rounded'
                value={getBookingDetail?.location}
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p>Amount</p>
              <Input
                type='text'
                name='price'
                placeholder='Price'
                value={formatCurrencyVND(getBookingDetail?.price)}
                className='p-2 border rounded'
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p>Status</p>
              <Input
                type='text'
                name='status'
                placeholder='Status'
                value={getBookingDetail?.status}
                className={`col-span-1 p-2 border rounded ${getStatusClass()}`}
                disabled
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
