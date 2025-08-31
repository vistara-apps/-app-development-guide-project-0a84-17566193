"use client";

import { Sparkles, Loader2 } from "lucide-react";

interface AIGenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function AIGenerateButton({ onClick, isLoading, disabled }: AIGenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="btn-accent flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Sparkles size={16} />
      )}
      {isLoading ? 'Generating...' : 'Generate Tasks'}
    </button>
  );
}
