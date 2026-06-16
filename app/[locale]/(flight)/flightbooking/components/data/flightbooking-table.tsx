"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { DataTable } from "./data-table";
import { TableColumn, FlightBooking } from "../../type";
import { RootState } from "@/redux/store";

export function FlightBookingTable() {
  const router = useRouter();
  const locale = useLocale();
  const { bookings, loading } = useSelector((state: RootState) => state.flightBookings);

  const columns: TableColumn<FlightBooking>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value) => (
        <span
          className="cursor-pointer text-xs text-gray-700 hover:text-cyan-600 hover:underline"
          onClick={() => router.push(`/${locale}/flightbookingdetails`)}
        >
          {value}
        </span>
      ),
    },
    { key: "manually", label: "", sortable: false },
    { key: "contactNo", label: "Contact No", sortable: false },
    { key: "email", label: "Email Address", sortable: false },
    { key: "reservationNo", label: "Reservation No", sortable: false },
    { key: "flightNo", label: "Flight No", sortable: false },
    { key: "airportFrom", label: "Airport From", sortable: true },
    { key: "airportTo", label: "Airport To", sortable: true },
    { key: "departureDatetime", label: "Departure Date/Time", sortable: true },
    { key: "returnDate", label: "Return Date", sortable: true },
    { key: "class", label: "Class", sortable: true },
    { key: "payment", label: "Payment", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  return (
    <DataTable
      title="All Bookings"
      data={bookings}
      columns={columns}
      searchKey="name"
      isLoading={loading}
      // ✅ No onRowClick here anymore
      filterOptions={{
        key: "status",
        options: [
          { label: "Pending", value: "Pending" },
          { label: "Confirmed", value: "Confirmed" },
          { label: "Issued", value: "Issued" },
          { label: "Cancelled", value: "Cancelled" },
        ],
      }}
      showPagination={true}
      defaultPageSize={20}
    />
  );
}
