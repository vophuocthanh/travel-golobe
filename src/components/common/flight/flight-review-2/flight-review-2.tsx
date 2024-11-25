import { flightreview3, flightreview4, flightreview5, flightreview6 } from '@/assets/images'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function FlightReview2() {
  const { t } = useTranslation()
  return (
    <SectionInViewUp>
      <div className="mt-[5rem] mb-[12rem]">
        <div className="xl:relative xl:mx-36 max-sm:mx-4">
          <p className="pt-0 mb-4 font-medium xl:flex xl:items-start xl:justify-start xl:text-3xl max-sm:text-center">
            {' '}
            {t('travelFlight')}
          </p>
          <div className="flex flex-wrap justify-between ">
            <p className="w-full mb-8 font-light xl:text-xl max-sm:text-center ">{t('textTravelFlight')}</p>
          </div>
        </div>
        <div className="gap-4 xl:flex xl:mx-36 max-sm:flex-row max-sm:mx-4">
          <div className="flex flex-col  h-[31rem] w-[50rem] bg-primary justify-between border border-primary rounded-2xl max-sm:w-[100%] max-sm:mb-4 ">
            <div className="flex justify-between mx-10 mt-5">
              <p className="h-20 xl:text-5xl xl:w-[20rem] max-sm:text-2xl">{t('Backpacking')}</p>
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-white border rounded-lg xl:text-xl border-primary max-sm:ml-4">
                <p> From</p>
                <p className="font-bold">$700</p>
              </div>
            </div>

            <p className="mx-10 mb-3 text-md max-sm:text-center">{t('textBackpacking')}</p>

            <Button className="mt-20 mb-4 text-black bg-white mx-11 hover:bg-white">{t('BookFlight')}</Button>
          </div>
          <div className="flex flex-col gap-4 xl:h-[30rem] xl:w-[50rem] ">
            <div className="flex gap-4 max-sm:flex-col ">
              <img
                src={flightreview3}
                className="w-1/2 h-[15rem] object-cover rounded-lg border border-primary  max-sm:w-[100%]"
              />
              <img
                src={flightreview4}
                className="w-1/2 h-[15rem]object-cover rounded-lg border border-primary max-sm:w-[100%]"
              />
            </div>
            <div className="flex gap-4 max-sm:flex-col">
              <img
                src={flightreview5}
                className="w-1/2 h-[15rem] object-cover rounded-lg border border-primary max-sm:w-[100%]"
              />
              <img
                src={flightreview6}
                className="xl:w-[48%] h-[15rem] object-cover rounded-lg border border-primary max-sm:w-[100%]"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionInViewUp>
  )
}
