import { hotel_istanbul } from '@/assets/images'
import { Footer, Header } from '@/components/common'
import BookingForm from '@/components/common/hotel/booking-form/booking-form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { ChevronDown, Coffee, Heart, MapPin, Search, Star } from 'lucide-react'
import React, { useState } from 'react'
import ReactSlider from 'react-slider'

interface TabProps {
  label: string
  description: string
  isActive: boolean
  onClick: () => void
}
export default function HomeStay() {
  const [value, setValue] = useState<number[]>([50, 1200])
  const [isRatingVisible, setIsRatingVisible] = useState<boolean>(true)
  const [isFreebiesVisible, setIsFreebiesVisible] = useState<boolean>(true)
  const [isAmenitiesVisible, setIsAmenitiesVisible] = useState<boolean>(true)
  const handleChange = (values: number[]) => {
    setValue(values)
  }
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
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
  const [isVisible, setIsVisible] = useState<boolean>(true)

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

  const [activeTab, setActiveTab] = useState('Hotel')

  const tabs = [
    { label: 'Hotel', description: '257 places' },
    { label: 'Motels', description: '51 places' },
    { label: 'Resorts', description: '72 places' }
  ]

  return (
    <div className='w-full bg-[#F5F5F5]'>
      <Header />
      <div>alo</div>

      <div className='flex flex-row items-center justify-center gap-10 mt-32 bg-[#FFFFFF] p-2 border mx-[6rem] rounded-xl border-b border-gray-400'>
        <BookingForm />
        <Button className=''>
          <Search />
        </Button>
      </div>

      <div className='flex flex-row h-full mx-[6rem] mt-10 '>
        <div className='flex-none w-[30%] h-[120rem]'>
          <p className='text-3xl text-black'>Filter</p>
          <div className='flex flex-col items-center mt-8'>
            <div className='flex justify-between w-full mb-6'>
              <p>Price</p>
              <Button className='bg-[#F5F5F5] hover:bg-[#F5F5F5]' onClick={toggleVisibility}>
                <ChevronDown />
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
              <ChevronDown />
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
              <ChevronDown />
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
              <ChevronDown />
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
        <div className='flex-none w-[70%] h-56  ml-2 mt-14'>
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
            <div className='flex gap-2'>
              <p className='text-gray-900 hover:cursor-pointer'>
                Sort by <span className='text-[#112211] '>Recommended</span>
              </p>
              <ChevronDown className=' hover:cursor-pointer' />
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex w-full h-[20rem] rounded-xl  overflow-hidden '>
              <div className='w-[35%] bg-blue-300 flex-3 relative'>
                <img src={hotel_istanbul} alt='' className='object-cover w-full h-full' />
                <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                  9 images
                </p>
              </div>
              <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
                <div className='flex flex-col w-full h-full '>
                  <div className='w-full h-[75%] border-b-2 border-gray-400 '>
                    <div className='flex flex-row w-full h-full '>
                      <div className='w-[70%] flex flex-col gap-4'>
                        {' '}
                        <p className='text-3xl w-[86%] pt-4'>CVK Park Bosphorus Hotel Istanbul</p>
                        <p className='flex text-gray-500 text-md'>
                          {' '}
                          <MapPin className='w-4 h-4 text-black' />
                          Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                        </p>
                        <div className='flex '>
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='mr-1 text-yellow-300' />

                          <p className='mr-6'>5 Star Hotel</p>
                          <div className='flex gap-1 '>
                            <p className='font-bold '>20+</p>
                            <Coffee className='font-bold text-black' />
                            <p>Aminities</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Button className='bg-white border border-primary'>4.2</Button>
                          <p className='font-bold'>Very good</p>
                          <p>371 reviews</p>
                        </div>
                      </div>
                      <div className='w-[30%] pt-4'>
                        <p className='text-sm'>starting from</p>
                        <p className='text-3xl text-[#FF8682] font-bold'>$240 / night </p>
                        <p className='mr-3 text-right text-gray-400'>excl. tax</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-full h-[25%] flex '>
                    <div className='flex flex-row items-center justify-center w-full gap-4 '>
                      {' '}
                      <Button className='bg-white border border-primary'>
                        <Heart />
                      </Button>
                      <Button className='w-full mx-4'>View Place</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full h-[20rem] rounded-xl  overflow-hidden'>
              <div className='w-[35%] bg-blue-300 flex-3 relative'>
                <img src={hotel_istanbul} alt='' className='object-cover w-full h-full' />
                <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                  9 images
                </p>
              </div>
              <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
                <div className='flex flex-col w-full h-full '>
                  <div className='w-full h-[75%] border-b-2 border-gray-400 '>
                    <div className='flex flex-row w-full h-full '>
                      <div className='w-[70%] flex flex-col gap-4'>
                        {' '}
                        <p className='text-3xl w-[86%] pt-4'>CVK Park Bosphorus Hotel Istanbul</p>
                        <p className='flex text-gray-500 text-md'>
                          {' '}
                          <MapPin className='w-4 h-4 text-black' />
                          Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                        </p>
                        <div className='flex '>
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='mr-1 text-yellow-300' />

                          <p className='mr-6'>5 Star Hotel</p>
                          <div className='flex gap-1 '>
                            <p className='font-bold '>20+</p>
                            <Coffee className='font-bold text-black' />
                            <p>Aminities</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Button className='bg-white border border-primary'>4.2</Button>
                          <p className='font-bold'>Very good</p>
                          <p>371 reviews</p>
                        </div>
                      </div>
                      <div className='w-[30%] pt-4'>
                        <p className='text-sm'>starting from</p>
                        <p className='text-3xl text-[#FF8682] font-bold'>$240 / night </p>
                        <p className='mr-3 text-right text-gray-400'>excl. tax</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-full h-[25%] flex '>
                    <div className='flex flex-row items-center justify-center w-full gap-4 '>
                      {' '}
                      <Button className='bg-white border border-primary'>
                        <Heart />
                      </Button>
                      <Button className='w-full mx-4'>View Place</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full h-[20rem] rounded-xl  overflow-hidden'>
              <div className='w-[35%] bg-blue-300 flex-3 relative'>
                <img src={hotel_istanbul} alt='' className='object-cover w-full h-full' />
                <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                  9 images
                </p>
              </div>
              <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
                <div className='flex flex-col w-full h-full '>
                  <div className='w-full h-[75%] border-b-2 border-gray-400 '>
                    <div className='flex flex-row w-full h-full '>
                      <div className='w-[70%] flex flex-col gap-4'>
                        {' '}
                        <p className='text-3xl w-[86%] pt-4'>CVK Park Bosphorus Hotel Istanbul</p>
                        <p className='flex text-gray-500 text-md'>
                          {' '}
                          <MapPin className='w-4 h-4 text-black' />
                          Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                        </p>
                        <div className='flex '>
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='mr-1 text-yellow-300' />

                          <p className='mr-6'>5 Star Hotel</p>
                          <div className='flex gap-1 '>
                            <p className='font-bold '>20+</p>
                            <Coffee className='font-bold text-black' />
                            <p>Aminities</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Button className='bg-white border border-primary'>4.2</Button>
                          <p className='font-bold'>Very good</p>
                          <p>371 reviews</p>
                        </div>
                      </div>
                      <div className='w-[30%] pt-4'>
                        <p className='text-sm'>starting from</p>
                        <p className='text-3xl text-[#FF8682] font-bold'>$240 / night </p>
                        <p className='mr-3 text-right text-gray-400'>excl. tax</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-full h-[25%] flex '>
                    <div className='flex flex-row items-center justify-center w-full gap-4 '>
                      {' '}
                      <Button className='bg-white border border-primary'>
                        <Heart />
                      </Button>
                      <Button className='w-full mx-4'>View Place</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full h-[20rem] rounded-xl  overflow-hidden'>
              <div className='w-[35%] bg-blue-300 flex-3 relative'>
                <img src={hotel_istanbul} alt='' className='object-cover w-full h-full' />
                <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                  9 images
                </p>
              </div>
              <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
                <div className='flex flex-col w-full h-full '>
                  <div className='w-full h-[75%] border-b-2 border-gray-400 '>
                    <div className='flex flex-row w-full h-full '>
                      <div className='w-[70%] flex flex-col gap-4'>
                        {' '}
                        <p className='text-3xl w-[86%] pt-4'>CVK Park Bosphorus Hotel Istanbul</p>
                        <p className='flex text-gray-500 text-md'>
                          {' '}
                          <MapPin className='w-4 h-4 text-black' />
                          Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                        </p>
                        <div className='flex '>
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='text-yellow-300' />
                          <Star className='mr-1 text-yellow-300' />

                          <p className='mr-6'>5 Star Hotel</p>
                          <div className='flex gap-1 '>
                            <p className='font-bold '>20+</p>
                            <Coffee className='font-bold text-black' />
                            <p>Aminities</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Button className='bg-white border border-primary'>4.2</Button>
                          <p className='font-bold'>Very good</p>
                          <p>371 reviews</p>
                        </div>
                      </div>
                      <div className='w-[30%] pt-4'>
                        <p className='text-sm'>starting from</p>
                        <p className='text-3xl text-[#FF8682] font-bold'>$240 / night </p>
                        <p className='mr-3 text-right text-gray-400'>excl. tax</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-full h-[25%] flex '>
                    <div className='flex flex-row items-center justify-center w-full gap-4 '>
                      {' '}
                      <Button className='bg-white border border-primary'>
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
      <Footer />
    </div>
  )
}
