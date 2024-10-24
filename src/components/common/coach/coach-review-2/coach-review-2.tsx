import { flightreview3, flightreview4, flightreview5, flightreview6 } from '@/assets/images'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'

export default function CoachReview2() {
  return (
    <SectionInViewUp>
      <div className='mt-32 pb-80'>
        <div className='mx-32 '>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl dark:text-white'> Fall intro travel</h1>
          <div className='flex justify-between '>
            <p className='mb-8 text-lg w-[1180px] dark:text-white'>
              Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the
              travel tools to get you to your destination.
            </p>
            <Button className='text-black bg-white border border-primary'>See All</Button>
          </div>

          <div className='flex gap-4'>
            <div className='flex flex-col  h-[31rem] w-[50rem] bg-primary dark:bg-slate-900 justify-between border border-primary dark:border-white rounded-2xl '>
              <div className='flex justify-between mx-10 mt-5'>
                {' '}
                <p className='h-20 text-5xl w-[20rem] dark:text-white'>Backpacking Sri Lanka</p>
                <div className='flex flex-col items-center justify-center w-16 h-16 text-xl bg-white border rounded-lg border-primary dark:border-white'>
                  <p className='dark:text-black'> From</p>
                  <p className='font-bold dark:text-black'>$700</p>
                </div>
              </div>

              <p className='mx-10 mb-3 text-md dark:text-white'>
                Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life.
                It helps us to forget about our problems, frustrations, and fears at home. During our journey, we
                experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of
                living.
              </p>

              <Button className='mt-20 mb-4 bg-white mx-11 hover:bg-gray-200'>Book Flight</Button>
            </div>
            <div className='flex flex-col gap-4 h-[30rem] w-[50rem] '>
              <div className='flex gap-4 '>
                <img
                  src={flightreview3}
                  alt='Male, Maldives'
                  className='w-1/2 h-[15rem] object-cover rounded-lg border border-primary dark:border-white'
                />
                <img
                  src={flightreview4}
                  alt='Sydney, Australia'
                  className='w-1/2 h-[15rem]object-cover rounded-lg border border-primary dark:border-white'
                />
              </div>
              <div className='flex gap-4'>
                <img
                  src={flightreview5}
                  alt='Male, Maldives'
                  className='w-1/2 h-[15rem] object-cover rounded-lg border border-primary dark:border-white'
                />
                <img
                  src={flightreview6}
                  alt='Sydney, Australia'
                  className='w-1/2 h-[15rem] object-cover rounded-lg border border-primary dark:border-white'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionInViewUp>
  )
}
