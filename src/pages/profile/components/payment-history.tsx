/* eslint-disable @typescript-eslint/no-explicit-any */
import { paymentApi } from '@/apis/payment.api'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

export default function PaymentHistory() {
  const { data: getPaymentUser } = useQuery({
    queryKey: ['getPaymentUser'],
    queryFn: () => paymentApi.getPaymentUser()
  })
  console.log('getPaymentUser:', getPaymentUser)
  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-between'>
        <h1 className='mt-6 text-3xl font-bold'>Lịch sử thanh toán</h1>
        <h1 className='mt-6 text-2xl font-bold'>Tổng: {getPaymentUser?.total}</h1>
      </div>
      {getPaymentUser?.data?.map((item: any) => (
        <div
          key={item.id}
          className='flex items-center justify-between w-full gap-6 px-4 py-6 my-5 bg-white border border-gray-300 rounded-lg shadow-md'
        >
          <div className='flex items-center gap-6'>
            <div className='flex flex-col gap-2'>
              <h1 className=''>
                <span className='text-xl font-medium'>Id thanh toán:</span> {item.id}
              </h1>
              <h1>
                <span className='text-xl font-medium'>Phương thức thanh toán:</span> {item.paymentMethod}
              </h1>
            </div>
            <div className='flex flex-col gap-2'>
              <h1>
                {' '}
                <span className='text-xl font-medium'>Ngày thanh toán:</span>{' '}
                {dayjs(item.createdAt).format('HH:mm:ss, DD-MM-YYYY')}
              </h1>
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
          <h1 className='text-xl font-medium'>Tổng tiền: {formatCurrencyVND(item.amount)}</h1>
        </div>
      ))}
    </div>
  )
}
