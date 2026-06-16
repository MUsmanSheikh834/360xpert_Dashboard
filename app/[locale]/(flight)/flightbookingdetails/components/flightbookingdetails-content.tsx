"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchFlightBookingDetail } from "@/redux/slices/flight-booking-detail-slice";
import { BookingDetail } from "./cards/bookingdetail";
import { ClientInfo } from "./cards/clientinfo";
import { Tickets } from "./cards/tickets";
import { PaymentInfo } from "./cards/paymentinfo";

export default function FlightBookingDetailContent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFlightBookingDetail());
  }, [dispatch]);

  return (
    <div>
      <BookingDetail />
      <ClientInfo />
      <Tickets />
      <PaymentInfo />
    </div>
  );
}
