import React from 'react';

/**
 * Lightweight, accessible skeleton components that work smoothly on low-end devices
 * without expensive CSS animations or heavy libraries.
 */

export function Skeleton({ className = '' }) {
  return (
    <div
      className={`bg-slate-200/70 rounded-xl animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col h-full">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-[50vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fadeIn">
      <div className="space-y-4 max-w-xl">
        <Skeleton className="h-5 w-32 rounded-full" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
