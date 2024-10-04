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
  

  //const [isFavorited, setIsFavorited] = useState(false);

    // useEffect(() => {
    //     const favorited = localStorage.getItem(`favorited_${id}`);
    //     setIsFavorited(favorited === 'true');
    // }, [id]);
    // console.log(isFavorited,"isFavorited");
    

    // const {mutate: favoriteTourID}  = useMutation({
    //     mutationKey: ['favoriteTourID'], 
    //     mutationFn: () => tourApi.favoriteTourID(id),
    //     onSuccess: () => {
    //         setIsFavorited(true);
    //         localStorage.setItem(`favorited_${getAll?.data}`, 'true'); 
    //         console.log(getAll?.data);
            
    //     },
    // })
    // const {mutate: unfavoriteTourID}  = useMutation({
    //     mutationKey: ['unfavoriteTourID'], 
    //     mutationFn: () => tourApi.unfavoriteTourID(id),
    //     onSuccess: () => {
    //         setIsFavorited(false);
    //         localStorage.setItem(`favorited_${getAll?.data}`, 'false');
    //         console.log(getAll?.data, "123");
    //     },
    // })
    // console.log(`favorited_${id}`, 'false');
    


    // const handleClick = (id: string | undefined ) => {
    //   console.log(id,"id1");
      
    //     if (isFavorited && id === id) {
    //       setIsFavorited(true)
    //         //unfavoriteTourID();
    //     } else {
    //       setIsFavorited(false)
    //        // favoriteTourID();
    //     }

    // };


  
  
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
          
            <div className='flex w-full h-[23rem] overflow-hidden mb-5 shadow-2xl rounded-2xl' key={item.id}>
              <div className='relative bg-blue-300 w-[27%] flex-3'>
                <img src={item.image} className='object-cover w-full h-full ' alt='tour' />
                <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                  9 images
                </p>
              </div>
              <div className='p-3  w-[73%] '>
                <div className='flex justify-between '>
                  <div className='mr-2 border-b-2 border-gray-400 w-[85%]'>
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
                      <Button className='mr-3 bg-white border border-primary hover:bg-slate-100'>4.2</Button>
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
                <div className='w-full h-[25%] flex'>
                  <div className='flex flex-row items-center justify-between w-full '>
                    <Favorite id={item.id}/>
                    <Link to={`/tour/${item.id}`}  className='w-full'>
                      <div className='w-full p-3 text-center text-black border rounded-lg border-primary hover:bg-slate-200 ' >View Deals</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <PaginationDemo />
      </div>
    </div>
  )
}
export default ProductTour
