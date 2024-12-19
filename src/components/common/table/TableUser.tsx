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
import { ArrowUpDown, ChevronDown, TableOfContents } from 'lucide-react'
import * as React from 'react'

import { meApi } from '@/apis/me'
import IconDelete from '@/assets/icons/icon-delete'
import IconEdit from '@/assets/icons/icon-edit'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UserResponse } from '@/shared/ts/interface'
import { exportToExcel } from '@/shared/utils/excel-utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export function TableUser() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [pageIndex, setPageIndex] = React.useState(0)
  const queryClient = useQueryClient()

  const { data: getUsers } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: () => meApi.getAllUsers()
  })

  const totalUser = getUsers?.total || 0

  const { data: getAllUsers } = useQuery({
    queryKey: ['getAllUsers', totalUser],
    queryFn: () => meApi.getAllUsers(1, totalUser)
  })
  const data = getAllUsers?.data ?? []

  const mutationDeleteUser = useMutation({
    mutationFn: (id: string) => meApi.deleteUser(id)
  })

  const handleDeleteUser = (id: string) => {
    setLoading(true)
    mutationDeleteUser.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getAllUsers'] })
        toast.success('Xóa user thành công')
      },
      onError: () => {
        toast.error('Xóa user thất bại')
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }

  const columns: ColumnDef<UserResponse>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'avatar',
      header: 'Avatar',
      cell: ({ row }) => {
        return (
          <div className='flex items-center'>
            <img src={row.original.avatar} alt='Avatar' className='w-8 h-8 rounded-full' />
          </div>
        )
      }
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Email
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>
    },
    {
      accessorKey: 'country',
      header: () => <div className='text-left'>Quốc tịch</div>,
      cell: ({ row }) => <div>{row.getValue('country') || 'N/A'}</div>
    },
    {
      accessorKey: 'phone',
      header: () => <div className='text-left'>Số điện thoại</div>,
      cell: ({ row }) => <div>{row.getValue('phone') || 'N/A'}</div>
    },
    {
      accessorKey: 'address',
      header: () => <div className='text-left'>Địa chỉ</div>,
      cell: ({ row }) => <div>{row.getValue('address') || 'N/A'}</div>
    },
    {
      id: 'role',
      header: () => <div className='flex justify-center'>Vai trò</div>,
      cell: ({ row }) => (
        <div className='flex justify-center'>
          <h1
            className={
              row.original.role?.name === 'ADMIN'
                ? 'text-white p-2 inline-block rounded-xl bg-green-400'
                : row.original.role?.name === 'EMPLOYEE'
                  ? 'text-white p-2 inline-block rounded-xl bg-blue-400'
                  : ''
            }
          >
            {row.original.role?.name || 'N/A'}
          </h1>
        </div>
      )
    },
    {
      accessorKey: 'date_of_birth',
      header: () => <div className='flex justify-center'>Ngày sinh</div>,
      cell: ({ row }) => {
        const formatDate = (dateString?: string): string => {
          if (!dateString) return 'N/A'

          const date = new Date(dateString)
          if (isNaN(date.getTime())) return 'N/A'

          const day = String(date.getDate()).padStart(2, '0')
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const year = date.getFullYear()

          return `${day}-${month}-${year}`
        }

        return <div className='flex justify-center'>{formatDate(row.getValue<string>('date_of_birth'))}</div>
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-center gap-4'>
            <Link to={`/admin/users/${row.original.id}`}>
              <IconEdit />
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <TableOfContents className='w-6 h-6 cursor-pointer' />
              </PopoverTrigger>
              <PopoverContent className='w-24'>
                <Button loading={loading} onClick={() => handleDeleteUser(row.original.id!)}>
                  <IconDelete />
                </Button>
              </PopoverContent>
            </Popover>
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
        pageSize: 8
      }
    }
  })

  React.useEffect(() => {
    table.setPageIndex(pageIndex)
  }, [pageIndex, table])

  const handleDownloadExcelUser = async () => {
    const data = getAllUsers?.data.map((user) => ({
      email: user.email,
      country: user.country,
      phone: user.phone,
      address: user.address,
      role: user.role?.name,
      avatar: user.avatar,
      date_of_birth: user.date_of_birth
    }))

    if (data) {
      exportToExcel(data, 'users')
    }
  }

  return (
    <div className='w-full p-2 mt-4 bg-white rounded-md'>
      <div className='flex items-center py-4'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Nhập tìm emails...'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
          <Button onClick={handleDownloadExcelUser} className='flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25'
              />
            </svg>
            <p>Tải về</p>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Cột <ChevronDown className='w-4 h-4 ml-2' />
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
      <div className='h-[calc(100vh-260px)] px-4 overflow-y-auto border rounded-md'>
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
          {table.getFilteredSelectedRowModel().rows.length} trên {table.getFilteredRowModel().rows.length} hàng đã được chọn.
        </div>
        <div className='space-x-2'>
          <Button
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
            className='text-white'
          >
            Quay lại
          </Button>
          <Button
            onClick={() => setPageIndex((prev) => Math.min(prev + 1, table.getPageCount() - 1))}
            disabled={pageIndex + 1 >= table.getPageCount()}
            className='text-white'
          >
            Tiếp
          </Button>
        </div>
      </div>
    </div>
  )
}
