import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  onClick,
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  target,
  rel,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-full btn-interactive cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2.5",
    xl: "px-8 py-3.5 text-lg gap-3",
  };

  const variantClasses = {
    primary: "bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white shadow-sm shadow-teal-500/20 font-bold",
    secondary: "border-2 border-navy-900 bg-white hover:bg-navy-900 hover:text-white text-navy-900 font-bold",
    tealOutline: "border border-teal-500 text-teal-600 hover:bg-teal-50 bg-white",
    outline: "bg-white text-navy-900 border border-slate-300 hover:border-teal-500 hover:text-teal-600 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:text-navy-900 hover:bg-slate-100",
    white: "bg-white text-navy-900 hover:bg-slate-100 shadow-md font-bold",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold shadow-md shadow-green-500/20",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  const content = (
    <>
      {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
