import { bookingTourApi } from '@/apis/booking-tour.api'
import { paymentApi } from '@/apis/payment.api'
import { Footer, Header } from '@/components/common'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import PaymentOptions from '@/components/common/payment/payment-option'
import TourBook from '@/components/common/tour/tour-payment/TourBook'
import TourInfo from '@/components/common/tour/tour-payment/TourInfo'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
export default function TourPayment() {
  const { t } = useTranslation()
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
        <main className='pt-20 px-[5rem] max-sm:px-[1rem] max-lg:px-[2rem]'>
          <section>
            <h1 className='flex items-center justify-center p-5 text-3xl font-semibold'>{t('TourPayment')}</h1>
            <div className='flex items-center space-x-2'>
              <div className='items-start flex-1 w-full mt-2 mb-2'>
                <div className='flex items-center space-x-2 text-gray-800 text-md'>
                  <Link to="/tour" className="text-red-400">
                    Tour
                  </Link>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  <Link to="/tour/all-tour" className="text-red-400">
                    Tour All
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <p>{getBookingDetailTour?.name}</p>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-6 max-md:flex max-md:flex-col'>
              <div className='col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md max-sm:px-2'>
                <TourInfo data={getBookingDetailTour} />
              </div>
              <div className='col-span-1 p-6 mt-6 bg-white rounded-lg shadow-md max-lg:px-2'>
                <TourBook
                  loading={loading}
                  onClick={paymentOption === 'full' ? handleAddBookingCashPayment : handleAddMomoBooking}
                  data={getBookingDetailTour}
                />
              </div>
              <div className='col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md max-lg:px-2 '>
                <PaymentOptions paymentOption={paymentOption} handleClickValueOption={setPaymentOption} />
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
