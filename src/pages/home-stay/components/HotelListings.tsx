import React, { useState } from 'react';
import SortBy from './SortBy';
import HotelCard from './HotelCart';
import { Button } from '@/components/ui/button';
import { Dropdown, MenuProps, Space } from 'antd'
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

  const [priceRange, setPriceRange] = useState([0, 28499966]);
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('28499966');

  const handleFavoriteToggle = (cardId: keyof typeof favoriteStates) => {
    setFavoriteStates((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handlePriceRangeChange = () => {
    const newMinPrice = parseInt(minPrice, 10) || 0;
    const newMaxPrice = parseInt(maxPrice, 10) || 28499966;
    setPriceRange([newMinPrice, newMaxPrice]);
    setSortByPrice('')
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
  const [sortByPrice, setSortByPrice] = useState('')


  const isRatingVisible = true;

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="flex space-x-10">
          <div className="flex flex-col gap-6 pt-10 w-1/3">
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-xl font-semibold text-gray-700">Price Range</h2>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-4">
                  <input
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="text-lg text-gray-600">-</span>
                  <input
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                <Button onClick={handlePriceRangeChange} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200">
                  Tìm
                </Button>
              </div>
            </div>

            {isRatingVisible && (
              <div>
                <h2 className="text-xl font-semibold text-gray-700">Freebies</h2>
                <div className="flex gap-3 mt-4">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center justify-center w-12 h-8 text-sm font-medium text-black border border-primary rounded-md hover:bg-primary hover:text-white transition duration-200 cursor-pointer"
                    >
                      {rating}+
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='w-2/3'>
            <div className='flex items-center justify-between w-full h-10 mb-2'>
              <div>
                {' '}
                <p className=' hover:cursor-pointer'>
                  Showing 4 of <span className='text-[#FF8682]'>257 places</span>
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
