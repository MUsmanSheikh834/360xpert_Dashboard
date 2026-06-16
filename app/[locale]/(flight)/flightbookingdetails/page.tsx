"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import FlightBookingDetailContent from "./components/flightbookingdetails-content";

export default function FlightBookingDetailPage() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    setLayoutType("dashboard");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <FlightBookingDetailContent />
    </DynamicLayout>
  );
}
