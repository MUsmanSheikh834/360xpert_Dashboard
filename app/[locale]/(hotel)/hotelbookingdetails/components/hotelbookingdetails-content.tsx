"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchHotelBookingDetail } from "@/redux/slices/hotel-booking-detail-slice";
import { BookingDetail } from "./cards/bookingdetail";
import { ClientInfo } from "./cards/clientinfo";
import { PaymentInfo } from "./cards/paymentinfo";

export default function HotelBookingDetailContent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHotelBookingDetail());
  }, [dispatch]);

  return (
    <div>
      <BookingDetail />
      <ClientInfo />
      <PaymentInfo />
    </div>
  );
}
