import { tourApi } from '@/apis/tour.api'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { Tour } from '@/shared/ts/interface/comment-tour.interface'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'



export default function IntoTour() {
  const { data: getAll } = useQuery({
    queryKey: ['getAllTour'],
    queryFn: () => tourApi.getAll(1,5)
  })
  console.log(getAll?.data, 'datatour')
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
            <Link to='/tour/all-tour'>
              <Button className='bg-white border border-primary hover:bg-slate-100'>See All</Button>
            </Link>
          </div>
          <div className='flex justify-between '>
            {getAll?.data.map((item: Tour) => (
              <div className='tour relative w-[300px]  ' key={item.id}>
                <img src={item.image} className='h-[420px]  rounded-xl' alt='' />
                <div className='absolute w-full px-4 top-72'>
                  <div className='flex items-center justify-between p-2 mb-3 bg-white rounded-lg opacity-60'>
                    <div className=''>
                      <h3 className='overflow-hidden text-xl font-medium whitespace-pre-line text-ellipsis line-clamp-1'>
                        {item.description}
                      </h3>
                      <p className='overflow-hidden font-medium whitespace-pre-line text-ellipsis line-clamp-1'>
                        {item.name}
                      </p>
                    </div>
                    <h3 className='text-xl font-medium '>${item.price}</h3>
                  </div>
                  <Button className='w-full text-white '>Book a Hotel</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionInViewUp>
  )
}
