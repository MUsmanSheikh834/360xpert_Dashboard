"use client";

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { storage } from "@/lib/actions/actions";
import { useResponsive, type ResponsiveState } from "@/hooks/use-mobile";
import type {
  LayoutType,
  LayoutConfig,
  LayoutState,
  LayoutContextValue,
} from "@/components/layout/types/layout";
import { LAYOUT_CONFIGS } from "@/components/layout/types/layout";

// Default layout state
const defaultLayoutState: LayoutState = {
  sidebarCollapsed: false,
  mobileMenuOpen: false,
};

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

export function LayoutProvider({ children }: PropsWithChildren) {
  // Initialize layout type from localStorage or default to 'website'
  const [layoutType, setLayoutTypeState] = useState<LayoutType>(() => {
    const saved = storage.get("layout-type");
    return (saved as LayoutType) || "website";
  });

  const [state, setState] = useState<LayoutState>(defaultLayoutState);

  // Use enhanced responsive hook for comprehensive device detection
  const responsive = useResponsive();
  const isMobile = responsive.isMobile;

  // Get current layout configuration based on type
  const config = useMemo(() => LAYOUT_CONFIGS[layoutType], [layoutType]);

  // Save layout type to localStorage when it changes
  useEffect(() => {
    storage.set("layout-type", layoutType);
  }, [layoutType]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (state.mobileMenuOpen && !isMobile) {
      setState((prev) => ({ ...prev, mobileMenuOpen: false }));
    }
  }, [isMobile, state.mobileMenuOpen]);

  // Actions
  const setLayoutType = useCallback((type: LayoutType) => {
    setLayoutTypeState(type);
    // Reset state when changing layout type
    setState(defaultLayoutState);
  }, []);

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, mobileMenuOpen: !prev.mobileMenuOpen }));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, mobileMenuOpen: false }));
  }, []);

  const value = useMemo<LayoutContextValue>(
    () => ({
      config,
      state,
      isMobile,
      responsive,
      setLayoutType,
      toggleSidebar,
      toggleMobileMenu,
      closeMobileMenu,
    }),
    [
      config,
      state,
      isMobile,
      responsive,
      setLayoutType,
      toggleSidebar,
      toggleMobileMenu,
      closeMobileMenu,
    ]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return ctx;
}
