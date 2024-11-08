import { coachApi } from '@/apis/coach.api'
import { IconEdit, IconMore, IconSearch, IconView } from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CoachResponseType } from '@/shared/ts/interface/data.interface'
import { exportToExcel } from '@/shared/utils/excel-utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import RoadVehicleAdminDetele from './components/RoadVehicleAdminDetele'

export default function RoadVehicleAdmin() {
  const { data: getAllCoach } = useQuery({
    queryKey: ['getAllCoach'],
    queryFn: () => coachApi.getAll(1, 1, '')
  })
  const totalDataCount = getAllCoach?.total || 0
  const { data: CoachData } = useQuery({
    queryKey: ['getCoach', totalDataCount],
    queryFn: () => coachApi.getAll(1, totalDataCount, ''),
    enabled: totalDataCount > 0
  })

  const coachData = CoachData?.data || []
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [entriesPerPage, setEntriesPerPage] = React.useState(10)
  const [pageIndex, setPageIndex] = React.useState(0)

  const columns: ColumnDef<CoachResponseType>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='lowercase truncate'>{row.getValue('id')}</div>
    },
    {
      accessorKey: 'brand',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tên nhà xe
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='text-center'>{row.getValue('brand')}</div>
    },
    {
      accessorKey: 'image',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Hình ảnh
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => (
        <div className='text-left'>
          <img src={row.getValue('image')} alt='vehicle' className='object-cover h-12 mx-auto w-15' />
        </div>
      )
    },
    {
      accessorKey: 'number_of_seat',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Số chổ ngồi
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='text-center'>{row.getValue('number_of_seat')}</div>
    },
    {
      accessorKey: 'start_time',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Thời gian khởi hành
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='text-center'>{row.getValue('start_time')}</div>
    },
    {
      accessorKey: 'start_day',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Ngày khởi hành
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const endDate = new Date(row.getValue('start_day'))
        return <div>{endDate.toLocaleDateString('vi-VN')}</div>
      }
    },
    {
      accessorKey: 'end_time',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Thời gian kết thúc
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='text-center'>{row.getValue('end_time')}</div>
    },
    {
      accessorKey: 'end_day',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Ngày kết thúc
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const endDate = new Date(row.getValue('end_day'))
        return <div>{endDate.toLocaleDateString('vi-VN')}</div>
      }
    },
    {
      accessorKey: 'trip_time',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Thời gian chuyến xe
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='text-left'>{row.getValue('trip_time')}</div>
    },
    {
      accessorKey: 'take_place',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Điểm đi
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='text-left line-clamp-2'>{row.getValue('take_place')}</div>
    },
    {
      accessorKey: 'destination',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Điểm đến
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='text-left line-clamp-2'>{row.getValue('destination')}</div>
    },
    {
      accessorKey: 'location',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Vị trí
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='text-center'>{row.getValue('location')}</div>
    },
    {
      accessorKey: 'price',
      header: () => <div className='text-center'>Giá</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('price'))

        const formatted = new Intl.NumberFormat('vn-Vn', {
          style: 'currency',
          currency: 'VND'
        }).format(amount)

        return <div className='font-medium text-right'>{formatted}</div>
      }
    },
    {
      accessorKey: 'number_of_seats_remaining',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Số ghế còn lại
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='text-center'>{row.getValue('number_of_seats_remaining')}</div>
    },
    {
      accessorKey: 'action',
      header: () => <div className='flex justify-center text-center'>Hành động</div>,
      cell: ({ row }) => (
        <div className='flex justify-center space-x-6'>
          <div className=''>
            <Link to={`/admin/road-vehicle/view/${row.original.id}`}>
              <IconView />
            </Link>
          </div>
          <div className=''>
            <Link to={`/admin/road-vehicle/${row.original.id}`}>
              <IconEdit />
            </Link>
          </div>
          <div className=''>
            <RoadVehicleAdminDetele coachId={row.original.id} />
          </div>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: coachData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize: entriesPerPage
      }
    }
  })

  React.useEffect(() => {
    table.setPageSize(entriesPerPage)
  }, [entriesPerPage, table])

  React.useEffect(() => {
    table.setPageIndex(pageIndex)
  }, [pageIndex, table])

  const handleDownloadExcelRoadVehicle = () => {
    const data = coachData.map((item) => ({
      ID: item.id,
      'Tên nhà xe': item.brand,
      'Hình ảnh': item.image,
      'Số chổ ngồi': item.number_of_seat,
      'Thời gian khởi hành': item.start_time,
      'Ngày khởi hành': item.start_day,
      'Thời gian kết thúc': item.end_time,
      'Ngày kết thúc': item.end_day,
      'Thời gian chuyến xe': item.trip_time,
      'Điểm đi': item.take_place,
      'Điểm đến': item.destination,
      'Vị trí': item.location,
      Giá: item.price,
      'Số ghế còn lại': item.number_of_seats_remaining
    }))

    exportToExcel(data, 'road-vehicle')
  }

  return (
    <div className='w-full p-2'>
      <div className='flex items-center justify-between py-4'>
        <h1 className='text-2xl font-bold '>Road Vehicle - Admin</h1>
        <Button onClick={handleDownloadExcelRoadVehicle} className='flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25'
            />
          </svg>
          <p>Export to Excel</p>
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className='flex items-center justify-between py-4'>
            <div className='flex items-center'>
              <div className='flex items-center mr-4 space-x-2'>
                <span>Show</span>
                <select
                  className='p-2 border border-gray-300 rounded-lg'
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value))
                    setPageIndex(0)
                  }}
                >
                  {[10, 25, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className='relative'>
                <div className='absolute z-10 flex text-gray-500 top-2 left-3'>
                  <IconSearch />
                </div>
                <Input
                  placeholder='Filter coach brand...'
                  value={(table.getColumn('brand')?.getFilterValue() as string) ?? ''}
                  onChange={(event) => table.getColumn('brand')?.setFilterValue(event.target.value)}
                  className='max-w-sm pl-10 rounded-xl'
                />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Link to='/admin/road-vehicle/create'>
                <Button className='flex items-center justify-center gap-2 ml-auto text-white'>
                  <IconMore />
                  Add Road Vehicle
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='ml-auto'>
                    Columns <ChevronDown className='w-4 h-4 ml-2' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className='capitalize'
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='h-[calc(100vh-280px)] px-4 overflow-y-auto border rounded-md'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell, cellIndex) => (
                        <TableCell
                          key={cell.id}
                          className={`${cell.column.id === 'hotelId' ? 'sticky left-0 bg-white z-10' : ''} ${
                            cell.column.id === 'actions' ? 'sticky right-0 bg-white z-10' : ''
                          }`}
                          style={{
                            minWidth: cellIndex === 0 || cell.column.id === 'actions' ? '150px' : 'auto',
                            maxWidth: cellIndex === 0 || cell.column.id === 'actions' ? '150px' : 'auto'
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      <div className='flex items-center justify-center h-[30rem] mr-[40%]'>
                        <div className='w-8 h-8 border-4 border-[#a185f4] rounded-full border-t-transparent animate-spin'></div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex items-center justify-between py-4'>
            <span className='text-sm text-gray-700'>
              Showing page {pageIndex + 1} of {table.getPageCount()}
            </span>
            <div className='flex items-center'>
              <span className='pr-2'>Total Coachs: {totalDataCount}</span>
              <div className='flex space-x-2 text-white'>
                <Button onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))} disabled={pageIndex === 0}>
                  Previous
                </Button>
                <Button
                  onClick={() => setPageIndex((prev) => Math.min(prev + 1, table.getPageCount() - 1))}
                  disabled={pageIndex + 1 >= table.getPageCount()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
