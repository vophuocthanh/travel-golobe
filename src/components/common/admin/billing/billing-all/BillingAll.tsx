import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { IconDelete, IconEdit, IconView } from "@/common/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { billingApi } from "@/apis/billing-all.api";
import { BillingResponseType } from "@/shared/ts/interface/data.interface";
import { CaretSortIcon } from "@radix-ui/react-icons";

export function BillingAll() {

  const { data: getAllBilling } = useQuery({
    queryKey: ['getAllBilling'],
    queryFn: () =>billingApi.getAll(1,1,'')
  })
  const totalDataCount = getAllBilling?.total || 0; 

  const { data: billiingData } = useQuery({
    queryKey: ['getBilling', totalDataCount],
    queryFn: () => billingApi.getAll(1, totalDataCount,''), 
    enabled: totalDataCount > 0 
  });
  
  const billing = billiingData?.data || [];  
  const navigate = useNavigate()
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [entriesPerPage, setEntriesPerPage] = React.useState(10)
  const [pageIndex, setPageIndex] = React.useState(0)


  const columns: ColumnDef<BillingResponseType>[] = [ 
    {
      accessorKey: "id",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('id')}</div>,
    },
    {
      accessorKey: "tourId",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tour Id
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('tourId')}</div>,
    },
    {
      accessorKey: "userId",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          User Id
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('userId')}</div>,
    },
    {
      accessorKey: "flightCrawlId",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Flight ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('flightCrawlId')}</div>,
    },
    {
      accessorKey: "hotelCrawlId",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Hotel ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('hotelCrawlId')}</div>,
    },
    {
      accessorKey: "roadVehicleId",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Road Vehicle ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('roadVehicleId')}</div>,
    },
    {
      accessorKey: "flightQuantity",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Flight Quantity
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] text-center lowercase truncate'>{row.getValue('flightQuantity')}</div>,
    },
    {
      accessorKey: "hotelQuantity",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Hotel Quantity
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate text-center'>{row.getValue('hotelQuantity')}</div>,
    },
    {
      accessorKey: "tourQuantity",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tour Quantity
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate text-center'>{row.getValue('tourQuantity')}</div>,
    },
    {
      accessorKey: "roadVehicleQuantity",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Road Vehicle Quantity
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate text-center'>{row.getValue('roadVehicleQuantity')}</div>,
    },
    {
      accessorKey: 'flightPrice',
      header: ({column}) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Flight Price
        <CaretSortIcon className='w-4 h-4 ml-2' />
      </Button>),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('flightPrice'))

        const formatted = new Intl.NumberFormat('vn-Vn', {
          style: 'currency',
          currency: 'VND'
        }).format(amount)
        return <div className='font-medium text-center'>{formatted}</div>
      }
    },
    {
      accessorKey: 'hotelPrice',
      header: ({column}) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Hotel Price
        <CaretSortIcon className='w-4 h-4 ml-2' />
      </Button>),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('hotelPrice'))

        const formatted = new Intl.NumberFormat('vn-Vn', {
          style: 'currency',
          currency: 'VND'
        }).format(amount)
        return <div className='font-medium text-center'>{formatted}</div>
      }
    },
    {
      accessorKey: 'tourPrice',
      header: ({column}) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Tour Price
        <CaretSortIcon className='w-4 h-4 ml-2' />
      </Button>),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('tourPrice'))

        const formatted = new Intl.NumberFormat('vn-Vn', {
          style: 'currency',
          currency: 'VND'
        }).format(amount)
        return <div className='font-medium text-center'>{formatted}</div>
      }
    },
    {
      accessorKey: 'roadVehiclePrice',
      header: ({column}) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Road Vehicle Price
        <CaretSortIcon className='w-4 h-4 ml-2' />
      </Button>),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('roadVehiclePrice'))

        const formatted = new Intl.NumberFormat('vn-Vn', {
          style: 'currency',
          currency: 'VND'
        }).format(amount)
        return <div className='font-medium text-center'>{formatted}</div>
      }
    },
    {
      accessorKey: "roomId",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Room ID
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('roomId')}</div>,
    },
    {
      accessorKey: "ticketFlighttId",  
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Ticket Flightt Id
          <CaretSortIcon className='w-4 h-4 ml-2' />
        </Button>
      ),
      cell: ({ row }) => <div className='w-[5rem] lowercase truncate'>{row.getValue('ticketFlighttId')}</div>,
    },
    {
      accessorKey: 'totalAmount',
      header: ({column}) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Amount
          <CaretSortIcon className='w-4 h-4 ml-2' />
      </Button>),
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
            Created At
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const endDate = new Date(row.getValue('createdAt'));
        return <div className="text-center ">{endDate.toLocaleDateString('vi-VN')}</div>;
      },
    },
    {
      accessorKey: 'confirmationTime',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Confirmation Time
            <CaretSortIcon className='w-4 h-4 ml-2' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const endDate = new Date(row.getValue('confirmationTime'));
        return <div className="text-center ">{endDate.toLocaleDateString('vi-VN')}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="flex justify-center">Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("status");
        let statusClass = "bg-gray-200"; 
  
        if (status === "success") {
          statusClass = "bg-green-100 text-green-800";
        } else if (status === "processing") {
          statusClass = "bg-yellow-100 text-yellow-800";
        } else if (status === "failed") {
          statusClass = "bg-red-100 text-red-800";
        }
  
        return (
          <div className="flex items-center justify-center h-10">
            <div className={`w-[7rem] text-center py-1 rounded-md capitalize ${statusClass}`}>
              {row.getValue("status")}
            </div>
          </div>
        );
      },
      enableSorting: true,
    },
    
    {
      id: "actions",
      header: () => <div className="flex justify-center">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-center space-x-6">
        <div className="cursor-pointer" onClick={handleView}> <IconView/></div>
        <div  className="cursor-pointer" onClick={() => handleEdit(row.original)}> <IconEdit/></div>
        <div className="cursor-pointer" onClick={() => handleDelete(row.original)}> <IconDelete/></div>
      </div>
      ),
    },
  ];
  
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
        pageIndex ,
        pageSize: entriesPerPage
      }
    },
  });
  
  React.useEffect(() => {
    table.setPageSize(entriesPerPage)
  }, [entriesPerPage, table])

  React.useEffect(() => {
    table.setPageIndex(pageIndex)
  }, [pageIndex, table])
  
  function handleEdit(payment: BillingResponseType) {
    console.log("Editing payment:", payment);
  }
  
  function handleDelete(payment: BillingResponseType) {
    console.log("Deleting payment:", payment);
  }
  
  const handleView = () => {
    navigate(`/admin/billing/all-view`)
  }

  return (
    <div className="w-full">
      <div className="flex items-center w-full gap-4 py-4">
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
          placeholder="Filter id..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className='flex items-center gap-4 ml-auto'>
          <span>Total Billing : {totalDataCount}</span>
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
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end py-4 space-x-2'>
        <div className="flex-1 text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
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
  );
}
