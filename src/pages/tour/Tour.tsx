import { banner_tour } from '@/assets/images'
import { Footer, Header, IntoTour, LocationTour, SearchTour } from '@/components/common'
import { useTranslation } from 'react-i18next'

export default function Tour() {
  const { t } = useTranslation()
  return (
    <div className="w-full">
      <Header />
      <div className="relative w-full ">
        <img src={banner_tour} alt="" className="object-cover w-full h-screen " />
        <div className="absolute inset-0 flex items-center justify-center w-[50%] max-md:w-[80%] flex-col bg-gradient-to-r from-blue-500/50 to-transparent">
          <div className="ml-32 ">
            <h1 className="text-5xl max-lg:text-3xl text-white w-[28rem] max-sm:w-[20rem]">{t('travelwhishlist')}</h1>
            <p className="text-white ">{t('Special')}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[280px] max-xl:h-[120px] max-md:h-[80px] "></div>

      <SearchTour />
      <IntoTour />
      <LocationTour />
      <Footer />
    </div>
  )
}
