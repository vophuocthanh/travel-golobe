import { places_together } from '@/assets/images'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next';
export default function PlacesTogether() {
  const { t } = useTranslation();
  return (
    <SectionInViewUp>
      <div className='lg:mt-[5rem] w-full h-full mt-8'>
        <div className='relative mx-8 lg:mx-36'>
          <h1 className='flex items-start justify-start pt-0 mb-4 font-medium lg:text-3xl text-md'>{t('togetherCoach')} </h1>
          <div className='flex flex-wrap justify-between'>
            <p className='lg:w-[970px] lg:text-xl mb-8 font-light text-sm w-[70%]'>
            {t('textTogetherCoach')}
              
            </p>
            <Button className='absolute right-0 text-black bg-white border border-primary top-8'>{t('see')}</Button>
          </div>
        </div>
        <img src={places_together} alt='flight' className='w-full h-full ' />
      </div>
    </SectionInViewUp>
  )
}
