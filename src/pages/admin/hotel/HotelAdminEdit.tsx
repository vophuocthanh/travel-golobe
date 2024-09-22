import { hoteldetail1 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function HotelAdminEdit() {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const [hotelData, setHotelData] = useState({
    id: '',
    name: '',
    userId: '',
    address: '',
    createAt: new Date().toISOString(),
    updateAt: '',
    evaluate: '',
    price: '',
    description: '',
    images: '',
    image_2: '',
    image_3: '',
    image_4: '',
    image_5: '',
    locationId: '',
    rating: 1
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setHotelData({ ...hotelData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(hotelData)
  }

  const handleBack = () => {
    navigate('/admin/hotels')
  }

  return (
    <div className='w-full p-2'>
      <h1 className='mb-2 text-2xl font-bold'>EDIT HOTEL {hotelId}</h1>
      <Button className='flex mb-4 ml-auto' onClick={handleBack}>
        Back to Hotel Admin
      </Button>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='text-xl font-bold '>Hotel Image</h2>
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
          <h2 className='mb-4 text-xl font-bold'>Hotel Information</h2>
          <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
            <Input
              type='text'
              name='id'
              placeholder='Hotel ID'
              value={hotelData.id}
              onChange={handleChange}
              className='col-span-2 p-2 border rounded '
            />
            <Input
              type='text'
              name='name'
              placeholder='Hotel Name'
              value={hotelData.name}
              onChange={handleChange}
              className='col-span-2 p-2 border rounded'
            />
            <Input
              type='text'
              name='userId'
              placeholder='User ID'
              value={hotelData.userId}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='address'
              placeholder='Address'
              value={hotelData.address}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='price'
              placeholder='Price'
              value={hotelData.price}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='locationId'
              placeholder='Location ID'
              value={hotelData.locationId}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='number'
              name='rating'
              placeholder='Rating'
              value={hotelData.rating}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
              min='1'
              max='5'
              step='0.5'
            />
            <Input
              type='text'
              name='evaluate'
              placeholder='Evaluate'
              value={hotelData.evaluate}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <textarea
              name='description'
              placeholder='Description'
              value={hotelData.description}
              onChange={handleChange}
              className='col-span-2 p-2 border rounded h-[10rem]'
            ></textarea>
          </div>
        </div>

        <div className='flex justify-center'>
          <Button type='button' className='w-[20rem] flex mx-auto'>
            Cancel
          </Button>
          <Button type='submit' className='w-[20rem] flex mx-auto'>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
