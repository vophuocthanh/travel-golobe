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
import { Button } from '@/components/ui/button'
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
import { bookingFlightApi } from '@/apis/booking-flight'
import { useQuery } from '@tanstack/react-query'
import { PaymentListResponse } from '@/shared/ts/interface/booking-flight.interface'
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'

export function BillingFlight() {
  const navigate = useNavigate()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 1,
    pageSize: 5
  })

  const { data: getBookingsFlight } = useQuery({
    queryKey: ['getBookingsFlight'],
    queryFn: () => bookingFlightApi.getBookingFlight()
  })
  console.log('data', getBookingsFlight)

  const columns: ColumnDef<PaymentListResponse>[] = [
    {
      accessorKey: 'id',
      header: () => <div className='text-left'>ID</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('id')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'tourId',
      header: () => <div className='text-left'>tourId</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('tourId')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'flightCrawlId',
      header: () => <div className='text-left'>flightCrawlId</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('flightCrawlId')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'hotelCrawlId',
      header: () => <div className='text-left'>Hotel Crawl ID</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('hotelCrawlId')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'flightQuantity',
      header: () => <div className='text-left'>Flight Quantity</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('flightQuantity')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'hotelQuantity',
      header: () => <div className='text-left'>Hotel Quantity</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('hotelQuantity')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'tourQuantity',
      header: () => <div className='text-left'>Tour Quantity</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('tourQuantity')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'flightPrice',
      header: () => <div className='text-left'>Giá vé máy bay</div>,
      cell: ({ row }) => {
        const price = row.getValue('flightPrice')
        if (typeof price === 'number') {
          const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(price)
          return <div className='text-left'>{formattedPrice}</div>
        }
        return <div className='text-left'>N/A</div>
      },
      enableSorting: true
    },
    {
      accessorKey: 'tourPrice',
      header: () => <div className='text-left'>Giá vé chuyến du lịch </div>,
      cell: ({ row }) => {
        const price = row.getValue('tourPrice')
        if (typeof price === 'number') {
          const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(price)
          return <div className='text-left'>{formattedPrice}</div>
        }
        return <div className='text-left'>N/A</div>
      },
      enableSorting: true
    },
    {
      accessorKey: 'hotelPrice',
      header: () => <div className='text-left'>Giá vé khách sạn</div>,
      cell: ({ row }) => {
        const price = row.getValue('hotelPrice')
        if (typeof price === 'number') {
          const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(price)
          return <div className='text-left'>{formattedPrice}</div>
        }
        return <div className='text-left'>N/A</div>
      },
      enableSorting: true
    },

    {
      accessorKey: 'createdAt',
      header: () => <div className='text-left'>Created At</div>,
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'))
        const formattedDate = date.toLocaleString('en-US')
        return <div className='text-left'>{formattedDate}</div>
      },
      enableSorting: true
    },
    {
      accessorKey: 'amount',
      header: () => <div className='flex justify-center'>Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'))
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount)
        return <div className='flex justify-center font-medium'>{formatted}</div>
      },
      enableSorting: true
    },
    {
      accessorKey: 'status',
      header: () => <div className='flex justify-center'>Status</div>,
      cell: ({ row }) => {
        const status = row.getValue('status')
        let statusClass = 'bg-gray-200'

        if (status === 'PENDING') {
          statusClass = 'bg-green-100 text-green-800'
        } else if (status === 'PROCESING') {
          statusClass = 'bg-yellow-100 text-yellow-800'
        } else if (status === 'CANCELLED') {
          statusClass = 'bg-red-100 text-red-800'
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
      header: () => <div className='flex justify-center'>Actions</div>,
      cell: () => (
        <div className='flex justify-center space-x-6'>
          <div className='cursor-pointer' onClick={handleView}>
            <IconView />
          </div>
          <div className='cursor-pointer'>
            <IconEdit />
          </div>
          <div className='cursor-pointer'>
            <IconDelete />
          </div>
        </div>
      )
    }
  ]
  const bookingsFlight = getBookingsFlight?.data || []

  const table = useReactTable({
    data: bookingsFlight,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
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
      pagination
    }
  })

  // function handleEdit(payment: Payment) {
  //   console.log('Editing payment:', payment)
  // }

  // function handleDelete(payment: Payment) {
  //   console.log('Deleting payment:', payment)
  // }

  const handleView = () => {
    navigate(`/admin/billing/flight_view`)
  }
  // const handlePageChange = (newPageIndex: number) => {
  //   setPage(newPageIndex)
  // }
  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter id...'
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
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
      <div className='border rounded-md'>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
        <div className='space-x-2'>
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
