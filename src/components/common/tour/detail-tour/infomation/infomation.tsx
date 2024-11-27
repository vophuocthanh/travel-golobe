import { IconCuisine, IconEndow, IconIdealTime, IconSightseeing, IconSuitable, IconVehicle } from '@/common/icons'
import { TourInfoResponse } from '@/shared/ts/interface/data.interface'
import { useTranslation } from 'react-i18next';

interface IInformation {
  dataInfo?: TourInfoResponse
}

export default function Information({ dataInfo }: IInformation) {
  const { t } = useTranslation();
  const data = [
    {
      id: 1,
      icon: <IconSightseeing />,
      title: t('Attractions'),
      text: dataInfo?.sight_seeing
    },
    {
      id: 2,
      icon: <IconCuisine />,
      title: t('Cuisine'),
      text: dataInfo?.cuisine
    },
    {
      id: 3,
      icon: <IconSuitable />,
      title: t('Suitable'),
      text: dataInfo?.suitable
    },
    {
      id: 4,
      icon: <IconIdealTime />,
      title: t('Ideal'),
      text: dataInfo?.ideal_time
    },
    {
      id: 5,
      icon: <IconVehicle />,
      title: t('Transportation'),
      text: dataInfo?.road_vehicle?.type 
    },
    {
      id: 6,
      icon: <IconEndow />,
      title: t('vehicle'),
      text: dataInfo?.voucher
    }
  ]
  return (
    <div className='mt-16 '>
      <h2 className='mb-8 text-3xl font-semibold text-center'>{t('ADDITIONAL')} </h2>
      <div className='grid grid-cols-3 grid-rows-2 gap-4'>
        {data.map((item) => (
          <div key={item.id}>
            <div className='iconTour'>{item.icon}</div>
            <h3 className='py-3 text-xl font-medium max-sm:text-lg'>{item.title}</h3>
            <p className='text-xs'>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
