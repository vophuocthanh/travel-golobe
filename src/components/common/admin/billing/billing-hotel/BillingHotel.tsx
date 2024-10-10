import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { IconDelete, IconEdit, IconView } from "@/common/icons";
import { useNavigate } from "react-router-dom";

const data: Payment[] = [
  { id: "m5gr84i9", billingTime: "2003-05-21", plan: "Basic", amount: 316, status: "success"},
  { id: "3u1reuv4", billingTime: "2024-09-20T12:00:00Z", plan: "Premium", amount: 242, status: "success"},
  { id: "4w2ht5k8", billingTime: "2024-09-22T09:00:00Z", plan: "Standard", amount: 150, status: "processing"},
  { id: "5u9hs7j4", billingTime: "2024-09-23T14:00:00Z", plan: "Basic", amount: 299, status: "failed"},
  { id: "6v3ir8l0", billingTime: "2024-09-24T16:00:00Z", plan: "Premium", amount: 350, status: "processing"},
  { id: "7w4js9m1", billingTime: "2024-09-25T11:30:00Z", plan: "Basic", amount: 175, status: "success"},
  { id: "8x5kt0n2", billingTime: "2024-09-26T10:45:00Z", plan: "Standard", amount: 225, status: "processing"},
  { id: "9y6lu1o3", billingTime: "2024-09-27T13:15:00Z", plan: "Premium", amount: 420, status: "failed"},
  { id: "a7zmn2p4", billingTime: "2024-09-28T15:00:00Z", plan: "Basic", amount: 190, status: "success"},
  { id: "b8nop3q5", billingTime: "2024-09-29T17:30:00Z", plan: "Standard", amount: 275, status: "processing"},
  { id: "c9pqr4r6", billingTime: "2024-09-30T18:45:00Z", plan: "Premium", amount: 310, status: "success"},
  { id: "d0stu5s7", billingTime: "2024-10-01T09:00:00Z", plan: "Basic", amount: 210, status: "failed"},
  { id: "e1tuv6t8", billingTime: "2024-10-02T12:15:00Z", plan: "Standard", amount: 195, status: "processing"},
  { id: "f2wvw7u9", billingTime: "2024-10-03T14:30:00Z", plan: "Premium", amount: 360, status: "processing"},
  { id: "g3xyz8v0", billingTime: "2024-10-04T16:00:00Z", plan: "Basic", amount: 205, status: "success"},
  { id: "h4yza9w1", billingTime: "2024-10-05T17:45:00Z", plan: "Standard", amount: 220, status: "failed"},
  { id: "i5zab0x2", billingTime: "2024-10-06T09:30:00Z", plan: "Premium", amount: 380, status: "success"},
  { id: "j6bcd1y3", billingTime: "2024-10-07T11:00:00Z", plan: "Basic", amount: 230, status: "processing"},
  { id: "k7cde2z4", billingTime: "2024-10-08T13:15:00Z", plan: "Standard", amount: 240, status: "processing"},
  { id: "l8def3a5", billingTime: "2024-10-09T14:30:00Z", plan: "Premium", amount: 400, status: "failed"}
];

export type Payment = {
  id: string;
  billingTime: string;
  plan: string;
  amount: number;
  status: "processing" | "success" | "failed";
};

export function BillingHotel() {
  const navigate = useNavigate()
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Payment>[] = [ 
    {
      accessorKey: "id",  
      header: () => <div className="text-left">ID</div>,
      cell: ({ row }) => <div className="text-left">{row.getValue("id")}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "billingTime",
      header: ({ column }) => (
        <Button
          className="flex justify-center w-full gap-x-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Billing Time
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("billingTime"));
        const formattedDate = date.toLocaleDateString("vn-Vn");
        return <div className="flex justify-center">{formattedDate}</div>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "plan",
      header: () => <div className="text-left">Plan</div>,
      cell: ({ row }) => <div className="text-left">{row.getValue("plan")}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "amount",
      header: () => <div className="flex justify-center">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="flex justify-center font-medium">{formatted}</div>;
      },
      enableSorting: true,
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
    },
  });
  
  function handleEdit(payment: Payment) {
    console.log("Editing payment:", payment);
  }
  
  function handleDelete(payment: Payment) {
    console.log("Deleting payment:", payment);
  }
  
  const handleView = () => {
    navigate(`/admin/billing/hotel-view`)
  }
  
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter id..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-black"
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-black"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}