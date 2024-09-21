import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const EditAdminFlight = () => {
  const { id } = useParams()
  //   const [flightData] = useState(data[0])

  return (
    <div className='container p-4 mx-auto'>
      <h1 className='mb-4 text-2xl font-bold'>Chỉnh sửa chuyến bay #{id}</h1>
      <form className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Hãng hàng không</label>
          <input type='text' name='airline' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Khách hàng</label>
          <input type='text' name='customer' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Ngày</label>
          <input type='date' name='date' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Số tiền</label>
          <input type='number' name='amount' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' />
        </div>

        <div>
          <label className='block text-sm font-medium'>Phương thức thanh toán</label>
          <select name='paymentMode' className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
            <option value='Transfer Bank'>Transfer Bank</option>
            <option value='Credit Card'>Credit Card</option>
            <option value='PayPal'>PayPal</option>
            <option value='Cash'>Cash</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium'>Trạng thái</label>
          <select name='status' className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
            <option value='Delivered'>Delivered</option>
            <option value='Process'>Process</option>
            <option value='Canceled'>Canceled</option>
          </select>
        </div>

        <Button type='submit' className='w-full'>
          Lưu thay đổi
        </Button>
      </form>
    </div>
  )
}

export default EditAdminFlight
