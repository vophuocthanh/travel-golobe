import SectionInViewRight from '../../animation/SectionInViewRight'
import { useQuery } from '@tanstack/react-query'
import { hotelApi } from '@/apis/hotel.api'

interface Search {
  id?: string
  name: string
  address: string
  price: string
  images: string
}

export default function RecentSearch() {
  const { data: getAll } = useQuery({
    queryKey: ['getAllHotel'],
    queryFn: () => hotelApi.getAll(1, 4)
  })
  //const recentSearches = getAll?.data.slice(0, 4);


  return (
    <SectionInViewRight>
      <div className='mx-36'>
        <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl'>Your Recent Searches</h1>
        <div className='flex flex-wrap justify-between gap-4'>
          {getAll?.data.map((search: Search) => (
            <div key={search.id} className='flex items-center w-full gap-4 mb-4 md:w-auto'>
              <img src={search.images} alt={search.address} className='object-cover w-24 h-24 rounded-lg' />
              <div>
                <h2 className='font-bold'>{search.address}</h2>
                <span className='text-gray-400'>{search.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionInViewRight>
  )
}
