import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  FileText, 
  Inbox, 
  AlertCircle, 
  ArrowUpRight, 
  Plus, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState({
    totalTours: 0,
    totalDestinations: 0,
    totalPosts: 0,
    totalInquiries: 0,
    newInquiriesCount: 0,
    recentInquiries: [],
    recentTours: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.getDashboardMetrics();
      setMetrics(data);
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
      setError('Could not load all dashboard data. Using local preview data.');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: t('admin.metrics.totalTours'),
      count: metrics.totalTours,
      icon: Compass,
      color: 'teal',
      link: '/admin/tours',
      desc: t('admin.metrics.totalToursDesc'),
    },
    {
      title: t('admin.metrics.destinations'),
      count: metrics.totalDestinations,
      icon: MapPin,
      color: 'blue',
      link: '/admin/destinations',
      desc: t('admin.metrics.destinationsDesc'),
    },
    {
      title: t('admin.metrics.blogArticles'),
      count: metrics.totalPosts,
      icon: FileText,
      color: 'purple',
      link: '/admin/blog',
      desc: t('admin.metrics.blogArticlesDesc'),
    },
    {
      title: t('admin.metrics.totalInquiries'),
      count: metrics.totalInquiries,
      icon: Inbox,
      color: 'amber',
      link: '/admin/inquiries',
      badge: metrics.newInquiriesCount > 0 ? t('admin.metrics.newLeads', { count: metrics.newInquiriesCount }) : null,
      desc: t('admin.metrics.totalInquiriesDesc'),
    },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'teal':
        return {
          bg: 'bg-teal-50',
          text: 'text-teal-600',
          border: 'border-teal-200',
          iconBg: 'bg-teal-600 text-white',
        };
      case 'blue':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          iconBg: 'bg-blue-600 text-white',
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          border: 'border-purple-200',
          iconBg: 'bg-purple-600 text-white',
        };
      case 'amber':
      default:
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-600',
          border: 'border-amber-200',
          iconBg: 'bg-amber-600 text-white',
        };
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-navy-950 tracking-tight">
            {t('admin.welcomeTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 mt-1">
            {t('admin.welcomeSubtitle')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/tours"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-teal-700 btn-interactive"
          >
            <Plus className="w-4 h-4" />
            <span>{t('admin.manageTours')}</span>
          </Link>
          <Link
            to="/admin/inquiries"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-navy-800 text-xs font-bold rounded-xl border border-navy-200 hover:bg-navy-50 btn-interactive"
          >
            <Inbox className="w-4 h-4 text-teal-600" />
            <span>{t('admin.viewInquiries')}</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card) => {
          const colors = getColorClasses(card.color);
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white rounded-3xl p-6 border border-navy-100 shadow-sm card-hover-effect group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl ${colors.iconBg} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                {card.badge && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                    {card.badge}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-navy-500 uppercase tracking-wider">
                  {card.title}
                </p>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-3xl font-heading font-extrabold text-navy-950">
                    {loading ? '—' : card.count}
                  </span>
                  <span className="text-navy-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-xs text-navy-400 mt-1">{card.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Inquiries & Recent Tours */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Customer Inquiries (8 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-navy-100 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-navy-100">
            <div>
              <h3 className="font-heading font-extrabold text-base text-navy-950">
                {t('admin.recentInquiriesTitle')}
              </h3>
              <p className="text-xs text-navy-500 mt-0.5">
                {t('admin.recentInquiriesSub')}
              </p>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>{t('admin.allInquiries')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-navy-50 flex-1">
            {loading ? (
              <div className="py-12 text-center text-xs text-navy-400">
                {t('admin.loadingInquiries')}
              </div>
            ) : metrics.recentInquiries.length === 0 ? (
              <div className="py-12 text-center">
                <Inbox className="w-8 h-8 text-navy-300 mx-auto mb-2" />
                <p className="text-xs font-medium text-navy-500">
                  {t('admin.noInquiriesFound')}
                </p>
              </div>
            ) : (
              metrics.recentInquiries.map((inq) => {
                const isNew = !inq.status || inq.status === 'new';
                const cleanPhone = (inq.phone || '').replace(/\D/g, '');

                return (
                  <div key={inq.id} className="py-3 px-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 group table-row-hover border-b border-navy-50 last:border-none">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-navy-900 truncate">
                          {inq.fullName || inq.name || 'Anonymous Inquiry'}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                            isNew
                              ? 'bg-amber-100 text-amber-800'
                              : inq.status === 'contacted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {inq.status === 'contacted' ? t('admin.contactedStatus') : inq.status === 'closed' ? t('admin.closedStatus') : t('admin.newStatus')}
                        </span>
                      </div>

                      <p className="text-xs text-navy-600 mt-1 truncate">
                        {inq.tourTitle ? (
                          <span className="font-semibold text-teal-700">{inq.tourTitle}</span>
                        ) : (
                          <span>{inq.message?.slice(0, 70) || 'General travel inquiry'}</span>
                        )}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-navy-400 mt-1.5">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {inq.phone}
                        </span>
                        {inq.createdAt && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {cleanPhone && (
                        <a
                          href={`https://wa.me/${cleanPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                          title="Open WhatsApp Chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      <Link
                        to="/admin/inquiries"
                        className="px-3 py-1.5 bg-navy-50 hover:bg-navy-100 text-navy-700 rounded-xl text-xs font-semibold transition-colors"
                      >
                        {t('admin.viewDetailsModal')}
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Tour Highlights & Business Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Tours Card */}
          <div className="bg-white rounded-3xl border border-navy-100 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-navy-100">
              <h3 className="font-heading font-extrabold text-base text-navy-950">
                {t('admin.tourOverviewTitle')}
              </h3>
              <Link
                to="/admin/tours"
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <span>{t('admin.manageTours')}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="divide-y divide-navy-50 mt-2">
              {metrics.recentTours.map((tItem) => (
                <div key={tItem.id} className="py-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-navy-100 shrink-0">
                    <img
                      src={tItem.coverImage}
                      alt={tItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-navy-900 truncate">{tItem.title}</p>
                    <p className="text-[11px] text-navy-500 flex items-center gap-2 mt-0.5">
                      <span>{tItem.duration}</span>
                      <span>&bull;</span>
                      <span className="text-teal-600 font-semibold">{tItem.destination}</span>
                    </p>
                  </div>
                  {tItem.featured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 shrink-0">
                      Featured
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Addis Ababa Business Profile Box */}
          <div className="bg-gradient-to-br from-[#152B1C] to-[#0D1B12] text-white rounded-3xl p-6 shadow-lg border border-[#1F3D28]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1F3D28] text-electric-400 flex items-center justify-center shrink-0 border border-electric-500/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">
                  Expedition Travel – Go Lite Desk
                </h4>
                <p className="text-[11px] text-slate-300">
                  Addis Ababa, Ethiopia • ETAA MOT/ETA/2024/042
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Primary Desk:</span>
                <span className="font-semibold text-white">+251 912 669 088</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Official Email:</span>
                <span className="font-semibold text-white">expeditionsguzo@gmail.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Lead Contact:</span>
                <span className="font-semibold text-white">Hana Lema</span>
              </div>
            </div>

            <div className="mt-5">
              <Link
                to="/admin/settings"
                className="w-full py-2 px-3 bg-navy-800 hover:bg-navy-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-navy-700"
              >
                <span>{t('admin.editAgencyInfo')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
