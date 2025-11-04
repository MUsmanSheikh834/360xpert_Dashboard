"use client";
import { type PropsWithChildren, useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function UsersLayout({ children }: PropsWithChildren) {
  const { config, updateConfig, applyPreset } = useLayout();

  useEffect(() => {
    // Apply dashboard preset to show sidebar and header
    if (!config.header.enabled || !config.sidebar.enabled) {
      applyPreset("dashboard");
    }
  }, [config.header.enabled, config.sidebar.enabled, applyPreset]);

  return <DynamicLayout>{children}</DynamicLayout>;
}
