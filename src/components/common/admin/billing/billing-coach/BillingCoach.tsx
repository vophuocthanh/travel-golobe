import { bookingCoachApi } from '@/apis/booking-coach'
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
import { BillingCoachResponseAdmin } from '@/shared/ts/interface/booking-coach.interface'
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

export function BillingCoach() {
  const { data: getCoachBilling } = useQuery({
    queryKey: ['getAllBilling'],
    queryFn: () => bookingCoachApi.getBookingCoach(1, 1)
  })

  const totalDataCount = getCoachBilling?.total || 0

  const { data: billiingCoachData } = useQuery({
    queryKey: ['getBilling', totalDataCount],
    queryFn: () => bookingCoachApi.getBookingCoach(1, totalDataCount),
    enabled: totalDataCount > 0
  })

  const billing = billiingCoachData?.data || []
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [entriesPerPage, setEntriesPerPage] = React.useState(10)
  const [pageIndex, setPageIndex] = React.useState(0)

  const columns: ColumnDef<BillingCoachResponseAdmin>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('id')}</div>
    },
    {
      accessorKey: 'userId',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Mã khách hàng
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('userId')}</div>
    },
    {
      accessorKey: 'roadVehicleId',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Mã chuyến xe
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('roadVehicleId')}</div>
    },
    {
      accessorKey: 'roadVehicleQuantity',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Số lượng chuyến xe
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => (
        <div className='w-[5rem] lowercase break-words text-center'>{row.getValue('roadVehicleQuantity')}</div>
      )
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
      header: () => <div className='flex justify-center'>Actions</div>,
      cell: ({ row }) => (
        <div className='flex justify-center space-x-6'>
          <Button variant='ghost' className='w-8 h-8 cursor-pointer'>
            <Link to={`/admin/billing/coach-view/${row.original.id}`}>
              <IconView />
            </Link>
          </Button>
          <div className='w-8 h-8 cursor-pointer' onClick={() => handleEdit(row.original)}>
            <IconEdit />
          </div>
          <div className='w-8 h-8 cursor-pointer' onClick={() => handleDelete(row.original)}>
            <IconDelete />
          </div>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: billing,
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

  function handleEdit(payment: BillingCoachResponseAdmin) {
    console.log('Editing payment:', payment)
  }

  function handleDelete(payment: BillingCoachResponseAdmin) {
    console.log('Deleting payment:', payment)
  }

  return (
    <div className='w-full'>
      <div className='flex items-center w-full gap-4 py-4'>
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
        <Input
          placeholder='Filter id...'
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
          className='max-w-sm'
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
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
        <span className='pr-[2px]'>Total Billing Coach: {totalDataCount}</span>
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
