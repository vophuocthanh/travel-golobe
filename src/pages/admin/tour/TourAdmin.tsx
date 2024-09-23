import * as React from 'react'
// import { ChevronDownIcon } from '@radix-ui/react-icons'
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
import { IconSearch } from '@/common/icons'
import { ChevronDown } from 'lucide-react'

export type Tour = {
  id: string
  name: string
  description: string
  image: string
  price: number
  location: string
  image_2: string
  image_3: string
  image_4: string
  image_5: string
  transport: string
  hotel: string
  rating: number
}
const data: Tour[] = [
  {
    id: '1',
    name: 'Explore Vietnam',
    description: 'A fascinating tour through the vibrant culture of Vietnam.',
    image: 'https://via.placeholder.com/150',
    price: 316,
    location: 'Hanoi, Vietnam',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Airplane',
    hotel: 'Vietnam Airlines Hotel',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Luxury Getaway',
    description: 'Relax at luxury resorts with stunning views.',
    image:
      'https://plus.unsplash.com/premium_photo-1679758629450-30d2263efca5?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 289,
    location: 'Phuket, Thailand',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Private Jet',
    hotel: 'Phuket Luxury Resort',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Adventure in the Himalayas',
    description: 'Experience the majestic beauty of the Himalayas.',
    image:
      'https://media.istockphoto.com/id/667426946/photo/the-plane-at-the-airport.webp?a=1&b=1&s=612x612&w=0&k=20&c=HeADzKhERX5gw0jOnw1Yc30u1pDDaNUIveiCgTPGXGw=',
    price: 512,
    location: 'Kathmandu, Nepal',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Helicopter',
    hotel: 'Himalaya Lodge',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Beach Paradise',
    description: 'A tropical getaway to the most beautiful beaches.',
    image: 'https://example.com/flight_image4.jpg',
    price: 432,
    location: 'Maldives',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Boat',
    hotel: 'Maldives Beach Resort',
    rating: 5.0
  },
  {
    id: '5',
    name: 'European Exploration',
    description: 'Discover the charm of Europe’s iconic cities.',
    image: 'https://example.com/flight_image5.jpg',
    price: 220,
    location: 'Paris, France',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Train',
    hotel: 'Parisian Hotel',
    rating: 4.6
  },
  {
    id: '6',
    name: 'African Safari',
    description: 'An exhilarating safari across the African savannah.',
    image: 'https://example.com/flight_image6.jpg',
    price: 350,
    location: 'Serengeti, Tanzania',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Jeep',
    hotel: 'Safari Lodge',
    rating: 4.9
  },
  {
    id: '7',
    name: 'Australian Adventure',
    description: 'Explore the wild landscapes of Australia.',
    image: 'https://example.com/flight_image7.jpg',
    price: 278,
    location: 'Sydney, Australia',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Campervan',
    hotel: 'Sydney Wilderness Lodge',
    rating: 4.4
  },
  {
    id: '8',
    name: 'Pacific Islands Retreat',
    description: 'Relax on the pristine beaches of the Pacific Islands.',
    image: 'https://example.com/flight_image8.jpg',
    price: 495,
    location: 'Fiji',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Yacht',
    hotel: 'Fiji Island Resort',
    rating: 4.7
  },
  {
    id: '9',
    name: 'American Road Trip',
    description: 'Take a scenic road trip across the USA.',
    image: 'https://example.com/flight_image9.jpg',
    price: 410,
    location: 'California, USA',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Car',
    hotel: 'California Motel',
    rating: 4.3
  },
  {
    id: '10',
    name: 'Ancient Ruins of Mexico',
    description: 'Explore the historical ruins of Mexico.',
    image: 'https://example.com/flight_image10.jpg',
    price: 298,
    location: 'Mexico City, Mexico',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Bus',
    hotel: 'Mexico City Inn',
    rating: 4.2
  },
  {
    id: '11',
    name: 'Ancient Ruins of Mexico',
    description: 'Explore the historical ruins of Mexico.',
    image: 'https://example.com/flight_image10.jpg',
    price: 298,
    location: 'Mexico City, Mexico',
    image_2: 'https://via.placeholder.com/150',
    image_3: 'https://via.placeholder.com/150',
    image_4: 'https://via.placeholder.com/150',
    image_5: 'https://via.placeholder.com/150',
    transport: 'Bus',
    hotel: 'Mexico City Inn',
    rating: 4.2
  }
]

function TourAdmin() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [entriesPerPage, setEntriesPerPage] = React.useState(5)
  const [pageIndex, setPageIndex] = React.useState(0)
  const columns: ColumnDef<Tour>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            ID
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('id')}</div>
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Tour Name
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
    },
    {
      accessorKey: 'description',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Description
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('description')}</div>
    },
    {
      accessorKey: 'image',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Main Image
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const mainImage = row.getValue('image') as string

        return (
          <div className='flex flex-col items-center justify-center'>
            <img src={mainImage} alt='Tour Image' className='object-cover w-16 h-16' />
          </div>
        )
      }
    },
    {
      accessorKey: 'price',
      header: () => <div className='text-right'>Price</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))

        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price)

        return <div className='font-medium text-right'>{formatted}</div>
      }
    },
    {
      accessorKey: 'location',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Location
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize'>{row.getValue('location')}</div>
    },
    {
      accessorKey: 'transport',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Transport
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize'>{row.getValue('transport')}</div>
    },
    {
      accessorKey: 'hotel',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Hotel
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize'>{row.getValue('hotel')}</div>
    },
    {
      accessorKey: 'rating',
      header: () => <div className='text-right'>Rating</div>,
      cell: ({ row }) => {
        const rating = parseFloat(row.getValue('rating'))

        return <div className='font-medium text-right'>{rating.toFixed(1)}</div>
      }
    },
    {
      accessorKey: 'Action',
      header: 'Action',
      cell: ({ row }) => {
        return (
          <div className='flex space-x-2'>
            <Button variant='ghost' className='w-8 h-8 '>
              <Link to={`/admin/tours/${row.original.id}`}>
                <IconEdit />
              </Link>
            </Button>

            <Button variant='ghost' className='w-8 h-8 p-0 '>
              <IconDelete />
            </Button>
          </div>
        )
      }
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
    <div className='w-full px-4'>
      <p className='text-2xl font-bold'>Tour - Admin</p>
      <div className='flex items-center justify-between py-4'>
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
              {[5, 10, 25, 50, 100].map((size) => (
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
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
              className='max-w-sm pl-10 rounded-xl'
            />
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <Button className='bg-[#624DE3] text-white'>+ Add Tour</Button>
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
export default TourAdmin
