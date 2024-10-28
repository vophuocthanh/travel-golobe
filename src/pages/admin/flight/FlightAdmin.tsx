import IconEdit from '@/assets/icons/icon-edit'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
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
import * as React from 'react'

import { flightApi } from '@/apis/flight.api'
import { IconSearch } from '@/common/icons'
import { Card } from '@/components/ui/card'
import { FlightResponseType } from '@/shared/ts/interface/data.interface'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

import { formatCurrencyVND } from '@/shared/lib/format-price'
import { exportToExcel } from '@/shared/utils/excel-utils'
import { Spin } from 'antd'
import DeleteFlightButton from './components/DeleteFlightAdmin'

const FlightAdmin: React.FC = () => {
  const { data: getAllFlights } = useQuery({
    queryKey: ['getAllPageFlightAdmin'],
    queryFn: () => flightApi.getAll(1, 1, '')
  })
  const totalDataCount = getAllFlights?.total || 0

  const { data: flightData } = useQuery({
    queryKey: ['getFlights', totalDataCount],
    queryFn: () => flightApi.getAll(1, totalDataCount, ''),
    enabled: totalDataCount > 0
  })

  const flightsData = flightData?.data || []

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [entriesPerPage, setEntriesPerPage] = React.useState(10)
  const [pageIndex, setPageIndex] = React.useState(0)
  const columns: ColumnDef<FlightResponseType>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => (
        <div className='w-[10rem] lowercase break-words overflow-hidden whitespace-nowrap truncate'>
          {row.getValue('id')}
        </div>
      )
    },
    {
      accessorKey: 'brand',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tên hãng
          <CaretSortIcon className='w-4 h-4 ml-2 ' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-40'>{row.getValue('brand')}</div>
    },
    {
      accessorKey: 'image',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Hình ảnh
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const flightImage = row.getValue('image') as string

        return (
          <div className='flex flex-col items-center justify-center'>
            <img src={flightImage} alt='Flight Image' className='object-cover w-16 h-16' />
          </div>
        )
      }
    },
    {
      accessorKey: 'start_time',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Thời gian khởi hành
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='text-center lowercase '>{row.getValue('start_time')}</div>
    },
    {
      accessorKey: 'end_time',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Thời gian kết thúc
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='text-center lowercase'>{row.getValue('end_time')}</div>
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
        return <div className='text-center'>{endDate.toLocaleDateString('vi-VN')}</div>
      }
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
        return <div className='text-center'>{endDate.toLocaleDateString('vi-VN')}</div>
      }
    },
    {
      accessorKey: 'trip_time',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Thòi gian chuyến bay
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='text-center'>{row.getValue('trip_time')}</div>
    },
    {
      accessorKey: 'take_place',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Điểm đi
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='w-[10rem] text-center break-words overflow-hidden whitespace-nowrap truncate'>
          {row.getValue('take_place')}
        </div>
      )
    },
    {
      accessorKey: 'destination',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Điểm đến
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='w-[10rem] text-center break-words overflow-hidden whitespace-nowrap truncate'>
          {row.getValue('destination')}
        </div>
      )
    },
    {
      accessorKey: 'createAt',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Ngày tạo
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const endDate = new Date(row.getValue('createAt'))
        return <div className='text-center'>{endDate.toLocaleDateString('vi-VN')}</div>
      }
    },
    {
      accessorKey: 'price',
      header: () => <div className='text-center'>Giá</div>,
      cell: ({ row }) => {
        return <div className='font-medium text-center'>{formatCurrencyVND(row.getValue('price'))}</div>
      }
    },
    {
      accessorKey: 'Action',
      header: () => <div className='text-center'>Hành động</div>,
      cell: ({ row }) => {
        return (
          <div className='flex space-x-2'>
            <Button variant='ghost' className='w-8 h-8 '>
              <Link to={`/admin/flights/${row.original.id}`}>
                <IconEdit />
              </Link>
            </Button>

            <DeleteFlightButton flightId={row.original.id} />
          </div>
        )
      }
    }
  ]
  const table = useReactTable({
    data: flightsData,
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

  const handleDownloadExcelFlight = () => {
    const dataToExport = flightsData.map((flight) => ({
      Mã: flight.id,
      TênHãng: flight.brand,
      HìnhẢnh: flight.image,
      ThờiGianKhởiHành: flight.start_time,
      NgàyKhởiHành: flight.start_day,
      ThờiGianKếtThúc: flight.end_time,
      NgàyKếtThúc: flight.end_day,
      ThờiGianChuyếnBay: flight.trip_time,
      ĐiểmĐi: flight.take_place,
      ĐiểmĐến: flight.destination,
      NgàyTạo: flight.create_at ? new Date(flight.create_at).toLocaleDateString('vi-VN') : '',
      Giá: new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(flight.price)
    }))

    exportToExcel(dataToExport, 'FlightsData')
  }

  return (
    <div className='w-full p-2'>
      <div className='flex items-center justify-between'>
        <p className='text-2xl font-bold'>Flight - Admin</p>
        <Button onClick={handleDownloadExcelFlight} className='flex items-center gap-2'>
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
      <Card className='p-4 mt-5'>
        <div className='flex items-center justify-between p-2 py-2'>
          <div className='flex items-center'>
            <div className='flex items-center mr-4 space-x-2'>
              <span>Show</span>
              <select
                className='p-2 border border-gray-300 rounded-lg'
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value))
                  table.setPageIndex(0)
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
                placeholder='Filter tour name...'
                value={(table.getColumn('brand')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('brand')?.setFilterValue(event.target.value)}
                className='max-w-sm pl-10 rounded-xl'
              />
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Link to='/admin/flight/create'>
              <Button className='text-white'>+ Add Flight</Button>
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
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='px-4 border rounded-md'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className='text-black'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    <Spin />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end py-4 space-x-2'>
          <div className='flex-1 text-sm text-muted-foreground'>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <span className='pr-2'>Total Flights: {totalDataCount}</span>
          <div className='pr-4 space-x-2'>
            <Button
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
              className='text-white'
            >
              Previous
            </Button>
            <Button
              onClick={() => setPageIndex((prev) => Math.min(prev + 1, table.getPageCount() - 1))}
              disabled={pageIndex + 1 >= table.getPageCount()}
              className='text-white'
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
export default FlightAdmin
