import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import FilterSection from './FilterSection'
import FlightCard from './FlightCard'

interface TabProps {
  label: string
  description: string
  isActive: boolean
  onClick: () => void
}

export default function ContentAllFlight() {
  const [isOpenSort, setIsOpenSort] = useState<boolean>(false)

  const toggleVisibilitySort = () => {
    setIsOpenSort((prev) => !prev)
  }

  // type ButtonStates = {
  //   button1: boolean
  //   button2: boolean
  //   button3: boolean
  //   button4: boolean
  // }

  // const [buttonStates, setButtonStates] = useState<ButtonStates>({
  //   button1: true,
  //   button2: true,
  //   button3: true,
  //   button4: true
  // })

  const containerHeight = isOpenSort ? 'h-[160rem]' : 'h-[120rem]'

  // const handleClick = (buttonKey: keyof ButtonStates) => {
  //   setButtonStates((prevState) => ({
  //     ...prevState,
  //     [buttonKey]: !prevState[buttonKey]
  //   }))
  // }

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
    { label: 'Other sort', description: '' }
  ]

  return (
    <div className={`flex flex-row  mx-[6rem] mt-10 space-y-2 gap-2${containerHeight}`}>
      <FilterSection />
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
          <div className='flex flex-col gap-8'>
            <FlightCard
              id={''}
              image={''}
              price={''}
              rating={''}
              reviews={''}
              brand={''}
              trip_time={''}
              images={''}
              start_time={''}
              end_time={''}
              trip_to={''}
              take_place={''}
              destination={''}
              isFavorite={false}
              onToggleFavorite={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
