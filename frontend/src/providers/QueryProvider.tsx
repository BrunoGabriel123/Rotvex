"use client";

// Mock QueryProvider
// Replace with actual TanStack Query QueryClientProvider when integrating

import { ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Mock implementation - replace with actual QueryClientProvider
  return <>{children}</>;
}
