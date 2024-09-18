import { flightApi } from '@/apis/flight.api'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

interface Travel {
  id?: string
  name: string
  description: string
  images: string
  price: string
  startDate: string
  endDate: string
  perios: string
  create_at?: string
  update_at?: string
}


export default function FlightReview1() {

  const { data: getAll } = useQuery({
    queryKey: ['getAllFlight'],
    queryFn: () => flightApi.getAll(1, 4)
  })

  return (
    <SectionInViewRight>
      <div className='mt-[5rem]'>
        <div className='relative mx-36'>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-3xl font-medium'> Fall intro travel</h1>
          <div className='flex flex-wrap justify-between '>
            <p className='w-[970px] text-xl mb-8 font-light'>
              Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the
              travel tools to get you to your destination.
            </p>
            <Link to='/flight/all-flight' className=''>
              <Button className='absolute right-0 text-black bg-white border border-primary top-8'>See All</Button>
            </Link>
          </div>
          <div className='flex flex-wrap justify-between '>
            {getAll?.data.map((travel: Travel) => (
              <div
                key={travel.id}
                className='relative flex flex-col justify-end h-[35rem] p-5 bg-center bg-cover w-[22rem] rounded-lg my-3'
                style={{ backgroundImage: `url(${travel.images})` }}
              >
                <div className='absolute inset-x-0 bottom-0 rounded-b-lg h-1/3 bg-gradient-to-t from-gray-900 to-transparent'></div>

                <div className='relative flex justify-between w-full gap-4 mb-4'>
                  <div className='flex flex-col items-end'>
                    <p className='w-full text-3xl font-semibold text-white'>{travel.description}</p>
                    <p className='w-full text-gray-300'>{travel.price}</p>
                  </div>
                </div>

                <Button className='relative hover:bg-white hover:border-spacing-3'>Book Flight</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
