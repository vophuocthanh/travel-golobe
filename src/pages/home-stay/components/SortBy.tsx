import { hotel_istanbul_1 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Coffee, Heart, MapPin } from 'lucide-react'
import { useState } from 'react'
import BasicRating from './StarRating'

interface SortByProps {
  isOpenSort: boolean
}
export default function SortBy({ isOpenSort }: SortByProps) {
  type ButtonStates = {
    button1: boolean
    button2: boolean
    button3: boolean
    button4: boolean
  }

  const [buttonStates, setButtonStates] = useState<ButtonStates>({
    button1: true,
    button2: true,
    button3: true,
    button4: true
  })
  const handleClick = (buttonKey: keyof ButtonStates) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [buttonKey]: !prevState[buttonKey]
    }))
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className={`flex w-full h-[20rem] rounded-xl overflow-hidden ${isOpenSort ? '' : 'hidden'}`}>
        <div className='w-[35%] bg-blue-300 relative'>
          <img src={hotel_istanbul_1} alt='' className='object-cover w-full h-full' />
          <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
            9 images
          </p>
        </div>
        <div className='w-[65%] h-full pl-4 bg-white'>
          <div className='flex flex-col w-full h-full'>
            <div className='w-full h-[75%] border-b-2 border-gray-400'>
              <div className='flex w-full h-full'>
                <div className='w-[70%] flex flex-col gap-4'>
                  <p className='pt-4 text-3xl'>CVK Park Bosphorus Hotel Istanbul</p>
                  <p className='flex text-gray-500 text-md'>
                    <MapPin className='w-4 h-4 text-black' />
                    Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                  </p>
                  <div className='flex gap-2'>
                    <BasicRating />
                    <div className='flex gap-1'>
                      <p className='font-bold'>20+</p>
                      <Coffee className='font-bold text-black' />
                      <p>Amenities</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button className='bg-white border border-primary'>4.2</Button>
                    <p className='font-bold'>Very good</p>
                    <p>371 reviews</p>
                  </div>
                </div>
                <div className='w-[30%] pt-4'>
                  <p className='text-sm'>starting from</p>
                  <p className='text-3xl text-[#FF8682] font-bold'>$240 / night</p>
                  <p className='mr-3 text-right text-gray-400'>excl. tax</p>
                </div>
              </div>
            </div>
            <div className='w-full h-[25%] flex'>
              <div className='flex items-center justify-center w-full gap-4'>
                <Button
                  className={buttonStates.button1 ? 'bg-white border border-primary' : 'bg-primary text-white'}
                  onClick={() => handleClick('button1')}
                >
                  <Heart />
                </Button>
                <Button className='w-full mx-4'>View Place</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex w-full h-[20rem] rounded-xl overflow-hidden ${isOpenSort ? '' : 'hidden'}`}>
        <div className='w-[35%] bg-blue-300 relative'>
          <img src={hotel_istanbul_1} alt='' className='object-cover w-full h-full' />
          <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
            9 images
          </p>
        </div>
        <div className='w-[65%] h-full pl-4 bg-white'>
          <div className='flex flex-col w-full h-full'>
            <div className='w-full h-[75%] border-b-2 border-gray-400'>
              <div className='flex w-full h-full'>
                <div className='w-[70%] flex flex-col gap-4'>
                  <p className='pt-4 text-3xl'>CVK Park Bosphorus Hotel Istanbul</p>
                  <p className='flex text-gray-500 text-md'>
                    <MapPin className='w-4 h-4 text-black' />
                    Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                  </p>
                  <div className='flex gap-2'>
                    <BasicRating />
                    <div className='flex gap-1'>
                      <p className='font-bold'>20+</p>
                      <Coffee className='font-bold text-black' />
                      <p>Amenities</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button className='bg-white border border-primary'>4.2</Button>
                    <p className='font-bold'>Very good</p>
                    <p>371 reviews</p>
                  </div>
                </div>
                <div className='w-[30%] pt-4'>
                  <p className='text-sm'>starting from</p>
                  <p className='text-3xl text-[#FF8682] font-bold'>$240 / night</p>
                  <p className='mr-3 text-right text-gray-400'>excl. tax</p>
                </div>
              </div>
            </div>
            <div className='w-full h-[25%] flex'>
              <div className='flex items-center justify-center w-full gap-4'>
                <Button
                  className={buttonStates.button2 ? 'bg-white border border-primary' : 'bg-primary text-white'}
                  onClick={() => handleClick('button2')}
                >
                  <Heart />
                </Button>
                <Button className='w-full mx-4'>View Place</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
