import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import ReactSlider from "react-slider"

export default function FilterSection() {
  const [value, setValue] = useState<number[]>([50, 1200])
  const [isRatingVisible, setIsRatingVisible] = useState<boolean>(true)
  const [isAirlinesVisible, setIsAirlinesVisible] = useState<boolean>(true)
  const [isTripsVisible, setIsTripsVisible] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [time, setTime] = useState<number[]>([0, 1440])
  const [isTimeVisible, setIsTimeVisible] = useState<boolean>(true)

  const handlePriceChange = (values: number[]) => {
    setValue(values)
  }
  const handleTimeChange = (time: number[]) => {
    setTime(time)
  }
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }
  const toggleTimeVisibility = () => {
    setIsTimeVisible((prev) => !prev)
  }
  const toggleRatingVisibility = () => {
    setIsRatingVisible((prev) => !prev)
  }
  const toggleAirlinesVisibility = () => {
    setIsAirlinesVisible((prev) => !prev)
  }
  const toggleTripsVisibility = () => {
    setIsTripsVisible((prev) => !prev)
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
        <p className='text-3xl text-black'>Filter</p>
        <div className='flex flex-col items-center mt-8'>
          <div className='flex justify-between w-full mb-6'>
            <p>Price</p>
            <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5]' onClick={toggleVisibility}>
              {isVisible ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
          {isVisible && (
            <div className='w-[95%] pb-12 border-b-2 mr-5'>
              <ReactSlider
                className='w-full h-1 bg-black rounded-lg'
                thumbClassName='w-6 h-6 bg-black-800 rounded-full cursor-pointer'
                trackClassName='bg-black-900 h-2 rounded-lg'
                value={value}
                onChange={handlePriceChange}
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
        <div className='flex flex-col items-center mt-8'>
          <div className='flex justify-between w-full mb-6'>
            <p>Departure Time</p>
            <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5]' onClick={toggleTimeVisibility}>
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
                minDistance={10}
              />
              <div className='flex justify-between w-full mt-4 text-xl text-black'>
                <div>{formatTime(time[0])}</div>
                <div>{formatTime(time[1])}</div>
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
          <p>Airlines</p>
          <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5]' onClick={toggleAirlinesVisibility}>
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

        <div className='flex justify-between w-full mt-10 mb-6'>
          <p>Trips</p>
          <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5]' onClick={toggleTripsVisibility}>
            {isTripsVisible ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {isTripsVisible && (
          <div className='flex flex-col gap-3 pb-12 border-b-2'>
            <div className='flex items-center space-x-2'>
              <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Round trip
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                On Way
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Multi-City
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='terms' className='w-5 h-5 border-2 border-black rounded-sm' />
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                My Dates Are Flexible
              </label>
            </div>
          </div>
        )}
      </div>
  )
}
