import { paymentApi } from '@/apis/payment.api'
import { IconDelete, IconEdit, IconView } from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { exportToExcel } from '@/shared/utils/excel-utils'
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
import { useNavigate } from 'react-router-dom'

interface Payment {
  id: string
  bookingId: string | null
  userId: string
  amount: number
  paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'MOMO' | 'BANK_TRANSFER'
  status: 'COMPLETED' | 'PENDING' | 'FAILED'
  orderId: string
  createdAt: string
  updatedAt: string
}

export default function PaymentAdmin() {
  const { data: getAllPayemnt } = useQuery({
    queryKey: ['getAllPayemnt'],
    queryFn: () => paymentApi.getAllPayemnt()
  })
  const Data = getAllPayemnt?.data || []

  const navigate = useNavigate()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'id',
      header: () => <div className='text-center'>ID</div>,
      cell: ({ row }) => (
        <div className='text-center w-[12rem] lowercase break-words overflow-hidden whitespace-nowrap truncate'>
          {row.getValue('id')}
        </div>
      ),
      enableSorting: true
    },
    {
      accessorKey: 'bookingId',
      header: () => <div className='text-center '>ID đặt</div>,
      cell: ({ row }) => (
        <div className='text-center w-[15rem] lowercase break-words overflow-hidden whitespace-nowrap truncate'>
          {row.getValue('bookingId')}
        </div>
      ),
      enableSorting: true
    },
    {
      accessorKey: 'userId',
      header: () => <div className='text-center'>ID người dùng</div>,
      cell: ({ row }) => <div className='text-center'>{row.getValue('userId')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'status',
      header: () => <div className='flex justify-center'>Trạng thái</div>,
      cell: ({ row }) => {
        const status = row.getValue('status')
        let statusClass = 'bg-gray-200'

        if (status === 'COMPLETED') {
          statusClass = 'bg-green-100 text-green-800'
        } else if (status === 'PENDING') {
          statusClass = 'bg-yellow-100 text-yellow-800'
        } else if (status === 'FAILED') {
          statusClass = 'bg-red-100 text-red-800'
        }

        return (
          <div className='flex items-center justify-center h-10'>
            <div className={`w-[7rem] text-center py-1 rounded-md ${statusClass}`}>{row.getValue('status')}</div>
          </div>
        )
      },
      enableSorting: true
    },
    {
      accessorKey: 'paymentMethod',
      header: () => <div className='w-40 text-center'>Phương thức thanh toán </div>,
      cell: ({ row }) => <div className='text-center'>{row.getValue('paymentMethod')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'orderId',
      header: () => <div className='text-center '>Id đặt hàng</div>,
      cell: ({ row }) => (
        <div className='text-center w-[10rem]  break-words overflow-hidden whitespace-nowrap truncate'>
          {row.getValue('orderId')}
        </div>
      ),
      enableSorting: true
    },
    {
      accessorKey: 'createdAt',
      header: () => <div className='text-center w-[10rem]'>Ngày mua</div>,
      cell: ({ row }) => {
        const createdAt = new Date(row.getValue('createdAt'))
        const formattedDate = new Intl.DateTimeFormat('vi-VN', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }).format(createdAt)

        return <div className='text-center'>{formattedDate}</div>
      },
      enableSorting: true
    },
    {
      accessorKey: 'amount',
      header: () => <div className='flex justify-center'>Tổng cộng</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'))
        const formatted = new Intl.NumberFormat('vi-vn', {
          style: 'currency',
          currency: 'VND'
        }).format(amount)
        return <div className='flex justify-center font-medium'>{formatted}</div>
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
    data: Data,
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

  function handleEdit(payment: Payment) {
    console.log('Editing payment:', payment)
  }

  function handleDelete(payment: Payment) {
    console.log('Deleting payment:', payment)
  }

  const handleView = (paymenID: Payment) => {
    navigate(`/admin/payment/payment-view/${paymenID.id}`)
  }

  const handleExportExcelPayment = () => {
    const dataPayemnt = Data.map((item: Payment) => ({
      Mã: item.id,
      'Mã đặt hàng': item.bookingId,
      'Mã người dùng': item.userId,
      'Tổng cộng': item.amount,
      'Trạng thái': item.status,
      'Phương thức thanh toán': item.paymentMethod,
      'Id đặt hàng': item.orderId,
      'Ngày mua': item.createdAt
    }))

    exportToExcel(dataPayemnt, 'PaymentData')
  }

  return (
    <div className='w-full p-2'>
      <Card>
        <CardHeader>
          <CardTitle className='flex w-full h-[3rem] items-center justify-between'>
            <h1 className='mb-4 text-2xl font-bold '>Payment - Admin</h1>
            <Button className='text-white' onClick={handleExportExcelPayment}>
              Download
            </Button>
          </CardTitle>
          <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
        </CardHeader>
        <CardContent>
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
          <div className='h-[calc(100vh-430px)] px-4 overflow-y-auto border rounded-md'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
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
                      <div className='flex items-center justify-center h-[30rem] mr-[40%]'>
                        <div className='w-8 h-8 border-4 border-[#a185f4] rounded-full border-t-transparent animate-spin'></div>
                      </div>
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
            <div className='space-x-2 '>
              <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
