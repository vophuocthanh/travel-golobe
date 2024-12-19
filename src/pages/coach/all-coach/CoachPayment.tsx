import { bookingCoachApi } from '@/apis/booking-coach'
import { bookingTourApi } from '@/apis/booking-tour.api'
import { paymentApi } from '@/apis/payment.api'
import { Footer, Header } from '@/components/common'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import CoachBook from '@/components/common/coach/coach-payment/CoachBook'
import CoachInfo from '@/components/common/coach/coach-payment/CoachInfo'
import PaymentOptions from '@/components/common/payment/payment-option'
import { BookingCoachResponse } from '@/shared/ts/interface/booking-coach.interface'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export default function CoachPayment() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const [paymentOption, setPaymentOption] = useState('full')

  const { data: getBookingCoachDeTails } = useQuery({
    queryKey: ['getBookedCoachDetails', id],
    queryFn: () => bookingCoachApi.getBookingDetail(id || '')
  })

  const mutationAddMomoBooking = useMutation({
    mutationFn: () => paymentApi.addMomo(id || '')
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
  const mutationAddBookingCashPayment = useMutation({
    mutationFn: () => bookingTourApi.addBookingCashPayment(id || '')
  })

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
        <main className='pt-20 lg:px-[5rem] p-2'>
          <section className='w-full'>
            <h1 className='flex items-center justify-center p-5 text-3xl font-semibold'>{t('CoachPayment')}</h1>
            <div className='flex items-center lg:space-x-2'>
              <div className='items-start flex-1 w-full mt-2 mb-2'>
                <div className='flex items-center text-gray-800 lg:space-x-2 text-md'>
                  <Link to="/vehicle/coach" className="text-red-400">
                    Coach
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <Link to="/vehicle/coach/all-coach" className="text-red-400">
                    Coach All
                  </Link>
                  <ChevronRight className='w-4 h-4' />
                  <p>{getBookingCoachDeTails?.brand}</p>
                </div>
              </div>
            </div>
            <div className='grid gap-6 lg:grid-cols-3 '>
              <div className='lg:col-span-2'>
                <div className='w-full p-6 mt-6 bg-white rounded-lg shadow-md'>
                  {getBookingCoachDeTails && <CoachInfo data={getBookingCoachDeTails as BookingCoachResponse} />}
                </div>
                <div className='w-full p-6 mt-6 bg-white rounded-lg shadow-md '>
                  <PaymentOptions paymentOption={paymentOption} handleClickValueOption={setPaymentOption}/>
                </div>
              </div>
              <div className='w-full h-[35rem] lg:col-span-1 p-6 mt-6 bg-white rounded-lg shadow-md lg:sticky lg:top-6'>
                {getBookingCoachDeTails && (
                  <CoachBook
                    loading={loading}
                    onClick={paymentOption === 'full' ? handleAddBookingCashPayment : handleAddMomoBooking}
                    data={getBookingCoachDeTails as BookingCoachResponse}
                  />
                )}
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
