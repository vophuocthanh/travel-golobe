import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface FlightCardProps {
  minPrice?: number
  maxPrice?: number
  rating?: number
  handlePriceRangeChange: (min: number | undefined, max: number | undefined) => void
  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>
  setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>
  handleRating: (val: number | undefined) => void
}

export default function FilterTour(props: FlightCardProps) {
  const { handlePriceRangeChange, handleRating, rating, setMinPrice, setMaxPrice, maxPrice, minPrice } = props
  const isRatingVisible = true
  const [tempMinPrice, setTempMinPrice] = useState<number | undefined>(minPrice)
  const [tempMaxPrice, setTempMaxPrice] = useState<number | undefined>(maxPrice)
  return (
    <div>
      <div className='flex flex-col gap-6 pt-10'>
        <div className='pb-4 border-b-2 border-gray-300 '>
          <h2 className='text-xl font-semibold text-gray-700 dark:text-white'>Price Range</h2>
          <div className='w-full p-4 mt-4 space-y-4 bg-white rounded-lg shadow-2xl dark:bg-gray-900'>
            <div className='flex items-center w-full space-x-4'>
              <input
                className='w-full h-10 p-4 transition duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white'
                placeholder='Min Price'
                value={tempMinPrice !== undefined ? tempMinPrice : ''}
                onChange={(e) => setTempMinPrice(e.target.value ? Number(e.target.value) : undefined)}
              />
              <span className='text-lg text-gray-600'>-</span>
              <input
                className='w-full h-10 p-4 transition duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white'
                placeholder='Max Price'
                value={tempMaxPrice !== undefined ? tempMaxPrice : ''}
                onChange={(e) => setTempMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <Button
              onClick={() => {
                setMinPrice(tempMinPrice)
                setMaxPrice(tempMaxPrice)
                handlePriceRangeChange(tempMinPrice, tempMaxPrice)
              }}
              className='w-full px-4 py-2 text-white transition duration-200 rounded-md bg-primary hover:bg-primary-dark dark:bg-primary '
            >
              Lọc
            </Button>
            <Button
              className='w-full mt-4 text-white transition duration-200 bg-gray-400 rounded hover:bg-gray-500'
              onClick={() => {
                setTempMinPrice(undefined)
                setTempMaxPrice(undefined)
                setMinPrice(undefined)
                setMaxPrice(undefined)
                handlePriceRangeChange(undefined, undefined)
              }}
            >
              Hủy Lọc
            </Button>
          </div>
        </div>

        {isRatingVisible && (
          <div>
            <h2 className='text-xl font-semibold text-gray-700 dark:text-white '>Freebies</h2>
            <div className='flex gap-3 mt-4'>
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <Button
                  key={item}
                  className={`flex items-center ${
                    rating === item || (rating === undefined && item === 0)
                      ? 'bg-primary dark:bg-primary-dark' 
                      : 'bg-slate-400 dark:bg-gray-400' 
                  } justify-center w-12 h-8 text-sm font-medium text-white transition duration-200 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-primary-dark`}
                  onClick={() => {
                    if (item === 0) {
                      handleRating(undefined)
                    } else {
                      handleRating(item)
                    }
                  }}
                >
                  {item}+
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
