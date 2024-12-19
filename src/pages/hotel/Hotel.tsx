import { banner_hotel } from '@/assets/images'
import { FallIntroTravel, Footer, Header, RecentSearch } from '@/components/common'
import FallIntroTravel2 from '@/components/common/hotel/fall-intro-travel-2/fall-intro-travel2'
import { useTranslation } from 'react-i18next'

export default function Hotel() {
  const { t } = useTranslation()
  return (
    <div className="w-full bg-[#F5F5F5]">
      <Header />
      <div className="relative w-full">
        <img src={banner_hotel} alt="" className="object-cover w-full h-screen" />
        <div className="absolute inset-0 flex items-center justify-center w-full md:w-[650px] flex-col bg-gradient-to-r from-blue-500/50 to-transparent">
          <div className="px-4 md:ml-32">
            <h1 className="text-3xl md:text-5xl text-white w-full md:w-[28rem] text-center md:text-left">
              {t('travelwhishlist')}
            </h1>
            <p className="text-center text-white md:text-left">{t('Special')}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-[150px] "></div>

      <RecentSearch />
      <FallIntroTravel />
      <FallIntroTravel2 />

      <main className="mt-80">
        <Footer />
      </main>
    </div>
  )
}
