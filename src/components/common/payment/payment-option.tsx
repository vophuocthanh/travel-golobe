import { RadioGroup, RadioGroupItem } from '@/components/ui/radiobutton'
import { useTranslation } from 'react-i18next'
interface PaymentOptionsProps {
  paymentOption: string
  handleClickValueOption: (value: string) => void
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ paymentOption, handleClickValueOption }) => {
  const { t } = useTranslation()
  return (
    <RadioGroup value={paymentOption} onValueChange={(value) => handleClickValueOption(value)}>
      <h1 className='mb-4 text-xl font-semibold'>{t('Selectpayment')}</h1>
      <div className='space-y-2'>
        <div
          className={`border p-4 rounded-lg flex justify-between cursor-pointer items-center ${paymentOption === 'part' ? 'bg-primary border-primary' : 'border-gray-500'}`}
          onClick={() => handleClickValueOption('part')}
        >
          <div className='w-[80%]'>
            <h4 className='font-semibold'>{t('CashPayment')}</h4>
            <p className='text-sm text-gray-500'>{t('Withpayment')}</p>
          </div>
          <RadioGroupItem className="flex items-center justify-center" value="part" id="option-two" />
        </div>

        <div
          className={`border p-4 rounded-lg flex justify-between cursor-pointer items-center ${paymentOption === 'full' ? 'bg-primary border-primary' : 'border-gray-500'}`}
          onClick={() => handleClickValueOption('full')}
        >
          <div className='w-full sm:w-[32rem]'>
            <h4 className='font-semibold'>{t('paymentMOMO')}</h4>
            <p className='text-sm text-gray-500'>{t('WithMOMO')}</p>
          </div>
          <RadioGroupItem className="flex items-center justify-center" value="full" id="option-one" />
        </div>
      </div>
    </RadioGroup>

  )
}

export default PaymentOptions
