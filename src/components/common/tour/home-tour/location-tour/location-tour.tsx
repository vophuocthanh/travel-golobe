import { tour_location1 } from '@/assets/images'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function LocationTour() {
  const { t } = useTranslation()
  return (
    <SectionInViewRight>
      <div className='px-32 py-3 rounded-2xl mb-52 max-xl:px-20 max-lg:px-14 max-sm:px-8'>
        <div className='w-full '>
          <div className='flex items-center justify-between mb-5'>
            <div className=''>
              <h2 className='mb-3 text-2xl font-medium'>{t('travel')}</h2>
              <p className='w-[88%]'>{t('textTravel')}</p>
            </div>
            <Button className='text-black bg-white border border-primary'>{t('see')}</Button>
          </div>
          <div className='flex justify-between '>
            <div className='p-4 sm:mr-4 m bg-primary w-[50%] rounded-lg max-lg:w-[60%] max-md:w-[70%] max-sm:w-[150%]  '>
              <div className=''>
                <div className='flex justify-between mb-8'>
                  <h1 className='text-5xl w-[40%] max-sm:text-lg font-medium  max-lg:text-2xl'>{t('Backpacking')}</h1>
                  <p className='h-16 px-2 py-1 text-center bg-white rounded-lg '>
                    From <h2 className='text-xl font-medium'>$700</h2>
                  </p>
                </div>
                <p className='w-[90%] max-sm:w-[80%]'>
                {t('textBackpacking')}
                </p>
              </div>
              <Button className='w-full mt-32 text-black bg-white max-sm:mt-24 hover:bg-slate-100'>{t('Booktour')}</Button>
            </div>
            <div className='grid grid-cols-2 gap-4 max-lg:flex max-lg:flex-col max-sm:hidden'>
              <img className='w-full h-full ' src={tour_location1} alt='' />
              <img className='w-full h-full ' src={tour_location1} alt='' />
              <img className='w-full h-full max-lg:hidden ' src={tour_location1} alt='' />
              <img className='w-full h-full max-lg:hidden' src={tour_location1} alt='' />
            </div>
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
