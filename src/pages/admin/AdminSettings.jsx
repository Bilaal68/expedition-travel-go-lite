import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Share2, 
  Database, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { isSupabaseConfigured } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminSettings() {
  const { t } = useLanguage();
  const isConfigured = isSupabaseConfigured();

  const [settings, setSettings] = useState({
    name: 'Expedition Travel – Go Lite',
    tagline: 'Expedition Travel, Refined & Lite.',
    shortDesc: 'ETAA accredited Ethiopian travel agency based in Addis Ababa, MOT/ETA/2024/042.',
    location: 'Addis Ababa, Ethiopia',
    address: 'Addis Ababa, Ethiopia',
    hours: 'Monday – Saturday: 8:30 AM – 6:00 PM (EAT)',
    phones: [
      { label: 'Primary Desk', number: '+251 912 669 088', raw: '251912669088' },
    ],
    socials: {
      facebook: 'https://facebook.com',
      facebookName: 'Expedition Travel Go Lite',
      tiktok: '',
      tiktokHandle: '',
    },
    disclaimer: 'All reservations and logistics pipelines are coordinated through confirmed direct arrangements under Ethiopian trade license MOT/ETA/2024/042.',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await adminService.getSiteSettings();
      if (data) {
        setSettings(prev => ({
          ...prev,
          ...data,
          phones: data.phones || prev.phones,
          socials: data.socials || prev.socials,
        }));
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (index, field, value) => {
    setSettings(prev => {
      const updated = [...prev.phones];
      updated[index] = { ...updated[index], [field]: value };
      if (field === 'number') {
        updated[index].raw = value.replace(/\D/g, '');
      }
      return { ...prev, phones: updated };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await adminService.updateSiteSettings(settings);
      setSuccessMessage(t('admin.settingsSaved'));
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Failed to save settings:', err);
      setErrorMessage(err.message || 'Failed to update site settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-navy-950 tracking-tight">
            {t('admin.settingsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 mt-1">
            {t('admin.settingsSubtitle')}
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-700/20 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? t('admin.saving') : t('admin.saveSettings')}</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs font-semibold text-emerald-800 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs font-semibold text-red-800 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Supabase Connection Overview Card */}
      <div className="bg-white rounded-3xl border border-navy-100 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-navy-950">
                {t('admin.databaseSync')}
              </h3>
              <p className="text-xs text-navy-500">
                Database tables and image storage buckets
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              isConfigured
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {isConfigured ? t('admin.liveSupabase') : t('admin.localPreview')}
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-navy-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-navy-50/60 rounded-2xl border border-navy-100">
            <span className="font-bold text-navy-800 block mb-1">Configured Database Tables:</span>
            <ul className="space-y-1 text-navy-600 font-mono text-[11px]">
              <li>&bull; <span className="font-bold text-teal-700">tours</span> (slug, title, destination, category, itinerary)</li>
              <li>&bull; <span className="font-bold text-teal-700">destinations</span> (slug, name, region, cover_image)</li>
              <li>&bull; <span className="font-bold text-teal-700">blog_posts</span> (slug, title, content, cover_image)</li>
              <li>&bull; <span className="font-bold text-teal-700">inquiries</span> (customer leads, phone, tour, status)</li>
              <li>&bull; <span className="font-bold text-teal-700">site_settings</span> (company contact, address, socials)</li>
            </ul>
          </div>

          <div className="p-3.5 bg-navy-50/60 rounded-2xl border border-navy-100">
            <span className="font-bold text-navy-800 block mb-1">Configured Storage Buckets:</span>
            <ul className="space-y-1 text-navy-600 font-mono text-[11px]">
              <li>&bull; <span className="font-bold text-navy-900">tour-images</span> (for tour package cover photos)</li>
              <li>&bull; <span className="font-bold text-navy-900">destination-images</span> (for destination cards)</li>
              <li>&bull; <span className="font-bold text-navy-900">blog-images</span> (for travel blog articles)</li>
            </ul>
            <p className="text-[11px] text-navy-500 mt-2">
              All image uploads in the admin dashboard connect directly to these public storage buckets.
            </p>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Identity */}
        <div className="bg-white rounded-3xl border border-navy-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-navy-950 font-heading font-extrabold text-base border-b border-navy-100 pb-3">
            <Building2 className="w-5 h-5 text-teal-600" />
            <span>{t('admin.agencyProfile')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                {t('admin.agencyName')}
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                {t('admin.brandTagline')}
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                {t('admin.shortDescription')}
              </label>
              <textarea
                rows={2}
                value={settings.shortDesc}
                onChange={(e) => setSettings(prev => ({ ...prev, shortDesc: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Address and Location */}
        <div className="bg-white rounded-3xl border border-navy-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-navy-950 font-heading font-extrabold text-base border-b border-navy-100 pb-3">
            <MapPin className="w-5 h-5 text-teal-600" />
            <span>{t('admin.officeAndAddress')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                {t('admin.cityCountry')}
              </label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                {t('admin.businessHours')}
              </label>
              <input
                type="text"
                value={settings.hours}
                onChange={(e) => setSettings(prev => ({ ...prev, hours: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                {t('admin.physicalAddress')}
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
              <p className="text-[11px] text-navy-400 mt-1">
                Confirmed listing: Magaalaa Adaamaa Boole Waan Gaarii, second building.
              </p>
            </div>
          </div>
        </div>

        {/* Confirmed Phone Numbers */}
        <div className="bg-white rounded-3xl border border-navy-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-navy-950 font-heading font-extrabold text-base border-b border-navy-100 pb-3">
            <Phone className="w-5 h-5 text-teal-600" />
            <span>{t('admin.officialPhones')}</span>
          </div>

          <div className="space-y-3">
            {settings.phones.map((phone, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-navy-50/50 rounded-2xl border border-navy-100">
                <div>
                  <label className="block text-[11px] font-bold text-navy-700 mb-1">
                    {t('admin.lineLabel')}
                  </label>
                  <input
                    type="text"
                    value={phone.label}
                    onChange={(e) => handlePhoneChange(idx, 'label', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-navy-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-navy-700 mb-1">
                    {t('admin.phoneNumber')}
                  </label>
                  <input
                    type="text"
                    value={phone.number}
                    onChange={(e) => handlePhoneChange(idx, 'number', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-navy-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-3xl border border-navy-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-navy-950 font-heading font-extrabold text-base border-b border-navy-100 pb-3">
            <Share2 className="w-5 h-5 text-teal-600" />
            <span>{t('admin.socialProfiles')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                Facebook Page Name
              </label>
              <input
                type="text"
                value={settings.socials.facebookName}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  socials: { ...prev.socials, facebookName: e.target.value }
                }))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                TikTok Handle
              </label>
              <input
                type="text"
                value={settings.socials.tiktokHandle}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  socials: { ...prev.socials, tiktokHandle: e.target.value }
                }))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? t('admin.saving') : t('admin.saveSettings')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
