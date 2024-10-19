import { hotelApi } from '@/apis/hotel.api'
import { hoteldetail1 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeftToLine, CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function HotelAdminEdit() {
  const { id } = useParams()
  console.log(id, "id");
  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => hotelApi.getById(id)
  })

  const navigate = useNavigate()
  const [hotelData, setHotelData] = useState({
    hotel_names: '',
    location: '',
    star_number: 0,
    price: 0,
    score_hotels: 0,
    number_rating: 0,
    received_time: '',
    giveback_time: '',
    description: '',
    hotel_link: '',
    place: '',
    image: '',
    image_2: '',
    image_3: '',
    image_4: '',
    image_5: '',
    number_of_seats_remaining: 0
  });

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
    <div className='w-full p-4'>
      <h1 className='mb-2 text-2xl font-bold'>EDIT HOTEL {id}</h1>
      <Button className='flex mb-4 mr-auto text-white' onClick={handleBack}>
        <ArrowLeftToLine />
      </Button>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Hotel Image Section */}
        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='text-xl font-bold'>Hotel Images</h2>
          <div className='grid grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className='w-full col-span-1 p-2 bg-white rounded-lg shadow-md h-[20rem] flex flex-col items-center justify-center'>
                {index < 2 ? (
                  <img src={hoteldetail1} alt={`hotel-${index}`} className='w-full h-full object-cover' />
                ) : (
                  <div className='flex items-center justify-center h-full cursor-pointer'>
                    <CirclePlus className='mb-2' />
                    <p className='text-blue-600'>Click to upload or drag and drop</p>
                    <p className='text-sm'>SVG, PNG, or PDF 800 x 400 px</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Information Section */}
        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='mb-4 text-xl font-bold'>Hotel Information</h2>
          <div className='grid grid-cols-2 gap-6'>
            <Input
              type='text'
              name='id'
              placeholder='ID'
              value={id}
              onChange={handleChange}
              className='col-span-2 p-2 border rounded'
              disabled
            />
            <Input
              type='text'
              name='hotel_names'
              placeholder='Hotel Name'
              value={getbyId?.hotel_names}
              onChange={handleChange}
              className='col-span-2 p-2 border rounded'
            />
            <Input
              type='text'
              name='location'
              placeholder='Location'
              value={getbyId?.location}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='place'
              placeholder='Place'
              value={getbyId?.place}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='number'
              name='price'
              placeholder='Price'
              value={getbyId?.price}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='number'
              name='score_hotels'
              placeholder='Score Hotels'
              value={getbyId?.score_hotels}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='received_time'
              placeholder='Received Time'
              value={getbyId?.received_time}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='text'
              name='giveback_time'
              placeholder='Giveback Time'
              value={getbyId?.giveback_time}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='number'
              name='number_rating'
              placeholder='Number of Ratings'
              value={getbyId?.number_rating}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
              min='0'
            />
            <Input
              type='number'
              name='star_number'
              placeholder='Star Number'
              value={getbyId?.star_number}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
              min='1'
              max='5'
            />
            <Input
              type='text'
              name='hotel_link'
              placeholder='Hotel Link'
              value={getbyId?.hotel_link}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <Input
              type='number'
              name='number_of_seats_remaining'
              placeholder='Seats Remaining'
              value={getbyId?.number_of_seats_remaining}
              onChange={handleChange}
              className='col-span-1 p-2 border rounded'
            />
            <textarea
              name='description'
              placeholder='Description'
              value={getbyId?.description}
              onChange={handleChange}
              className='col-span-2 p-2 border rounded h-[10rem]'
            ></textarea>
          </div>
        </div>

        <div className='flex justify-between mt-6'>
          <Button type='button' className='w-[20rem] flex' onClick={handleBack}>
            Cancel
          </Button>
          <Button type='submit' className='w-[20rem] flex'>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
