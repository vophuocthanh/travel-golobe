import { IconAdress, IconDrink } from '@/common/icons'
import { Button } from '@/components/ui/button'

import { tourApi } from '@/apis/tour.api'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronUp, Heart } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../star-rating'


interface Search {
  id?: string
  name: string
  description: string
  price: string
  images: string
}
interface TabProps {
  label: string
  description: string
  isActive: boolean
  onClick: () => void
}

const ProductTour = () => {
  const [isOpenSort, setIsOpenSort] = useState<boolean>(false)
  const [liked, setLiked] = useState(false);

    const handleClick = (id?: string) => {
      console.log(id,"like");
      getAll?.data.map((item: Search)=> {
        if(item.id === id){
          console.log("yes");
          setLiked(true);
        }else {
          console.log("no");
          
          setLiked(false)
        }
      })
    };

  const { data: getAll } = useQuery({
    queryKey: ['getAllTour'],
    queryFn: () => tourApi.getAll(1,5)
  })
  
  const toggleVisibilitySort = () => {
    setIsOpenSort(!isOpenSort)
    // if (isOpenSort) {
    //   getAll?.data.slice().sort((a: number | any, b: number | any) => a.price - b.price);
    // } else {

    //     getAll?.data.slice().sort((a: number | any, b: number | any) => b.price - a.price);
    // }
  }
  const tabs = [
    { label: 'Tour', description: '257 places' },
    { label: 'Motels', description: '51 places' },
    { label: 'Resorts', description: '72 places' }
  ]
  const [activeTab, setActiveTab] = useState('Tour')
  const Tab: React.FC<TabProps> = ({ label, description, isActive, onClick }) => (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center flex-1 px-4 ${
        isActive ? 'border-b-4 border-primary ' : 'border-r-2 border-transparent'
      } transition-colors duration-300`}
    >
      <p className='text-2xl text-left'>{label}</p>
      <p className='text-left text-gray-400'>{description}</p>
    </div>
  )
  return (
    <div className='w-[70%]'>
      <div>
        <div className='bg-white flex flex-row w-full h-[6rem] rounded-md border-b border-gray-300 mx-4 '>
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.label}>
              <Tab
                label={tab.label}
                description={tab.description}
                isActive={tab.label === activeTab}
                onClick={() => setActiveTab(tab.label)}
              />
              {index < tabs.length - 1 && <div className='h-full mx-4 border-r-2 border-gray-300'></div>}
            </React.Fragment>
          ))}
        </div>
        <div className='flex justify-between my-6'>
          <div className='flex items-center justify-center '>
            <h3>
              Showing 4 of <span className='text-red-500'> 257 places</span>
            </h3>
          </div>
          <div className='flex gap-2' onClick={toggleVisibilitySort}>
            <p className='text-gray-900 hover:cursor-pointer'>
              Sort by <span className='text-[#112211] '>Recommended</span>
            </p>
            {isOpenSort ? (
              <ChevronUp className='transition-transform duration-300' />
            ) : (
              <ChevronDown className='transition-transform duration-300' />
            )}
          </div>
        </div>
        <div>
          {getAll?.data.map((item: Search) => (
          
            <div className='flex w-full h-[21rem] overflow-hidden mb-5' key={item.id}>
              <div className='relative bg-blue-300 w-[35%] flex-3'>
                <img src={item.images} className='object-cover w-full h-full ' alt='tour' />
                <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                  9 images
                </p>
              </div>
              <div className='p-3  w-[65%] '>
                <div className='flex justify-between '>
                  <div className='mr-5 border-b-2 border-gray-400 w-[85%]'>
                    <h2 className='mb-3 overflow-hidden text-4xl font-medium whitespace-pre-line text-ellipsis line-clamp-2'>
                      {item.description}
                    </h2>
                    <div className='flex mb-3'>
                      <IconAdress />
                      <p className='ml-2 overflow-hidden whitespace-pre-line text-ellipsis line-clamp-2'>{item.name}</p>
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

                    <div className='flex mb-6'>
                      <Button className='mr-3 bg-white border border-primary hover:bg-slate-100'>4.2</Button>
                      <p className='flex items-center '>
                        <span className='text-lg font-medium'>Very Good</span> 371 reviews
                      </p>
                    </div>
                  </div>
                  <div>
                    <p>starting from</p>
                    <h2 className='font-medium text-red-500'>
                      <span className='text-2xl'>${item.price}</span>/night
                    </h2>
                    <p className='text-right'>excl. tax</p>
                  </div>
                </div>
                <div className='w-full h-[25%] flex'>
                  <div className='flex flex-row items-center justify-between w-full '>
                    <Button className={` mr-5 `} onClick={() => handleClick(item.id)} >
                      <Heart className={`w-5 h-5 ${liked ? 'text-red-600' : 'text-gray-500'} `} />
                    </Button>
                    <Link to={`/tour/${item.id}`}  className='w-full'>
                      <Button className='w-full ' >View Deals</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button className='w-full h-20 text-white bg-black hover:bg-slate-800'>Show more results</Button>
      </div>
    </div>
  )
}
export default ProductTour
