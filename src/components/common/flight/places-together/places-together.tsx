import { places_together } from '@/assets/images'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function PlacesTogether() {
  const { t } = useTranslation()
  return (
    <SectionInViewUp>
      <div className="xl:mt-[5rem] w-full h-full max-sm:mt-0  ">
        <div className="xl:relative xl:mx-36 ">
          <h1 className="mb-4 font-medium pt- 0 xl:flex xl:justify-start xl:items-start xl:text-3xl max-sm:text-center">
            {t('together')}
          </h1>
          <div className="flex flex-col items-start mb-6 max-sm:items-center max-sm:justify-center xl:flex-row xl:justify-between xl:items-center xl:flex-wrap">
            <p className="mb-8 xl:w-auto xl:mr-auto xl:font-light xl:text-xl max-sm:w-full max-sm:text-center">
              {t('texttogether')}
            </p>
            <Button className="text-black bg-white border hover:text-white border-primary max-sm:mt-4 max-sm:text-center">
              {t('see')}
            </Button>
          </div>
        </div>
        <img src={places_together} alt="flight" className="w-full h-full max-sm:border max-sm:rounded-md " />
      </div>
    </SectionInViewUp>
  )
}
