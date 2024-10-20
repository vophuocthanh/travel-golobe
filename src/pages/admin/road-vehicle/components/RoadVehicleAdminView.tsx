import { coachApi } from '@/apis/coach.api'
import { coachdetail1, coachdetail2 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeftToLine, CirclePlus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'


export default function RoadVehicleAdminView() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => coachApi.getById(id)
  })
  
  
  const handleBack = () => {
    navigate('/admin/road-vehicle')
  }

  return (
    <div className='w-full p-2'>
      <h1 className='mb-2 text-2xl font-bold'>Road Vehicle View {id}</h1>
      <Button className='flex mb-4 mr-auto text-white' onClick={handleBack}>
        <ArrowLeftToLine/>
      </Button>
      <form className='space-y-4'>
        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='text-xl font-bold '>Road Vehicle Image</h2>
          <div className='grid grid-cols-4 gap-4 mb-4'>
            <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
              <img src={coachdetail1} alt='hotel' className='w-full h-full' />
            </div>
            <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
              <img src={coachdetail2} alt='hotel' className='w-full h-full' />
            </div>
            <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
              <div className='flex items-center justify-center h-full cursor-pointer'>
                <div>
                  <div className='flex justify-center mb-2'>
                    <CirclePlus />
                  </div>
                  <p className='text-blue-600'>
                    Click to upload<span className='text-black'>or drag and drop</span>{' '}
                  </p>
                  <p>SVG, PNG, or PDF 800 x 400 px</p>
                </div>
              </div>
            </div>
            <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
              <div className='flex items-center justify-center h-full cursor-pointer'>
                <div>
                  <div className='flex justify-center mb-2'>
                    <CirclePlus />
                  </div>
                  <p className='text-blue-600'>
                    Click to upload<span className='text-black'>or drag and drop</span>{' '}
                  </p>
                  <p>SVG, PNG, or PDF 800 x 400 px</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='mb-4 text-xl font-bold'>Road Vehicle Information</h2>
          <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
            <Input
              type='text'
              name='id'
              value={id}
              placeholder='Vehicle ID'
              className='col-span-2 p-2 border rounded '
              readOnly
            />
            <Input
              type='text'
              name='brandName'
              value={getbyId?.brand}
              placeholder='Brand Name'
              className='col-span-2 p-2 border rounded'
              readOnly
            />
            <Input
              type='text'
              name='startTime'
              value={getbyId?.start_time}
              placeholder='Start Time'
              className='col-span-1 p-2 border rounded'
              readOnly
            />
            <Input
              type='text'
              name='startDay'
              value={getbyId?.start_day ? format(new Date(getbyId.start_day), 'dd-MM-yyyy') : ''}
              placeholder='Start Day'
              className='col-span-1 p-2 border rounded'
              readOnly
            />
            <Input
              type='text'
              name='endTime'
              value={getbyId?.end_time}
              placeholder='End Time'
              className='col-span-1 p-2 border rounded'
              readOnly
            />
            <Input
              type='text'
              name='endDay'
              value={getbyId?.start_day ? format(new Date(getbyId.start_day), 'dd-MM-yyyy') : ''}
              placeholder='End Day'
              className='col-span-1 p-2 border rounded'
              readOnly
            />
            <Input
              type='text'
              name='tripTime'
              value={getbyId?.trip_time}
              placeholder='Trip Time'
              className='col-span-1 p-2 border rounded'
              readOnly
            />
            <Input
              type='text'
              name='takePlace'
              value={getbyId?.take_place}
              placeholder='Take Place'
              className='col-span-1 p-2 border rounded'
              readOnly
            />
            <Input
              type='text'
              name='destination'
              value={getbyId?.destination}
              placeholder='Destination'
              className='col-span-1 p-2 border rounded'
              readOnly
            />
            <Input
              type='text'
              name='Location'
              value={getbyId?.location}
              placeholder='Location'
              className='col-span-1 p-2 border rounded'
              readOnly
            />
            <Input
              type='text'
              name='number_of_seats_remaining'
              placeholder='Number Of Seats Remaining'
              value={getbyId?.number_of_seats_remaining}
              className='col-span-1 p-2 border rounded'
              readOnly
            />     
            <Input
              type='number'
              name='price'
              value={getbyId?.price}
              placeholder='Price'
              className='col-span-1 p-2 border rounded'
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  )
}
