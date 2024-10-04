import { IconAdress, IconDrink } from '@/common/icons'
import { Button } from '@/components/ui/button'

import { tourApi } from '@/apis/tour.api'
import {  useQuery } from '@tanstack/react-query'
import  {  useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../star-rating'
import {  Tour } from '@/shared/ts/interface/comment-tour.interface'
import { PaginationDemo } from '../pagination/pagination'
import { Dropdown, MenuProps, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import Favorite from '../../favorite/favorite'





const ProductTour = () => {
 // const { id } = useParams<{ id: string }>()
  const [sortByPrice, setSortByPrice] = useState('');
  console.log(sortByPrice);
  const { data: getAll } = useQuery({
    queryKey: ['getAllTour'],
    queryFn: () => tourApi.getAll(1,5)
  })
  
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


  return (
    <div className='w-[70%]'>
      <div>
        <div className='flex justify-between my-6'>
          <div className='flex items-center justify-center '>
            <h3>
              Showing 4 of <span className='text-red-500'> 257 places</span>
            </h3>
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
        <div>
          {getAll?.data.map((item: Tour) => (
          
            <div className='tour flex w-full h-[23rem] overflow-hidden mb-5 shadow-2xl rounded-2xl' key={item.id}>
              <div className='relative bg-blue-300 w-[27%] flex-3'>
                <img src={item.image} className='object-cover w-full h-full ' alt='tour' />
                <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                  9 images
                </p>
              </div>
              <div className='p-3  w-[73%] '>
                <div className='flex justify-between '>
                  <div className='mr-2  w-[85%]'>
                    <h2 className='mb-3 overflow-hidden text-3xl font-medium whitespace-pre-line text-ellipsis line-clamp-2'>
                      {item.description}
                    </h2>
                    <div className='flex mb-3'>
                      <IconAdress />
                      <p className='ml-2 overflow-hidden whitespace-pre-line text-ellipsis line-clamp-2'>{item.name}</p>
                    </div>
                    <div className='flex justify-between w-[75%] mb-3'>
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
                      <Button className='mr-3 text-black bg-white border border-primary hover:bg-slate-100'>4.2</Button>
                      <p className='flex items-center '>
                        <span className='text-lg font-medium'>Very Good</span> 371 reviews
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className='font-medium text-red-500'>
                      <span className='text-2xl'>${item.price}</span>
                    </h2>
                  </div>
                </div>
                <div className='border-b-2 border-zinc-400'></div>
                <div className='w-full h-[25%] flex mb-10'>
                  <div className='flex flex-row items-center justify-between w-full '>
                    <Favorite id={item.id}/>
                    <Link to={`/tour/${item.id}`}  className='w-full'>
                      <Button className='w-full text-white ' >View Deals</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mb-40 py-7'>
        <PaginationDemo />
      </div>
    </div>
  )
}
export default ProductTour
