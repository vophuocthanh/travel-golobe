import React, { useState } from 'react';
import HotelCard from './HotelCart';
import { Button } from '@/components/ui/button';
import { Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const HotelListings: React.FC = () => {

  const [priceRange, setPriceRange] = useState<[number | undefined, number | undefined]>([undefined, undefined]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [starNumber, setStarNumer] = useState<number | undefined>(undefined);


  const handlePriceRangeChange = () => {
    const newMinPrice = Number(minPrice);
    const newMaxPrice = Number(maxPrice);
    setPriceRange([newMinPrice, newMaxPrice]);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Sắp xếp theo giá',
      disabled: true,
      onClick: () => setSortByPrice(''),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Không sắp xếp',
      onClick: () => setSortByPrice(''),
    },
    {
      key: '3',
      label: 'Từ cao đến thấp',
      onClick: () => setSortByPrice('desc'),
    },
    {
      key: '4',
      label: 'Từ thấp đến cao',
      onClick: () => setSortByPrice('asc'),
    },
  ];

  const [sortByPrice, setSortByPrice] = useState('');

  const isRatingVisible = true;
  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="flex space-x-10">
          <div className="flex flex-col w-1/3 gap-6 pt-10">
            <div className="pb-4 border-b-2 border-gray-300">
              <h2 className="text-xl font-semibold text-gray-700">Price Range</h2>
              <div className="p-4 mt-4 space-y-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center w-full space-x-4">
                  <input
                    className="w-full h-10 p-4 transition duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Min Price"
                    value={minPrice !== undefined ? minPrice : ''}
                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <span className="text-lg text-gray-600">-</span>
                  <input
                    className="w-full h-10 p-4 transition duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Max Price"
                    value={maxPrice !== undefined ? maxPrice : ''}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
                <Button
                  onClick={handlePriceRangeChange}
                  className="w-full px-4 py-2 text-white transition duration-200 rounded-md bg-primary hover:bg-primary-dark"
                >
                  Lọc
                </Button>
                <Button
                  className="w-full mt-4 text-white transition duration-200 bg-gray-400 rounded hover:bg-gray-500"
                  onClick={() => {
                    setMaxPrice(undefined)
                    setMinPrice(undefined)
                    setPriceRange([undefined, undefined])
                  }}
                >
                  Hủy Lọc
                </Button>
              </div>
            </div>

            {isRatingVisible && (
              <div>
                <h2 className="text-xl font-semibold text-gray-700">Freebies</h2>
                <div className="flex gap-3 mt-4">
                  {[0, 1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      className="flex items-center justify-center w-12 h-8 text-sm font-medium text-white rounded-md hover:bg-primary hover:text-white transition duration-200 cursor-pointer"
                      onClick={() => {
                        if (rating === 0) {
                          setStarNumer(undefined)
                        } else {
                          setStarNumer(rating)
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

          <div className="w-2/3">
            <div className="flex items-center justify-between w-full h-10 mb-2">
              <div>
                <p className="hover:cursor-pointer">
                  Showing 4 of <span className="text-[#FF8682]">257 places</span>
                </p>
              </div>
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Sắp xếp theo giá
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>

            <div className="flex flex-col gap-8 flex-1">
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
  );
};

export default HotelListings;
