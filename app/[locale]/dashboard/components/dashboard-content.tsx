"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import { DashboardProps } from "../types";
import Heading from "@/components/shared/heading";
import SalesChart from "./charts/SalesChart";
import ActivityChart from "./charts/ActivityChart";
import { AllStatCards } from "./cards/AllStatCards";
import { DataSection } from "./data/data-section";
import WorldMap from "./maps/WorldMap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchAllDashboardData } from "@/redux/slices/dashboard-slice";

export function DashboardContent({ isLoading: externalLoading = false, data }: DashboardProps) {
  const { isLoading, handleRefresh } = useDashboard();
  const combinedLoading = isLoading;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllDashboardData());
  }, [dispatch]);

  return (
    <div>
      <section className="space-y-10 pt-4">
        <Heading
          title="Welcome Back,"
          highlightedName=" Taha!"
          description="Plan your next trip with ease. Manage your bookings, explore new flights, and keep track of your journeys in one place."
          className="mb-8"
        />
        <AllStatCards />
        <div className="grid grid-cols-6 gap-2 items-stretch">
          <div className="col-span-4 min-w-0">
            <DataSection />
          </div>
          <div className="col-span-2">
            <SalesChart />
          </div>
        </div>

        <div className="grid grid-cols-11 gap-1 items-stretch h-full">
          <div className="col-span-3 flex flex-col">
            <ActivityChart />
          </div>
          <div className="col-span-8 flex flex-col">
            <WorldMap />
          </div>
        </div>
      </section>
    </div>
  );
}
