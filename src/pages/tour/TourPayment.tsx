import { bookingTourApi } from '@/apis/booking-tour.api'
import { paymentApi } from '@/apis/payment.api'
import { Footer, Header } from '@/components/common'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import TourBook from '@/components/common/tour/tour-payment/TourBook'
import TourInfo from '@/components/common/tour/tour-payment/TourInfo'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiobutton'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function TourPayment() {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const [paymentOption, setPaymentOption] = useState('full')
  const navigate = useNavigate()

  const { data: getBookingDetailTour } = useQuery({
    queryKey: ['getBookingDetailTour', id],
    queryFn: () => bookingTourApi.getBookingDetail(id || '')
  })

  const mutationAddMomoBooking = useMutation({
    mutationFn: () => paymentApi.addMomo(id || '')
  })

  const mutationAddBookingCashPayment = useMutation({
    mutationFn: () => bookingTourApi.addBookingCashPayment(id || '')
  })

  const handleAddMomoBooking = () => {
    setLoading(true)
    mutationAddMomoBooking.mutate(undefined, {
      onSuccess: (data) => {
        const paymentUrl = data.paymentUrl.paymentUrl
        window.location.href = paymentUrl
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }

  const handleAddBookingCashPayment = () => {
    setLoading(true)
    mutationAddBookingCashPayment.mutate(undefined, {
      onSuccess: () => {
        navigate('/')
        toast.success('Booking successfully')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }

  return (
    <div className='w-full bg-gray-100'>
      <Header />
      <SectionInViewRight>
        <main className='pt-20 px-[5rem]'>
          <section>
            <h1 className='flex items-center justify-center p-5 text-3xl font-semibold'>Tour Payment</h1>
            <div className='flex items-center space-x-2'>
              <div className='items-start flex-1 w-full mt-2 mb-2'>
                <div className='flex items-center space-x-2 text-gray-800 text-md'>
                  <p className='text-red-400'>Turkey</p>
                  <ChevronRight className='w-4 h-4' />
                  <p className='text-red-400'>Istanbul</p>
                  <ChevronRight className='w-4 h-4' />
                  <p>{getBookingDetailTour?.name}</p>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md'>
                <TourInfo data={getBookingDetailTour} />
              </div>
              <div className='col-span-1 p-6 mt-6 bg-white rounded-lg shadow-md'>
                <TourBook
                  loading={loading}
                  onClick={paymentOption === 'full' ? handleAddBookingCashPayment : handleAddMomoBooking}
                  data={getBookingDetailTour}
                />
              </div>
              <div className='col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md'>
                <RadioGroup value={paymentOption} onValueChange={(value) => setPaymentOption(value)}>
                  <h1 className='mb-4 text-xl font-semibold'>Chọn phương thức thanh toán</h1>
                  <div className='space-y-4'>
                    <div
                      className={`border p-4 rounded-lg flex justify-between cursor-pointer items-center ${
                        paymentOption === 'full' ? 'bg-primary border-primary' : 'border-gray-500'
                      }`}
                      onClick={() => setPaymentOption('full')}
                    >
                      <div>
                        <h4 className='font-semibold'>Thanh toán tiền mặt</h4>
                        <p className='text-sm text-gray-500'>
                          Với phương thức thanh toán tiền mặt, bạn sẽ trả toàn bộ chi phí của tour ngay lập tức tại điểm
                          bán hoặc văn phòng.
                        </p>
                      </div>
                      <RadioGroupItem className='flex items-center justify-center' value='full' id='option-one' />
                    </div>

                    <div
                      className={`border p-4 rounded-lg flex justify-between cursor-pointer items-center ${
                        paymentOption === 'part' ? 'bg-primary border-primary' : 'border-gray-500'
                      }`}
                      onClick={() => setPaymentOption('part')}
                    >
                      <div className='w-[32rem]'>
                        <h4 className='font-semibold'>Thanh toán qua MOMO</h4>
                        <p className='text-sm text-gray-500'>
                          Với phương thức thanh toán qua ví điện tử MOMO, bạn có thể thanh toán một phần ngay bây giờ và
                          phần còn lại sẽ tự động được trừ từ tài khoản của bạn vào một ngày cụ thể, mà không mất thêm
                          phí phát sinh.
                        </p>
                      </div>
                      <RadioGroupItem className='flex items-center justify-center' value='part' id='option-two' />
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </section>
        </main>
      </SectionInViewRight>
      <div className='mt-[15rem]'>
        <Footer />
      </div>
    </div>
  )
}
