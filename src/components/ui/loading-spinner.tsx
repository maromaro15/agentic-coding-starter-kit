"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  label = "Loading..."
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6 sm:h-8 sm:w-8",
    lg: "h-8 w-8 sm:h-12 sm:w-12"
  };

  return (
    <div 
      className={cn("flex items-center justify-center", className)}
      role="status"
      aria-label={label}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-[#F4A261]",
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

// Mobile-optimized skeleton loader
export function SkeletonLoader({ 
  className,
  lines = 3,
  showAvatar = false 
}: { 
  className?: string;
  lines?: number;
  showAvatar?: boolean;
}) {
  return (
    <div 
      className={cn("animate-pulse", className)}
      role="status"
      aria-label="Loading content..."
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        {showAvatar && (
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded-full flex-shrink-0" />
        )}
        <div className="flex-1 space-y-2 sm:space-y-3">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-3 sm:h-4 bg-gray-200 rounded-md",
                i === lines - 1 ? "w-3/4" : "w-full"
              )}
              style={{
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading content...</span>
    </div>
  );
}

// Touch feedback component for mobile interactions
export function TouchFeedback({ 
  children, 
  className,
  disabled = false,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "transition-all duration-150 ease-out",
        "active:scale-95 active:bg-gray-100",
        "focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        "touch-manipulation",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}