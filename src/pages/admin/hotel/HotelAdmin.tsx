import { hotelApi } from '@/apis/hotel.api'
import { hotel } from '@/assets/images'
import { IconDelete, IconEdit, IconMore, IconSearch } from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { HotelResponseType } from '@/shared/ts/interface/data.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import { toast } from 'react-toastify'

export default function HotelAdmin() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [entriesPerPage, setEntriesPerPage] = React.useState(5)
  const [pageIndex, setPageIndex] = React.useState(0)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: getAllHotel } = useQuery({
    queryKey: ['getAllHotel'],
    queryFn: () => hotelApi.getAll()
  })
  const totalDataHotel = getAllHotel?.total || 0
  console.log(totalDataHotel, 'totalDataHotel')

  const { data: allHotel } = useQuery({
    queryKey: ['getAllHotel', totalDataHotel],
    queryFn: () => hotelApi.getAll(1, totalDataHotel)
  })

  const hotelData = allHotel?.data || []

  const handleEdit = (id: string) => {
    navigate(`/admin/hotels/${id}`)
  }

  const mutationDelete = useMutation({
    mutationFn: (id: string) => hotelApi.deleteHotel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllHotel'] })
      toast.success('Xóa khách sạn thành công')
    },
    onError: () => {
      toast.error('Xóa khách sạn thất bại')
    }
  })

  const handleDelete = (id: string) => {
    mutationDelete.mutate(id)
  }

  const columns: ColumnDef<HotelResponseType>[] = [
    {
      accessorKey: 'id',
      header: () => <div className='text-left'>ID</div>,
      cell: ({ row }) => <div className='truncate max-w-[400px]'>{row.getValue('id')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'hotel_names',
      header: () => <div className='text-left w-52'>Tên khách sạn </div>,
      cell: ({ row }) => <div className='text-left'>{row.getValue('hotel_names')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'image',
      header: () => <div className='text-center w-28'>Hình ảnh </div>,
      cell: () => (
        <div className='flex flex-col items-center justify-center'>
          <img src={hotel} alt='Hotel Image' className='object-cover h-28' />
        </div>
      ),
      enableSorting: true
    },
    {
      accessorKey: 'location',
      header: () => <div className='text-center w-52'>Vị trí </div>,
      cell: ({ row }) => <div className='truncate max-w-[500px]'>{row.getValue('location')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'place',
      header: () => <div className='flex justify-center w-28'>Địa điểm</div>,
      cell: ({ row }) => <div className='flex justify-center'>{row.getValue('place')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'score_hotels',
      header: () => <div className='flex justify-center w-36'>Điểm số khách sạn</div>,
      cell: ({ row }) => <div className='flex justify-center'>{row.getValue('score_hotels')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'number_rating',
      header: () => <div className='flex justify-center w-20'>Xếp hạng</div>,
      cell: ({ row }) => <div className='flex justify-center'>{row.getValue('number_rating')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'star_number',
      header: () => <div className='flex justify-center w-20'>Số sao</div>,
      cell: ({ row }) => <div className='flex justify-center'>{row.getValue('star_number')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'received_time',
      header: () => <div className='flex justify-center w-36'>Thời gian nhận được</div>,
      cell: ({ row }) => <div className='flex justify-center'>{row.getValue('received_time')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'giveback_time',
      header: () => <div className='flex justify-center w-36'>Thời gian trả lại</div>,
      cell: ({ row }) => <div className='flex justify-center'>{row.getValue('giveback_time')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'description',
      header: () => <div className='flex justify-center w-[400px]'>Mô tả</div>,
      cell: ({ row }) => (
        <div className='overflow-hidden flexjustify-center text-ellipsis line-clamp-3'>
          {row.getValue('description')}
        </div>
      ),
      enableSorting: true
    },
    {
      accessorKey: 'number_of_seats_remaining',
      header: () => <div className='flex justify-center w-20'>Còn lại</div>,
      cell: ({ row }) => <div className='flex justify-center'>{row.getValue('number_of_seats_remaining')}</div>,
      enableSorting: true
    },
    {
      accessorKey: 'price',
      header: () => <div className='flex justify-center w-20'>Giá mỗi đêm</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))
        const formatted = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(price)
        return <div className='flex justify-center font-medium'>{formatted}</div>
      },
      enableSorting: true
    },
    {
      id: 'actions',
      header: () => <div className='flex justify-center'>Hành động</div>,
      cell: ({ row }) => (
        <div className='flex justify-center space-x-6'>
          <div className='cursor-pointer' onClick={() => handleEdit(row.original.id)}>
            <IconEdit />
          </div>

          <Dialog>
            <DialogTrigger>
              <div className='cursor-pointer'>
                <div className=''>
                  <IconDelete />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='mb-4 text-xl font-semibold text-center'>Xác nhận xóa</DialogTitle>
                <DialogDescription className='flex justify-center space-x-4'>
                  <p>Bạn có chắc chắn muốn xóa mục này không?</p> {/* Thêm mô tả cho hành động xóa */}
                </DialogDescription>
                <DialogDescription className='flex justify-center space-x-4'>
                  <Button
                    onClick={() => handleDelete(row.original.id)}
                    className='text-white bg-red-600 hover:bg-red-700'
                  >
                    Xoá
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: hotelData,
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
                    setEntriesPerPage(Number(e.target.value))
                    setPageIndex(0)
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
                  placeholder='Search product...'
                  value={(table.getColumn('hotel_names')?.getFilterValue() as string) ?? ''}
                  onChange={(event) => table.getColumn('hotel_names')?.setFilterValue(event.target.value)}
                  className='max-w-sm pl-10 rounded-xl'
                />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Button
                className='flex items-center justify-center gap-2 ml-auto text-white'
                onClick={() => navigate(`/admin/hotels/add-hotel`)}
              >
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
                      )
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
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell, cellIndex) => (
                        <TableCell
                          key={cell.id}
                          className={`${cell.column.id === 'id' ? 'sticky left-0 bg-white z-10' : ''} ${cell.column.id === 'actions' ? 'sticky right-0 bg-white z-10' : ''
                            }`}
                          style={{
                            minWidth: cellIndex === 0 || cell.column.id === 'actions' ? '150px' : 'auto',
                            maxWidth: cellIndex === 0 || cell.column.id === 'actions' ? '150px' : 'auto'
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
