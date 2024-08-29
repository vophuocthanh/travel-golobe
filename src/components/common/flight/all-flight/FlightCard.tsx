import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FlightCardProps {
  image: string;
  price: string;
  rating: string;
  reviews: string;
  flightTimes: Array<{ time: string; duration: string; airline: string; route: string }>;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({
  image,
  price,
  rating,
  reviews,
  flightTimes,
  isFavorite,
  onToggleFavorite,
  }) => {
  return (
    <div className='flex w-full h-[23rem] rounded-xl overflow-hidden'>
      <div className='w-[35%] bg-white relative'>
        <img src={image} alt='Flight' className='object-cover w-[80%] h-30 ml-8 mt-4' />
        <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
          9 images
        </p>
      </div>
      <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
        <div className='flex flex-col w-full h-full '>
          <div className='w-full h-[75%] border-b-2 border-gray-400'>
            <div className='flex flex-row w-full h-full'>
              <div className='w-[70%] flex flex-col gap-4'>
                <div className='flex items-center gap-2 mt-8'>
                  <Button className='bg-white border border-primary'>{rating}</Button>
                  <p className='font-bold'>Very good</p>
                  <p>{reviews} reviews</p>
                </div>
                {flightTimes.map((flight, index) => (
                  <div className='mb-4' key={index}>
                    <div className='flex items-center mb-2'>
                      <Input type='checkbox' className='w-5 h-5 mr-2 border-2 border-black rounded-sm' />
                      <div className='flex-grow'>
                        <div className='flex justify-between text-black'>
                          <div className='text-2xl'>{flight.time}</div>
                          <div>{flight.duration}</div>
                          <div className='text-2xl'>{flight.duration}</div>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-[14rem] w-full'>
                      <p className='text-left text-gray-500 mr-[4rem] ml-9'>{flight.airline}</p>
                      <p className='text-right text-gray-500'>{flight.route}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='w-[30%] pt-4 text-right mr-5'>
                <p className='text-sm'>starting from</p>
                <p className='text-3xl text-[#FF8682] font-bold'>{price}</p>
              </div>
            </div>
          </div>
          <div className='w-full h-[25%] flex'>
            <div className='flex flex-row items-center w-full gap-4'>
              <Button
                className={isFavorite ? 'bg-white border border-primary' : 'bg-primary text-white w-[3.6rem] '}
                onClick={onToggleFavorite}
              >
                <Heart />
              </Button>
              <Link to='/flight/all-flight/flight-detail' className='w-[35rem]'>
                <Button className='w-full mx-4'>View Deals</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
