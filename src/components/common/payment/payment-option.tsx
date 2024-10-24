import { RadioGroup, RadioGroupItem } from '@/components/ui/radiobutton'

interface PaymentOptionsProps {
  paymentOption: string
  handleClickValueOption: (value: string) => void
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ paymentOption, handleClickValueOption }) => {
  return (
    <RadioGroup value={paymentOption} onValueChange={(value) => handleClickValueOption(value)}>
      <h1 className='mb-4 text-xl font-semibold'>Chọn phương thức thanh toán</h1>
      <div className='space-y-4'>
        <div
          className={`border p-4 rounded-lg flex justify-between cursor-pointer items-center ${
            paymentOption === 'full' ? 'bg-primary border-primary' : 'border-gray-500'
          }`}
          onClick={() => handleClickValueOption('full')}
        >
          <div>
            <h4 className='font-semibold'>Thanh toán tiền mặt</h4>
            <p className='text-sm text-gray-500'>
              Với phương thức thanh toán tiền mặt, bạn sẽ trả toàn bộ chi phí của tour ngay lập tức tại điểm bán hoặc
              văn phòng.
            </p>
          </div>
          <RadioGroupItem className='flex items-center justify-center' value='full' id='option-one' />
        </div>

        <div
          className={`border p-4 rounded-lg flex justify-between cursor-pointer items-center ${
            paymentOption === 'part' ? 'bg-primary border-primary' : 'border-gray-500'
          }`}
          onClick={() => handleClickValueOption('part')}
        >
          <div className='w-[32rem]'>
            <h4 className='font-semibold'>Thanh toán qua MOMO</h4>
            <p className='text-sm text-gray-500'>
              Với phương thức thanh toán qua ví điện tử MOMO, bạn có thể thanh toán một phần ngay bây giờ và phần còn
              lại sẽ tự động được trừ từ tài khoản của bạn vào một ngày cụ thể, mà không mất thêm phí phát sinh.
            </p>
          </div>
          <RadioGroupItem className='flex items-center justify-center' value='part' id='option-two' />
        </div>
      </div>
    </RadioGroup>
  )
}

export default PaymentOptions
