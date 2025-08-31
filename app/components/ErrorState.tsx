"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  retryAction?: () => void;
  fullScreen?: boolean;
}

export function ErrorState({ 
  message = "Something went wrong. Please try again.", 
  retryAction,
  fullScreen = false
}: ErrorStateProps) {
  const containerClasses = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-bg/80 z-50" 
    : "flex flex-col items-center justify-center p-6";

  return (
    <div className={containerClasses} role="alert" aria-live="assertive">
      <div className="bg-surface border border-error/30 rounded-lg p-6 max-w-md text-center">
        <AlertTriangle className="h-12 w-12 text-error mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-lg font-medium text-text-primary mb-2">Error</h3>
        <p className="text-text-secondary mb-4">{message}</p>
        
        {retryAction && (
          <button 
            onClick={retryAction}
            className="btn-secondary inline-flex items-center gap-2"
            aria-label="Retry action"
          >
            <RefreshCw size={16} aria-hidden="true" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
}

