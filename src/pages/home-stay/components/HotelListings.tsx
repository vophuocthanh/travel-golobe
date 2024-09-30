import React, { useState } from 'react';
import SortBy from './SortBy';
import HotelCard from './HotelCart';
import { Button } from '@/components/ui/button';
import { Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface HotelListingsProps {
  isOpenSort: boolean;
  setIsOpenSort: React.Dispatch<React.SetStateAction<boolean>>;
}

const HotelListings: React.FC<HotelListingsProps> = ({ isOpenSort }) => {
  const [favoriteStates, setFavoriteStates] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
  });

  const [priceRange, setPriceRange] = useState([0, 999999999999999]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const handleFavoriteToggle = (cardId: keyof typeof favoriteStates) => {
    setFavoriteStates((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

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
          <div className="flex flex-col gap-6 pt-10 w-1/3">
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-xl font-semibold text-gray-700">Price Range</h2>
              <div className="space-y-4 mt-4 bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center w-full space-x-4">
                  <input
                    className="w-full h-10 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                    placeholder="Min Price"
                    value={minPrice !== undefined ? minPrice : ''}
                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <span className="text-lg text-gray-600">-</span>
                  <input
                    className="w-full h-10 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                    placeholder="Max Price"
                    value={maxPrice !== undefined ? maxPrice : ''}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
                <Button
                  onClick={handlePriceRangeChange}
                  className="px-4 py-2 w-full bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200"
                >
                  Lọc
                </Button>
                <Button
                  className="w-full mt-4 text-white transition duration-200 bg-gray-400 rounded hover:bg-gray-500"
                  onClick={() => {
                    setMaxPrice(undefined)
                    setMinPrice(undefined)
                    setPriceRange([0, 999999999999999])
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
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Button
                      key={rating}
                      className="flex items-center justify-center w-12 h-8 text-sm font-medium text-white rounded-md hover:bg-primary hover:text-white transition duration-200 cursor-pointer"
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
              {isOpenSort && <SortBy isOpenSort />}
              <HotelCard
                sortByPrice={sortByPrice}
                priceRangeMax={priceRange[1]}
                priceRangeMin={priceRange[0]}
                isFavorite={favoriteStates.card1}
                onFavoriteToggle={() => handleFavoriteToggle('card1')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelListings;
