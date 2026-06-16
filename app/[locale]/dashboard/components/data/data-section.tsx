"use client";

import { DataTable } from "./data-table";
import { TableColumn } from "../../types";
import { TicketIcon } from "@/lib/icons/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { RecentBooking } from "@/app/[locale]/dashboard/types";

export function DataSection() {
  const { data } = useSelector((state: RootState) => state.dashboard.recentBookings);
  const isLoading = useSelector((state: RootState) => state.dashboard.loading.recentBookings);

  const columns: TableColumn<RecentBooking>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "contactNo", label: "Contact No", sortable: false },
    { key: "email", label: "Email Address", sortable: false },
    { key: "code", label: "Code", sortable: false },
    { key: "airportFrom", label: "Airport From", sortable: true },
    { key: "airportTo", label: "Airport To", sortable: true },
    { key: "departure", label: "Departure", sortable: false },
    { key: "arrival", label: "Arrival", sortable: false },
    { key: "status", label: "Status", sortable: true },
  ];

  return (
    <section>
      <DataTable
        title="Recent Booking"
        data={data}
        columns={columns}
        icon={TicketIcon}
        searchKey="name"
        filterOptions={{
          key: "status",
          options: [
            { label: "Pending", value: "Pending" },
            { label: "Confirmed", value: "Confirmed" },
            { label: "Published", value: "Published" },
          ],
        }}
        isLoading={isLoading}
        showPagination={false}
      />
    </section>
  );
}
