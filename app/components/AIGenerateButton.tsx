"use client";

import { Sparkles, Loader2, HelpCircle } from "lucide-react";
import { useState } from "react";

interface AIGenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function AIGenerateButton({ onClick, isLoading, disabled }: AIGenerateButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className="btn-accent flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isLoading ? "Generating tasks..." : "Generate tasks with AI"}
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
        ) : (
          <Sparkles size={16} aria-hidden="true" />
        )}
        <span>{isLoading ? 'Generating...' : 'Generate Tasks'}</span>
      </button>
      
      <button 
        className="absolute -top-2 -right-2 bg-surface rounded-full p-1 border border-border hover:border-accent transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label="AI generation help"
      >
        <HelpCircle size={14} className="text-text-secondary" aria-hidden="true" />
      </button>
      
      {showTooltip && (
        <div className="tooltip -top-24 right-0 w-64 animate-fade-in">
          <div className="font-medium mb-1 text-text-primary">AI Task Generation</div>
          <p className="text-text-secondary text-xs mb-2">
            Enter your project goal or task description in the input field, then click this button to automatically generate a set of organized tasks.
          </p>
          <div className="text-xs text-accent">Example: "Launch a new podcast series"</div>
        </div>
      )}
    </div>
  );
}
