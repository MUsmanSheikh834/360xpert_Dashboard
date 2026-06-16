"use client";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import {
  SearchInputIcon,
  FilterIcon,
  SortIcon,
  UpIcon,
  DownIcon,
  EditIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/lib/icons/icons";
import { DataTableProps, SortDirection } from "../../type";
import { DataTableSkeleton } from "../loading/dashboard-loading";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  icon: Icon,
  searchKey,
  filterOptions,
  isLoading = false,
  showPagination = false,
  defaultPageSize = 20,
  onRowClick,
}: DataTableProps<T>) {
  const t = useTranslations("dashboard");
  const tShared = useTranslations("shared");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filterValue, setFilterValue] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // ── Per-row overrides for status and payment ─────────────────────────────
  // Shape: { [rowIndex]: { status?: string; payment?: string } }
  const [cellOverrides, setCellOverrides] = useState<Record<number, Record<string, string>>>({});

  const setOverride = (rowIndex: number, columnKey: string, value: string) => {
    setCellOverrides((prev) => ({
      ...prev,
      [rowIndex]: { ...prev[rowIndex], [columnKey]: value },
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];
    if (searchTerm && searchKey) {
      result = result.filter((item) =>
        String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterValue !== null && filterOptions) {
      result = result.filter((item) => item[filterOptions.key] === filterValue);
    }
    if (sortColumn && sortDirection) {
      result.sort((a, b) => {
        const aVal = a[sortColumn],
          bVal = b[sortColumn];
        if (typeof aVal === "number" && typeof bVal === "number")
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        const aStr = String(aVal).toLowerCase(),
          bStr = String(bVal).toLowerCase();
        return sortDirection === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      });
    }
    return result;
  }, [data, searchTerm, searchKey, sortColumn, sortDirection, filterValue, filterOptions]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = showPagination
    ? filteredAndSortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredAndSortedData;

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc");
      if (sortDirection === "desc") setSortColumn(null);
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (column: keyof T) => {
    if (sortColumn !== column) return <SortIcon className="h-2.5 w-2.5" />;
    if (sortDirection === "asc") return <UpIcon className="h-2.5 w-2.5" />;
    if (sortDirection === "desc") return <DownIcon className="h-2.5 w-2.5" />;
    return <SortIcon className="h-2.5 w-2.5" />;
  };

  const PAYMENT_STYLES: Record<string, string> = {
    paid: "text-green-600 font-medium",
    unpaid: "text-gray-400 font-medium",
    "partially paid": "text-cyan-600 font-medium",
  };

  const STATUS_STYLES: Record<string, string> = {
    pending: "bg-orange-50 text-orange-500 border border-orange-200",
    confirmed: "bg-green-50  text-green-600  border border-green-200",
    published: "bg-cyan-50   text-cyan-600   border border-cyan-200",
    completed: "bg-green-50  text-green-600  border border-green-200",
    issued: "bg-gray-100  text-gray-500   border border-gray-200",
    done: "bg-green-50  text-green-600  border border-green-200",
    "on-going": "bg-orange-50 text-orange-400 border border-orange-200",
    ahead: "bg-gray-100  text-gray-500   border border-gray-200",
    cancelled: "bg-red-50    text-red-500    border border-red-200",
    processing: "bg-blue-50   text-blue-600   border border-blue-200",
    inactive: "bg-gray-100  text-gray-500   border border-gray-200",
  };

  // rowIndex is the index within paginatedData — used to key into cellOverrides
  const renderCell = (column: any, item: T, rowIndex: number) => {
    // For status/payment: use local override if set, otherwise fall back to data value
    const rawValue = item[column.key];
    const value = cellOverrides[rowIndex]?.[column.key] ?? rawValue;

    // Manually badge
    if (column.key === "manually") {
      return value ? (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500 text-white">
          Manually
        </span>
      ) : null;
    }

    // Payment
    if (column.key === "payment" || column.key === "paymentStatus") {
      const key = String(value).toLowerCase();
      const cls = PAYMENT_STYLES[key] ?? "text-gray-500 font-medium";
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`inline-flex items-center gap-1 text-xs ${cls} hover:opacity-80`}
              onClick={(e) => e.stopPropagation()}
            >
              {value}
              <ChevronDownIcon className="h-3 w-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Paid", "Unpaid", "Partially paid"].map((s) => (
              <DropdownMenuItem
                key={s}
                onClick={(e) => {
                  e.stopPropagation();
                  setOverride(rowIndex, column.key, s);
                }}
              >
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    // Status
    if (column.key === "status") {
      const key = String(value).toLowerCase();
      const cls = STATUS_STYLES[key] ?? "bg-gray-100 text-gray-500 border border-gray-200";
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cls} hover:opacity-80 transition-opacity`}
              onClick={(e) => e.stopPropagation()}
            >
              {value}
              <ChevronDownIcon className="h-3 w-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Pending", "Confirmed", "Issued", "Cancelled"].map((s) => (
              <DropdownMenuItem
                key={s}
                onClick={(e) => {
                  e.stopPropagation();
                  setOverride(rowIndex, column.key, s);
                }}
              >
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (column.render) return column.render(value, item);
    return <span className="text-xs text-gray-700">{String(value ?? "")}</span>;
  };

  const activeFilterLabel =
    filterValue !== null
      ? (filterOptions?.options.find((o) => o.value === filterValue)?.label ?? String(filterValue))
      : "Pending";

  if (isLoading) return <DataTableSkeleton />;

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl w-full max-w-full">
      <CardHeader className="!pb-0 !pt-2 px-3">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5">
            {Icon && <Icon className="h-4 w-4 text-gray-500" />}
            <CardTitle className="text-lg font-bold text-[#1c3d8f]">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {searchKey && (
              <div className="relative">
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-2 pr-5 h-5 w-48 rounded-full border-gray-200 text-[9px]"
                />
                <SearchInputIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-2.5 w-2.5 text-gray-400" />
              </div>
            )}
            {filterOptions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-gray-200 text-gray-500 gap-1 h-6 px-2 text-[10px]"
                  >
                    <FilterIcon className="h-2.5 w-2.5" />
                    {activeFilterLabel}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by {filterOptions.key as string}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterValue(null);
                      setCurrentPage(1);
                    }}
                  >
                    All
                  </DropdownMenuItem>
                  {filterOptions.options.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => {
                        setFilterValue(option.value);
                        setCurrentPage(1);
                      }}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-0 pb-2 -mt-1">
        <div className="">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100">
                {columns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={`text-gray-400 font-normal text-[9px] py-0.5 px-1.5 whitespace-nowrap ${
                      column.sortable ? "cursor-pointer select-none" : ""
                    }`}
                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  >
                    <div className="flex items-center gap-0.5">
                      {column.label}
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-gray-400 font-normal text-[9px] py-0.5 px-1.5 whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="py-0.5 px-1.5 text-[9px] text-gray-700 whitespace-nowrap"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    {columns.map((column) => {
                      const isNameCell = column.key === "name";
                      return (
                        <TableCell
                          key={String(column.key)}
                          className={`py-0.5 text-[9px] text-gray-700 whitespace-nowrap ${
                            isNameCell && onRowClick
                              ? "cursor-pointer hover:text-cyan-600 hover:underline"
                              : ""
                          }`}
                          onClick={isNameCell ? () => onRowClick?.(item) : undefined}
                        >
                          {renderCell(column, item, index)}
                        </TableCell>
                      );
                    })}
                    <TableCell className="py-0.5 px-1.5">
                      <div className="flex items-center gap-1">
                        <button className="p-0.5 rounded-md text-cyan-500 hover:bg-cyan-50 transition-colors">
                          <EditIcon className="h-3 w-3" />
                        </button>
                        <button className="p-0.5 rounded-md text-red-400 hover:bg-red-50 transition-colors">
                          <TrashIcon className="h-3 w-3" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {showPagination && filteredAndSortedData.length > 0 && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <p className="text-[9px] text-gray-500">
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filteredAndSortedData.length)} of{" "}
              {filteredAndSortedData.length}
            </p>

            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
              >
                <ChevronLeftIcon className="h-3 w-3" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 rounded-md text-[9px] transition-colors ${
                    currentPage === page
                      ? "bg-cyan-500 text-white font-medium"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
              >
                <ChevronRightIcon className="h-3 w-3" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] text-gray-500">
              Booking Per Page
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-200 rounded-md px-1.5 py-0.5 text-[9px] text-gray-700"
              >
                {PAGE_SIZE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
