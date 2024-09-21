import * as React from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
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

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import IconEdit from '@/assets/icons/icon-edit'
import IconDelete from '@/assets/icons/icon-delete'
import { Link } from 'react-router-dom'

import { CaretSortIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

export type Payment = {
  id: string
  flight: string
  customer: string
  date: string
  amount: number
  PaymentMode: string
  status: 'Delivered' | 'Process' | 'Canceled'
  airline: string
}
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tracking ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('id')}</div>
  },
  {
    accessorKey: 'flight',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Flight
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const flightImage = row.getValue('flight') as string
      const airlineName = row.getValue('airline') as string

      return (
        <div className='flex flex-col items-center justify-center'>
          <img src={flightImage} alt='Flight Image' className='object-cover w-16 h-16' />
          <p className='mt-1 text-sm text-center text-black lowercase'>{airlineName}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'airline',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Airline
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('airline')}</div>
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Customer
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('customer')}</div>
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('date')}</div>
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)

      return <div className='font-medium text-right'>{formatted}</div>
    }
  },
  {
    accessorKey: 'PaymentMode',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Payment Mode
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('PaymentMode')}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      let statusColor = ''

      switch (status) {
        case 'Delivered':
          statusColor = 'text-green-500'
          break
        case 'Process':
          statusColor = 'text-orange-500'
          break
        case 'Canceled':
          statusColor = 'text-red-500'
          break
        default:
          statusColor = 'text-gray-500'
          break
      }

      return <div className={`capitalize ${statusColor}`}>{status}</div>
    }
  },
  {
    accessorKey: 'Action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <Link to={`/admin/flights/${row.original.id}`}>
            <IconEdit />
          </Link>
          <Button variant='ghost' className='w-8 h-8 p-0'>
            <IconDelete />
          </Button>
        </div>
      )
    }
  }
]
function FlightAdmin() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const data: Payment[] = [
    {
      id: '#20462',
      flight: 'https://via.placeholder.com/150',
      customer: 'Matt Dickerson',
      date: '24/12/2023',
      amount: 316,
      PaymentMode: 'Transfer Bank',
      status: 'Delivered',
      airline: 'Vietnam Airlines' // Thêm hãng hàng không
    },
    {
      id: '#20463',
      flight:
        'https://plus.unsplash.com/premium_photo-1679758629450-30d2263efca5?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      customer: 'Sarah Johnson',
      date: '24/12/2023',
      amount: 289,
      PaymentMode: 'Credit Card',
      status: 'Process',
      airline: 'VietJet Air'
    },
    {
      id: '#20464',
      flight:
        'https://media.istockphoto.com/id/667426946/photo/the-plane-at-the-airport.webp?a=1&b=1&s=612x612&w=0&k=20&c=HeADzKhERX5gw0jOnw1Yc30u1pDDaNUIveiCgTPGXGw=',
      customer: 'John Doe',
      date: '24/12/2023',
      amount: 512,
      PaymentMode: 'PayPal',
      status: 'Process',
      airline: 'Bamboo Airways'
    },
    {
      id: '#20465',
      flight: 'https://example.com/flight_image4.jpg',
      customer: 'Alice Brown',
      date: '24/12/2023',
      amount: 432,
      PaymentMode: 'Transfer Bank',
      status: 'Delivered',
      airline: 'Pacific Airlines'
    },
    {
      id: '#20466',
      flight: 'https://example.com/flight_image5.jpg',
      customer: 'James Williams',
      date: '24/12/2023',
      amount: 220,
      PaymentMode: 'Cash',
      status: 'Delivered',
      airline: 'Vietnam Airlines'
    },
    {
      id: '#20467',
      flight: 'https://example.com/flight_image6.jpg',
      customer: 'Emily Davis',
      date: '24/12/2023',
      amount: 350,
      PaymentMode: 'Credit Card',
      status: 'Delivered',
      airline: 'VietJet Air'
    },
    {
      id: '#20468',
      flight: 'https://example.com/flight_image7.jpg',
      customer: 'Michael Smith',
      date: '24/12/2023',
      amount: 278,
      PaymentMode: 'Transfer Bank',
      status: 'Process',
      airline: 'Bamboo Airways'
    },
    {
      id: '#20469',
      flight: 'https://example.com/flight_image8.jpg',
      customer: 'Jessica Lee',
      date: '24/12/2023',
      amount: 495,
      PaymentMode: 'PayPal',
      status: 'Process',
      airline: 'Pacific Airlines'
    },
    {
      id: '#20470',
      flight: 'https://example.com/flight_image9.jpg',
      customer: 'David Clark',
      date: '24/12/2023',
      amount: 410,
      PaymentMode: 'Cash',
      status: 'Delivered',
      airline: 'Vietnam Airlines'
    },
    {
      id: '#20471',
      flight: 'https://example.com/flight_image10.jpg',
      customer: 'Sophia Miller',
      date: '22/10/2015',
      amount: 298,
      PaymentMode: 'Credit Card',
      status: 'Canceled',
      airline: 'VietJet Air'
    }
  ]

  const table = useReactTable({
    data,
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

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <div className='flex gap-8'>
          <p className='mt-2'>Show</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='flex items-center h-10 ml-auto'>
                <span className='text-sm'>10</span>
                <ChevronDownIcon className='w-4 h-4 ml-2' />
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
          <p className='mt-2'>entries</p>
        </div>
        <Input
          placeholder='Filter customer...'
          value={(table.getColumn('customer')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('customer')?.setFilterValue(event.target.value)}
          className='max-w-sm ml-20'
        />
        <Button className='bg-[#624DE3] text-white ml-[36rem]'>+ Add Customer</Button>
      </div>
      <div className='border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='text-black'>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end py-4 space-x-2'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
export default FlightAdmin
