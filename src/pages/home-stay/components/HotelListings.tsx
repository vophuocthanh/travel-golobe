import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

import SortBy from './SortBy'
import HotelCard from './HotelCart'

interface HotelListingsProps {
  isOpenSort: boolean
  setIsOpenSort: React.Dispatch<React.SetStateAction<boolean>>
}
interface TabProps {
  label: string
  description: string
  isActive: boolean
  onClick: () => void
}
const HotelListings: React.FC<HotelListingsProps> = ({ isOpenSort, setIsOpenSort }) => {
  const toggleVisibilitySort = () => {
    setIsOpenSort((prev) => !prev)
  }
  //   const [isOpenSort, setIsOpenSort] = useState<boolean>(false)

  const Tab: React.FC<TabProps> = ({ label, description, isActive, onClick }) => (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center flex-1 px-4 ${isActive ? 'border-b-4 border-primary ' : 'border-r-2 border-transparent'
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
  const [favoriteStates, setFavoriteStates] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false
  })

  const handleFavoriteToggle = (cardId: keyof typeof favoriteStates) => {
    setFavoriteStates((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }
  return (
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
      {/* phan sort */}

      <div className='container flex flex-col gap-8'>
        {isOpenSort && <SortBy isOpenSort />}
        <HotelCard isFavorite={favoriteStates.card1} onFavoriteToggle={() => handleFavoriteToggle('card1')} />

      </div>
    </div>
  )
}
export default HotelListings
