"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import HotelBookingDetailContent from "./components/hotelbookingdetails-content";

export default function HotelBookingDetailPage() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    setLayoutType("dashboard");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <HotelBookingDetailContent />
    </DynamicLayout>
  );
}
