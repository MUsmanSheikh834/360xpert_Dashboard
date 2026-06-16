"use client";
import { DataTable } from "./data-table";
import { TableColumn, HotelBooking } from "../../type";
import { HotelIcon } from "@/lib/icons/icons";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const columns: TableColumn<HotelBooking>[] = [
  { key: "name", label: "Guest Name", sortable: true },
  { key: "manually", label: "", sortable: false },
  { key: "contactNo", label: "Contact No", sortable: false },
  { key: "email", label: "Email Address", sortable: false },
  { key: "bookingId", label: "Booking ID", sortable: false },
  { key: "roomNo", label: "Room No.", sortable: false },
  { key: "checkInDate", label: "Check-in Date", sortable: true },
  { key: "checkOutDate", label: "Check-out Date", sortable: true },
  { key: "nights", label: "No. of Nights", sortable: true },
  { key: "paymentStatus", label: "Payment Status", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export function HotelBookingTable() {
  const router = useRouter();
  const locale = useLocale();
  const { bookings, loading } = useSelector((state: RootState) => state.hotelBookings);

  return (
    <DataTable
      onRowClick={() => router.push(`/${locale}/hotelbookingdetails`)}
      title="All Booking"
      data={bookings}
      columns={columns}
      icon={HotelIcon}
      searchKey="name"
      isLoading={loading}
      filterOptions={{
        key: "status",
        options: [
          { label: "Ahead", value: "Ahead" },
          { label: "Done", value: "Done" },
          { label: "On-Going", value: "On-Going" },
          { label: "Pending", value: "Pending" },
        ],
      }}
      showPagination={true}
      defaultPageSize={20}
    />
  );
}
