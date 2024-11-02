import { Button } from '@/components/ui/button'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import ReactSlider from 'react-slider'
import { useTranslation } from 'react-i18next';
interface FilterPriceProps {
  onApplyFilter: (minPrice: number | undefined, maxPrice: number | undefined) => void
  brandCoach: string[]
  data?: string[]
  handleSelectBrand: (brand: string) => void
}

const FilterSectionCoach: React.FC<FilterPriceProps> = ({ onApplyFilter, brandCoach, handleSelectBrand, data }) => {
  const { t } = useTranslation();
  const [isAirlinesVisible, setIsAirlinesVisible] = useState<boolean>(true)

  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [time, setTime] = useState<number[]>([0, 1440])
  const [isTimeVisible, setIsTimeVisible] = useState<boolean>(true)

  const [, setMinPrice] = useState<number | undefined>(undefined)
  const [, setMaxPrice] = useState<number | undefined>(undefined)
  const [tempMinPrice, setTempMinPrice] = useState<number | undefined>(undefined)
  const [tempMaxPrice, setTempMaxPrice] = useState<number | undefined>(undefined)

  const handleTimeChange = (time: number[]) => {
    setTime(time)
  }
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }
  const toggleTimeVisibility = () => {
    setIsTimeVisible((prev) => !prev)
  }

  const toggleAirlinesVisibility = () => {
    setIsAirlinesVisible((prev) => !prev)
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    const ampm = hours >= 12 ? 'Pm' : 'Am'
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12
    const formattedMinutes = mins < 10 ? `0${mins}` : mins
    return `${formattedHours}:${formattedMinutes}${ampm}`
  }

  return (
    <div className='flex-none w-[22.5%] ml-12 mr-5'>
      <div className='flex flex-col items-center mt-8'>
        <div className='flex items-center justify-between w-full mb-6'>
          <p>{t('Price')}</p>
          <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5] text-black' onClick={toggleVisibility}>
            {isVisible ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {isVisible && (
          <div className='w-full pb-12 border-b-2'>
            <div className='w-full p-4 bg-white rounded-lg shadow-md '>
              <div className='flex flex-row gap-4 '>
                <div className='items-center w-full '>
                  <input
                    className='w-full h-10 p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary'
                    value={tempMinPrice || ''}
                    onChange={(e) => setTempMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder='Giá tối thiểu'
                  />
                </div>
                <p className='flex items-center justify-center'>-</p>
                <div className='items-center w-full '>
                  <input
                    className='w-full h-10 p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary'
                    value={tempMaxPrice || ''}
                    onChange={(e) => setTempMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder='Giá tối đa'
                  />
                </div>
              </div>
              <div className=''>
                <Button
                  className='w-full mt-4 transition duration-200 rounded bg-primary hover:bg-emerald-400'
                  onClick={() => {
                    setMinPrice(tempMinPrice)
                    setMaxPrice(tempMaxPrice)
                    onApplyFilter(tempMinPrice, tempMaxPrice)
                  }}
                >
                  {t('Filter')}
                </Button>
                <Button
                  className='w-full mt-4 transition duration-200 bg-gray-400 rounded hover:bg-gray-500'
                  onClick={() => {
                    setTempMinPrice(undefined)
                    setTempMaxPrice(undefined)
                    onApplyFilter(undefined, undefined)
                  }}
                >
                  {t('CancelFilter')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-col items-center mt-8'>
        <div className='flex justify-between w-full mb-6'>
          <p>{t('DepartureTime')}</p>
          <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5] text-black' onClick={toggleTimeVisibility}>
            {isTimeVisible ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {isTimeVisible && (
          <div className='w-[95%] pb-12 border-b-2 mr-5'>
            <ReactSlider
              className='w-full h-1 bg-black rounded-lg'
              thumbClassName='w-6 h-6 bg-black-800 rounded-full cursor-pointer'
              trackClassName='bg-black-900 h-2 rounded-lg'
              value={time}
              onChange={handleTimeChange}
              min={0}
              max={1440}
              ariaLabel={['Lower thumb', 'Upper thumb']}
              renderThumb={(props) => (
                <div
                  {...props}
                  className='flex items-center justify-center w-6 h-6 rounded-full cursor-pointer bg-primary top-[-10px]'
                ></div>
              )}
              pearling
              minDistance={1000}
            />
            <div className='flex justify-between w-full mt-4 text-xl text-black'>
              <div>{formatTime(time[0])}</div>
              <div>{formatTime(time[1])}</div>
            </div>
          </div>
        )}
      </div>

      <div className='flex justify-between w-full mt-10 mb-6'>
        <p>{t('Coach')}</p>
        <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5] text-black' onClick={toggleAirlinesVisibility}>
          {isAirlinesVisible ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

        {isAirlinesVisible && (
          <div className='flex flex-col gap-3 pb-12 border-b-2'>
            <div className='mt-4'>
              <div className='flex flex-col'>
                {data?.map((brand: string, index:number) => (
                  <label key={index} className='flex items-center'>
                    <input
                      type='checkbox'
                      value={brand}
                      checked={brandCoach.includes(brand)}
                      onChange={(e) => handleSelectBrand(e.target.value)}
                      className='w-5 h-5 mr-2 accent-primary '
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
export default FilterSectionCoach
