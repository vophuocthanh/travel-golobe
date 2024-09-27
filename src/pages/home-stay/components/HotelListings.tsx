import React, { useState } from 'react';
import SortBy from './SortBy';
import { Checkbox } from '@radix-ui/react-checkbox';
import HotelCard from './HotelCart';

interface HotelListingsProps {
  isOpenSort: boolean;
  setIsOpenSort: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TabProps {
  label: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const HotelListings: React.FC<HotelListingsProps> = ({ isOpenSort }) => {
  const Tab: React.FC<TabProps> = ({ label, description, isActive, onClick }) => (
    <div onClick={onClick}
      className={`flex flex-col justify-center flex-1 px-4 py-2 transition-colors duration-300 cursor-pointer ${isActive ? 'border-b-4 border-primary text-primary font-semibold' : 'border-b-2 border-transparent text-gray-600'
        }`}
    >
      <p className='text-lg'>{label}</p>
      <p className='text-sm text-gray-400'>{description}</p>
    </div>
  );

  const [activeTab, setActiveTab] = useState('Hotel');
  const [favoriteStates, setFavoriteStates] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
  });

  const [priceRange, setPriceRange] = useState([0, 28499966]);

  const handleFavoriteToggle = (cardId: keyof typeof favoriteStates) => {
    setFavoriteStates((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    setPriceRange((prev) => {
      const updatedRange = [...prev];
      updatedRange[index] = newValue;
      return updatedRange;
    });
  };

  const isFreebiesVisible = true;
  const isRatingVisible = true;
  const isAmenitiesVisible = true;

  const tabs = [
    { label: 'Hotel', description: '257 places' },
    { label: 'Motels', description: '51 places' },
    { label: 'Resorts', description: '72 places' },
  ];

  return (
    <>
      <div className='flex flex-col container mx-auto mt-14'>
        <div className='bg-white shadow-md rounded-md mb-6'>
          <div className='flex border-b border-gray-300'>
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.label}>
                <Tab
                  label={tab.label}
                  description={tab.description}
                  isActive={tab.label === activeTab}
                  onClick={() => setActiveTab(tab.label)}
                />
                {index < tabs.length - 1 && <div className='h-full border-l border-gray-300'></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className='flex space-x-10'>
          <div className='flex flex-col gap-5 pb-10 w-[30%]'>
            <div className='border-b-2 border-gray-300 pb-4'>
              <h2 className='text-xl font-semibold'>Price Range</h2>
              <div className='flex items-center space-x-4'>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="border rounded-md p-2 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Min Price"
                  />
                  <span className="text-lg">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="border rounded-md p-2 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Max Price"
                  />
                </div>

              </div>
            </div>

            {isFreebiesVisible && (
              <div className='border-b-2 border-gray-300 pb-10'>
                <h2 className='text-xl font-semibold'>Freebies</h2>
                <div className='flex flex-col space-y-2'>
                  {['Free breakfast', 'Free parking', 'Free internet', 'Free airport shuttle', 'Free cancellation'].map((amenity) => (
                    <div key={amenity} className='flex items-center space-x-2'>
                      <Checkbox id={amenity} className='w-5 h-5 border-2 border-black rounded-sm' />
                      <label htmlFor={amenity} className='text-sm font-medium leading-none'>
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isAmenitiesVisible && (
              <div className='flex flex-col gap-3 pb-10 border-b-2 border-gray-300'>
                <h2 className='text-xl font-semibold'>Amenities</h2>
                {['24hr front desk', 'Air-conditioned', 'Fitness', 'Pool'].map((amenity) => (
                  <div key={amenity} className='flex items-center space-x-2'>
                    <Checkbox id={amenity} className='w-5 h-5 border-2 border-black rounded-sm' />
                    <label htmlFor={amenity} className='text-sm font-medium leading-none'>
                      {amenity}
                    </label>
                  </div>
                ))}
                <div>
                  <p className='text-pink-400 hover:cursor-pointer'>+ 24 more</p>
                </div>

                {isRatingVisible && (
                  <>
                    <h2 className='text-xl font-semibold'>Freebies</h2>
                    <div className='flex flex-row gap-4 pb-4'>
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <div key={rating} className='flex items-center justify-center w-12 h-8 text-sm text-black border rounded-md border-primary hover:cursor-pointer hover:bg-primary hover:text-white'>
                          {rating}+
                        </div>
                      ))}
                    </div>
                  </>

                )}
              </div>
            )}
          </div>

          <div className='flex flex-col gap-8 flex-1 w-[70%]'>
            {isOpenSort && <SortBy isOpenSort />}
            <HotelCard priceRangeMax={priceRange[1]} priceRangeMin={priceRange[0]} isFavorite={favoriteStates.card1} onFavoriteToggle={() => handleFavoriteToggle('card1')} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelListings;
