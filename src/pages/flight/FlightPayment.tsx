import { bookingFlightApi } from '@/apis/booking-flight'
import { bookingTourApi } from '@/apis/booking-tour.api'
import { paymentApi } from '@/apis/payment.api'
import { Footer, Header } from '@/components/common'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import FlightBook from '@/components/common/flight/flight-payment/FlightBook'
import FlightInfo from '@/components/common/flight/flight-payment/FlightInfo'
import PaymentOptions from '@/components/common/payment/payment-option'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
export default function FlightPayment() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [paymentOption, setPaymentOption] = useState('full')

  const { data: getBookingFlightDetails } = useQuery({
    queryKey: ['getBookedFlightDetails', id],
    queryFn: () => bookingFlightApi.getBookingDetail(id || '')
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
    <div className="w-full bg-gray-100">
      <Header />
      <SectionInViewRight>
        <main className="pt-20 xl:px-[5rem] max-sm:px-8">
          <section>
            <h1 className="flex items-center justify-center p-5 text-3xl font-semibold">{t('flightpayment')}</h1>
            <div className="flex items-center space-x-2">
              <div className="items-start flex-1 w-full mt-2 mb-2">
                <div className="flex items-center space-x-2 text-gray-800 text-md max-sm:justify-center">
                  <p className="text-red-400">Turkey</p>
                  <ChevronRight className="w-4 h-4" />
                  <p className="text-red-400">Istanbul</p>
                  <ChevronRight className="w-4 h-4" />
                  <p>{getBookingFlightDetails?.brand}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 max-sm:flex max-sm:flex-col">
              <div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
                {getBookingFlightDetails && <FlightInfo data={getBookingFlightDetails} />}
              </div>
              <div className="col-span-1 p-6 mt-6 bg-white rounded-lg shadow-md">
                {getBookingFlightDetails && (
                  <FlightBook
                    data={getBookingFlightDetails}
                    loading={loading}
                    onClick={paymentOption === 'full' ? handleAddBookingCashPayment : handleAddMomoBooking}
                  />
                )}
              </div>
              <div className="col-span-2 p-6 mt-6 bg-white rounded-lg shadow-md">
                <PaymentOptions paymentOption={paymentOption} handleClickValueOption={setPaymentOption} />
              </div>
            </div>
          </section>
        </main>
      </SectionInViewRight>
      <div className="mt-[15rem]">
        <Footer />
      </div>
    </div>
  )
}
