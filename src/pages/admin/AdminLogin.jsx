import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminLogin() {
  const { t, language, setLanguage, languages = [], supportedLanguages = [] } = useLanguage();
  const availableLanguages = languages.length > 0 ? languages : supportedLanguages;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, loginDemo, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleDemoLogin = () => {
    loginDemo();
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      await signIn({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err.message || 'Invalid login credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-navy-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* Language Switcher in top right */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/10">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              language === lang.code
                ? 'bg-teal-500 text-white shadow-xs font-bold'
                : 'text-navy-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="mr-1">{lang.flag}</span>
            <span>{lang.nativeName}</span>
          </button>
        ))}
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Logo and Heading */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="h-18 px-5 py-2.5 rounded-2xl bg-white shadow-xl border border-slate-200 inline-flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/logo-trimmed.png"
                alt="Expedition Travel – Go Lite"
                className="h-10 w-auto object-contain"
              />
            </div>
          </Link>
          <h2 className="mt-4 text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
            {t('admin.portalTitle')}
          </h2>
          <p className="mt-2 text-sm text-navy-300">
            {t('admin.signInSubtitle')}
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-navy-100">
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                {t('admin.emailLabel')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="expeditionsguzo@gmail.com"
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                {t('admin.passwordLabel')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-forest-800 hover:bg-forest-900 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{t('admin.signInBtn')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>

            {/* Quick Demo Access Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-4 bg-gold-50 hover:bg-gold-100 border border-gold-300 text-gold-900 font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>⚡ Instant Demo Access (1-Click)</span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs text-navy-500 hover:text-teal-600 font-semibold transition-colors inline-flex items-center gap-1"
            >
              &larr; {t('admin.returnPublicSite')}
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-navy-400">
          {t('admin.authorizedOnly')}
        </p>
      </div>
    </div>
  );
}
