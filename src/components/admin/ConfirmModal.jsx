import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  isDanger = true,
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const displayTitle = title || t('admin.confirmActionTitle');
  const displayMessage = message || t('admin.deleteModalDesc');
  const displayConfirm = confirmText || (isDanger ? t('admin.delete') : t('admin.confirm'));
  const displayCancel = cancelText || t('admin.cancel');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden animate-scale-in"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isDanger ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-teal-600'
              }`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-900">{displayTitle}</h3>
                <p className="text-xs text-navy-500 mt-0.5">{t('admin.confirmActionDesc')}</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="text-navy-400 hover:text-navy-700 p-1 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-4 text-sm text-navy-600 leading-relaxed bg-navy-50/60 p-3.5 rounded-xl border border-navy-100/60">
            {displayMessage}
          </p>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2.5 text-sm font-semibold text-navy-700 bg-navy-100 hover:bg-navy-200 rounded-xl transition-colors disabled:opacity-50"
            >
              {displayCancel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center gap-2 ${
                isDanger
                  ? 'bg-red-600 hover:bg-red-700 shadow-red-200'
                  : 'bg-teal-600 hover:bg-teal-700 shadow-teal-200'
              }`}
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {displayConfirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
