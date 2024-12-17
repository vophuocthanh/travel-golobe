import { Button } from '@/components/ui/button'
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
import dayjs from 'dayjs'
import * as React from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import IconDelete from '@/assets/icons/icon-delete'
import IconEdit from '@/assets/icons/icon-edit'
import { Link } from 'react-router-dom'

import { tourApi } from '@/apis/tour.api'
import { IconSearch } from '@/common/icons'
import { useDebounce } from '@/hooks/useDebounce'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { TourResponseType } from '@/shared/ts/interface/data.interface'
import { TourResponse } from '@/shared/utils/data-response'
import { exportToExcel } from '@/shared/utils/excel-utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import { toast } from 'react-toastify'

function TourAdmin() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [entriesPerPage, setEntriesPerPage] = React.useState(6)
  const [pageIndex, setPageIndex] = React.useState(0)

  const [searchTourAdmin, setSearchTourAdmin] = React.useState<string>('')
  const debouncedSearchTourAdmin = useDebounce<string>(searchTourAdmin, 500)

  const queryClient = useQueryClient()

  const { data: getAllTour } = useQuery({
    queryKey: ['getAllTour'],
    queryFn: () => tourApi.getAll()
  })
  const totalTour = getAllTour?.total || 0

  const { data: getTour } = useQuery({
    queryKey: ['getTour', totalTour, debouncedSearchTourAdmin],
    queryFn: () => tourApi.getAll(1, totalTour, debouncedSearchTourAdmin)
  })
  const tourData = getTour?.data || []
  const mutationDeleteTour = useMutation({
    mutationFn: (id: string | undefined) => tourApi.deleteTour(id)
  })

  const handelete = (id: string | undefined) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tour này không?')
    if (confirmDelete) {
      mutationDeleteTour.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getTour'] })
          queryClient.setQueryData(['getTour'], (deleteTour: TourResponse[] | undefined) => {
            if (!deleteTour) {
              return []
            }
            const updatedTours = deleteTour.filter((item) => item.id !== id)
            return updatedTours
          })
          toast.success('Delete tour success')
        },
        onError: () => {
          toast.error('Delete tour failed')
        }
      })
    }
  }

  const columns: ColumnDef<TourResponseType>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="w-48" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            ID
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue('id')}</div>
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="w-56" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Tên tour
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="truncate max-w-[300px]">{row.getValue('name')}</div>
    },
    {
      accessorKey: 'image',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Hình ảnh
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const mainImage = row.getValue('image') as string

        return (
          <div className="flex flex-col items-center justify-center">
            <img src={mainImage} alt="Tour Image" className="object-cover w-16 h-16" />
          </div>
        )
      }
    },
    {
      accessorKey: 'userId',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Người tạo
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('userId')}</div>
    },
    {
      accessorKey: 'description',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-[400px]"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Mô tả
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="truncate text-center max-w-[400px]">{row.getValue('description')}</div>
    },
    {
      accessorKey: 'createAt',
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="w-48" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Ngày tạo
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-center">{dayjs(row.getValue('createAt')).format('DD/MM/YYYY, HH:mm:ss')}</div>
      )
    },
    {
      accessorKey: 'start_date',
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="w-48" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Ngày bắt đầu
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-center">{dayjs(row.getValue('start_date')).format('DD/MM/YYYY, HH:mm:ss')}</div>
      )
    },
    {
      accessorKey: 'end_date',
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="w-48" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Ngày kết thúc
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-center">{dayjs(row.getValue('end_date')).format('DD/MM/YYYY, HH:mm:ss')}</div>
      )
    },
    {
      accessorKey: 'road_vehicle',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Phương tiện
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{row.getValue('road_vehicle')}</div>
    },
    {
      accessorKey: 'time_trip',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Thời gian du lịch
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{row.getValue('time_trip')}</div>
    },
    {
      accessorKey: 'baby_price',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Giá em bé
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => {
        {
          const baby_price = parseFloat(row.getValue('baby_price'))

          const formatted = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(baby_price)

          return <div className="font-medium text-center">{formatted}</div>
        }
      }
    },
    {
      accessorKey: 'child_price',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Giá trẻ em
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => {
        {
          const child_price = parseFloat(row.getValue('child_price'))

          const formatted = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(child_price)

          return <div className="font-medium text-center">{formatted}</div>
        }
      }
    },
    {
      accessorKey: 'adult_price',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Giá người lớn
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const adult_price = parseFloat(row.getValue('adult_price'))

        const formatted = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(adult_price)

        return <div className="font-medium text-center">{formatted}</div>
      }
    },
    {
      accessorKey: 'number_of_seats_remaining',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Số chỗ còn lại
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{row.getValue('number_of_seats_remaining')}</div>
    },
    {
      accessorKey: 'totalAmount',
      header: () => <div className="text-center">Giá</div>,
      cell: ({ row }) => {
        return <div className="font-medium text-center">{formatCurrencyVND(row.getValue('totalAmount'))}</div>
      }
    },
    {
      id: 'actions',
      header: () => <div className="flex justify-center">Hành động</div>,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Button variant="ghost" className="w-8 h-8 ">
              <Link to={`/admin/tours/${row.original.id}`}>
                <IconEdit />
              </Link>
            </Button>
            <Button variant="ghost" className="w-8 h-8 p-0 " onClick={() => handelete(row.getValue('id'))}>
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

  const handleDownloadExcelTour = () => {
    const data = tourData.map((tour) => ({
      Mã: tour.id,
      'Tên Tour': tour.name,
      'Mô Tả': tour.description,
      'Ngày bắt đầu': dayjs(tour.start_date).format('DD/MM/YYYY, HH:mm:ss'),
      'Ngày kết thúc': dayjs(tour.end_date).format('DD/MM/YYYY, HH:mm:ss'),
      'Phương Tiện': tour.road_vehicle,
      'Thời gian tour': tour.time_trip,
      'Giá em bé': tour.baby_price,
      'Giá trẻ em': tour.child_price,
      'Giá người lớn': tour.adult_price,
      'Số chỗ còn lại': tour.number_of_seats_remaining,
      Giá: tour.price
    }))
    exportToExcel(data, 'TourData')
  }

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl font-bold">Tour - Admin</p>
        <Button onClick={handleDownloadExcelTour} className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
            />
          </svg>
          <p>Export to Excel</p>
        </Button>
      </div>
      <div className="p-4 bg-white rounded-md">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <div className="flex items-center mr-4 space-x-2">
              <span>Show</span>
              <select
                className="p-2 border border-gray-300 rounded-lg"
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
            <div className="relative">
              <div className="absolute z-10 flex text-gray-500 top-2 left-3">
                <IconSearch />
              </div>
              <Input
                placeholder="Filter tour name..."
                // value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                // onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                onChange={(e) => setSearchTourAdmin(e.target.value)}
                className="max-w-sm pl-10 rounded-xl"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/tours/create">
              <Button className="text-white">+ Add Tour</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
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

        <div className="h-[calc(100vh-260px)] px-4 overflow-y-auto border rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-black">
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
                        className={`${cell.column.id === 'id' ? 'sticky left-0 bg-[#F4F4F4] z-10' : ''} ${
                          cell.column.id === 'actions' ? 'sticky right-0 bg-[#F4F4F4] z-10' : ''
                        }`}
                        style={{
                          minWidth: cellIndex === 0 || cell.column.id === 'actions' ? '100px' : 'auto',
                          maxWidth: cellIndex === 0 || cell.column.id === 'actions' ? '100px' : 'auto'
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="flex items-center justify-center h-[30rem] mr-[40%]">
                      <div className="w-8 h-8 border-4 border-[#a185f4] rounded-full border-t-transparent animate-spin"></div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end py-4 space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <span className="pr-2">Total Tours: {totalTour}</span>

          <div className="space-x-2">
            <Button
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
              className="text-white"
            >
              Previous
            </Button>
            <Button
              onClick={() => setPageIndex((prev) => Math.min(prev + 1, table.getPageCount() - 1))}
              disabled={pageIndex + 1 >= table.getPageCount()}
              className="text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TourAdmin
