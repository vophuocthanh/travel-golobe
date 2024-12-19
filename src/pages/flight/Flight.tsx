import { banner_flight } from '@/assets/images'
import { Footer, Header } from '@/components/common'
import FlightReview1 from '@/components/common/flight/flight-review-1/flight-review-1'
import FlightReview2 from '@/components/common/flight/flight-review-2/flight-review-2'
import PlacesTogether from '@/components/common/flight/places-together/places-together'
import { useTranslation } from 'react-i18next'

export default function Flight() {
  const { t } = useTranslation()
  return (
    <div className="w-full ">
      <Header />
      <main className="w-full pt-20 ">
        <section>
          <div className="flex items-center justify-center w-full h-[50rem] overflow-hidden relative">
            {/* banner */}
            <div className="w-full h-full ">
              <img src={banner_flight} alt="flight" className="object-cover w-full h-screen " />

              <div className="absolute p-5 text-white top-1/4 left-[10rem] w-[25rem]">
                <h1 className="hidden text-4xl font-bold sm:block">{t('travelwhishlist')}</h1>
                <p className="hidden mt-2 text-lg sm:block">{t('Special')}</p>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full">
          <PlacesTogether />
          <FlightReview1 />
          <FlightReview2 />
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </main>
    </div>
  )
}
