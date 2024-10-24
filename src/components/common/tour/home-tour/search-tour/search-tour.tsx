import { tourApi } from '@/apis/tour.api'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { TourResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next';




export default function SearchTour() {
  const { t } = useTranslation();
  const { data: getAll } = useQuery({
    queryKey: ['getAllTour'],
    queryFn: () => tourApi.getAll(1,5)
  })

  return (
    <SectionInViewRight>
      <div className='h-40 px-32 py-3 mb-20 rounded-2xl'>
        <div className='w-full '>
          <h2 className='mb-8 text-2xl font-medium'>{t('searches')}</h2>
          <div className='flex justify-between gap-5'>
            {getAll?.data.map((item: TourResponseType) => (
              <div className='flex gap-2 tour grid-container' key={item.id}>
                <img src={item.image} className='w-24 h-24 rounded-lg bject-cover' alt='' />
                <div className='flex items-center'>
                  <div>
                    <h3 className='overflow-hidden text-lg font-medium whitespace-pre-line w-52 text-ellipsis line-clamp-2'>
                      {item.description}
                    </h3>
                    <p className='overflow-hidden whitespace-pre-line text-slate-400 w-52 text-ellipsis line-clamp-1'>
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
