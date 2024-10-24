import { places_together } from '@/assets/images'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next';

export default function PlacesTogether() {
  const { t } = useTranslation();
  return (
    <SectionInViewUp>
      <div className='mt-[5rem] w-full h-full'>
        <div className='relative mx-36'>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-3xl font-medium'> {t('together')}</h1>
          <div className='flex flex-wrap justify-between'>
            <p className='w-[970px] text-xl mb-8 font-light'>
            {t('texttogether')}
  
            </p>
            <Button className='absolute right-0 text-black bg-white border hover:text-white border-primary top-8'>
              {t('see')}
            </Button>
          </div>
        </div>
        <img src={places_together} alt='flight' className='w-full h-full ' />
      </div>
    </SectionInViewUp>
  )
}
