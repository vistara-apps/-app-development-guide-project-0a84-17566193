"use client";

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export function LoadingState({ 
  message = "Loading...", 
  size = 'md',
  fullScreen = false
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };
  
  const containerClasses = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-bg/80 z-50" 
    : "flex flex-col items-center justify-center p-6";

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <Loader2 className={`${sizeClasses[size]} text-accent animate-spin mb-3`} aria-hidden="true" />
      <p className="text-text-secondary text-sm md:text-base">{message}</p>
    </div>
  );
}

