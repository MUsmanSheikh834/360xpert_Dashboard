"use client";
import { useTranslations } from "next-intl";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  onSettings?: () => void;
  isLoading?: boolean;
}

export function DashboardHeader({
  onRefresh,
  onSettings,
  isLoading = false,
}: DashboardHeaderProps) {
  const t = useTranslations("dashboard");
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6 pt-4 sm:pt-6 md:pt-8">
      {/* Heading */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
    </div>
  );
}
