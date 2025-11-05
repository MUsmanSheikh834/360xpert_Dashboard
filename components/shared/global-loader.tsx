"use client";

import React from "react";
import { useGlobalLoading } from "@/contexts/global-loading-context";
import Loader from "@/components/shared/loader";

const GlobalLoader: React.FC = () => {
  const { loadingState } = useGlobalLoading();

  return (
    <Loader
      isLoading={loadingState.isLoading}
      text={loadingState.text}
      variant={loadingState.variant}
      size={loadingState.size}
    />
  );
};

export default GlobalLoader;
