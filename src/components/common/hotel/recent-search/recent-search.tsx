import { baku_azerbaijan, istanbul_turkey, male_madvies, sydney_australia } from '@/assets/images'
import SectionInViewRight from '../../animation/SectionInViewRight'

const rencentSearches = [
  { id: 1, city: 'Istanbul, Turkey', places: 325, image: istanbul_turkey },
  { id: 2, city: 'Sydney, Austrlia', places: 325, image: sydney_australia },
  { id: 3, city: 'Baku, Azerbaijan', places: 325, image: baku_azerbaijan },
  { id: 4, city: 'Malé, Madives', places: 325, image: male_madvies }
]

export default function RecentSearch() {
  return (
    <SectionInViewRight>
      <div className='mx-36'>
        <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl'>Your Recent Searches</h1>
        <div className='flex flex-wrap justify-between gap-4'>
          {rencentSearches.map((search) => (
            <div key={search.id} className='flex items-center w-full gap-4 mb-4 md:w-auto'>
              <img src={search.image} alt={search.city} className='object-cover w-24 h-24 rounded-lg' />
              <div>
                <h2 className='font-bold'>{search.city}</h2>
                <span className='text-gray-400'>{search.places} places</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionInViewRight>
  )
}
