import { Button } from '@/components/ui/button'
import { Checkbox } from '@radix-ui/react-checkbox'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

import ReactSlider from 'react-slider'

export default function FilterSidebar() {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }
  const handleChange = (values: number[]) => {
    setValue(values)
  }
  const toggleRatingVisibility = () => {
    setIsRatingVisible(!isRatingVisible)
  }
  const togglefreebiesVisibility = () => {
    setIsFreebiesVisible(!isFreebiesVisible)
  }
  const toggleamenitiesVisibility = () => {
    setIsAmenitiesVisible(!isAmenitiesVisible)
  }
  const [value, setValue] = useState<number[]>([50, 1200])
  const [isRatingVisible, setIsRatingVisible] = useState<boolean>(true)
  const [isFreebiesVisible, setIsFreebiesVisible] = useState<boolean>(true)
  const [isAmenitiesVisible, setIsAmenitiesVisible] = useState<boolean>(true)
  return (
    <div className='flex-none w-[30%]  '>
      <p className='text-3xl text-black'>Filter</p>
      <div className='flex flex-col items-center mt-8'>
        <div className='flex justify-between w-full mb-6'>
          <p>Price</p>
          <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5]' onClick={toggleVisibility}>
            {isVisible ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {isVisible && (
          <div className='w-full pb-12 border-b-2'>
            <ReactSlider
              className='w-full h-1 bg-black rounded-lg'
              thumbClassName='w-6 h-6 bg-black-800 rounded-full cursor-pointer'
              trackClassName='bg-black-900 h-2 rounded-lg'
              value={value}
              onChange={handleChange}
              min={50}
              max={1200}
              ariaLabel={['Lower thumb', 'Upper thumb']}
              renderThumb={(props) => (
                <div
                  {...props}
                  className='flex items-center justify-center w-6 h-6 rounded-full cursor-pointer bg-primary top-[-10px]'
                ></div>
              )}
              pearling
              minDistance={10}
            />
            <div className='flex justify-between w-full mt-4 text-xl text-black'>
              <div>${value[0]}</div>
              <div>${value[1]}</div>
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-between w-full mt-10 mb-6'>
        <p>Rating</p>
        <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5]' onClick={toggleRatingVisibility}>
          {isRatingVisible ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      {isRatingVisible && (
        <div className='flex flex-row gap-4 pb-12 border-b-2'>
          <div className='flex items-center justify-center w-12 h-8 text-sm text-black border rounded-sm border-primary hover:cursor-pointer hover:bg-primary '>
            0+
          </div>
          <div className='flex items-center justify-center w-12 h-8 text-sm text-black border rounded-sm border-primary hover:cursor-pointer hover:bg-primary '>
            1+
          </div>
          <div className='flex items-center justify-center w-12 h-8 text-sm text-black border rounded-sm border-primary hover:cursor-pointer hover:bg-primary '>
            2+
          </div>
          <div className='flex items-center justify-center w-12 h-8 text-sm text-black border rounded-sm border-primary hover:cursor-pointer hover:bg-primary '>
            3+
          </div>
          <div className='flex items-center justify-center w-12 h-8 text-sm text-black border rounded-sm border-primary hover:cursor-pointer hover:bg-primary '>
            4+
          </div>
        </div>
      )}

      <div className='flex justify-between w-full mt-10 mb-6'>
        <p>Freebies</p>
        <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5]' onClick={togglefreebiesVisibility}>
          {isFreebiesVisible ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      {isFreebiesVisible && (
        <div className='flex flex-col gap-3 pb-12 border-b-2'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Free breakfast
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Free parking
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Free internet
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Free airport shuttle
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Free cancellation
            </label>
          </div>
        </div>
      )}

      <div className='flex justify-between w-full mt-10 mb-6'>
        <p>Amenities</p>
        <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5]' onClick={toggleamenitiesVisibility}>
          {isAmenitiesVisible ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      {isAmenitiesVisible && (
        <div className='flex flex-col gap-3 pb-12 border-b-2'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              24hr front desk
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Air-conditioned
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Fitness
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Pool
            </label>
          </div>
          <div>
            <p className='text-pink-400 hover:cursor-pointer'>+ 24 more</p>
          </div>
        </div>
      )}
    </div>
  )
}
