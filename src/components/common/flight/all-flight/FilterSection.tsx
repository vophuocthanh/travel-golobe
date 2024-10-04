


import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import ReactSlider from 'react-slider'

interface FilterPriceProps {
  onApplyFilter: (minPrice: number | undefined, maxPrice: number | undefined) => void
}

const FilterSection: React.FC<FilterPriceProps> = ({ onApplyFilter }) => {
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
    <div className='flex-none w-[22.5%] ml-12 mr-5 mt-[6rem]'>
      <p className='text-3xl text-black'>Filter</p>
      <div className='flex flex-col items-center mt-8'>
        <div className='flex justify-between w-full mb-6'>
          <p>Price</p>
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
                  className='w-full mt-4 text-white transition duration-200 rounded bg-primary hover:bg-green-300'
                  onClick={() => {
                    setMinPrice(tempMinPrice)
                    setMaxPrice(tempMaxPrice)
                    onApplyFilter(tempMinPrice, tempMaxPrice)
                  }}
                >
                  Lọc
                </Button>
                <Button
                  className='w-full mt-4 text-white transition duration-200 bg-gray-400 rounded hover:bg-gray-500'
                  onClick={() => {
                    setTempMinPrice(undefined)
                    setTempMaxPrice(undefined)
                    onApplyFilter(undefined, undefined)
                  }}
                >
                  Hủy Lọc
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-col items-center mt-8'>
        <div className='flex justify-between w-full mb-6'>
          <p>Departure Time</p>
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
        <p>Airlines</p>
        <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5] text-black' onClick={toggleAirlinesVisibility}>
          {isAirlinesVisible ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      {isAirlinesVisible && (
        <div className='flex flex-col gap-3 pb-12 border-b-2'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Emirated
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Fly Dubai
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Qatar
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Etihad
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
export default FilterSection
