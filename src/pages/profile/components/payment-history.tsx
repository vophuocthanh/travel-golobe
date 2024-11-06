/* eslint-disable @typescript-eslint/no-explicit-any */
import { paymentApi } from '@/apis/payment.api'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export default function PaymentHistory() {
  const { data: getPaymentUser } = useQuery({
    queryKey: ['getPaymentUser'],
    queryFn: () => paymentApi.getPaymentUser()
  })
  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-between'>
        <h1 className='mt-6 text-3xl font-bold'>Lịch sử thanh toán</h1>
        <h1 className='mt-6 text-2xl font-bold'>Tổng: {getPaymentUser?.total}</h1>
      </div>
      {getPaymentUser?.data?.length ?? 0 > 0 ? (
        getPaymentUser?.data?.map((item: any) => (
          <Link
            to={
              item.tour
                ? `/tour/${item.tour.id}`
                : item.flightCrawls
                ? `/vehicle/flight/${item.flightCrawls.id}`
                : item.hotelCrawls
                ? `/hotel/${item.hotelCrawls.id}`
                : item.roadVehicles
                ? `/vehicle/coach/${item.roadVehicles.id}`
                : '#'
            }
            key={item.paymentId}
          >
            <div className='flex items-center justify-between w-full gap-6 px-4 py-6 my-5 bg-white border border-gray-300 rounded-lg shadow-md'>
              <div className='flex items-center gap-6'>
                <img
                  src={
                    item.tour?.image ||
                    item.flightCrawls?.image ||
                    item.hotelCrawls?.image ||
                    item.roadVehicles?.image ||
                    'default-image-url'
                  }
                  alt=''
                  className='w-24 h-24 rounded-md'
                />
                <div className='flex flex-col gap-2'>
                  <h1 className=''>
                    <span className='text-lg font-medium'>
                      {item.tour?.name ||
                        item.flightCrawls?.brand ||
                        item.hotelCrawls?.hotel_names ||
                        item.roadVehicles?.brand ||
                        'No name available'}
                    </span>
                  </h1>
                  <h1>
                    <span className='text-base font-medium'>Phương thức thanh toán:</span> {item?.paymentMethod}
                  </h1>
                  <h1>
                    <span className='text-xl font-medium'>Ngày thanh toán:</span>{' '}
                    {dayjs(item.createdAt).format('HH:mm:ss, DD-MM-YYYY')}
                  </h1>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <h1 className='text-xl font-medium'>Tổng tiền: {formatCurrencyVND(item.totalAmount)}</h1>
                <span>
                  <span className='text-xl font-medium'>Trạng thái:</span>
                  <span
                    className={`px-2 py-1 text-white rounded-md ${
                      item.status === 'COMPLETED' ? 'bg-green-300' : 'bg-yellow-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <h1 className='flex items-center justify-center text-xl font-medium'>Chưa thanh toán đơn hàng nào</h1>
      )}
    </div>
  )
}
