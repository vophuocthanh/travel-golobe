import { paymentApi } from '@/apis/payment.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeftToLine } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PaymentDetailView() {
  const { paymentID } = useParams()
  const navigate = useNavigate()

  const { data: PaymentData } = useQuery({
    queryKey: ['getPaymentById'],
    queryFn: () => paymentApi.getPaymentById(paymentID ?? '')
  })
  console.log('PaymentID', PaymentData)

  const handleBack = () => {
    navigate('/admin/payments')
  }
  const getStatusClass = () => {
    switch (PaymentData?.status) {
      case 'COMPLETED':
        return 'bg-green-300'
      case 'PENDING':
        return 'bg-yellow-300'
      case 'FAILED':
        return 'bg-red-300'
      default:
        return ''
    }
  }

  return (
    <div className='w-full p-2 mb-5'>
      <h1 className='mb-2 text-2xl font-bold'>View Payment {paymentID}</h1>
      <Button className='flex mb-4 mr-auto text-white' onClick={handleBack}>
        <ArrowLeftToLine />
      </Button>
      <form className='space-y-4'>
        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='mb-4 text-xl font-bold'>Payment Information</h2>
          <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
            <div className='col-span-1'>
              <p> ID thanh toán</p>
              <Input
                type='text'
                placeholder='Payment ID'
                value={PaymentData?.id}
                className='p-2 border rounded'
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p> ID đặt</p>
              <Input
                type='text'
                name='id'
                placeholder='Payment ID'
                value={PaymentData?.bookingId}
                className='p-2 border rounded'
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p> ID người dùng</p>
              <Input
                type='text'
                name='paymentTime'
                placeholder='Payment Time'
                value={PaymentData?.userId}
                className='p-2 border rounded'
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p> ID đặt hàng</p>
              <Input
                type='text'
                name='paymentTime'
                placeholder='Payment Time'
                value={PaymentData?.orderId}
                className='p-2 border rounded'
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p>amount</p>
              <Input
                type='text'
                placeholder='Plan'
                value={PaymentData?.amount}
                className='p-2 border rounded'
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p>Phương thức thanh toán</p>
              <Input
                type='text'
                placeholder='paymentMethod'
                value={PaymentData?.paymentMethod}
                className='p-2 border rounded'
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p>Ngày tạo</p>
              <Input
                type='text'
                placeholder='paymentMethod'
                value={
                  PaymentData?.createdAt
                    ? new Intl.DateTimeFormat('vi-VN', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      }).format(new Date(PaymentData.createdAt))
                    : ''
                }
                className='p-2 border rounded'
                disabled
              />
            </div>
            <div className='col-span-1'>
              <p>Ngày cập nhật</p>
              <Input
                type='text'
                placeholder='paymentMethod'
                value={
                  PaymentData?.updatedAt
                    ? new Intl.DateTimeFormat('vi-VN', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      }).format(new Date(PaymentData.updatedAt))
                    : ''
                }
                className='p-2 border rounded'
                disabled
              />
            </div>

            <div className='col-span-1'>
              <p>Trạng thái</p>
              <Input
                type='text'
                name='status'
                placeholder='Status'
                value={PaymentData?.status}
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
