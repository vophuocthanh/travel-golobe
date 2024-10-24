import { male_madvies, sydney_australia } from '@/assets/images'
import { Button } from '@/components/ui/button'
import SectionInViewRight from '../../animation/SectionInViewRight'
import { useTranslation } from 'react-i18next';

export default function FallIntroTravel2() {
  const { t } = useTranslation();
  return (
    <SectionInViewRight>
      <div className='mt-32'>
        <div className='mx-32 '>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl'> {t('travelHotel')}</h1>
          <div className='flex flex-wrap justify-between '>
            <p className='mb-8 text-lg w-[970px]'>
            {t('textTravelHotel')}
            </p>
            <Button className='text-black bg-white border border-primary'>{t('see')}</Button>
          </div>

          <div className='flex gap-4'>
            <div className='flex flex-col  h-[31rem] w-[50rem] bg-primary justify-between border border-primary rounded-2xl '>
              <div className='flex justify-between mx-10 mt-5'>
                {' '}
                <p className='h-20 text-5xl w-[20rem]'>Backpacking Sri Lanka</p>
                <div className='flex flex-col items-center justify-center w-16 h-16 text-xl bg-white border rounded-lg border-primary'>
                  <p> From</p>
                  <p className='font-bold'>$700</p>
                </div>
              </div>

              <p className='mx-10 mb-3 text-md'>
                Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life.
                It helps us to forget about our problems, frustrations, and fears at home. During our journey, we
                experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of
                living.
              </p>

              <Button className='mt-20 mb-4 bg-white mx-11 hover:bg-gray-200'>{t('BookHotel')}</Button>
            </div>
            <div className='flex flex-col gap-4 h-[30rem] w-[50rem] '>
              <div className='flex gap-4 '>
                <img
                  src={male_madvies}
                  alt='Male, Maldives'
                  className='w-1/2 h-[15rem] object-cover rounded-lg border border-primary'
                />
                <img
                  src={sydney_australia}
                  alt='Sydney, Australia'
                  className='w-1/2 h-[15rem]object-cover rounded-lg border border-primary'
                />
              </div>
              <div className='flex gap-4'>
                <img
                  src={male_madvies}
                  alt='Male, Maldives'
                  className='w-1/2 h-[15rem] object-cover rounded-lg border border-primary'
                />
                <img
                  src={sydney_australia}
                  alt='Sydney, Australia'
                  className='w-1/2 h-[15rem] object-cover rounded-lg border border-primary'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
