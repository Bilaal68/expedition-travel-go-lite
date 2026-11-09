import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, MessageCircle, Phone, Calendar, Users, Mail, User, ShieldCheck } from 'lucide-react';
import { inquiryService } from '../../services/inquiryService';
import Button from '../common/Button';
import { companyInfo } from '../../data/navigation';
import { getWhatsAppUrl, buildTourWhatsAppMessage } from '../../utils/whatsapp';
import { useLanguage } from '../../context/LanguageContext';

export default function BookingInquiryForm({ tourTitle = '', tourSlug = '', className = '' }) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    tourTitle: tourTitle || 'Guzo Certified Ticketing',
    tourSlug: tourSlug || '',
    fullName: '',
    phone: '',
    email: '',
    travelDate: '',
    travelers: '1',
    notes: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [resultData, setResultData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      setStatus('error');
      setErrorMessage("Please enter your full name or enterprise organization.");
      return;
    }

    if (!formData.phone || formData.phone.trim().length < 6) {
      setStatus('error');
      setErrorMessage("Please provide a valid contact telephone number.");
      return;
    }

    try {
      const response = await inquiryService.submitBookingInquiry(formData);
      setStatus('success');
      setResultData(response);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || "Failed to submit inquiry. Please reach out to Hana Lema via WhatsApp or phone.");
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setResultData(null);
    setFormData({
      tourTitle: tourTitle || 'Guzo Certified Ticketing',
      tourSlug: tourSlug || '',
      fullName: '',
      phone: '',
      email: '',
      travelDate: '',
      travelers: '1',
      notes: '',
    });
  };

  const primaryPhone = companyInfo.phones[0];

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCC4] shadow-xl relative overflow-hidden ${className}`}>
      {status === 'success' ? (
        <div className="text-center py-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-[#1F3D28] text-[#8B5CF6] flex items-center justify-center mx-auto mb-4 border border-[#E8DCC4]">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-[#1F3D28] mb-2 font-serif">
            Inquiry Transmitted Successfully
          </h3>
          
          <div className="inline-block px-3 py-1 rounded-full bg-[#F8F6F0] border border-[#E8DCC4] text-xs font-mono text-[#1F3D28] mb-4 font-bold">
            Reference: {resultData?.referenceId || 'EXP-2026-01'}
          </div>

          <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-md mx-auto">
            Hana Lema and our Addis Ababa operations team have received your request and will follow up with verified documentation.
          </p>

          <div className="space-y-3 max-w-sm mx-auto">
            <a
              href={getWhatsAppUrl(
                primaryPhone.raw,
                `Hello Hana Lema! I submitted travel inquiry ref ${resultData?.referenceId || ''} regarding ${formData.tourTitle}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full bg-[#1F3D28] text-[#E8DCC4] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#152B1C] transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-[#8B5CF6]" />
              <span>Connect with Hana Lema on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8B5CF6] block mb-1">
              DIRECT AGENCY INQUIRY
            </span>
            <h3 className="text-xl font-bold text-[#1F3D28] font-serif">
              Inquire Regarding This Capability
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Expedition Travel – Go Lite coordinates directly with verified airlines and lodging networks.
            </p>
          </div>

          {status === 'error' && errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Selected Tour context badge */}
          {formData.tourTitle && (
            <div className="p-3 rounded-2xl bg-[#F8F6F0] border border-[#E8DCC4] flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium font-mono text-[11px]">Selected Pillar:</span>
              <span className="font-bold text-[#1F3D28] text-right truncate max-w-[200px]">
                {formData.tourTitle}
              </span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="inquiry-name" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1 font-mono">
              Full Name / Organization *
            </label>
            <div className="relative">
              <input
                type="text"
                id="inquiry-name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Hana Lema / Enterprise Account"
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all placeholder:text-slate-400"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="inquiry-phone" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1 font-mono">
              Contact Phone Number *
            </label>
            <div className="relative">
              <input
                type="tel"
                id="inquiry-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +251 912 669 088"
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all placeholder:text-slate-400"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="inquiry-email" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1 font-mono">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="inquiry-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. traveler@domain.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all placeholder:text-slate-400"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Date & Travelers Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="inquiry-date" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1 font-mono">
                Target Date
              </label>
              <input
                type="date"
                id="inquiry-date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-slate-700"
              />
            </div>

            <div>
              <label htmlFor="inquiry-travelers" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1 font-mono">
                Delegation / Travelers
              </label>
              <select
                id="inquiry-travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-slate-700 bg-white"
              >
                <option value="1">1 Person (Executive / Solo)</option>
                <option value="2">2 Persons (Double / Couple)</option>
                <option value="3-5">3–5 Persons (Small Delegation)</option>
                <option value="6-15">6–15 Persons (Group Expedition)</option>
                <option value="Enterprise">Corporate / Enterprise Mandate</option>
              </select>
            </div>
          </div>

          {/* Notes & Special Requests */}
          <div>
            <label htmlFor="inquiry-notes" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1 font-mono">
              Requirements & Route Specifications
            </label>
            <textarea
              id="inquiry-notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Detail your flight dates, seat requirements, hotel preferences, or transit corridor objectives..."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3.5 px-6 rounded-full bg-[#1F3D28] hover:bg-[#152B1C] active:bg-[#0D1B12] text-[#E8DCC4] hover:text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {status === 'loading' ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Transmitting Inquiry...</span>
              </>
            ) : (
              <>
                <span>Send Service Inquiry</span>
                <Send className="w-4 h-4 transform -rotate-12 text-[#8B5CF6]" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
