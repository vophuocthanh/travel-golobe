import { coachApi } from '@/apis/coach.api'
import { imgcoach } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { CoachResponseType } from '@/shared/ts/interface/data.interface'
import { DownOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Dropdown, MenuProps, Space } from 'antd'
import { Heart } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

interface CoachCardProps {
  isFavorite: boolean
  onToggleFavorite: () => void
  minPrice?: number
  maxPrice?: number
  departDate?: string
  returnDate?: string
}

const CoachCard: React.FC<CoachCardProps> = ({
  isFavorite,
  onToggleFavorite,
  minPrice,
  maxPrice,
  returnDate,
  departDate
}) => {
  const [page, setPage] = useState(1)
  const { t } = useTranslation();
  const [sortByPrice, setSortByPrice] = useState('')
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: t('Sortby'),
      disabled: true
    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: t('High'),
      onClick: () => setSortByPrice('desc')
    },
    {
      key: '3',
      label: t('Low'),
      onClick: () => setSortByPrice('asc')
    },
    {
      key: '4',
      label: t('sorting'),
      onClick: () => setSortByPrice('')
    }
  ]

  const { data: getAll } = useQuery({
    queryKey: ['getAllCoach', page, sortByPrice, minPrice, maxPrice, departDate, returnDate],

    queryFn: () => coachApi.getAll(page, 4, sortByPrice, minPrice, maxPrice, departDate, returnDate)
  })

  const totalPages = Math.ceil((getAll?.total ?? 0) / 4)
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'N/A'
    const numberValue = parseFloat(value)
    return isNaN(numberValue)
      ? 'N/A'
      : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberValue)
  }

  return (
    <>
      <div className='flex items-center justify-between mt-8'>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()} className='ml-auto'>
            <Space>
              {t('Sortby')}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>

      {getAll?.data.map((coach: CoachResponseType) => (
        <div key={coach.id} className='flex w-full h-[23rem] rounded-xl overflow-hidden'>
          <div className='w-[40%] bg-white relative'>
            <img src={imgcoach} alt='coach' className='object-fill w-full h-full rounded-l-xl' />
            <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
              9 images
            </p>
          </div>
          <div className='w-[65%] flex-7 h-full p-4 bg-white'>
            <div className='flex flex-col w-full h-full'>
              <div className='flex flex-row w-full h-[85%] border-b-2 border-gray-400 pb-4'>
                  <div className='w-[70%] flex flex-col gap-4 '>
                    <div className='flex items-center gap-2 mt-2'>
                      <Button className='text-black bg-white border border-primary'>4.2</Button>
                      <p className='font-bold'>Very good</p>
                      <p>54 reviews</p>
                    </div>

                    <div className='mb-4'>
                      <div className='flex items-center mb-2'>
                        <div className='flex-grow'>
                          <div className='flex items-center gap-4 text-black'>
                            <div className='flex gap-2 text-xl'>
                              <p>Time Start: </p>{coach.start_time} - <p>Time End:</p>{coach.end_time}
                            </div>
                            <div>
                          </div>
                          </div>
                        </div>
                      </div>
                      <div className='text-xl'>Trip Time: {coach.trip_time}</div>
                      <div className='w-full py-2 pr-2'>
                        <div className='flex flex-col w-full text-left text-gray-800'>
                          <div className='flex gap-2'>
                            <p className='mb-2 font-bold text-black'>From:</p>
                            <p className='flex line-clamp-2'>{coach.take_place}</p>
                          </div>
                          <div className='flex gap-7'>
                            <p className='mb-2 font-bold text-black'>To:</p>
                            <p className='flex line-clamp-2'>{coach.destination}</p>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center mt-2 ml-6 text-xl'>
                        <p className='mr-2 font-bold text-black '>Brand: </p> {coach.brand}
                      </div>
                    </div>
                  </div>
                  <div className='relative w-[30%] pt-4 text-right mr-5'>
                    <p className='text-xl text-[#FF8682] font-bold'> {formatCurrency(coach.price?.toString())}</p>
                    <p className='absolute bottom-0 font-medium text-right text-black-500 line-clamp-2'>Trip To: {coach.destination}</p>
                  </div>
              </div>

              <div className='flex w-full mt-2'>
                <div className='flex flex-row items-center w-full gap-2 mr-4'>
                  <Button
                    className={isFavorite ? 'bg-white border border-primary' : 'bg-primary text-white w-[3.6rem] '}
                    onClick={onToggleFavorite}
                  >
                    <Heart />
                  </Button>
                  <Link to={`/vehicle/coach/${coach.id}`} className='w-full'>
                    <Button className='w-full mx-4 '>{t('ViewDeals')}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className='flex justify-around mt-6'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                onClick={() => handlePageChange(1)}
                className={page === 1 ? 'bg-primary' : 'bg-gray-400 '} // Nút trang đầu
              >
                1
              </Button>
            </PaginationItem>
            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page > 1 && page < totalPages && (
              <PaginationItem>
                <Button
                  onClick={() => handlePageChange(page)}
                  className={page === page ? 'bg-primary ' : 'bg-gray-400 '} // Nút trang hiện tại
                >
                  {page}
                </Button>
              </PaginationItem>
            )}
            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {totalPages > 1 && (
              <PaginationItem>
                <Button
                  onClick={() => handlePageChange(totalPages)}
                  className={page === totalPages ? 'bg-primary ' : 'bg-gray-400 '} // Nút trang cuối
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            )}
            <PaginationItem>
              <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default CoachCard
