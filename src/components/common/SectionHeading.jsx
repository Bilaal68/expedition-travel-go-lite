import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  children
}) {
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 bg-teal-50 text-teal-700 border border-teal-200">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}
      
      {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight mb-3">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
