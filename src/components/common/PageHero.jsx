import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHero({
  title,
  subtitle,
  badge,
  breadcrumbs = [],
  image = 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80',
  children
}) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-navy-900 border-b border-navy-800">
      {/* Background Image with dark navy gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title || "Expedition Travel – Go Lite"}
          className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex items-center flex-wrap gap-2 text-xs font-semibold text-slate-300">
            <li className="flex items-center gap-1.5">
              <Link to="/" className="hover:text-teal-300 transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-slate-400" />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-teal-300 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-teal-400 truncate max-w-[200px] sm:max-w-xs">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 bg-teal-500/20 text-teal-300 border border-teal-500/30 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span>{badge}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl animate-fade-in-up stagger-1">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed animate-fade-in-up stagger-2">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
