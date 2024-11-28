import { flightApi } from '@/apis/flight.api'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { FlightResponseType } from '@/shared/ts/interface/data.interface'
import { DownOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Dropdown, MenuProps, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Favorite from './favorite'

interface FlightCardProps {
  minPrice?: number
  maxPrice?: number
  departDate?: string
  returnDate?: string
  brandFlight?: string[]
  searchTo?: string
  searchFrom?: string
  selectUniqueType?: string
}

const FlightCard: React.FC<FlightCardProps> = ({
  minPrice,
  maxPrice,
  returnDate,
  departDate,
  brandFlight,
  searchFrom,
  searchTo,
  selectUniqueType
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
      'getAllFlight',
      page,
      sortByPrice,
      brandFlight || '',
      minPrice,
      maxPrice,
      departDate,
      returnDate,
      searchTo,
      searchFrom,
      selectUniqueType
    ],
    queryFn: () =>
      flightApi.getAll(
        page,
        4,
        '',
        sortByPrice,
        brandFlight?.join(','),
        minPrice,
        maxPrice,
        departDate,
        returnDate,
        searchFrom,
        searchTo,
        selectUniqueType
      )
  })

  const totalPages = Math.ceil((getAll?.total ?? 0) / 4)
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[30rem]">
        <div className="w-8 h-8 border-4 border-[#a185f4] rounded-full border-t-transparent animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mt-20 mb-4 max-sm:pr-[2rem]">
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()} className="ml-auto">
            <Space>
              {t('Sortby')}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>

      {(getAll?.data?.length ?? 0) > 0 ? (
        getAll?.data.map((flight: FlightResponseType) => (
          <div
            key={flight.id}
            className="flex xl:w-full  xl:h-[23rem] rounded-xl overflow-hidden max-sm:h-[15rem] mb-2 max-sm:w-[98%] "
          >
            <div className="w-[40%] bg-white relative">
              <img
                src={flight.image}
                alt="Flight"
                className="object-cover rounded-md w-[90%] xl:ml-8 mt-4 h-[90%] max-sm:w-full max-sm:ml-2"
              />
              <p className="h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-6 right-2 max-sm:text-xs">
                9 images
              </p>
            </div>
            <div className="w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF] pr-4">
              <div className="flex flex-col w-full h-full ">
                <div className="w-full h-[75%] border-b-2 border-gray-400 mr-10 ">
                  <div className="flex flex-row w-full h-full">
                    <div className="w-[70%] flex flex-col gap-4">
                      <div className="flex items-center gap-2 xl:mt-8 max-sm:mt-4">
                        <Button className="bg-primary border-primary hover:bg-green-300 max-sm:text-xs max-sm:ml-2">
                          4.2
                        </Button>
                        <p className="font-bold max-sm:text-xs">Very good</p>
                        <p className="max-sm:hidden">54 reviews</p>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex-grow">
                            <div className="flex items-center justify-center gap-4 text-black ">
                              <div className="xl:text-2xl max-sm:text-xs max-sm:w-[100%] max-sm:ml-2">
                                {flight.start_time} - {flight.end_time}
                              </div>
                              <div></div>
                              <div className="xl:text-2xl max-sm:text-xs max-sm:w-[90%] ">
                                Trip Time: {flight.trip_time}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                        <div className="flex xl:w-[30rem] max-sm:w-[10rem]">
                          <p className="text-left text-gray-500 mr-[4rem] xl:ml-9">
                            <div className="flex ">
                              <p className="flex mb-2 font-bold text-black max-sm:text-xs ">From- </p>
                              <p className="max-sm:text-xs max-sm:w-full">{flight.take_place}</p>
                            </div>
                            <div className="flex max-sm:flex-row">
                              <p className="font-bold text-black max-sm:text-xs ">To- </p>
                              <p className="max-sm:text-xs max-sm:w-[13rem]">{flight.destination}</p>
                            </div>
                          </p>
                        </div>
                        <div className="flex mt-8 ml-6 xl:text-xl max-sm:hidden">
                          <p className="mr-2 font-bold text-black ">Brand: </p> {flight.brand}
                        </div>
                      </div>
                    </div>
                    <div className="w-[30%] pt-4 text-right xl:mr-5 ">
                      <p className="xl:text-xl text-[#FF8682] font-bold ">{formatCurrencyVND(flight.price)}</p>
                      <p className="mt-40 font-medium text-right text-black-500 max-sm:hidden">
                        Trip To: {flight.trip_to}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[25%] flex">
                  <div className="flex flex-row w-full gap-4 xl:items-center ">
                    <Favorite id={flight.id} />
                    <Link to={`/vehicle/flight/${flight.id}`} className="w-full pr-6 max-sm:text-right">
                      <Button className="w-full mx-4 text-white max-sm:w-[6rem] max-sm:h-[2rem] max-sm:mt-2 max-sm:ml-[8rem]">
                        {t('ViewDeals')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="flex justify-center w-full text-center">{t('availableFlight')}</p>
      )}

      <div className="flex justify-around mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="text-white">
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                onClick={() => handlePageChange(1)}
                className={page === 1 ? 'bg-primary text-white' : 'bg-gray-400 text-black'} // Nút trang đầu
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
                  className={page === page ? 'bg-primary text-white' : 'bg-gray-400 text-black'} // Nút trang hiện tại
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
                  className={page === totalPages ? 'bg-primary text-white' : 'bg-gray-400 text-black'}
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            )}
            <PaginationItem>
              <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="text-white">
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default FlightCard
