import { flightreview3, flightreview4, flightreview5, flightreview6 } from '@/assets/images'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'

export default function CoachReview2() {
  return (
    <SectionInViewUp>
      <div className='mt-[5rem] mb-[12rem]'>
        <div className='relative mx-36'>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-3xl font-medium'> Fall intro travel</h1>
          <div className='flex flex-wrap justify-between '>
            <p className='w-[970px] text-xl mb-8 font-light'>
              Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the
              travel tools to get you to your destination.
            </p>
            <Button className='absolute right-0 text-black bg-white border border-primary top-8'>See All</Button>
          </div>
        </div>
        <div className='flex gap-4 mx-36'>
          <div className='flex flex-col  h-[31rem] w-[50rem] bg-primary justify-between border border-primary rounded-2xl '>
            <div className='flex justify-between mx-10 mt-5'>
              {' '}
              <p className='h-20 text-5xl w-[20rem]'>Backpacking Sri Lanka</p>
              <div className='flex flex-col items-center justify-center w-16 h-16 text-xl bg-white border rounded-lg border-primary'>
                <p> From</p>
                <p className='font-bold'>$700</p>
              </div>
            </div>

            <p className='mx-10 mb-3 text-md'>
              Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life.
              It helps us to forget about our problems, frustrations, and fears at home. During our journey, we
              experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of
              living.
            </p>

            <Button className='mt-20 mb-4 bg-white mx-11 hover:bg-white'>Book Flight</Button>
          </div>
          <div className='flex flex-col gap-4 h-[30rem] w-[50rem] '>
            <div className='flex gap-4 '>
              <img src={flightreview3} className='w-1/2 h-[15rem] object-cover rounded-lg border border-primary' />
              <img src={flightreview4} className='w-1/2 h-[15rem]object-cover rounded-lg border border-primary' />
            </div>
            <div className='flex gap-4'>
              <img src={flightreview5} className='w-1/2 h-[15rem] object-cover rounded-lg border border-primary' />
              <img src={flightreview6} className='w-[48%] h-[15rem] object-cover rounded-lg border border-primary' />
            </div>
          </div>
        </div>
      </div>
    </SectionInViewUp>
  )
}
