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
  const [activeTab, setActiveTab] = useState('Flight')
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  const handleApplyFilter = (min: number | undefined, max: number | undefined) => {
    setMinPrice(min)
    setMaxPrice(max)
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

  const tabs = [
    { label: 'Cheapest', description: '$99.2h 18m' },
    { label: 'Best', description: '$99.2h 18m' },
    { label: 'Quickest', description: '$99.2h 18m' },
    { label: 'Other sort', description: '' }
  ]

  return (
    <div className={`flex flex-row  mx-[6rem] mt-10 space-y-2 gap-2 h-[120rem]`}>
      <FilterSection onApplyFilter={handleApplyFilter} />
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

        <div className='flex flex-col gap-8 '>
          <FlightCard
            minPrice={minPrice}
            maxPrice={maxPrice}
            isFavorite={false}
            onToggleFavorite={() => {
              throw new Error('Function not implemented.')
            }}
          />
        </div>
      </div>
    </div>
  )
}
