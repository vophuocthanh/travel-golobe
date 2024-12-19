import { hotelApi } from '@/apis/hotel.api'
import { Button } from '@/components/ui/button'
import { DownOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
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
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([])

  const handlePriceRangeChange = () => {
    const newMinPrice = Number(minPrice)
    const newMaxPrice = Number(maxPrice)
    setPriceRange([newMinPrice, newMaxPrice])
  }

  const handlePlaceChange = (place: string) => {
    if (selectedPlaces.includes(place)) {
      setSelectedPlaces(selectedPlaces.filter((item) => item !== place))
    } else {
      setSelectedPlaces([place])
    }
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

  const { data: getCountPlace } = useQuery({
    queryKey: ['getCountPlace'],
    queryFn: () => hotelApi.getCountPlace()
  })

  const isRatingVisible = true
  return (
    <>
      <div className="w-full mt-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Filter Section */}
          <div className="col-span-1 pt-10 lg:col-span-1">
            <div className="w-full pb-4 border-b-2 border-gray-300">
              <h2 className="text-xl font-semibold text-gray-700">{t('PriceRange')}</h2>
              <div className="p-4 mt-4 space-y-4 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <input
                    className="w-full h-10 p-4 transition duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t('Minimum')}
                    value={minPrice !== undefined ? minPrice : ''}
                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <input
                    className="w-full h-10 p-4 transition duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t('Maximum')}
                    value={maxPrice !== undefined ? maxPrice : ''}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
                <Button
                  onClick={handlePriceRangeChange}
                  className="w-full px-4 py-2 text-white transition duration-200 rounded-md bg-primary hover:bg-primary-dark"
                >
                  {t('Filter')}
                </Button>
                <Button
                  className="w-full mt-4 text-white transition duration-200 bg-gray-400 rounded hover:bg-gray-500"
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
              <div className="w-full">
                <h2 className="text-xl font-semibold text-gray-700">{t('Rating')}</h2>
                <div className="flex gap-3 mt-4">
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
                <div className="inline-block mt-6">
                  <h2 className="mb-4 text-xl font-semibold text-gray-700">{t('Location')}</h2>
                  {getCountPlace?.data?.map((place: string, index: number) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        value={place}
                        checked={selectedPlaces.includes(place)}
                        onChange={(e) => handlePlaceChange(e.target.value)}
                        className="w-5 h-5 mr-2 accent-primary "
                      />
                      {place}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hotel List Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center justify-end w-full h-10 mb-2">
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {t('Sortby')}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <div className="flex flex-col flex-1 gap-8">
              <HotelCard
                starNumber={starNumber}
                sortByPrice={sortByPrice}
                priceRangeMax={priceRange[1]}
                priceRangeMin={priceRange[0]}
                selectedPlaces={selectedPlaces}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HotelListings
