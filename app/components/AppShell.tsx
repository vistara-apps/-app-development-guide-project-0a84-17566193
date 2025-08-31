"use client";

import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <div className="w-full max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
