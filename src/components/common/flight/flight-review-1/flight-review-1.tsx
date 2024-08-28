import { flightreview1, flightreview2 } from '@/assets/images'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const review = [
  { id: 1, city: 'Melbourne', title: 'An amazing journey', image: flightreview1, price: '700 $' },
  { id: 2, city: 'Paris', title: 'A Paris Adventure', image: flightreview2, price: '600 $' },
  { id: 3, city: 'London', title: 'London eye adventure', image: flightreview1, price: '380 $' },
  { id: 4, city: 'Columbia', title: 'Amazing streets', image: flightreview2, price: '200 $' }
]

export default function FlightReview1() {
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
            {review.map((travel) => (
              <div
                key={travel.id}
                className='relative flex flex-col justify-end h-[35rem] p-5 bg-center bg-cover w-[22rem] rounded-lg my-3'
                style={{ backgroundImage: `url(${travel.image})` }}
              >
                <div className='absolute inset-x-0 bottom-0 rounded-b-lg h-1/3 bg-gradient-to-t from-gray-900 to-transparent'></div>

                <div className='relative flex justify-between w-full gap-4 mb-4'>
                  <div className='flex flex-col items-end'>
                    <p className='w-full text-3xl font-semibold text-white'>{travel.city}</p>
                    <p className='w-full text-gray-300'>{travel.title}</p>
                  </div>
                  <p className='flex items-center justify-center text-3xl text-white'>{travel.price}</p>
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
