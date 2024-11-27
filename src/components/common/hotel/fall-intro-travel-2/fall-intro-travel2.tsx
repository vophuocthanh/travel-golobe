import { male_madvies, sydney_australia } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import SectionInViewRight from '../../animation/SectionInViewRight'

export default function FallIntroTravel2() {
  const { t } = useTranslation()
  return (
    <SectionInViewRight>
      <div className="mt-16 sm:mt-20 lg:mt-32">
        <div className="mx-4 sm:mx-8 lg:mx-32">
          <h1 className="flex items-start justify-start pt-0 mb-4 text-2xl sm:text-3xl lg:text-4xl">
            {t('travelHotel')}
          </h1>
          <div className="flex flex-wrap justify-between">
            <p className="w-full sm:w-2/3 text-base sm:text-lg lg:text-xl mb-4 sm:mb-8">
              {t('textTravelHotel')}
            </p>
            <Button className="text-black bg-white border border-primary">{t('see')}</Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col h-[25rem] sm:h-[28rem] lg:h-[31rem] w-full lg:w-1/2 bg-primary justify-between border border-primary rounded-2xl">
              <div className="flex justify-between mx-4 sm:mx-6 lg:mx-10 mt-5">
                <p className="text-xl sm:text-3xl lg:text-5xl w-full lg:w-[20rem]">
                  {t('Backpacking')}
                </p>
                <div className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 sm:h-16 text-sm sm:text-lg bg-white border rounded-lg border-primary">
                  <p>From</p>
                  <p className="font-bold">$700</p>
                </div>
              </div>
              <p className="mx-4 sm:mx-6 lg:mx-10 mb-3 text-sm sm:text-md">{t('textBackpacking')}</p>
              <Button className="mt-auto mb-4 text-black bg-white mx-4 sm:mx-6 lg:mx-11 hover:bg-gray-200">
                {t('BookHotel')}
              </Button>
            </div>

            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <div className="flex gap-4">
                <img
                  src={male_madvies}
                  alt="Male, Maldives"
                  className="w-1/2 h-[10rem] sm:h-[12rem] lg:h-[15rem] object-cover rounded-lg border border-primary"
                />
                <img
                  src={sydney_australia}
                  alt="Sydney, Australia"
                  className="w-1/2 h-[10rem] sm:h-[12rem] lg:h-[15rem] object-cover rounded-lg border border-primary"
                />
              </div>
              <div className="flex gap-4">
                <img
                  src={male_madvies}
                  alt="Male, Maldives"
                  className="w-1/2 h-[10rem] sm:h-[12rem] lg:h-[15rem] object-cover rounded-lg border border-primary"
                />
                <img
                  src={sydney_australia}
                  alt="Sydney, Australia"
                  className="w-1/2 h-[10rem] sm:h-[12rem] lg:h-[15rem] object-cover rounded-lg border border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionInViewRight>

  )
}
