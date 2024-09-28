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
import { CaretSortIcon } from '@radix-ui/react-icons';

export type RoadVehicle = {
  id: string;
  brandName: string;
  image: string;
  startTime: string;
  startDay: string;
  endTime: string;
  endDay: string;
  tripTime: string;
  takePlace: string;
  destination: string;
  tripTo: string;
  price: number;
};

const data: RoadVehicle[] = [
  { id: 'V1001', brandName: 'Nhà xe Phương Trang', image: 'phuong_trang_image_url', startTime: '08:00', startDay: '2023-09-15', endTime: '10:00', endDay: '2023-09-15', tripTime: '2 hours', takePlace: 'Hồ Chí Minh', destination: 'Cần Thơ', tripTo: 'Cần Thơ', price: 200 },
  { id: 'V1002', brandName: 'Nhà xe Mai Linh', image: 'mai_linh_image_url', startTime: '09:00', startDay: '2023-09-16', endTime: '11:30', endDay: '2023-09-16', tripTime: '2.5 hours', takePlace: 'Hà Nội', destination: 'Hải Phòng', tripTo: 'Hải Phòng', price: 250 },
  { id: 'V1003', brandName: 'Nhà xe Thành Bưởi', image: 'thanh_buoi_image_url', startTime: '07:30', startDay: '2023-09-17', endTime: '09:45', endDay: '2023-09-17', tripTime: '2.25 hours', takePlace: 'Đà Lạt', destination: 'Nha Trang', tripTo: 'Nha Trang', price: 180 },
  { id: 'V1004', brandName: 'Nhà xe Hoàng Long', image: 'hoang_long_image_url', startTime: '06:00', startDay: '2023-09-18', endTime: '09:30', endDay: '2023-09-18', tripTime: '3.5 hours', takePlace: 'Hà Nội', destination: 'Thanh Hóa', tripTo: 'Thanh Hóa', price: 220 },
  { id: 'V1005', brandName: 'Nhà xe Hồng Hà', image: 'hong_ha_image_url', startTime: '08:15', startDay: '2023-09-19', endTime: '10:45', endDay: '2023-09-19', tripTime: '2.5 hours', takePlace: 'Đà Nẵng', destination: 'Huế', tripTo: 'Huế', price: 200 },
  { id: 'V1006', brandName: 'Nhà xe Thiên Phú', image: 'thien_phu_image_url', startTime: '10:00', startDay: '2023-09-20', endTime: '12:30', endDay: '2023-09-20', tripTime: '2.5 hours', takePlace: 'Nha Trang', destination: 'Quy Nhơn', tripTo: 'Quy Nhơn', price: 240 },
  { id: 'V1007', brandName: 'Nhà xe Kumho Samco', image: 'kumho_samco_image_url', startTime: '07:00', startDay: '2023-09-21', endTime: '09:45', endDay: '2023-09-21', tripTime: '2.75 hours', takePlace: 'Hồ Chí Minh', destination: 'Vũng Tàu', tripTo: 'Vũng Tàu', price: 180 },
  { id: 'V1008', brandName: 'Nhà xe Hải Âu', image: 'hai_au_image_url', startTime: '09:30', startDay: '2023-09-22', endTime: '12:00', endDay: '2023-09-22', tripTime: '2.5 hours', takePlace: 'Hà Nội', destination: 'Nam Định', tripTo: 'Nam Định', price: 160 },
  { id: 'V1009', brandName: 'Nhà xe Hiền Phước', image: 'hien_phuoc_image_url', startTime: '11:00', startDay: '2023-09-23', endTime: '13:30', endDay: '2023-09-23', tripTime: '2.5 hours', takePlace: 'Quảng Ngãi', destination: 'Quy Nhơn', tripTo: 'Quy Nhơn', price: 220 },
  { id: 'V1010', brandName: 'Nhà xe Tâm Hạnh', image: 'tam_hanh_image_url', startTime: '06:00', startDay: '2023-09-24', endTime: '09:00', endDay: '2023-09-24', tripTime: '3 hours', takePlace: 'Hồ Chí Minh', destination: 'Phan Thiết', tripTo: 'Phan Thiết', price: 210 },
  { id: 'V1011', brandName: 'Nhà xe Phương Nam', image: 'phuong_nam_image_url', startTime: '08:00', startDay: '2023-09-25', endTime: '11:00', endDay: '2023-09-25', tripTime: '3 hours', takePlace: 'Nha Trang', destination: 'Đà Lạt', tripTo: 'Đà Lạt', price: 230 },
  { id: 'V1012', brandName: 'Nhà xe Thịnh Phát', image: 'thinh_phat_image_url', startTime: '07:45', startDay: '2023-09-26', endTime: '10:15', endDay: '2023-09-26', tripTime: '2.5 hours', takePlace: 'Hồ Chí Minh', destination: 'Biên Hòa', tripTo: 'Biên Hòa', price: 170 },
  { id: 'V1013', brandName: 'Nhà xe Cường Lan', image: 'cuong_lan_image_url', startTime: '10:30', startDay: '2023-09-27', endTime: '13:30', endDay: '2023-09-27', tripTime: '3 hours', takePlace: 'Hải Phòng', destination: 'Quảng Ninh', tripTo: 'Quảng Ninh', price: 250 },
  { id: 'V1014', brandName: 'Nhà xe Hưng Thành', image: 'hung_thanh_image_url', startTime: '06:30', startDay: '2023-09-28', endTime: '10:00', endDay: '2023-09-28', tripTime: '3.5 hours', takePlace: 'Hà Nội', destination: 'Sơn La', tripTo: 'Sơn La', price: 260 },
  { id: 'V1015', brandName: 'Nhà xe Anh Tuấn', image: 'anh_tuan_image_url', startTime: '12:00', startDay: '2023-09-29', endTime: '15:00', endDay: '2023-09-29', tripTime: '3 hours', takePlace: 'Huế', destination: 'Quảng Trị', tripTo: 'Quảng Trị', price: 210 }
];

