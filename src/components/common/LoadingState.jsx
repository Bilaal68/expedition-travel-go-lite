import React from 'react';
import { CardSkeleton } from './Skeleton';

export default function LoadingState({
  message = 'Loading...',
  height = 'h-64',
  asCards = false,
  cardsCount = 3,
}) {
  if (asCards) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full animate-fadeIn">
        {Array.from({ length: cardsCount }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full ${height} flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center animate-fadeIn`}>
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-3 border-teal-500/20 border-t-teal-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-teal-500" />
        </div>
      </div>
      <p className="mt-4 text-xs font-semibold text-slate-500 tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
}
