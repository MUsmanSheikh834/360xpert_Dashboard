"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { UserModuleUser } from "@/types/user";

export const columns: ColumnDef<UserModuleUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name || "N/A",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email || "N/A",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.original.phone || "N/A",
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (row.original.age !== undefined ? row.original.age : "N/A"),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => row.original.gender || "N/A",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      row.original.createdAt ? new Date(row.original.createdAt).toLocaleString() : "N/A",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) =>
      row.original.updatedAt ? new Date(row.original.updatedAt).toLocaleString() : "N/A",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
