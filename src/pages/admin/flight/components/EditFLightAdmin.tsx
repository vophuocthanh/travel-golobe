import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const EditAdminFlight = () => {
  const { id } = useParams()
  //   const [flightData] = useState(data[0])

  return (
    <div className='container p-4 mx-auto'>
      <h1 className='mb-4 text-2xl font-bold'>Edit FLight {id}</h1>
      <form className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Airline</label>
          <input type='text' name='airline' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Customer</label>
          <input type='text' name='customer' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Date </label>
          <input type='date' name='date' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Amount</label>
          <input type='number' name='amount' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>PaymentMode</label>
          <select name='paymentMode' className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
            <option value='Transfer Bank'>Transfer Bank</option>
            <option value='Credit Card'>Credit Card</option>
            <option value='PayPal'>PayPal</option>
            <option value='Cash'>Cash</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium'>status</label>
          <select name='status' className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
            <option value='Delivered'>Delivered</option>
            <option value='Process'>Process</option>
            <option value='Canceled'>Canceled</option>
          </select>
        </div>

        <Button type='submit' className='w-full'>
          Save changes
        </Button>
      </form>
    </div>
  )
}

export default EditAdminFlight
