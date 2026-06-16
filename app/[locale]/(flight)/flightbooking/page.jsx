"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { FlightBookingContent } from "./components/flightbooking-content";

export default function FlightBookingPage() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    setLayoutType("dashboard");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <FlightBookingContent />
    </DynamicLayout>
  );
}
