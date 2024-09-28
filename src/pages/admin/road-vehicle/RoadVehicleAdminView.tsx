import { hoteldetail1 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeftToLine, CirclePlus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

export default function RoadVehicleAdminView() {
  const { id } = useParams()
  const navigate = useNavigate()

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
              <img src={hoteldetail1} alt='hotel' className='w-full h-full' />
            </div>
            <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
              <img src={hoteldetail1} alt='hotel' className='w-full h-full' />
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
              placeholder='Vehicle ID'
              className='col-span-2 p-2 border rounded '
            />
            <Input
              type='text'
              name='brandName'
              placeholder='Brand Name'
              className='col-span-2 p-2 border rounded'
            />
            <Input
              type='text'
              name='startTime'
              placeholder='Start Time'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='date'
              name='startDay'
              placeholder='Start Day'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='endTime'
              placeholder='End Time'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='date'
              name='endDay'
              placeholder='End Day'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='tripTime'
              placeholder='Trip Time'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='takePlace'
              placeholder='Take Place'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='destination'
              placeholder='Destination'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='tripTo'
              placeholder='Trip To'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='number'
              name='price'
              placeholder='Price'
              className='col-span-1 p-2 border rounded'
            />
          </div>
        </div>
      </form>
    </div>
  )
}
