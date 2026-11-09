import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'No matches found',
  description = 'We could not find any results matching your search or filter criteria. Try adjusting your filters or search keywords.',
  onReset,
  resetText = 'Reset All Filters',
  actionTo,
  actionText = 'Browse All Tours'
}) {
  return (
    <div className="w-full text-center py-16 px-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs max-w-xl mx-auto my-8 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-gold-500/10 text-gold-400 flex items-center justify-center mx-auto mb-4 border border-gold-500/20">
        <Compass className="w-8 h-8" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-text-muted mb-6 leading-relaxed">{description}</p>
      
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onReset && (
          <Button
            onClick={onReset}
            variant="secondary"
            size="md"
            icon={RotateCcw}
          >
            {resetText}
          </Button>
        )}
        {actionTo && (
          <Button
            to={actionTo}
            variant="primary"
            size="md"
          >
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
}
