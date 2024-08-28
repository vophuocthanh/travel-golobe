import { tour_1 } from '@/assets/images'
import { IconAdress, IconDrink } from '@/common/icons'
import { Button } from '@/components/ui/button'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../star-rating'

// const dataTourProduct = [
//     {
//         id: 1,
//         image: tour_1,
//         title: 'CVK Park Bosphorus Hotel Istanbul',
//         adress: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
//         price: '$240'
//     },
//     {
//         id: 2,
//         image: tour_1,
//         title: 'CVK Park Bosphorus Hotel Istanbul',
//         adress: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
//         price: '$120'
//     },
//     {
//         id: 3,
//         image: tour_1,
//         title: 'CVK Park Bosphorus Hotel Istanbul',
//         adress: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
//         price: '$240'
//     },
//     {
//         id: 4,
//         image: tour_1,
//         title: 'CVK Park Bosphorus Hotel Istanbul',
//         adress: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
//         price: '$300'
//     }
// ]

export default function ProductTour() {
  type ButtonHeart = {
    heart1: boolean
    heart2: boolean
    heart3: boolean
    heart4: boolean
  }
  const [isHeart, setIsHeat] = useState<ButtonHeart>({
    heart1: true,
    heart2: true,
    heart3: true,
    heart4: true
  })
  console.log(isHeart, 'áddf')

  const handleHeart = (heart: keyof typeof isHeart) => {
    setIsHeat((prevState) => ({
      ...prevState,
      [heart]: !prevState[heart]
    }))
  }
  return (
    <div className='w-[70%]'>
      <div>
        <div className='flex justify-between'>
          <div className=' p-4 w-[30%] border-b border-b-primary'>
            <h3>Tour</h3>
            <p className='flex text-slate-400'>257 places</p>
          </div>
          <div className=' p-4 w-[30%]'>
            <h3>Motels</h3>
            <p className='flex text-slate-400'>51 places</p>
          </div>
          <div className=' p-4 w-[30%]'>
            <h3>Hotels</h3>
            <p className='flex text-slate-400'>117 places</p>
          </div>
        </div>
        <div className='flex justify-between my-6'>
          <div className='flex items-center justify-center '>
            <h3>
              Showing 4 of <span className='text-red-500'> 257 places</span>
            </h3>
          </div>
          <div>
            <Select>
              <SelectTrigger className='w-[180px]'>
                {' '}
                Sort by
                <SelectValue placeholder='Theme' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='light'>Light</SelectItem>
                <SelectItem value='dark'>Dark</SelectItem>
                <SelectItem value='system'>System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <div className='flex justify-between mb-5'>
            <img src={tour_1} className='mr-6' alt='' />
            <div className='p-3'>
              <div className='flex justify-between'>
                <div className='mr-5 '>
                  <h2 className='mb-3 text-4xl font-medium'>CVK Park Bosphorus Hotel Istanbul</h2>
                  <div className='flex mb-3'>
                    <IconAdress />
                    <p className='ml-2'>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
                  </div>
                  <div className='flex justify-between w-[70%] mb-3'>
                    <div className='flex'>
                      <StarRating />
                    </div>
                    <div className='flex'>
                      <IconDrink />
                      <p className='ml-3'>
                        <span className='font-semibold'>20+</span> Aminities
                      </p>
                    </div>
                  </div>

                  <div className='flex mb-4'>
                    <Button className='mr-3 bg-white border border-primary hover:bg-slate-100'>4.2</Button>
                    <p className='flex items-center '>
                      <span className='text-lg font-medium'>Very Good</span> 371 reviews
                    </p>
                  </div>
                </div>
                <div>
                  <p>starting from</p>
                  <h2 className='font-medium text-red-500'>
                    <span className='text-2xl'>230</span>/night
                  </h2>
                  <p className='text-right'>excl. tax</p>
                </div>
              </div>
              <div className='flex '>
                <Button
                  onClick={() => handleHeart('heart1')}
                  className={`${
                    isHeart.heart1 ? 'text-primary' : ' '
                  }  p-5 mr-5 text-xl border border-primary hover:bg-slate-100 relative h-full bg-white  `}
                >
                  <Heart />
                </Button>
                <Link to='/tour/all-tour/detail-view' className='w-full'>
                  <Button className='w-full h-full p-5 text-xl'>View Place</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className='flex justify-between mb-5'>
            <img src={tour_1} className='mr-6' alt='' />
            <div className='p-3'>
              <div className='flex justify-between'>
                <div className='mr-5 '>
                  <h2 className='mb-3 text-4xl font-medium'>CVK Park Bosphorus Hotel Istanbul</h2>
                  <div className='flex mb-3'>
                    <IconAdress />
                    <p className='ml-2'>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
                  </div>
                  <div className='flex justify-between w-[70%] mb-3'>
                    <div className='flex'>
                      <StarRating />
                    </div>
                    <div className='flex'>
                      <IconDrink />
                      <p className='ml-3'>
                        <span className='font-semibold'>20+</span> Aminities
                      </p>
                    </div>
                  </div>

                  <div className='flex mb-4'>
                    <Button className='mr-3 bg-white border border-primary hover:bg-slate-100'>4.2</Button>
                    <p className='flex items-center '>
                      <span className='text-lg font-medium'>Very Good</span> 371 reviews
                    </p>
                  </div>
                </div>
                <div>
                  <p>starting from</p>
                  <h2 className='font-medium text-red-500'>
                    <span className='text-2xl'>230</span>/night
                  </h2>
                  <p className='text-right'>excl. tax</p>
                </div>
              </div>
              <div className='flex '>
                <Button
                  onClick={() => handleHeart('heart2')}
                  className={`${
                    isHeart.heart2 ? 'text-primary' : ' '
                  }  p-5 mr-5 text-xl border border-primary hover:bg-slate-100 relative h-full bg-white  `}
                >
                  <Heart />
                </Button>
                <Link to='/tour/all-tour/detail-view' className='w-full'>
                  <Button className='w-full h-full p-5 text-xl'>View Place</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className='flex justify-between mb-5'>
            <img src={tour_1} className='mr-6' alt='' />
            <div className='p-3'>
              <div className='flex justify-between'>
                <div className='mr-5 '>
                  <h2 className='mb-3 text-4xl font-medium'>CVK Park Bosphorus Hotel Istanbul</h2>
                  <div className='flex mb-3'>
                    <IconAdress />
                    <p className='ml-2'>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
                  </div>
                  <div className='flex justify-between w-[70%] mb-3'>
                    <div className='flex'>
                      <StarRating />
                    </div>
                    <div className='flex'>
                      <IconDrink />
                      <p className='ml-3'>
                        <span className='font-semibold'>20+</span> Aminities
                      </p>
                    </div>
                  </div>

                  <div className='flex mb-4'>
                    <Button className='mr-3 bg-white border border-primary hover:bg-slate-100'>4.2</Button>
                    <p className='flex items-center '>
                      <span className='text-lg font-medium'>Very Good</span> 371 reviews
                    </p>
                  </div>
                </div>
                <div>
                  <p>starting from</p>
                  <h2 className='font-medium text-red-500'>
                    <span className='text-2xl'>230</span>/night
                  </h2>
                  <p className='text-right'>excl. tax</p>
                </div>
              </div>
              <div className='flex '>
                <Button
                  onClick={() => handleHeart('heart3')}
                  className={`${
                    isHeart.heart3 ? 'text-primary' : ' '
                  }  p-5 mr-5 text-xl border border-primary hover:bg-slate-100 relative h-full bg-white  `}
                >
                  <Heart />
                </Button>
                <Button className='w-full h-full p-5 text-xl'>View Place</Button>
              </div>
            </div>
          </div>
          <div className='flex justify-between mb-5'>
            <img src={tour_1} className='mr-6' alt='' />
            <div className='p-3'>
              <div className='flex justify-between'>
                <div className='mr-5 '>
                  <h2 className='mb-3 text-4xl font-medium'>CVK Park Bosphorus Hotel Istanbul</h2>
                  <div className='flex mb-3'>
                    <IconAdress />
                    <p className='ml-2'>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
                  </div>
                  <div className='flex justify-between w-[70%] mb-3'>
                    <div className='flex'>
                      <StarRating />
                    </div>
                    <div className='flex'>
                      <IconDrink />
                      <p className='ml-3'>
                        <span className='font-semibold'>20+</span> Aminities
                      </p>
                    </div>
                  </div>

                  <div className='flex mb-4'>
                    <Button className='mr-3 bg-white border border-primary hover:bg-slate-100'>4.2</Button>
                    <p className='flex items-center '>
                      <span className='text-lg font-medium'>Very Good</span> 371 reviews
                    </p>
                  </div>
                </div>
                <div>
                  <p>starting from</p>
                  <h2 className='font-medium text-red-500'>
                    <span className='text-2xl'>230</span>/night
                  </h2>
                  <p className='text-right'>excl. tax</p>
                </div>
              </div>
              <div className='flex '>
                <Button
                  onClick={() => handleHeart('heart4')}
                  className={`${
                    isHeart.heart4 ? 'text-primary' : ' '
                  }  p-5 mr-5 text-xl border border-primary hover:bg-slate-100 relative h-full bg-white  `}
                >
                  <Heart />
                </Button>
                <Link to='/tour/all-tour/detail-view' className='w-full'>
                  <Button className='w-full h-full p-5 text-xl'>View Place</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button className='w-full h-20 text-white bg-black hover:bg-slate-800'>Show more results</Button>
      </div>
    </div>
  )
}
