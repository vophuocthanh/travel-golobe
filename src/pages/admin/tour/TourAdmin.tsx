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
import { TourResponseType } from '@/shared/ts/interface/data.interface'
import { useQuery } from '@tanstack/react-query'
import { tourApi } from '@/apis/tour.api'




function TourAdmin() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [entriesPerPage, setEntriesPerPage] = React.useState(5)
  const [pageIndex, setPageIndex] = React.useState(0)

  const {data: getAllTour} = useQuery({
    queryKey: ["getAllTour"],
    queryFn: () => tourApi.getAll()
  })
  const totalTour = getAllTour?.total || 0

  const {data: getTour} = useQuery({
    queryKey: ["getTour",totalTour],
    queryFn: () => tourApi.getAll(1,totalTour)
  })
  const tourData = getTour?.data || []

  const columns: ColumnDef<TourResponseType>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button variant='ghost' className='w-48' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            ID
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className=''>{row.getValue('id')}</div>
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button variant='ghost' className='w-56' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Tour Name
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
    },
    {
      accessorKey: 'image',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Image
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
      accessorKey: 'userId',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            User Id
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize'>{row.getValue('userId')}</div>
    },
    {
      accessorKey: 'description',
      header: ({ column }) => {
        return (
          <Button variant='ghost' className='w-[400px]' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Description
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('description')}</div>
    },
    {
      accessorKey: 'original_price',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Original Price
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('original_price')}</div>
    },
    {
      accessorKey: 'createAt',
      header: ({ column }) => {
        return (
          <Button variant='ghost' className='w-48' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Create At
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('createAt')}</div>
    },
    {
      accessorKey: 'updateAt',
      header: ({ column }) => {
        return (
          <Button variant='ghost' className='w-48' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Update At
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('updateAt')}</div>
    },
    {
      accessorKey: 'start_date',
      header: ({ column }) => {
        return (
          <Button variant='ghost' className='w-48' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Start Date
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('start_date')}</div>
    },
    {
      accessorKey: 'end_date',
      header: ({ column }) => {
        return (
          <Button variant='ghost' className='w-48' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            End Date
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('end_date')}</div>
    },
    {
      accessorKey: 'starting_gate',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Starting Gate
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('starting_gate')}</div>
    },
    {
      accessorKey: 'sight_seeing',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Sight Seeing
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('sight_seeing')}</div>
    },
    {
      accessorKey: 'cuisine',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Cuisine
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('cuisine')}</div>
    },
    {
      accessorKey: 'suitable',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Suitable
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('suitable')}</div>
    },
    {
      accessorKey: 'ideal_time',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Ideal Time
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('ideal_time')}</div>
    },
    {
      accessorKey: 'road_vehicle',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Road Vehicle
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('road_vehicle')}</div>
    },
    {
      accessorKey: 'voucher',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Voucher
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('voucher')}</div>
    },
    {
      accessorKey: 'time_trip',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Time Trip
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('time_trip')}</div>
    },
    {
      accessorKey: 'baby_price',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Baby Price
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('baby_price')}</div>
    },
    {
      accessorKey: 'child_price',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Child Price
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('child_price')}</div>
    },
    {
      
      accessorKey: 'adult_price',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Adult Price
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('adult_price')}</div>
    },
    {
      
      accessorKey: 'rating',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Rating
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('rating')}</div>
    },
    {
      
      accessorKey: 'number_of_seats_remaining',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Number Of Seats Remaining
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('number_of_seats_remaining')}</div>
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
      accessorKey: 'price',
      header: () => <div className='text-right'>Price</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))

        const formatted = new Intl.NumberFormat('vi-VN', {
          style: 'currency', 
          currency: 'VND'
        }).format(price)

        return <div className='font-medium text-right'>{formatted}</div>
      }
    },
    {
      id: 'actions',
      header: () => <div className='flex justify-center'>Action</div>,
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
    data: tourData,
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
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <TableCell
                      key={cell.id}
                      className={`${
                        cell.column.id === "id" ? "sticky left-0 bg-[#F4F4F4] z-10" : ""
                      } ${cell.column.id === "actions" ? "sticky right-0 bg-[#F4F4F4] z-10" : ""}`}
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
