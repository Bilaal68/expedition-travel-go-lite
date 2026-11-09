import React, { useState, useEffect } from 'react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/common/ScrollReveal';
import { 
  Phone, MapPin, MessageCircle, Send, CheckCircle2, 
  AlertCircle, Clock, Mail, ShieldCheck, User 
} from 'lucide-react';
import { companyInfo } from '../data/navigation';
import { inquiryService } from '../services/inquiryService';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Guzo Certified Ticketing',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    document.title = "Contact & Inquiries | Expedition Travel – Go Lite";

    const params = new URLSearchParams(window.location.search);
    const querySubject = params.get('subject');
    if (querySubject) {
      setFormData((prev) => ({ ...prev, subject: querySubject }));
    }
  }, []);

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

    if (!formData.name || formData.name.trim().length < 2) {
      setStatus('error');
      setErrorMessage("Please enter your full name or company name.");
      return;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.phone || formData.phone.trim().length < 6) {
      setStatus('error');
      setErrorMessage("Please provide a valid contact telephone number.");
      return;
    }

    if (!formData.message || formData.message.trim().length < 8) {
      setStatus('error');
      setErrorMessage("Please provide a brief message describing your travel or ticketing requirements.");
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await inquiryService.submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
      });
      setStatus('success');
      setResultData(response);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || "Failed to transmit inquiry. Please contact Hana Lema directly via WhatsApp or phone.");
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setResultData(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Guzo Certified Ticketing',
      message: '',
    });
  };

  const primaryPhone = companyInfo.phones[0];

  const serviceOptions = [
    "Guzo Certified Ticketing",
    "Corridor Tour Operations",
    "B2B Corporate Travel Logistics",
    "Local Hospitality Curation",
    "General Expedition Inquiry",
    "Illustrative Destination: Lalibela",
    "Illustrative Destination: Gondar",
    "Illustrative Destination: Axum",
    "Illustrative Destination: Harar Jugol",
    "Illustrative Destination: Dallol & Danakil",
  ];

  return (
    <div className="flex flex-col bg-[#F8F6F0]">
      <PageHero
        badge="DIRECT DESK"
        title="Contact & Inquiries"
        subtitle="Connect with Hana Lema and our Addis Ababa operations team for Guzo certified flight ticketing, corridor operations, or corporate accounts."
        breadcrumbs={[{ label: "Contact" }]}
        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-20 sm:py-24 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left 5 Cols: Contact Details & Official Credentials */}
            <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-[#1F3D28] bg-[#E8DCC4] border border-[#D8C9AA] mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>OFFICIAL OPERATIONS DESK</span>
                </div>
                <h2 className="text-3xl font-serif font-extrabold text-[#1F3D28] leading-tight">
                  Direct Inquiries & Travel Coordination
                </h2>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  Our central desk in Addis Ababa coordinates domestic ticketing, international flight connections, and corridor transfers with verified accountability.
                </p>
              </div>

              {/* Verified Credentials Card */}
              <div className="bg-[#152B1C] p-6 rounded-3xl border border-[#1F3D28] text-[#E8DCC4] shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-white font-serif font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Expedition Travel – Go Lite</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8B5CF6] uppercase">ETAA Member</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#E8DCC4]/60 font-mono text-[11px] block">Primary Executive Contact</span>
                    <strong className="text-white text-sm font-semibold">{companyInfo.primaryContact}</strong>
                  </div>

                  <div>
                    <span className="text-[#E8DCC4]/60 font-mono text-[11px] block">Trade License Number</span>
                    <strong className="font-mono text-[#8B5CF6] text-xs font-bold">{companyInfo.tradeLicense}</strong>
                  </div>

                  <div>
                    <span className="text-[#E8DCC4]/60 font-mono text-[11px] block">Accredited Association</span>
                    <strong className="text-white font-medium">{companyInfo.association}</strong>
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="bg-white p-6 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B5CF6]">
                  COMMUNICATION CHANNELS
                </div>

                <div className="space-y-3">
                  {/* Phone */}
                  <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E8DCC4] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#1F3D28] text-[#E8DCC4] flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500 font-mono">Primary Desk & WhatsApp</div>
                        <a
                          href={`tel:${primaryPhone.raw}`}
                          className="text-sm font-bold text-[#1F3D28] hover:text-[#8B5CF6] transition-colors"
                        >
                          {primaryPhone.display}
                        </a>
                      </div>
                    </div>

                    <a
                      href={getWhatsAppUrl(primaryPhone.raw)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-[#1F3D28] text-[#E8DCC4] text-xs font-bold flex items-center gap-1.5 hover:bg-[#152B1C] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>Chat</span>
                    </a>
                  </div>

                  {/* Email */}
                  <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E8DCC4] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1F3D28] text-[#E8DCC4] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 font-mono">Official Email</div>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-sm font-bold text-[#1F3D28] hover:text-[#8B5CF6] transition-colors break-all"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="p-3 rounded-2xl bg-[#F8F6F0] border border-[#E8DCC4] flex items-center gap-2.5 text-xs text-slate-600">
                    <Clock className="w-4 h-4 text-[#1F3D28] shrink-0" />
                    <span>{companyInfo.hours}</span>
                  </div>
                </div>
              </div>

            </ScrollReveal>

            {/* Right 7 Cols: Inquiry Form */}
            <ScrollReveal direction="right" className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8DCC4] shadow-lg">
                
                {status === 'success' ? (
                  <div className="text-center py-8 space-y-5 animate-scale-in">
                    <div className="w-16 h-16 rounded-full bg-[#1F3D28] text-[#8B5CF6] flex items-center justify-center mx-auto border border-[#E8DCC4]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#1F3D28] font-serif">
                      Inquiry Transmitted Successfully
                    </h3>

                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Expedition Travel – Go Lite. Hana Lema and our operations team will review your travel parameters and respond promptly.
                    </p>

                    {resultData?.referenceId && (
                      <div className="inline-block px-4 py-2 rounded-xl bg-[#F8F6F0] border border-[#E8DCC4] font-mono text-xs font-bold text-[#1F3D28]">
                        Reference: {resultData.referenceId}
                      </div>
                    )}

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-300 text-xs font-bold uppercase tracking-wider text-[#1F3D28] hover:bg-slate-50 transition-colors"
                      >
                        Submit Another Inquiry
                      </button>

                      <a
                        href={getWhatsAppUrl(primaryPhone.raw, `Hello Hana Lema! I submitted travel inquiry ref ${resultData?.referenceId || ''}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1F3D28] text-[#E8DCC4] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#152B1C] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-[#8B5CF6]" />
                        <span>WhatsApp Hana Lema</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B5CF6] block mb-1">
                        INQUIRY SUBMISSION
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-[#1F3D28]">
                        Submit Your Travel Specifications
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Specify flight dates, transit corridors, or corporate account mandates. Direct response within standard office hours.
                      </p>
                    </div>

                    {status === 'error' && errorMessage && (
                      <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs sm:text-sm animate-fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1.5 font-mono">
                          Full Name / Company *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Hana Lema / Organization"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-[#1F3D28] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all placeholder:text-slate-400"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1.5 font-mono">
                          Telephone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +251 912 669 088"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-[#1F3D28] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1.5 font-mono">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. contact@domain.com"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-[#1F3D28] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all placeholder:text-slate-400"
                        />
                      </div>

                      {/* Subject / Service Selection */}
                      <div>
                        <label htmlFor="subject" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1.5 font-mono">
                          Service Pillar *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-[#1F3D28] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                        >
                          {serviceOptions.map((opt, oIdx) => (
                            <option key={oIdx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-[#1F3D28] uppercase tracking-wider mb-1.5 font-mono">
                        Requirements & Schedule Specifications *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Detail your preferred flight dates, seat preferences, transit corridor details, or enterprise travel requirements..."
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-[#1F3D28] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all placeholder:text-slate-400 resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 px-6 rounded-full bg-[#1F3D28] hover:bg-[#152B1C] active:bg-[#0D1B12] text-[#E8DCC4] hover:text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Transmitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Inquiry to Operations Desk</span>
                          <Send className="w-4 h-4 transform -rotate-12 text-[#8B5CF6]" />
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>
    </div>
  );
}
