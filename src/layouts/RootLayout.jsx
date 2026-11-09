import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/navigation';
import { getWhatsAppUrl } from '../utils/whatsapp';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

export default function RootLayout() {
  const primaryPhone = companyInfo.phones[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-navy-900 selection:bg-teal-500/20 selection:text-teal-700">
      <ScrollToTop />
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick WhatsApp Shortcut */}
      <div className="fixed bottom-6 right-6 z-30 print:hidden">
        <a
          href={getWhatsAppUrl(primaryPhone.raw)}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-xl shadow-green-600/30 hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-green-400/40"
          aria-label="Chat with Hana Lema (Expedition Travel – Go Lite) on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline">WhatsApp Chat</span>
        </a>
      </div>
    </div>
  );
}
