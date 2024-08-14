import { tour_location1 } from '@/assets/images'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'

export default function LocationTour() {
  return (
    <SectionInViewRight>
      <div className='px-32 py-3 rounded-2xl mb-52'>
        <div className='w-full '>
          <div className='flex items-center justify-between mb-5'>
            <div>
              <h2 className='mb-3 text-2xl font-medium'>Fall into travel</h2>
              <p className='w-[88%]'>
                Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the
                travel tools to get you to your destination.
              </p>
            </div>
            <Button className='bg-white border border-primary hover:bg-slate-100'>See All</Button>
          </div>
          <div className='flex justify-between'>
            <div className='p-4 mr-4 bg-primary w-[50%] rounded-lg'>
              <div>
                <div className='flex justify-between mb-8'>
                  <h1 className='text-5xl w-[40%] font-medium'>Backpacking Sri Lanka</h1>
                  <p className='h-16 px-2 py-1 text-center bg-white rounded-lg '>
                    From <h2 className='text-xl font-medium'>$700</h2>
                  </p>
                </div>
                <p className='w-[90%]'>
                  Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily
                  life. It helps us to forget about our problems, frustrations, and fears at home. During our journey,
                  we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways
                  of living.
                </p>
              </div>
              <Button className='w-full mt-32 bg-white hover:bg-slate-100'>Book Flight</Button>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <img className='w-full h-full' src={tour_location1} alt='' />
              <img className='w-full h-full' src={tour_location1} alt='' />
              <img className='w-full h-full' src={tour_location1} alt='' />
              <img className='w-full h-full' src={tour_location1} alt='' />
            </div>
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
