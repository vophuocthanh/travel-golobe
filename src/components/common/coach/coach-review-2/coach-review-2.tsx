import { flightreview3, flightreview4, flightreview5, flightreview6 } from '@/assets/images'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next';
export default function CoachReview2() {
  const { t } = useTranslation();
  return (
    <SectionInViewUp>
      <div className='w-full lg:mt-[5rem] mb-[12rem] mt-8'>
        <div className='relative mx-8 lg:mx-36'>
          <h1 className='flex items-start justify-start pt-0 mb-4 font-medium lg:text-3xl text-md'>{t('travelCoach')}</h1>
          <div className='flex flex-wrap justify-between '>
            <p className='lg:w-[970px] lg:text-xl mb-8 font-light text-sm w-[70%]'>
            {t('textTravelCoach')}
            </p>
            <Button className='absolute right-0 text-black bg-white border border-primary top-8'>{t('see')}</Button>
          </div>
        </div>
        <div className='gap-4 mx-8 lg:flex lg:mx-36'>
          <div className='flex flex-col lg:h-[31rem] lg:w-[50rem] bg-primary justify-between border border-primary rounded-2xl w-full mb-4'>
            <div className='flex justify-between mx-10 mt-5'>
              {' '}
              <p className='h-20 lg:text-5xl w-[20rem] text-md'>{t('Backpacking')}</p>
              <div className='flex flex-col items-center justify-center w-16 h-16 text-xl bg-white border rounded-lg border-primary'>
                <p> From</p>
                <p className='font-bold'>$700</p>
              </div>
            </div>

            <p className='mx-10 mb-3 text-md'>
            {t('textBackpacking')}
            </p>

            <Button className='mt-20 mb-4 text-black bg-white mx-11 hover:bg-slate-300'>{t('BookCoach')}</Button>
          </div>
          <div className='flex flex-col gap-4 lg:h-[30rem] lg:w-[50rem] w-full h-[15rem]'>
            <div className='flex gap-4 '>
              <img src={flightreview3} className='w-[47.5%] lg:w-1/2 lg:h-[15rem] h-[7.5rem] object-cover rounded-lg border border-primary' />
              <img src={flightreview4} className='w-[47.5%] lg:w-1/2 lg:h-[15rem] h-[7.5rem] object-cover rounded-lg border border-primary' />
            </div>
            <div className='flex gap-4'>
              <img src={flightreview5} className='w-[47.5%] lg:w-1/2 lg:h-[15rem] h-[7.5rem] object-cover rounded-lg border border-primary' />
              <img src={flightreview6} className='w-[47.5%] lg:w-1/2 lg:h-[15rem] h-[7.5rem] object-cover rounded-lg border border-primary' />
            </div>
          </div>
        </div>
      </div>
    </SectionInViewUp>
  )
}
