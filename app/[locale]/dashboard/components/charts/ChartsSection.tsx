"use client";
import { useTranslations } from "next-intl";
import { ChartDataPoint } from "../../types";
import Heading from "@/components/shared/heading";
import { BaseGrid } from "@/components/shared/base-grid";
import SalesChart from "./SalesChart";
import ActivityChart from "./ActivityChart";
import { AllStatCards } from "../cards/AllStatCards";

interface ChartsSectionProps {
  data?: {
    sales?: ChartDataPoint[];
    activity?: ChartDataPoint[];
  };
  isLoading?: boolean;
}

export function ChartsSection({ data, isLoading = false }: ChartsSectionProps) {
  const t = useTranslations("dashboard");

  return (
    <section className="space-y-10 pt-4">
      <Heading
        title="Welcome Back,"
        highlightedName=" Taha!"
        description="Plan your next trip with ease. Manage your bookings, explore new flights, and keep track of your journeys in one place."
        className="mb-8"
      />
      <AllStatCards />
      <div className="space-y-6">
        {/* Revenue Trend Chart - Full Width */}

        {/* Two Column Charts */}
        <BaseGrid columns={{ sm: 1, md: 2 }}>
          <SalesChart />
        </BaseGrid>

        <BaseGrid columns={{ sm: 1, md: 2 }}>
          <ActivityChart />
        </BaseGrid>
      </div>
    </section>
  );
}
