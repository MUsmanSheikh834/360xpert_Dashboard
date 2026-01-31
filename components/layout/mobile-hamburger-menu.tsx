"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CloseIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  BarChartIcon,
  LogoutIcon,
} from "@/lib/icons/icons";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/tailwindUtils/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { removeAuthCookies } from "@/lib/cookie/cookie";
import { toast } from "sonner";
import { useResponsive } from "@/hooks/use-mobile";

interface MobileHamburgerMenuProps {
  className?: string;
  onClose: () => void;
}

export default function MobileHamburgerMenu({ className, onClose }: MobileHamburgerMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("layout.sidebar");
  const { width, breakpoint } = useResponsive();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Responsive behavior - adjust for different mobile sizes
  const isSmallMobile = width < 400;

  // Navigation items from i18n (layout.ts)
  const navItems = t.raw("items") as Array<{ href: string; title: string }>;

  // Lock body scroll when menu is open
  useEffect(() => {
    // Store original overflow value
    const originalOverflow = document.body.style.overflow;

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const pickIcon = (title: string) => {
    const key = title.toLowerCase();
    if (key.includes("home")) return HomeIcon;
    if (key.includes("dashboard")) return BarChartIcon;
    if (key.includes("setting")) return SettingsIcon;
    if (key.includes("profile") || key.includes("user")) return UserIcon;
    return HomeIcon;
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Remove auth-related cookies
      removeAuthCookies();
      toast.success("Logged out successfully");
      onClose(); // Close the mobile menu
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background md:hidden",
          "transition-transform duration-300 ease-in-out",
          "animate-in slide-in-from-left",
          className
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between border-b border-border/40",
            isSmallMobile ? "p-3 min-h-[56px]" : "p-4 min-h-[65px]"
          )}
        >
          <div className="flex items-center gap-2">
            <div className={cn("rounded-md bg-primary", isSmallMobile ? "w-6 h-6" : "w-8 h-8")} />
            <h2 className={cn("font-semibold", isSmallMobile ? "text-base" : "text-lg")}>
              Next Boiler
            </h2>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={cn("p-0", isSmallMobile ? "h-7 w-7" : "h-8 w-8")}
            aria-label={t("collapseLabel")}
          >
            <CloseIcon className={cn(isSmallMobile ? "h-4 w-4" : "h-5 w-5")} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className={cn("flex-1 space-y-1 overflow-y-auto", isSmallMobile ? "p-1.5" : "p-2")}>
          {navItems.map((item: any) => {
            const isActive = pathname === item.href;
            const Icon = pickIcon(item.title);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center rounded-lg font-medium transition-all",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  // Responsive sizing
                  isSmallMobile ? "text-xs gap-2 px-2 py-2" : "text-sm gap-3 px-3 py-2.5",
                  {
                    "bg-accent text-accent-foreground shadow-sm": isActive,
                    "text-muted-foreground hover:text-foreground": !isActive,
                  }
                )}
              >
                <Icon className={cn("flex-shrink-0", isSmallMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer with Logout */}
        <div className={cn("border-t border-border/40", isSmallMobile ? "p-1.5" : "p-2")}>
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              "w-full flex items-center rounded-lg font-medium transition-all",
              "hover:bg-accent hover:text-accent-foreground bg-transparent text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              // Responsive sizing
              isSmallMobile ? "text-xs gap-2 px-2 py-2" : "text-sm gap-3 px-3 py-2.5"
            )}
          >
            <LogoutIcon
              className={cn("flex-shrink-0", isSmallMobile ? "h-3.5 w-3.5" : "h-4 w-4")}
            />
            <span className="truncate">{isLoggingOut ? t("loggingOut") : t("logout")}</span>
          </Button>
        </div>
      </div>
    </>
  );
}
