import SectionInViewRight from '../../animation/SectionInViewRight'
import { useQuery } from '@tanstack/react-query'
import { hotelApi } from '@/apis/hotel.api'
import { hoteldetail2 } from '@/assets/images'
import { useTranslation } from 'react-i18next';

interface Search {
  id: string,
  hotel_names?: string,
  location?: string,
  price?: number,
  score_hotels?: string | number,
  number_rating?: string | number,
  star_number?: number,
  received_time?: string,
  giveback_time?: string,
  description?: string,
  hotel_link?: string,
  place?: string,
  image?: string,
}

export default function RecentSearch() {
  const { t } = useTranslation();
  const { data: getAll } = useQuery({
    queryKey: ['getAllHotel'],
    queryFn: () => hotelApi.getAll(1, 6)
  })

  return (
    <SectionInViewRight>
      <div className='mx-8 md:mx-36'>
        <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl font-semibold'>{t('searches')}</h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {getAll?.data.map((search: Search) => (
            <div
              key={search.id}
              className='flex items-center p-4 overflow-hidden transition-shadow duration-300 border rounded-lg shadow-lg hover:shadow-xl'
            >
              <img
                src={hoteldetail2}
                alt={search.place}
                className='object-cover w-24 h-24 mr-4 rounded-lg'
              />
              <div className='flex flex-col'>
                <h2 className='text-xl font-bold'>{search.hotel_names}</h2>
                <span className='overflow-hidden text-gray-500 whitespace-nowrap overflow-ellipsis'>{search.location}</span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </SectionInViewRight>
  )
}
