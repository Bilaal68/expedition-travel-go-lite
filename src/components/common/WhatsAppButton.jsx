import React, { useState } from 'react';
import { MessageCircle, Phone, X, ExternalLink } from 'lucide-react';
import { companyInfo } from '../../data/navigation';
import { getWhatsAppUrl } from '../../utils/whatsapp';

export default function WhatsAppButton({
  customMessage = '',
  buttonText = 'Chat on WhatsApp',
  variant = 'whatsapp',
  size = 'md',
  className = '',
  showSelector = true
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    if (showSelector && companyInfo.phones.length > 1) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const primaryPhone = companyInfo.phones[0];
  const directUrl = getWhatsAppUrl(primaryPhone.raw, customMessage);

  return (
    <>
      <a
        href={directUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center font-bold rounded-xl btn-interactive cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400/50 shadow-md ${
          variant === 'whatsapp' 
            ? 'bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-green-600/20' 
            : 'bg-navy-800 text-green-400 border border-green-500/30 hover:bg-navy-700'
        } ${size === 'sm' ? 'px-3 py-1.5 text-xs gap-1.5' : size === 'lg' ? 'px-6 py-3 text-base gap-2.5' : 'px-4 py-2 text-sm gap-2'} ${className}`}
      >
        <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
        <span>{buttonText}</span>
      </a>

      {/* Number Selector Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="card-surface w-full max-w-md rounded-2xl p-6 shadow-2xl border border-gold-500/30 relative animate-scale-in">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif">Connect on WhatsApp</h3>
                <p className="text-xs text-text-muted">Direct communication with Hana Lema (Expedition Travel – Go Lite)</p>
              </div>
            </div>

            <p className="text-sm text-text-muted mb-4">
              Our team is available to assist you with flight ticket reservations, hotel bookings, planned trips, group travel, and personalized itineraries across Ethiopia.
            </p>

            <div className="space-y-2.5">
              {companyInfo.phones.map((phone) => (
                <a
                  key={phone.raw}
                  href={getWhatsAppUrl(phone.raw, customMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-navy-900/80 border border-white/10 hover:border-[#25D366]/50 hover:bg-navy-900 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm flex items-center gap-2">
                        {phone.display}
                        {phone.primary && (
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-400 font-bold">
                            Primary
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-text-muted">{phone.label}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-[#25D366] transition-colors" />
                </a>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 text-center">
              <span className="text-xs text-text-muted">
                Office: Magaalaa Adaamaa Boole Waan Gaarii, second building.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
