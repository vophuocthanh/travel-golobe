import { tour_into1 } from '@/assets/images'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'

const dataTourInto = [
  {
    id: 1,
    image: tour_into1,
    title: 'Istanbul, Turkey',
    text: '325 places',
    price: '$ 700'
  },
  {
    id: 2,
    image: tour_into1,
    title: 'Istanbul, Turkey',
    text: '325 places',
    price: '$ 700'
  },
  {
    id: 3,
    image: tour_into1,
    title: 'Istanbul, Turkey',
    text: '325 places',
    price: '$ 700'
  },
  {
    id: 4,
    image: tour_into1,
    title: 'Istanbul, Turkey',
    text: '325 places',
    price: '$ 700'
  }
]

export default function IntoTour() {
  return (
    <SectionInViewUp>
      <div className='px-32 py-3 mb-20 rounded-2xl'>
        <div className='w-full '>
          <div className='flex items-center justify-between mb-5'>
            <div>
              <h2 className='mb-3 text-2xl font-medium'>Fall into travel</h2>
              <p className='w-[70%]'>
                Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the
                travel tools to get you to your destination.
              </p>
            </div>
            <Button className='bg-white border border-primary hover:bg-slate-100'>See All</Button>
          </div>
          <div className='flex justify-between'>
            {dataTourInto.map((item) => (
              <div className='relative w-72 '>
                <img src={item.image} className='' alt='' />
                <div className='absolute w-full px-4 top-72'>
                  <div className='flex items-center justify-between mb-3'>
                    <div className='text-white'>
                      <h3 className='text-xl font-normal'>{item.title}</h3>
                      <p className='text-slate-200'>{item.text}</p>
                    </div>
                    <h3 className='text-xl font-normal text-white'>{item.price}</h3>
                  </div>
                  <Button className='w-full '>Book a Hotel</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionInViewUp>
  )
}
