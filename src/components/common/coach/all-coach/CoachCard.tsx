import { coachApi } from '@/apis/coach.api'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { CoachResponseType } from '@/shared/ts/interface/data.interface'
import { formatDateStandard } from '@/shared/utils/date-utils'
import { DownOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Dropdown, MenuProps, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import FavoriteCoach from './FavoriteCoach'

interface CoachCardProps {
  minPrice?: number
  maxPrice?: number
  departDate?: string
  returnDate?: string
  brandCoach?: string[]
  searchTo?: string
  searchFrom?: string
}

const CoachCard: React.FC<CoachCardProps> = ({
  minPrice,
  maxPrice,
  returnDate,
  departDate,
  brandCoach,
  searchTo,
  searchFrom
}) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
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

  const { data: getAll, isLoading } = useQuery({
    queryKey: [
      'getAllCoach',
      page,
      sortByPrice,
      brandCoach || '',
      minPrice,
      maxPrice,
      departDate,
      returnDate,
      searchFrom,
      searchTo
    ],
    queryFn: () =>
      coachApi.getAll(
        page,
        4,
        '',
        sortByPrice,
        brandCoach?.join(','),
        minPrice,
        maxPrice,
        departDate,
        returnDate,
        searchFrom,
        searchTo
      )
  })

  const totalPages = Math.ceil((getAll?.total ?? 0) / 4)
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[30rem]'>
        <div className='w-8 h-8 border-4 border-[#a185f4] rounded-full border-t-transparent animate-spin'></div>
      </div>
    )
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

      {(getAll?.data?.length ?? 0) > 0 ? (
        getAll?.data.map((coach: CoachResponseType) => (
          <div key={coach.id} className='flex w-full lg:h-[22rem] h-[26rem] rounded-xl overflow-hidden'>
            <div className='w-[35%] bg-white relative'>
              <img src={coach.image} alt='coach' className='object-fill w-full lg:h-full h-[12rem] rounded-l-xl' />
              <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
                9 {t('images')}
              </p>
            </div>
            <div className='w-[65%] flex-7 h-full p-2 bg-white'>
              <div className='flex flex-col w-full h-full'>
                <div className='flex flex-row w-full h-[85%] border-b-2 border-gray-400 pb-4'>
                  <div className='flex flex-row w-full h-full'>
                    <div className='w-[70%] flex flex-col gap-4 '>
                      <div className='flex items-center gap-2 mt-2'>
                        <Button className='text-black bg-white border border-primary'>4.2</Button>
                        <p className='text-sm font-bold lg:text-md'>{t('Verygood')}</p>
                        <p className='text-sm lg:text-md'>54 {t('reviews')}</p>
                      </div>

                      <div className='mb-4'>
                        <div className='flex items-center mb-2'>
                          <div className='flex-grow'>
                            <div className='flex-col items-center gap-4 text-black'>
                              {/* <div className='gap-2 lg:flex text-md lg:lg:text-lg'>
                                <p>Time Start: {coach.start_time}</p>
                                <p>Time End: {coach.end_time}</p>
                              </div> */}
                              <div className='gap-2 lg:flex lg:lg:text-lg text-md'>
                                <p>{t('DayStart')}: {formatDateStandard(coach.start_day)}</p>
                                <p>{t('DayEnd')}: {formatDateStandard(coach.end_day)}</p>
                              </div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                        <div className='text-md lg:text-lg w-[30rem]'>{t('TripTime')}: {coach.trip_time}</div>
                        <div className='w-[30rem] mt-2 '>
                          <div className='flex flex-col w-full text-left text-gray-800'>
                            <div className='flex gap-2'>
                              <p className='mb-2 font-bold text-black'>{t('From')}:</p>
                              <p className='lg:w-[70%] w-[11rem] truncate '>{coach.take_place}</p>
                            </div>
                            <div className='flex gap-7'>
                              <p className='mb-2 font-bold text-black'>{t('To')}:</p>
                              <p className='lg:w-[70%] w-[11rem] truncate '>{coach.destination}</p>
                            </div>
                          </div>
                        </div>
                        <div className='items-center lg:ml-6 lg:text-lg'>
                          <div className='flex'><p className='mr-2 font-bold text-black '>{t('Brand')}: </p> {coach.brand}</div>
                          <p className='font-medium text-black-500 w-[11rem] truncate lg:w-[80%]'>{t('TripTo')}: {coach.destination}
                      </p>
                        </div>

                      </div>
                    </div>
                    <div className='relative w-[30%] pt-4 text-right mr-5'>
                      <p className='lg:text-xl text-md text-[#FF8682] font-bold'> {formatCurrencyVND(coach.price)}</p>
                    </div>
                  </div>
                </div>

                <div className='flex w-full mt-2'>
                  <div className='flex flex-row items-center w-full gap-2 mr-4'>
                    <FavoriteCoach id={coach.id} />
                    <Link to={`/vehicle/coach/${coach.id}`} className='w-full'>
                      <Button className='w-full mx-4 '>{t('ViewDeals')}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='text-center'>{t('Không có vé nào cho chuyến xe này')}</p>
      )}

      <div className='flex justify-around mt-6'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className='text-white'>
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                onClick={() => handlePageChange(1)}
                className={page === 1 ? 'bg-primary text-white' : 'bg-gray-400 text-white'}
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
                  className={page === page ? 'bg-primary text-white' : 'bg-gray-400 text-white'}
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
            {page < totalPages && (
              <PaginationItem>
                <Button
                  onClick={() => handlePageChange(totalPages)}
                  className={page === totalPages ? 'bg-primary text-white' : 'bg-gray-400  text-white'}
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            )}
            <PaginationItem>
              <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className='text-white'>
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
