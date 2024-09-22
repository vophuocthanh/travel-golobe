import { IconDelete, IconEdit, IconMore, IconSearch } from '@/common/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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

export type Hotel = {
  hotelId: string
  hotelName: string
  location: string
  roomsAvailable: number
  pricePerNight: number
  rating: number
  status: string
}

const data: Hotel[] = [
  {
    hotelId: 'H1001',
    hotelName: 'Grand Plaza',
    location: 'New York, USA',
    roomsAvailable: 50,
    pricePerNight: 250,
    rating: 4.5,
    status: 'Delivered'
  },
  {
    hotelId: 'H1002',
    hotelName: 'Royal Gardens',
    location: 'London, UK',
    roomsAvailable: 30,
    pricePerNight: 180,
    rating: 4.7,
    status: 'Process'
  },
  {
    hotelId: 'H1003',
    hotelName: 'Sunset Beach Resort',
    location: 'Malibu, USA',
    roomsAvailable: 12,
    pricePerNight: 400,
    rating: 4.9,
    status: 'Canceled'
  },
  {
    hotelId: 'H1004',
    hotelName: 'Ocean Breeze Hotel',
    location: 'Miami, USA',
    roomsAvailable: 25,
    pricePerNight: 320,
    rating: 4.6,
    status: 'Delivered'
  },
  {
    hotelId: 'H1005',
    hotelName: 'Mountain Lodge',
    location: 'Denver, USA',
    roomsAvailable: 15,
    pricePerNight: 270,
    rating: 4.8,
    status: 'Process'
  },
  {
    hotelId: 'H1006',
    hotelName: 'City Center Hotel',
    location: 'Berlin, Germany',
    roomsAvailable: 40,
    pricePerNight: 220,
    rating: 4.4,
    status: 'Delivered'
  },
  {
    hotelId: 'H1007',
    hotelName: 'Lakeside Retreat',
    location: 'Geneva, Switzerland',
    roomsAvailable: 10,
    pricePerNight: 450,
    rating: 4.9,
    status: 'Canceled'
  },
  {
    hotelId: 'H1008',
    hotelName: 'The Royal Palace',
    location: 'Paris, France',
    roomsAvailable: 20,
    pricePerNight: 600,
    rating: 5.0,
    status: 'Delivered'
  },
  {
    hotelId: 'H1009',
    hotelName: 'Desert Sands Resort',
    location: 'Dubai, UAE',
    roomsAvailable: 45,
    pricePerNight: 350,
    rating: 4.7,
    status: 'Process'
  },
  {
    hotelId: 'H1010',
    hotelName: 'Blue Lagoon Resort',
    location: 'Bora Bora, French Polynesia',
    roomsAvailable: 8,
    pricePerNight: 700,
    rating: 4.9,
    status: 'Delivered'
  },
  {
    hotelId: 'H1011',
    hotelName: 'Safari Park Lodge',
    location: 'Nairobi, Kenya',
    roomsAvailable: 22,
    pricePerNight: 180,
    rating: 4.3,
    status: 'Canceled'
  },
  {
    hotelId: 'H1012',
    hotelName: 'The Alpine Chalet',
    location: 'Zermatt, Switzerland',
    roomsAvailable: 5,
    pricePerNight: 500,
    rating: 4.8,
    status: 'Delivered'
  },
  {
    hotelId: 'H1013',
    hotelName: 'Golden Gate Hotel',
    location: 'San Francisco, USA',
    roomsAvailable: 35,
    pricePerNight: 280,
    rating: 4.5,
    status: 'Process'
  }
]

export default function HotelAdmin() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [entriesPerPage, setEntriesPerPage] = React.useState(5)
  const [pageIndex, setPageIndex] = React.useState(0)
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/admin/hotels/hotel-edit`)
  }

  const handleDelete = (hotel: Hotel) => {
    console.log('Deleting hotel:', hotel)
  }

  const columns: ColumnDef<Hotel>[] = [
    {
      accessorKey: 'hotelId',
      header: () => <div className='text-left'>ID</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('hotelId')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'hotelName',
      header: () => <div className='text-left'>Hotel Name</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('hotelName')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'location',
      header: () => <div className='text-left'>Location</div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('location')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'roomsAvailable',
      header: () => <div className='flex justify-center'>Room Available</div>,
      cell: ({ row }) => <div className='flex justify-center'>{row.getValue('roomsAvailable')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'pricePerNight',
      header: () => <div className='flex justify-center'>Price Per Night</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('pricePerNight'))
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price)
        return <div className='flex justify-center font-medium'>{formatted}</div>
      },
      enableSorting: true
    },
    {
      accessorKey: 'status',
      header: () => <div className='flex justify-center'>Status</div>,
      cell: ({ row }) => {
        const status = row.getValue('status')
        const statusColor = status === 'Delivered' ? 'green' : status === 'Process' ? 'orange' : 'red'
        return <div className={`flex justify-center font-medium text-${statusColor}-600`}>{row.getValue('status')}</div>
      },
      enableSorting: true
    },
    {
      id: 'actions',
      header: () => <div className='flex justify-center'>Action</div>,
      cell: ({ row }) => (
        <div className='flex justify-center space-x-6'>
          <div className='cursor-pointer' onClick={handleEdit}>
            <IconEdit />
          </div>
          <div className='cursor-pointer' onClick={() => handleDelete(row.original)}>
            <IconDelete />
          </div>
        </div>
      )
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

  return (
    <div className='w-full p-2'>
      <h1 className='mb-4 text-2xl font-bold '>HOTEL</h1>
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
                    setEntriesPerPage(Number(e.target.value));
                    setPageIndex(0);
                  }}
                >
                  {[5, 10, 25, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span>entries</span>
              </div>
              <div className='relative'>
                <div className='absolute z-10 flex text-gray-500 top-2 left-3'>
                  <IconSearch />
                </div>
                <Input
                  placeholder='Search product...'
                  value={(table.getColumn('hotelName')?.getFilterValue() as string) ?? ''}
                  onChange={(event) => table.getColumn('hotelName')?.setFilterValue(event.target.value)}
                  className='max-w-sm pl-10 rounded-xl'
                />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Button className='flex items-center justify-center gap-2 ml-auto text-white'>
                <IconMore />
                Add Hotel
              </Button>
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
                      );
                    })}
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell, cellIndex) => (
                        <TableCell
                          key={cell.id}
                          className={`${
                            cell.column.id === "hotelId" ? "sticky left-0 bg-white z-10" : ""
                          } ${cell.column.id === "actions" ? "sticky right-0 bg-white z-10" : ""}`}
                          style={{
                            minWidth: cellIndex === 0 || cell.column.id === "actions" ? "150px" : "auto",
                            maxWidth: cellIndex === 0 || cell.column.id === "actions" ? "150px" : "auto",
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
                      No hotels available.
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
        </CardContent>
      </Card>
    </div>
  )
}
