"use client";

import { Link } from "@/i18n/navigation";
import { MenuIcon, CloseIcon } from "@/lib/icons";
import { ThemeToggle } from "./theme-toggle";
import { UserProfile } from "./user-profile";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AuthButtons } from "./auth-buttons";
import Cookies from "js-cookie";
import { useLayout } from "@/contexts/layout-context";
import { useAuth } from "@/hooks/use-auth";
import MobileHamburgerMenu from "./mobile-hamburger-menu";
import { HEADER_HEIGHT } from "@/components/layout/types/layout";

export function Header({ className }: { className?: string }) {
  const { config, state, isMobile, responsive, toggleMobileMenu, closeMobileMenu } = useLayout();
  const { isAuthenticated, isLoading } = useAuth();
  const t = useTranslations("layout.header");

  // Responsive behavior
  const { isTablet, deviceType, width } = responsive;

  const [hasCookieUser, setHasCookieUser] = useState<boolean>(
    () =>
      typeof window !== "undefined" && (!!Cookies.get("auth_token") || !!Cookies.get("user_email"))
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () =>
      setHasCookieUser(!!Cookies.get("auth_token") || !!Cookies.get("user_email"));
    window.addEventListener("storage", check);
    const interval = setInterval(check, 300);
    return () => {
      window.removeEventListener("storage", check);
      clearInterval(interval);
    };
  }, []);

  const headerClasses = cn(
    "z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    HEADER_HEIGHT,
    // Responsive adjustments
    "transition-all duration-200",
    className
  );

  const containerClasses = cn(
    "h-full grid items-center",
    // Responsive grid with better spacing
    isTablet
      ? "grid-cols-[clamp(4px,1vw,8px)_1fr_clamp(4px,1vw,8px)]" // Tighter on tablet
      : "grid-cols-[clamp(8px,2vw,16px)_1fr_clamp(8px,2vw,16px)]" // Normal on desktop
  );

  const renderAuthSection = () => {
    if (isLoading) {
      return <div className="ml-1 w-24 h-9 animate-pulse rounded-md" />;
    }

    const showUser = isAuthenticated || hasCookieUser;
    return showUser ? (
      <UserProfile className="ml-1" />
    ) : (
      <AuthButtons variant="compact" className="ml-1" />
    );
  };

  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        {/* Middle content column with built-in side gutters (no margin/padding) */}
        <div className="col-start-2 col-end-3 flex items-center justify-between">
          {/* Left Section */}
          <div
            className={cn(
              "flex items-center",
              isTablet ? "gap-2" : "gap-3" // Tighter spacing on tablet
            )}
          >
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (state.mobileMenuOpen ? closeMobileMenu() : toggleMobileMenu())}
                className={cn(
                  "md:hidden p-0 transition-all",
                  width < 640 ? "h-8 w-8" : "h-9 w-9" // Smaller button on very small screens
                )}
                aria-label={t("toggleMobileNavLabel")}
              >
                {state.mobileMenuOpen ? (
                  <CloseIcon
                    className={cn(width < 640 ? "h-4 w-4" : "h-5 w-5")}
                    aria-hidden="true"
                  />
                ) : (
                  <MenuIcon
                    className={cn(width < 640 ? "h-4 w-4" : "h-5 w-5")}
                    aria-hidden="true"
                  />
                )}
              </Button>
            )}

            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity",
                // Responsive text sizing
                width < 640 ? "text-base" : isTablet ? "text-base" : "text-lg"
              )}
              onClick={() => closeMobileMenu()}
              aria-label={`${t("logoText")} - Go to Home`}
            >
              <span
                className={cn(
                  width < 400 ? "hidden" : "block", // Hide on very small screens
                  width >= 400 && width < 640 ? "truncate max-w-[120px]" : ""
                )}
              >
                {t("logoText")}
              </span>
            </Link>
          </div>

          {/* Right Section */}
          <div
            className={cn(
              "flex items-center",
              isTablet ? "gap-1" : "gap-2" // Tighter spacing on tablet
            )}
          >
            <LanguageSwitcher />
            <ThemeToggle />
            {renderAuthSection()}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobile && state.mobileMenuOpen && <MobileHamburgerMenu onClose={closeMobileMenu} />}
    </header>
  );
}
