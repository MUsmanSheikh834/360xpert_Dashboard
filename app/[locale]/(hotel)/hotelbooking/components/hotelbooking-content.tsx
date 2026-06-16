"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchHotelBookings } from "@/redux/slices/hotel-booking-slice";
import { DashboardProps } from "../type";
import { BookingStatCards } from "./cards/BookingStatCards";
import { HotelBookingTable } from "./data/hotelbooking-table";
import { Button } from "@/components/ui/button/button";
import HotelBookingModal from "./modals/hotelbooking-modal";
import { useState } from "react";

export function HotelBookingContent({ isLoading: externalLoading = false }: DashboardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchHotelBookings());
  }, [dispatch]);

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0A3D6B]">Hotel Booking</h1>
          <p className="text-sm text-gray-400 mt-1">
            Plan Your Next Trip With Ease. Manage Your Bookings, Explore New Flights, And Keep Track
            Of Your Journeys In One Place.
          </p>
        </div>
        <Button
          className="rounded-full px-5 h-9 text-sm font-semibold text-white"
          style={{ background: "#00C6B0" }}
          onClick={() => setOpen(true)}
        >
          Add New Booking
        </Button>
      </div>
      {open && <HotelBookingModal onClose={() => setOpen(false)} />}

      {/* Stat Cards */}
      <BookingStatCards />

      {/* Bookings Table */}
      <HotelBookingTable />
    </div>
  );
}
