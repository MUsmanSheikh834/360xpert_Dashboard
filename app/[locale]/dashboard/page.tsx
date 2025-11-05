"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { DashboardContent } from "./components/dashboard-content";

export default function DashboardPage() {
  const { setLayoutType } = useLayout();
  useEffect(() => {
    setLayoutType("dashboard");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <DashboardContent />
    </DynamicLayout>
  );
}
