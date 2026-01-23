"use client";

import { useFirebaseNotifications } from "@/providers/firebase-notification-provider";
import { Button } from "@/components/ui/button/button";
import { Bell, BellOff, Loader2, Check, X } from "lucide-react";

interface NotificationButtonProps {
  className?: string;
  showToken?: boolean;
}

/**
 * Button component for testing and managing push notifications
 * Shows current permission status and allows requesting permission
 */
export function NotificationButton({ className, showToken = false }: NotificationButtonProps) {
  const { fcmToken, permission, isSupported, isLoading, error, requestPermission, refreshToken } =
    useFirebaseNotifications();

  if (!isSupported) {
    return (
      <div className={className}>
        <Button variant="outline" disabled>
          <BellOff className="h-4 w-4 mr-2" />
          Notifications not supported
        </Button>
      </div>
    );
  }

  const handleClick = async () => {
    if (permission === "granted") {
      await refreshToken();
    } else {
      await requestPermission();
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-4 w-4 mr-2 animate-spin" />;
    if (permission === "granted") return <Check className="h-4 w-4 mr-2 text-green-500" />;
    if (permission === "denied") return <X className="h-4 w-4 mr-2 text-red-500" />;
    return <Bell className="h-4 w-4 mr-2" />;
  };

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (permission === "granted") return "Notifications Enabled";
    if (permission === "denied") return "Notifications Blocked";
    return "Enable Notifications";
  };

  const getButtonVariant = () => {
    if (permission === "granted") return "outline" as const;
    if (permission === "denied") return "destructive" as const;
    return "default" as const;
  };

  return (
    <div className={className}>
      <Button
        variant={getButtonVariant()}
        onClick={handleClick}
        disabled={isLoading || permission === "denied"}
      >
        {getStatusIcon()}
        {getButtonText()}
      </Button>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

      {showToken && fcmToken && (
        <div className="mt-2 p-2 bg-muted rounded text-xs break-all">
          <strong>FCM Token:</strong>
          <br />
          {fcmToken}
        </div>
      )}
    </div>
  );
}
