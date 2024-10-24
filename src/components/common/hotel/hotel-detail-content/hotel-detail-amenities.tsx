import { IconBar, IconBell, IconEat, IconGym, IconPool, IconSpa, IconTea, IconWifi } from '@/common/icons'
import { useTranslation } from 'react-i18next';
export default function HotelDetailAmenities() {
  const { t } = useTranslation();
  return (
    <div className='flex w-full mt-5'>
      <div className='w-full'>
        <div>
          <hr className='my-8 border-2 border-gray ' />
        </div>
        <h1 className='mb-4 text-2xl font-semibold '>{t('Amenities')}</h1>
        <div className='grid grid-cols-3 gap-4 text-black'>
          <div>
            <p className='flex items-center gap-3 mb-5'>
              <IconPool />
              {t('Outdoor')}
            </p>
            <p className='flex items-center gap-3 mb-5'>
              <IconPool />
              {t('Indoor')}
            </p>
            <p className='flex items-center gap-3 mb-5'>
              <IconSpa />
              {t('Spa')}
            </p>
            <p className='flex items-center gap-3 mb-5'>
              <IconEat />
              {t('Restaurant')}
            </p>
            <p className='flex items-center gap-3 mb-5'>
              <IconBell />
              {t('service')}
            </p>
          </div>
          <div>
            <p className='flex items-center gap-3 mb-5'>
              <IconGym />
              {t('Fitness')}
            </p>
            <p className='flex items-center gap-3 mb-5'>
              <IconBar />
              {t('Bar')}
            </p>
            <p className='flex items-center gap-3 mb-5'>
              <IconWifi />
              {t('Free')}
            </p>
            <p className='flex items-center gap-3 mb-5'>
              <IconTea />
              {t('Tea')}
            </p>
            <p className='flex items-center text-red-600'>+24 {t('more')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
