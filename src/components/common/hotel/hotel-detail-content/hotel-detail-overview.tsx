interface HotelDetailOverviewProps {
  description: string
  averrange?: number
  ratingStatus?: string
  total?: number
}
import { useTranslation } from 'react-i18next';
export default function HotelDetailOverview({ description, averrange, ratingStatus, total }: HotelDetailOverviewProps) {
  const { t } = useTranslation();
  return (
    <div className='w-full mx-auto mt-5'>
      <div>
        <hr className='w-full my-8 border-2 border-gray' />
      </div>
      <h2 className='mb-4 text-2xl font-semibold'>{t('Overview')}</h2>
      <p className='mb-6 text-gray-700'>{description}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 h-[12rem]">
        <div className="relative col-span-1 p-4 text-center rounded-lg bg-emerald-300">
          <span className="absolute flex text-4xl font-bold top-3">{averrange}</span>
          <p className="absolute flex text-lg font-semibold bottom-9">{ratingStatus}</p>
          <p className="absolute flex bottom-4">{total} {t('reviews')}</p>
        </div>
      </div>

      <div>
        <hr className="my-8 border-2 border-gray" />
      </div>
    </div>
  )
}
