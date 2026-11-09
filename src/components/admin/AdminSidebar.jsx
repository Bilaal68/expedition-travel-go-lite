import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Compass, 
  MapPin, 
  FileText, 
  Inbox, 
  Settings, 
  ExternalLink, 
  LogOut, 
  X,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminSidebar({ isOpen, onClose }) {
  const { signOut, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navItems = [
    { name: t('admin.dashboard'), to: '/admin', icon: LayoutDashboard, end: true },
    { name: t('admin.tours'), to: '/admin/tours', icon: Compass },
    { name: t('admin.destinations'), to: '/admin/destinations', icon: MapPin },
    { name: t('admin.blog'), to: '/admin/blog', icon: FileText },
    { name: t('admin.inquiries'), to: '/admin/inquiries', icon: Inbox },
    { name: t('admin.settings'), to: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-navy-950 text-white flex flex-col border-r border-navy-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-navy-800/80 bg-navy-900/40">
          <Link to="/admin" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="h-11 w-auto px-2 py-1 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
              <img 
                src="/logo-white-trimmed.png" 
                alt="Expedition Travel Admin" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                Expedition <span className="text-electric-400 font-semibold text-[11px] px-1.5 py-0.5 rounded bg-[#1F3D28] border border-electric-500/30">Admin</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Go Lite Portal</span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-navy-400 hover:text-white hover:bg-navy-800 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-navy-400">
            {t('admin.quickActions')}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30 font-semibold'
                      : 'text-navy-300 hover:bg-navy-900/80 hover:text-white hover:translate-x-1'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* User Card & Footer Links */}
        <div className="p-4 border-t border-navy-800/80 bg-navy-900/30 space-y-3">
          <div className="px-3 py-2.5 rounded-xl bg-navy-900/90 border border-navy-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-950 text-teal-400 flex items-center justify-center shrink-0 border border-teal-800/40">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {user?.email || 'Admin Staff'}
              </p>
              <p className="text-[10px] text-teal-400 font-medium capitalize">
                {user?.role || 'Authenticated'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-navy-300 bg-navy-900 hover:bg-navy-800 hover:text-white transition-colors border border-navy-800/80"
              title="Open public website in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('admin.liveSite')}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 bg-navy-900 hover:bg-red-950/60 hover:text-red-300 transition-colors border border-navy-800/80"
              title="Sign out of admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('admin.logout')}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
