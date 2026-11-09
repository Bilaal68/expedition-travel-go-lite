import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Phone, ArrowLeft, Search, MessageSquare } from 'lucide-react';
import { companyInfo } from '../data/navigation';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function NotFound() {
  const primaryPhone = companyInfo.phones[0];

  useEffect(() => {
    document.title = "404 - Page Not Found | Expedition Travel – Go Lite";
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 sm:py-24 px-4 bg-gradient-to-b from-teal-50/50 via-white to-navy-50/30">
      <div className="max-w-xl mx-auto text-center space-y-8 animate-fade-in">
        {/* Visual 404 Badge with Brand Compass */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-28 h-28 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center border-2 border-teal-200 shadow-xl shadow-teal-500/10">
            <Compass className="w-14 h-14 text-teal-600 animate-spin-slow" />
          </div>
          <span className="absolute -top-3 -right-3 px-3.5 py-1 rounded-full bg-navy-900 text-white font-extrabold text-xs shadow-md tracking-wider">
            404
          </span>
        </div>

        {/* Content Heading & Explanation */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-extrabold uppercase tracking-widest">
            Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-navy-950 tracking-tight">
            Lost Your Way?
          </h1>
          <p className="text-navy-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            The page or travel service you requested does not exist or may have moved. Let Expedition Travel – Go Lite guide you back to planned Ethiopian journeys and travel arrangements.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-navy-50 text-navy-900 font-bold text-sm border-2 border-navy-900 transition-all hover:scale-[1.02]"
          >
            <Compass className="w-4 h-4 text-teal-600" />
            <span>Explore Destinations</span>
          </Link>
        </div>

        {/* Helpful Shortcuts Box */}
        <div className="mt-8 pt-8 border-t border-navy-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <Link
            to="/contact"
            className="p-4 rounded-2xl bg-white border border-navy-100 shadow-xs hover:border-teal-300 hover:shadow-sm transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-navy-900">Need Assistance?</p>
              <p className="text-[11px] text-navy-500">Contact our Addis Ababa office</p>
            </div>
          </Link>

          <a
            href={getWhatsAppUrl(primaryPhone.raw)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white border border-navy-100 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-navy-900">Direct WhatsApp</p>
              <p className="text-[11px] text-navy-500">+251 93 595 2778</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
