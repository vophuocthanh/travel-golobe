import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const EditTourAdmin = () => {
  const { id } = useParams()

  return (
    <div className='container p-4 mx-auto'>
      <h1 className='mb-4 text-2xl font-bold'>Edit Tour {id}</h1>
      <form className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Tour Name</label>
          <input type='text' name='name' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Description</label>
          <textarea name='description' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' rows={4} />
        </div>

        <div>
          <label className='block text-sm font-medium'>Price</label>
          <input type='number' name='price' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Location</label>
          <input type='text' name='location' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Main Image URL</label>
          <input type='text' name='image' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Secondary Image URLs</label>
          <input
            type='text'
            name='image_2'
            placeholder='Image URL 2'
            className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
          />
          <input
            type='text'
            name='image_3'
            placeholder='Image URL 3'
            className='block w-full p-2 mt-1 mt-2 border border-gray-300 rounded-md'
          />
          <input
            type='text'
            name='image_4'
            placeholder='Image URL 4'
            className='block w-full p-2 mt-1 mt-2 border border-gray-300 rounded-md'
          />
          <input
            type='text'
            name='image_5'
            placeholder='Image URL 5'
            className='block w-full p-2 mt-1 mt-2 border border-gray-300 rounded-md'
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>Transport</label>
          <input type='text' name='transport' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Hotel</label>
          <input type='text' name='hotel' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Rating</label>
          <input
            type='number'
            step='0.1'
            name='rating'
            className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
          />
        </div>

        <Button type='submit' className='w-full'>
          Save changes
        </Button>
      </form>
    </div>
  )
}

export default EditTourAdmin
