"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { HotelBookingContent } from "./components/hotelbooking-content";

export default function HotelBookingPage() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    setLayoutType("dashboard");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <HotelBookingContent />
    </DynamicLayout>
  );
}
