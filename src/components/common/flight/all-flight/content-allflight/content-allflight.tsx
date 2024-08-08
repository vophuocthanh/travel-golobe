import { flight_Dubai, flight_Emirates, flight_Etihad, flight_Qatar } from '@/assets/images';
import { Button } from '@/components/ui/button'
import { Checkbox } from '@radix-ui/react-checkbox';
import { ChevronDown, ChevronUp, Heart} from 'lucide-react'
import React, { useState } from 'react'
import ReactSlider from 'react-slider';

interface TabProps {
  label: string
  description: string
  isActive: boolean
  onClick: () => void
}

export default function Content_allFlight() {
  const [value, setValue] = useState<number[]>([50, 1200]);
  const [isRatingVisible, setIsRatingVisible] = useState<boolean>(true);
  const [isAirlinesVisible, setIsAirlinesVisible] = useState<boolean>(true);
  const [isTripsVisible, setIsTripsVisible] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isOpenSort, setIsOpenSort] = useState<boolean>(false);
  const [time, setTime] = useState<number[]>([0, 1440]);
  const [isTimeVisible, setIsTimeVisible] = useState<boolean>(true);

  const handlePriceChange = (values: number[]) => {
    setValue(values);
  };
  const handleTimeChange = (time: number[]) => {
    setTime(time);
  };
  const toggleVisibilitySort = () => {
    setIsOpenSort(prev => !prev);
  };
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };
  const toggleTimeVisibility = () => {
    setIsTimeVisible(prev => !prev);
  };
  const toggleRatingVisibility = () => {
    setIsRatingVisible(prev => !prev);
  };
  const toggleAirlinesVisibility = () => {
    setIsAirlinesVisible(prev => !prev);
  };
  const toggleTripsVisibility = () => {
    setIsTripsVisible(prev => !prev);
  };

  type ButtonStates = {
    button1: boolean
    button2: boolean
    button3: boolean
    button4: boolean
  }

  const [buttonStates, setButtonStates] = useState<ButtonStates>({
    button1: true,
    button2: true,
    button3: true,
    button4: true
  })

  const containerHeight = isOpenSort ? 'h-[160rem]' : 'h-[120rem]'
  const handleClick = (buttonKey: keyof ButtonStates) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [buttonKey]: !prevState[buttonKey]
    }))
  }

  const Tab: React.FC<TabProps> = ({ label, description, isActive, onClick }) => (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center flex-1 px-4 ${
        isActive ? 'border-b-4 border-primary ' : 'border-r-2 border-transparent'
      } transition-colors duration-300`}
    >
      <p className='text-2xl text-left'>{label}</p>
      <p className='text-left text-gray-400'>{description}</p>
    </div>
  )

  const [activeTab, setActiveTab] = useState('Flight')

  const tabs = [
    { label: 'Cheapest', description: '$99.2h 18m' },
    { label: 'Best', description: '$99.2h 18m' },
    { label: 'Quickest', description: '$99.2h 18m' },
    { label: 'Other sort', description: ''}
  ]
  
  const formatTime = (minutes:number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const ampm = hours >= 12 ? 'Pm' : 'Am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = mins < 10 ? `0${mins}` : mins;
    return `${formattedHours}:${formattedMinutes}${ampm}`;
  };

  return (
    <div className={`flex flex-row  mx-[6rem] mt-10 space-y-2 gap-2${containerHeight}`}>
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
    <div className='flex-none w-[70%] ml-2 mt-14 mr-12 '>
      <div className='bg-[#FFFFFF] flex flex-row justify-between w-full h-[6rem] rounded-md  hover:cursor-pointer'>
        <div className='bg-white flex flex-row w-full h-[6rem] rounded-md border-b border-gray-300 mx-4 '>
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.label}>
              <Tab
                label={tab.label}
                description={tab.description}
                isActive={tab.label === activeTab}
                onClick={() => setActiveTab(tab.label)}
              />
              {index < tabs.length - 1 && <div className='h-full mx-4 border-r-2 border-gray-300'></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between w-full h-20 mt-2'>
        <div>
          {' '}
          <p className=' hover:cursor-pointer'>
            Showing 4 of <span className='text-[#FF8682]'>257 places</span>
          </p>
        </div>
        <div className='flex gap-2' onClick={toggleVisibilitySort}>
          <p className='text-gray-900 hover:cursor-pointer'>
            Sort by <span className='text-[#112211] '>Recommended</span>
          </p>
          {isOpenSort ? (
            <ChevronUp className='transition-transform duration-300' />
          ) : (
            <ChevronDown className='transition-transform duration-300' />
          )}
        </div>
      </div>
    <div className='flex flex-col gap-8 '>
            {isOpenSort && (
              <div className='flex flex-col gap-8'>
                <div className={`flex w-full h-[23rem] rounded-xl overflow-hidden ${isOpenSort ? '' : 'hidden'}`}>
                  <div className='w-[35%] bg-white relative'>
                    <img src={flight_Emirates} alt='' className='object-cover w-[80%] h-30 ml-8 mt-4' />
                    <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                      9 images
                    </p>
                  </div>
                  <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
                <div className='flex flex-col w-full h-full '>
                  <div className='w-full h-[75%] border-b-2 border-gray-400 '>
                    <div className='flex flex-row w-full h-full '>
                      <div className='w-[70%] flex flex-col gap-4'>
                        <div className='flex items-center gap-2 mt-8'>
                          <Button className='bg-white border border-primary'>4.2</Button>
                          <p className='font-bold'>Very good</p>
                          <p>54 reviews</p>
                        </div>
                        <div className='mb-4'>
                          <div className="flex items-center mb-2">
                            <input type="checkbox" className="w-5 h-5 mr-2 border-2 border-black rounded-sm" />
                            <div className="flex-grow">
                              <div className="flex justify-between text-black">
                              <div className="text-2xl ">
                                12:00 pm - 01:28 pm
                              </div>
                              <div className="">
                                non stop
                              </div>
                              <div className="text-2xl">
                                2h 28m
                              </div>
                              </div>
                              
                            </div>
                          </div>
                            <div className='flex gap-[14rem] w-full'>
                              <p className="text-left text-gray-500 mr-[4rem] ml-9">Emirates</p>
                              <p className="text-right text-gray-500">EWR-BNA</p>
                            </div>
                        </div>
                        <div className='mb-4'>
                          <div className="flex items-center mb-2">
                            <input type="checkbox" className="w-5 h-5 mr-2 border-2 border-black rounded-sm" />
                            <div className="flex-grow">
                              <div className="flex justify-between text-black">
                              <div className="text-2xl ">
                                12:00 pm - 01:28 pm
                              </div>
                              <div className="">
                                non stop
                              </div>
                              <div className="text-2xl">
                                2h 28m
                              </div>
                              </div>
                              
                            </div>
                          </div>
                            <div className='flex gap-[14rem] w-full'>
                              <p className="text-left text-gray-500 mr-[4rem] ml-9">Emirates</p>
                              <p className="text-right text-gray-500">EWR-BNA</p>
                            </div>
                        </div>
                      </div>
                      <div className='w-[30%] pt-4 text-right mr-5'>
                        <p className='text-sm'>starting from</p>
                        <p className='text-3xl text-[#FF8682] font-bold'>$104</p>
                      </div>
                    </div>
                  </div>
                      <div className='w-full h-[25%] flex'>
                        <div className='flex items-center justify-center w-full gap-4'>
                          <Button
                            className={
                              buttonStates.button1 ? 'bg-white border border-primary' : 'bg-primary text-white'
                            }
                            onClick={() => handleClick('button1')}
                          >
                            <Heart />
                          </Button>
                          <Button className='w-full mx-4'>View Place</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`flex w-full h-[23rem] rounded-xl overflow-hidden ${isOpenSort ? '' : 'hidden'}`}>
                  <div className='w-[35%] bg-white relative'>
                    <img src={flight_Dubai} alt='' className='object-cover object-cover w-[80%] h-30 ml-8 mt-4' />
                    <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                      9 images
                    </p>
                  </div>
                  <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
                <div className='flex flex-col w-full h-full '>
                  <div className='w-full h-[75%] border-b-2 border-gray-400 '>
                    <div className='flex flex-row w-full h-full '>
                      <div className='w-[70%] flex flex-col gap-4'>
                        <div className='flex items-center gap-2 mt-8'>
                          <Button className='bg-white border border-primary'>4.2</Button>
                          <p className='font-bold'>Very good</p>
                          <p>54 reviews</p>
                        </div>
                        <div className='mb-4'>
                          <div className="flex items-center mb-2">
                            <input type="checkbox" className="w-5 h-5 mr-2 border-2 border-black rounded-sm" />
                            <div className="flex-grow">
                              <div className="flex justify-between text-black">
                              <div className="text-2xl ">
                                12:00 pm - 01:28 pm
                              </div>
                              <div className="">
                                non stop
                              </div>
                              <div className="text-2xl">
                                2h 28m
                              </div>
                              </div>
                              
                            </div>
                          </div>
                            <div className='flex gap-[14rem] w-full'>
                              <p className="text-left text-gray-500 mr-[4rem] ml-9">Emirates</p>
                              <p className="text-right text-gray-500">EWR-BNA</p>
                            </div>
                        </div>
                        <div className='mb-4'>
                          <div className="flex items-center mb-2">
                            <input type="checkbox" className="w-5 h-5 mr-2 border-2 border-black rounded-sm" />
                            <div className="flex-grow">
                              <div className="flex justify-between text-black">
                              <div className="text-2xl ">
                                12:00 pm - 01:28 pm
                              </div>
                              <div className="">
                                non stop
                              </div>
                              <div className="text-2xl">
                                2h 28m
                              </div>
                              </div>
                              
                            </div>
                          </div>
                            <div className='flex gap-[14rem] w-full'>
                              <p className="text-left text-gray-500 mr-[4rem] ml-9">Emirates</p>
                              <p className="text-right text-gray-500">EWR-BNA</p>
                            </div>
                        </div>
                      </div>
                      <div className='w-[30%] pt-4 text-right mr-5'>
                        <p className='text-sm'>starting from</p>
                        <p className='text-3xl text-[#FF8682] font-bold'>$104</p>
                      </div>
                    </div>
                  </div>
                      <div className='w-full h-[25%] flex'>
                        <div className='flex items-center justify-center w-full gap-4'>
                          <Button
                            className={
                              buttonStates.button2 ? 'bg-white border border-primary' : 'bg-primary text-white'
                            }
                            onClick={() => handleClick('button2')}
                          >
                            <Heart />
                          </Button>
                          <Button className='w-full mx-4'>View Place</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className='flex w-full h-[23rem] rounded-xl  overflow-hidden '>
              <div className='w-[35%] bg-white flex-3 relative'>
                <img src={flight_Qatar} alt='' className='object-cover w-[80%] h-30 ml-10 mt-4' />
                <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                  9 images
                </p>
              </div>
              <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
                <div className='flex flex-col w-full h-full '>
                  <div className='w-full h-[75%] border-b-2 border-gray-400 '>
                    <div className='flex flex-row w-full h-full '>
                      <div className='w-[70%] flex flex-col gap-4'>
                        <div className='flex items-center gap-2 mt-8'>
                          <Button className='bg-white border border-primary'>4.2</Button>
                          <p className='font-bold'>Very good</p>
                          <p>54 reviews</p>
                        </div>
                        <div className='mb-4'>
                          <div className="flex items-center mb-2">
                            <input type="checkbox" className="w-5 h-5 mr-2 border-2 border-black rounded-sm" />
                            <div className="flex-grow">
                              <div className="flex justify-between text-black">
                              <div className="text-2xl ">
                                12:00 pm - 01:28 pm
                              </div>
                              <div className="">
                                non stop
                              </div>
                              <div className="text-2xl">
                                2h 28m
                              </div>
                              </div>
                              
                            </div>
                          </div>
                            <div className='flex gap-[14rem] w-full'>
                              <p className="text-left text-gray-500 mr-[4rem] ml-9">Emirates</p>
                              <p className="text-right text-gray-500">EWR-BNA</p>
                            </div>
                        </div>
                        <div className='mb-4'>
                          <div className="flex items-center mb-2">
                            <input type="checkbox" className="w-5 h-5 mr-2 border-2 border-black rounded-sm" />
                            <div className="flex-grow">
                              <div className="flex justify-between text-black">
                              <div className="text-2xl ">
                                12:00 pm - 01:28 pm
                              </div>
                              <div className="">
                                non stop
                              </div>
                              <div className="text-2xl">
                                2h 28m
                              </div>
                              </div>
                              
                            </div>
                          </div>
                            <div className='flex gap-[14rem] w-full'>
                              <p className="text-left text-gray-500 mr-[4rem] ml-9">Emirates</p>
                              <p className="text-right text-gray-500">EWR-BNA</p>
                            </div>
                        </div>
                      </div>
                      <div className='w-[30%] pt-4 text-right mr-5'>
                        <p className='text-sm'>starting from</p>
                        <p className='text-3xl text-[#FF8682] font-bold'>$104</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-full h-[25%] flex'>
                    <div className='flex flex-row items-center justify-center w-full gap-4 '>
                      {' '}
                      <Button
                        className={buttonStates.button1 ? 'bg-white border border-primary' : 'bg-primary text-white'}
                        onClick={() => handleClick('button1')}
                      >
                        <Heart />
                      </Button>
                      <Button className='w-full mx-4'>View Place</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full h-[23rem] rounded-xl  overflow-hidden'>
              <div className='w-[35%] bg-white flex-3 relative'>
                <img src={flight_Etihad} alt='' className='object-cover w-[80%] h-30 ml-8 mt-8' />
                <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                  9 images
                </p>
              </div>
              <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
                <div className='flex flex-col w-full h-full '>
                  <div className='w-full h-[75%] border-b-2 border-gray-400 '>
                    <div className='flex flex-row w-full h-full '>
                      <div className='w-[70%] flex flex-col gap-4'>
                        <div className='flex items-center gap-2 mt-8'>
                          <Button className='bg-white border border-primary'>4.2</Button>
                          <p className='font-bold'>Very good</p>
                          <p>54 reviews</p>
                        </div>
                        <div className='mb-4'>
                          <div className="flex items-center mb-2">
                            <input type="checkbox" className="w-5 h-5 mr-2 border-2 border-black rounded-sm" />
                            <div className="flex-grow">
                              <div className="flex justify-between text-black">
                              <div className="text-2xl ">
                                12:00 pm - 01:28 pm
                              </div>
                              <div className="">
                                non stop
                              </div>
                              <div className="text-2xl">
                                2h 28m
                              </div>
                              </div>
                              
                            </div>
                          </div>
                            <div className='flex gap-[14rem] w-full'>
                              <p className="text-left text-gray-500 mr-[4rem] ml-9">Emirates</p>
                              <p className="text-right text-gray-500">EWR-BNA</p>
                            </div>
                        </div>
                        <div className='mb-4'>
                          <div className="flex items-center mb-2">
                            <input type="checkbox" className="w-5 h-5 mr-2 border-2 border-black rounded-sm" />
                            <div className="flex-grow">
                              <div className="flex justify-between text-black">
                              <div className="text-2xl ">
                                12:00 pm - 01:28 pm
                              </div>
                              <div className="">
                                non stop
                              </div>
                              <div className="text-2xl">
                                2h 28m
                              </div>
                              </div>
                              
                            </div>
                          </div>
                            <div className='flex gap-[14rem] w-full'>
                              <p className="text-left text-gray-500 mr-[4rem] ml-9">Emirates</p>
                              <p className="text-right text-gray-500">EWR-BNA</p>
                            </div>
                        </div>
                      </div>
                      <div className='w-[30%] pt-4 text-right mr-5'>
                        <p className='text-sm'>starting from</p>
                        <p className='text-3xl text-[#FF8682] font-bold'>$104</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-full h-[25%] flex '>
                    <div className='flex flex-row items-center justify-center w-full gap-4 '>
                      {' '}
                      <Button
                        className={buttonStates.button4 ? 'bg-white border border-primary' : 'bg-primary text-white'}
                        onClick={() => handleClick('button4')}
                      >
                        <Heart />
                      </Button>
                      <Button className='w-full mx-4'>View Place</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button className='w-full bg-[#112211] text-white hover:text-black'>Show more results</Button>
            </div>
          </div>
        </div>
      </div>
  
  )
}
