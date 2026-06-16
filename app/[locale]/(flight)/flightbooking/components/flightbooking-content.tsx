"use client";

import { Button } from "@/components/ui/button/button";
import { FlightBookingStatCards } from "./cards/FlightBookingStatCards";
import { FlightBookingTable } from "./data/flightbooking-table";
import PassengerBookingModal from "./modals/passengerbooking-modal";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { fetchFlightBookings } from "@/redux/slices/flight-booking-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function FlightBookingContent() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFlightBookings());
  }, [dispatch]);

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between pt-4 sm:pt-6 md:pt-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A3D6B]">Booking</h1>
          <p className="text-sm text-gray-400 mt-1">
            Plan Your Next Trip With Ease. Manage Your Bookings, Explore New Flights, And Keep Track
            Of Your Journeys In One Place.
          </p>
        </div>
        <Button
          className="rounded-full px-5 h-9 text-sm font-semibold text-white flex-shrink-0"
          style={{ background: "#00C6B0" }}
          onClick={() => setOpen(true)}
        >
          Add New Booking
        </Button>
      </div>
      {open && <PassengerBookingModal onClose={() => setOpen(false)} />}
      {/* Stat Cards */}
      <FlightBookingStatCards />

      {/* Table */}
      <FlightBookingTable />
    </div>
  );
}
