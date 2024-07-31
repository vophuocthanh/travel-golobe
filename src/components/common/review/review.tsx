import { google } from '@/assets/icons'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Review() {
  return (
    <SectionInViewRight>
      <div className='mb-64 max-w-7xl'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col space-y-2'>
            <h1 className='text-3xl font-medium'>Reviews</h1>
            <p className='text-[#112211]'>What people says about Golobe facilities</p>
          </div>
          <Button className='text-black bg-white border border-emerald-300 hover:text-white hover:shadow-md hover:transition-all'>
            See all
          </Button>
        </div>
        <div className='flex w-full gap-20 mt-20'>
          <div className='p-6 bg-white space-y-4  shadow-2xl shadow-slate-600 flex flex-col w-[28rem] h-[31rem] rounded-xl'>
            <h1 className='text-3xl'>“A real sense of community, nurtured”</h1>
            <p className='text-gray-400 textContainer'>
              Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for
              helping me always, even when I was out of the country. And always available when needed.
            </p>
            <span className='flex ml-auto text-sm font-medium'>View more</span>

            <div className='flex flex-col'>
              <span>Olga</span>
              <p className='text-gray-400'>Weave Studios – Kai Tak</p>
            </div>
            <Link to='https://www.google.com.vn/?hl=vi' target='_blank'>
              <div className='flex items-center gap-2'>
                <img src={google} alt='google' />
                <span className='text-gray-400'>Google</span>
              </div>
            </Link>
            <img
              src='https://images.unsplash.com/photo-1696220833162-3c12027f7548?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
              className='w-[30rem] h-[10rem] rounded-xl object-cover'
            />
          </div>
          <div className='p-6 bg-white space-y-4  shadow-2xl shadow-slate-600 flex flex-col w-[28rem] h-[31rem] rounded-xl'>
            <h1 className='text-3xl'>“The facilities are superb.”</h1>
            <p className='text-gray-400 textContainer'>
              “A real sense of community, nurtured”Really appreciate the help and support from the staff during these
              tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always
              available when needed.View moreOlgaWeave Studios – Kai TakGoogle{' '}
            </p>
            <span className='flex ml-auto text-sm font-medium'>View more</span>
            <div className='flex flex-col'>
              <span>Thomas</span>
              <p className='text-gray-400'>Weave Studios – Olympic</p>
            </div>
            <Link to='https://www.google.com.vn/?hl=vi' target='_blank'>
              <div className='flex items-center gap-2'>
                <img src={google} alt='google' />
                <span className='text-gray-400'>Google</span>
              </div>
            </Link>
            <img
              src='https://plus.unsplash.com/premium_photo-1666283181610-b95ee7e55465?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
              className='w-[30rem] h-[10rem] rounded-xl object-cover'
            />
          </div>
          <div className='p-6 bg-white space-y-4  shadow-2xl shadow-slate-600 flex flex-col w-[28rem] h-[31rem] rounded-xl'>
            <h1 className='text-3xl'>“A real sense of community, nurtured”</h1>
            <p className='text-gray-400 textContainer'>
              Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for
              helping me always, even when I was out of the country. And always available when needed.
            </p>
            <span className='flex ml-auto text-sm font-medium'>View more</span>

            <div className='flex flex-col'>
              <span>Olga</span>
              <p className='text-gray-400'>Weave Studios – Kai Tak</p>
            </div>
            <Link to='https://www.google.com.vn/?hl=vi' target='_blank'>
              <div className='flex items-center gap-2'>
                <img src={google} alt='google' />
                <span className='text-gray-400'>Google</span>
              </div>
            </Link>
            <img
              src='https://plus.unsplash.com/premium_photo-1666283181625-1f34d1f1e488?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
              className='w-[30rem] h-[10rem] rounded-xl object-cover'
            />
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
