import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ShieldCheck, ArrowUpRight, Check } from 'lucide-react';
import { companyInfo } from '../../data/navigation';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const primaryPhone = companyInfo.phones[0];
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const services = [
    { name: "Guzo Certified Ticketing", path: "/services/guzo-certified-ticketing" },
    { name: "Corridor Tour Operations", path: "/services/corridor-tour-operations" },
    { name: "B2B Corporate Travel Logistics", path: "/services/b2b-corporate-travel-logistics" },
    { name: "Local Hospitality Curation", path: "/services/local-hospitality-curation" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Expedition Travel", path: "/about" },
    { name: "All Service Capabilities", path: "/services" },
    { name: "Illustrative Destinations", path: "/destinations" },
    { name: "Contact & Inquiries", path: "/contact" },
  ];

  return (
    <footer className="bg-[#0D1B12] text-[#E8DCC4] pt-16 sm:pt-20 pb-10 border-t border-[#1F3D28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Credentials Ribbon */}
        <div className="pb-12 mb-12 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8B5CF6]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-mono text-[#8B5CF6]">Verified Travel Agency</p>
              <p className="text-sm font-semibold text-white">Ethiopian Travel Agents Association (ETAA) Member</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#E8DCC4]/70">
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              License: <strong className="text-white font-medium">{companyInfo.tradeLicense}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              Contact: <strong className="text-white font-medium">{companyInfo.primaryContact}</strong>
            </span>
          </div>
        </div>

        {/* 4 Columns Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/logo-white-trimmed.png"
                alt="Expedition Travel – Go Lite"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#E8DCC4]/80 font-normal leading-relaxed max-w-sm pt-2">
              Expedition Travel – Go Lite coordinates certified Guzo flight ticketing, transit corridor tour operations, enterprise B2B logistics, and vetted hospitality across Ethiopia.
            </p>

            <div className="pt-2 text-xs font-mono text-[#8B5CF6]">
              MOT/ETA/2024/042 • ETAA Accredited
            </div>
          </div>

          {/* Column 2: 4 Core Services (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 font-mono">
              Core Capabilities
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              {services.map((svc) => (
                <li key={svc.path}>
                  <Link
                    to={svc.path}
                    className="text-[#E8DCC4]/75 hover:text-white transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span>{svc.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 font-mono">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#E8DCC4]/75 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  className="text-[#E8DCC4]/40 hover:text-[#8B5CF6] transition-colors inline-flex items-center gap-1 text-[11px] pt-1"
                >
                  Admin Portal →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operations Desk (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 font-mono">
              Operations Desk
            </h3>

            <div className="text-xs text-[#E8DCC4]/80 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {companyInfo.location}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <a
                  href={`tel:${primaryPhone.raw}`}
                  className="hover:text-white transition-colors font-medium text-white"
                >
                  {primaryPhone.display}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {companyInfo.email}
                </a>
              </div>

              <div className="pt-2">
                <p className="text-[11px] font-mono text-[#E8DCC4]/50">
                  Primary Contact: <span className="text-white font-sans">{companyInfo.primaryContact}</span>
                </p>
                <p className="text-[11px] font-mono text-[#E8DCC4]/50">
                  Hours: {companyInfo.hours}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Verified License Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#E8DCC4]/60">
          <div>
            &copy; {currentYear} Expedition Travel – Go Lite. All Rights Reserved.
          </div>
          <div className="text-center sm:text-right text-[11px]">
            ETAA Member • Trade License MOT/ETA/2024/042 • Addis Ababa, Ethiopia
          </div>
        </div>

      </div>
    </footer>
  );
}
