import * as React from 'react'
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IconDelete, IconEdit, IconView } from '@/common/icons'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Tour, TourBillingResponseType } from '@/shared/ts/interface/data.interface'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { bookingTourApi } from '@/apis/booking-tour.api'

export function BillingTour() {
  const { data: getAllTourBilling } = useQuery({
    queryKey: ['getAllTourBilling'],
    queryFn: () => bookingTourApi.getBookingTour(1, 10)
  })
  const total = getAllTourBilling?.total || 0

  const { data: billingTourData } = useQuery({
    queryKey: ['getbilliingTour', total],
    queryFn: () => bookingTourApi.getBookingTour(1, total),
    enabled: total > 0
  })

  const billingTour = billingTourData?.data || []
  console.log('dataTour', billingTour)

  const navigate = useNavigate()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [entriesPerPage, setEntriesPerPage] = React.useState(10)
  const [pageIndex, setPageIndex] = React.useState(0)

  const columns: ColumnDef<TourBillingResponseType>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => (
        <div className='w-[10rem] lowercase overflow-hidden whitespace-nowrap truncate'>{row.getValue('id')}</div>
      )
    },
    {
      accessorKey: 'tourId',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Mã chuyến du lịch
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => (
        <div className='w-[10rem] lowercase break-words overflow-hidden whitespace-nowrap truncate'>
          {row.getValue('tourId')}
        </div>
      )
    },
    {
      accessorKey: 'userId',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Mã khách hàng
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => (
        <div className='w-[10rem] lowercase break-words overflow-hidden whitespace-nowrap truncate'>
          {row.getValue('userId')}
        </div>
      )
    },
    {
      accessorKey: 'tour',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Mã khách sạn
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => {
        const tour = row.getValue('tour') as Tour
        return (
          <div className='w-[10rem] lowercase break-words overflow-hidden whitespace-nowrap truncate'>
            {tour?.hotelId || 'N/A'}
          </div>
        )
      }
    },
    {
      accessorKey: 'tour',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Mã chuyến bay
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => {
        const tour = row.getValue('tour') as Tour
        return (
          <div className='w-[10rem] lowercase break-words overflow-hidden whitespace-nowrap truncate'>
            {tour?.flightId || 'N/A'}
          </div>
        )
      }
    },

    {
      accessorKey: 'totalAmount',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tổng số tiền
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('totalAmount'))

        const formatted = new Intl.NumberFormat('vn-Vn', {
          style: 'currency',
          currency: 'VND'
        }).format(amount)
        return <div className='font-medium text-center'>{formatted}</div>
      }
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Ngày tạo
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const endDate = new Date(row.getValue('createdAt'))
        return <div className='text-center '>{endDate.toLocaleDateString('vi-VN')}</div>
      }
    },
    {
      accessorKey: 'confirmationTime',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Thời gian xác nhận
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const endDate = new Date(row.getValue('confirmationTime'))
        return <div className='text-center '>{endDate.toLocaleDateString('vi-VN')}</div>
      }
    },
    {
      accessorKey: 'status',
      header: () => <div className='flex justify-center'>Trạng thái</div>,
      cell: ({ row }) => {
        const status = row.getValue('status')
        let statusClass = 'bg-gray-200'

        if (status === 'SUCCESS') {
          statusClass = 'bg-green-100 text-green-800'
        } else if (status === 'PENDING') {
          statusClass = 'bg-yellow-100 text-yellow-800'
        } else if (status === 'CANCELED') {
          statusClass = 'bg-red-100 text-red-800'
        } else if (status === 'CONFIRMED') {
          statusClass = 'bg-blue-100 text-blue-800'
        }


        return (
          <div className='flex items-center justify-center h-10'>
            <div className={`w-[7rem] text-center py-1 rounded-md capitalize ${statusClass}`}>
              {row.getValue('status')}
            </div>
          </div>
        )
      },
      enableSorting: true
    },

    {
      id: 'actions',
      header: () => <div className='flex justify-center'>Hành động</div>,
      cell: ({ row }) => (
        <div className='flex justify-center space-x-6'>
          <div className='cursor-pointer' onClick={() => handleView(row.original)}>
            {' '}
            <IconView />
          </div>
          <div className='cursor-pointer' onClick={() => handleEdit(row.original)}>
            {' '}
            <IconEdit />
          </div>
          <div className='cursor-pointer' onClick={() => handleDelete(row.original)}>
            {' '}
            <IconDelete />
          </div>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: billingTour,
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

  function handleEdit(payment: TourBillingResponseType) {
    console.log('Editing payment:', payment)
  }

  function handleDelete(payment: TourBillingResponseType) {
    console.log('Deleting payment:', payment)
  }

  const handleView = (tour: TourBillingResponseType) => {
    navigate(`/admin/billing/tour-view/${tour.id}`)
  }

  return (
    <div className='w-full'>
      <div className='flex items-center w-full py-4'>
        <span>Show</span>
        <select
          className='p-2 ml-4 border border-gray-300 rounded-lg'
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
        <Input
          placeholder='Filter id...'
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
          className='max-w-sm ml-4'
        />
        <div className='flex items-center gap-4 ml-auto'>
          <DropdownMenu>
            <DropdownMenuTrigger>
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
      <div className='border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='w-[3rem]'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='w-[3rem'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='w-full py-8'>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='w-full'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
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
        <span className='pr-[2px]'>Total Billing : {total}</span>
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
    </div>
  )
}