export default function RoadVehicleAdmin() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [entriesPerPage, setEntriesPerPage] = React.useState(10)
  const [pageIndex, setPageIndex] = React.useState(0)

  const handleEdit = (vehicle: RoadVehicle) => {
    console.log('Edit RoadVehicle:', vehicle);
  };

  const handleDelete = (vehicle: RoadVehicle) => {
    console.log('Deleting RoadVehicle:', vehicle);
  };

  const columns: ColumnDef<RoadVehicle>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='lowercase'>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'brandName',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Road Vehicle Name
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('brandName')}</div>,
    },
    {
      accessorKey: 'image',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Road Vehicle
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-left">
          <img src={row.getValue('image')} alt="vehicle" className="object-cover w-12 h-12" />
        </div>
      ),
    },
    {
      accessorKey: 'startTime',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Start Time
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('startTime')}</div>,
    },
    {
      accessorKey: 'startDay',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Start Day
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('startDay')}</div>,
    },
    {
      accessorKey: 'endTime',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          End Time
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('endTime')}</div>,
    },
    {
      accessorKey: 'endDay',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          End Day
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('endDay')}</div>,
    },
    {
      accessorKey: 'tripTime',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Trip Time
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('tripTime')}</div>,
    },
    {
      accessorKey: 'takePlace',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Take Place
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('takePlace')}</div>,
    },
    {
      accessorKey: 'destination',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Destination
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('destination')}</div>,
    },
    {
      accessorKey: 'tripTo',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Trip To
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('tripTo')}</div>,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Price
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price);
        return <div className="text-left">{formatted}</div>;
      },
    },
    {
      id: 'actions',
      header: () => <div className="flex justify-center">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-center space-x-6">
          <div className="cursor-pointer" onClick={() => handleEdit(row.original)}>
            <IconEdit />
          </div>
          <div className="cursor-pointer" onClick={() => handleDelete(row.original)}>
            <IconDelete />
          </div>
        </div>
      ),
    },
  ];

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
      <h1 className='mb-4 text-2xl font-bold '>Road Vehicle</h1>
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
                  {[10, 25, 50, 100].map((size) => (
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
                Add Road Vehicle
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