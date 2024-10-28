import { bookingHotelApi } from '@/apis/booking-hotel.api'
import { IconDelete, IconEdit, IconView } from '@/common/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PaymentHotel } from '@/shared/ts/interface/booking-hotel.interface'
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
import { Spin } from 'antd'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function BillingHotel() {
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const { data: getBookingHotelData, isLoading } = useQuery({
    queryKey: ['getBookingHotel', page],
    queryFn: () => bookingHotelApi.getBookingHotel(itemsPerPage, page)
  })

  const totalPages = Math.ceil((getBookingHotelData?.total ?? 0) / itemsPerPage)
  const totalPage = Math.ceil(getBookingHotelData?.total ?? 0)

  const handleClick = (newPage: number) => {
    setPage(newPage)
  }

  const columns: ColumnDef<PaymentHotel>[] = [
    {
      accessorKey: 'id',
      header: () => <div className='text-left'>ID</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('id')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'userId',
      header: () => <div className='text-left'>Mã khách hàng</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('userId')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'hotelQuantity',
      header: () => <div className='text-left'>Số lượng khách sạn</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('hotelQuantity')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'totalAmount',
      header: () => <div className='text-left'>Tổng số tiền</div>,
      cell: ({ row }) => {
        const price = row.getValue('totalAmount')
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
    data: getBookingHotelData?.data || [],
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
      rowSelection
    }
  })

  function handleEdit(payment: PaymentHotel) {
    console.log('Editing payment:', payment)
  }

  function handleDelete(payment: PaymentHotel) {
    console.log('Deleting payment:', payment)
  }

  const handleView = (payment: PaymentHotel) => {
    navigate(`/admin/billing/hotel-view/${payment.id}`)
  }

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between py-4'>
        <Input
          placeholder='Filter ID...'
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <div className='flex items-center'>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  <Spin />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-end py-4 space-x-2'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Page {page} of {totalPages}
        </div>
        <p className='px-5'>Total :{totalPage} </p>
        <div className='pr-4 space-x-2'>
          <Button
            className='px-4 py-2 text-white rounded min-w-[100px] text-center'
            disabled={page === 1}
            onClick={() => handleClick(page - 1)}
          >
            Previous
          </Button>
          <Button
            className='px-4 text-white py-2 min-w-[100px]'
            onClick={() => handleClick(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
