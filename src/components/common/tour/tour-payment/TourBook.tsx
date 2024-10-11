
import { Button } from '@/components/ui/button'
import { TourBookingDetail } from '@/shared/ts/interface/booking-tour.interface'


interface ITourBook {
  onClick?: () => void
  data?: TourBookingDetail
  loading?: boolean
}

export default function TourBook({ onClick, data, loading }: ITourBook) {
  console.log(data,"123");
  
  const price = data?.price
  const formattedPrice = price ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 VND'
  return (
    <div>
      <div>
        <div key={data?.id} className='flex items-center mb-4'>
            <img src={data?.image} alt={data?.name} className='object-cover h-20 rounded-md w-25' />
            <div className='ml-4'>
              <p className='overflow-hidden text-gray-500 whitespace-pre-line text-ellipsis line-clamp-2'>{data?.description}</p>
              <h2 className='overflow-hidden text-xl font-semibold whitespace-pre-line text-ellipsis line-clamp-1'>{data?.name}</h2>
              <div className='flex items-center mt-3'>
                <p className='flex items-center justify-center h-[2.5rem] text-xs font-medium border rounded w-[3.5rem] border-primary'>
                  {data?.rating}
                </p>
                <span className='ml-2 text-lg'>Very Good</span>
                <span className='ml-1 text-lg text-gray-500'>(10 reviews)</span>
              </div>
            </div>
          </div>
      </div>
      <div className='my-4 border-t'></div>
      <p className='text-lg text-gray-600'>
        Your booking is protected by <span className='font-bold text-black'>golobe</span>
      </p>
      <div className='my-4 border-t'></div>
      <div className='mt-4'>
        <h3 className='text-lg font-semibold'>Price Details</h3>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>Base Fare</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>Discount</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>Taxes</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-lg text-gray-500'>Service Fee</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
        <div className='mt-4 border-t'></div>
        <div className='flex justify-between mt-4'>
          <p className='text-lg font-semibold'>Total</p>
          <p className='text-lg font-bold'>{formattedPrice}</p>
        </div>
        <Button onClick={onClick} loading={loading} className='w-full mt-4'>
          Thanh toán
        </Button>
      </div>
    </div>
  )
}
