import { Button } from '@/components/ui/button'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import HotelCard from './HotelCart'

const HotelListings: React.FC = () => {
  const { t } = useTranslation()

  const [priceRange, setPriceRange] = useState<[number | undefined, number | undefined]>([undefined, undefined])
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [starNumber, setStarNumber] = useState<number | undefined>(undefined)

  const handlePriceRangeChange = () => {
    const newMinPrice = Number(minPrice)
    const newMaxPrice = Number(maxPrice)
    setPriceRange([newMinPrice, newMaxPrice])
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: t('Sortby'),
      disabled: true,
      onClick: () => setSortByPrice('')
    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: t('sorting'),
      onClick: () => setSortByPrice('')
    },
    {
      key: '3',
      label: t('High'),
      onClick: () => setSortByPrice('desc')
    },
    {
      key: '4',
      label: t('Low'),
      onClick: () => setSortByPrice('asc')
    }
  ]

  const [sortByPrice, setSortByPrice] = useState('')

  const isRatingVisible = true
  return (
    <>
      <div className='container mx-auto mt-8'>
        <div className='flex space-x-10'>
          <div className='flex flex-col w-1/3 gap-6 pt-10'>
            <div className='pb-4 border-b-2 border-gray-300'>
              <h2 className='text-xl font-semibold text-gray-700'>{t('PriceRange')}</h2>
              <div className='p-4 mt-4 space-y-4 bg-white rounded-lg shadow-md'>
                <div className='flex items-center w-full space-x-4'>
                  <input
                    className='w-full h-10 p-4 transition duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                    placeholder='Min Price'
                    value={minPrice !== undefined ? minPrice : ''}
                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <span className='text-lg text-gray-600'>-</span>
                  <input
                    className='w-full h-10 p-4 transition duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                    placeholder='Max Price'
                    value={maxPrice !== undefined ? maxPrice : ''}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
                <Button
                  onClick={handlePriceRangeChange}
                  className='w-full px-4 py-2 text-white transition duration-200 rounded-md bg-primary hover:bg-primary-dark'
                >
                  {t('Filter')}
                </Button>
                <Button
                  className='w-full mt-4 text-white transition duration-200 bg-gray-400 rounded hover:bg-gray-500'
                  onClick={() => {
                    setMaxPrice(undefined)
                    setMinPrice(undefined)
                    setPriceRange([undefined, undefined])
                  }}
                >
                  {t('CancelFilter')}
                </Button>
              </div>
            </div>

            {isRatingVisible && (
              <div>
                <h2 className='text-xl font-semibold text-gray-700'>{t('Rating')}</h2>
                <div className='flex gap-3 mt-4'>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      className={`flex items-center justify-center w-12 h-8 text-sm font-medium text-white rounded-md transition duration-200 ${
                        starNumber === rating ? 'bg-primary' : 'opacity-50 hover:opacity-100 cursor-pointer'
                      }`}
                      onClick={() => {
                        if (starNumber === rating) {
                          setStarNumber(undefined)
                        } else {
                          setStarNumber(rating)
                        }
                      }}
                    >
                      {rating}+
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='w-2/3'>
            <div className='flex items-center justify-end w-full h-10 mb-2'>
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {t('Sortby')}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>

            <div className='flex flex-col flex-1 gap-8'>
              <HotelCard
                starNumber={starNumber}
                sortByPrice={sortByPrice}
                priceRangeMax={priceRange[1]}
                priceRangeMin={priceRange[0]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HotelListings
