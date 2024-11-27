import { tourApi } from '@/apis/tour.api'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Skeleton } from '@/components/ui/skeleton'
import { TourResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function SearchTour() {
  const { t } = useTranslation()
  const { data: getAll, isLoading } = useQuery({
    queryKey: ['getAllTour'],
    queryFn: () => tourApi.getAll(1, 4)
  })

  if (isLoading)
    return (
      <div className="items-center mb-10 mx-auto space-y-4 max-w-[105rem]">
        <Skeleton width="100%" height="2.5rem" />
        <Skeleton width="100%" height="2.5rem" />
        <Skeleton width="100%" height="2.5rem" />
      </div>
    )

  return (
    <SectionInViewRight>
      <div className="h-40 px-32 py-3 mb-20 rounded-2xl max-xl:px-20 max-lg:px-14 max-sm:px-8 max-lg:h-80">
        <div className="w-full ">
          <h2 className="mb-8 text-2xl font-medium">{t('searches')}</h2>
          <div className="flex justify-between gap-5 max-lg:grid max-lg:grid-cols-2">
            {getAll?.data.map((item: TourResponseType) => (
              <Link to={`/tour/${item.id}`} key={item.id}>
                <div className="flex gap-2 tour grid-container">
                  <img src={item.image} className="w-24 h-24 rounded-lg bject-cover" alt="" />
                  <div className="flex items-center">
                    <div className='w-52 max-md:w-40 max-sm:w-28'>
                      <h3 className="overflow-hidden text-lg font-medium whitespace-pre-line text-ellipsis line-clamp-2">
                        {item.description}
                      </h3>
                      <p className="overflow-hidden whitespace-pre-line text-slate-400 text-ellipsis line-clamp-1">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
