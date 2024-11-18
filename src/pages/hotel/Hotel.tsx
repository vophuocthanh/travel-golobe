import { banner_hotel } from '@/assets/images'
import { FallIntroTravel, Footer, Header, RecentSearch } from '@/components/common'
import BookingForm from '@/components/common/hotel/booking-form/booking-form'
import FallIntroTravel2 from '@/components/common/hotel/fall-intro-travel-2/fall-intro-travel2'
import { Button } from '@/components/ui/button'
import { HotelIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export default function Hotel() {
  const { t } = useTranslation();
  return (
    <div className='w-full bg-[#F5F5F5]'>
      <Header />
      <div className='relative w-full '>
        <img src={banner_hotel} alt='' className='object-cover w-full h-screen ' />
        <div className='absolute inset-0 flex items-center justify-center w-[650px] flex-col bg-gradient-to-r from-blue-500/50 to-transparent'>
          <div className='ml-32'>
            <h1 className='text-5xl text-white w-[28rem]'>{t('travelwhishlist')}</h1>
            <p className='text-white '>{t('Special')}</p>
          </div>
        </div>
        <div className='absolute flex flex-col items-center justify-center w-full p-8 mx-auto space-y-4 max-w-7xl bg-white rounded-xl left-1/2 top-[105%] -translate-x-1/2 -translate-y-1/2 h-[250px]'>
          <div className='relative w-full '>
            <p className='p-4 text-3xl'>{t('wherehotel')}</p>
            <BookingForm />
            <div className='flex justify-end p-4'>
              <div className='flex gap-4'>
                <Button className='px-4 py-2 text-black bg-white border rounded-lg border-primary hover:bg-white '>
                  + {t('Promo')}
                </Button>
                <Button className='flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary hover:border hover:bg-white hover:border-spacing-3 hover:border-primary hover:text-black'>
                  <HotelIcon className='size-4' /> {t('places')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[280px] '></div>

      <RecentSearch />
      <FallIntroTravel />
      <FallIntroTravel2 />

      <main className='mt-80'>
        <Footer />
      </main>
    </div>
  )
}
