import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Users, 
  MessageSquare, 
  Trash2, 
  CheckCircle, 
  X, 
  ExternalLink,
  ChevronRight,
  Send
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminInquiries() {
  const { t, formatDate } = useLanguage();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail Modal
  const [activeInquiry, setActiveInquiry] = useState(null);

  // Delete Modal
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await adminService.getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      await adminService.updateInquiryStatus(inquiryId, newStatus);
      setInquiries(prev => prev.map(inq => 
        inq.id === inquiryId ? { ...inq, status: newStatus } : inq
      ));
      if (activeInquiry && activeInquiry.id === inquiryId) {
        setActiveInquiry(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await adminService.deleteInquiry(deleteTarget.id);
      setDeleteTarget(null);
      if (activeInquiry && activeInquiry.id === deleteTarget.id) {
        setActiveInquiry(null);
      }
      await loadInquiries();
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
      alert('Failed to delete inquiry: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const term = search.toLowerCase();
    const nameMatch = (inq.fullName || inq.name || '').toLowerCase().includes(term);
    const phoneMatch = (inq.phone || '').toLowerCase().includes(term);
    const emailMatch = (inq.email || '').toLowerCase().includes(term);
    const tourMatch = (inq.tourTitle || '').toLowerCase().includes(term);
    const matchesSearch = nameMatch || phoneMatch || emailMatch || tourMatch;

    const inqStatus = inq.status || 'new';
    const matchesStatus = statusFilter === 'all' || inqStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const s = status || 'new';
    switch (s) {
      case 'contacted':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
            {t('admin.contactedStatus')}
          </span>
        );
      case 'closed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {t('admin.closedStatus')}
          </span>
        );
      case 'new':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            {t('admin.newStatus')}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-navy-950 tracking-tight">
            {t('admin.inquiriesTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 mt-1">
            {t('admin.inquiriesSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
            {inquiries.filter(i => !i.status || i.status === 'new').length} {t('admin.newStatus')}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-navy-100 text-navy-700 text-xs font-bold">
            {inquiries.length} {t('admin.all')}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-navy-100 p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('admin.searchInquiries')}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-navy-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-navy-200 bg-white text-navy-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-full md:w-44"
          >
            <option value="all">{t('admin.filterAllStatus')}</option>
            <option value="new">{t('admin.newStatus')}</option>
            <option value="contacted">{t('admin.contactedStatus')}</option>
            <option value="closed">{t('admin.closedStatus')}</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-3xl border border-navy-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-navy-400 flex flex-col items-center">
            <div className="w-8 h-8 border-3 border-teal-500/30 border-t-teal-600 rounded-full animate-spin mb-3" />
            <span>{t('admin.loadingInquiries')}</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Inbox className="w-10 h-10 text-navy-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-navy-800">{t('admin.noInquiriesFound')}</h3>
            <p className="text-xs text-navy-500 mt-1">
              {search || statusFilter !== 'all' 
                ? t('admin.noInquiriesFoundDesc')
                : t('admin.noInquiriesFoundDesc')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50/60 text-[11px] font-bold text-navy-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">{t('admin.colCustomer')}</th>
                  <th className="py-3.5 px-4">{t('admin.contactInfo')}</th>
                  <th className="py-3.5 px-4">{t('admin.colInquiryType')}</th>
                  <th className="py-3.5 px-4">{t('admin.colDate')}</th>
                  <th className="py-3.5 px-4">{t('admin.colStatus')}</th>
                  <th className="py-3.5 px-4 text-right">{t('admin.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50 text-xs">
                {filtered.map((inq) => {
                  const customerName = inq.fullName || inq.name || 'Anonymous Traveler';
                  const cleanPhone = (inq.phone || '').replace(/\D/g, '');
                  const currentStatus = inq.status || 'new';

                  return (
                    <tr key={inq.id} className="hover:bg-navy-50/40 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="font-bold text-navy-900">{customerName}</div>
                        {inq.referenceId && (
                          <div className="text-[10px] text-navy-400 font-mono mt-0.5">
                            Ref: {inq.referenceId}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1 text-navy-700">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Phone className="w-3.5 h-3.5 text-teal-600" />
                            {inq.phone}
                          </span>
                          {inq.email && (
                            <span className="flex items-center gap-1.5 text-navy-400 text-[11px]">
                              <Mail className="w-3 h-3" />
                              {inq.email}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        {inq.tourTitle ? (
                          <div className="truncate">
                            <span className="font-semibold text-teal-700">{t('admin.tourRequested')}: </span>
                            <span className="text-navy-900 font-medium">{inq.tourTitle}</span>
                          </div>
                        ) : (
                          <div className="text-navy-600 truncate">
                            {inq.message || inq.notes || t('contact.subjectGeneral')}
                          </div>
                        )}
                        {inq.travelersCount && (
                          <div className="text-[11px] text-navy-400 flex items-center gap-1 mt-0.5">
                            <Users className="w-3 h-3" />
                            <span>{inq.travelersCount} Travelers</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-navy-500 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-navy-400" />
                          <span>
                            {inq.createdAt ? formatDate(inq.createdAt) : 'Recent'}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border transition-colors cursor-pointer ${
                            currentStatus === 'new'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : currentStatus === 'contacted'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          <option value="new">{t('admin.newStatus')}</option>
                          <option value="contacted">{t('admin.contactedStatus')}</option>
                          <option value="closed">{t('admin.closedStatus')}</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(customerName)}%2C%20thank%20you%20for%20contacting%20H%20%26%20M%20Travel%20Agency!`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title={t('admin.replyWhatsApp')}
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          )}

                          <button
                            onClick={() => setActiveInquiry(inq)}
                            className="px-2.5 py-1 text-xs font-semibold text-navy-700 bg-navy-50 hover:bg-navy-100 rounded-lg transition-colors"
                          >
                            {t('admin.viewDetailsModal')}
                          </button>

                          <button
                            onClick={() => setDeleteTarget(inq)}
                            className="p-1.5 text-navy-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title={t('admin.delete')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-navy-100 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between bg-navy-50/50">
              <div>
                <h3 className="font-heading font-extrabold text-base text-navy-950">
                  {t('admin.inquiryDetails')}
                </h3>
                <p className="text-xs text-navy-400 mt-0.5 font-mono">
                  Ref: {activeInquiry.referenceId || activeInquiry.id}
                </p>
              </div>
              <button
                onClick={() => setActiveInquiry(null)}
                className="text-navy-400 hover:text-navy-800 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-navy-50/60 rounded-2xl border border-navy-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-navy-400">{t('admin.customerInfo')}</span>
                  <p className="font-bold text-navy-900 text-sm mt-0.5">
                    {activeInquiry.fullName || activeInquiry.name}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-navy-400">{t('admin.colStatus')}</span>
                  <div className="mt-0.5">
                    {getStatusBadge(activeInquiry.status)}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-navy-400">{t('contact.phoneLabel').replace('*', '').trim()}</span>
                  <p className="font-semibold text-navy-800 mt-0.5 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-teal-600" />
                    {activeInquiry.phone}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-navy-400">Email</span>
                  <p className="font-medium text-navy-700 mt-0.5">
                    {activeInquiry.email || '—'}
                  </p>
                </div>
              </div>

              {activeInquiry.tourTitle && (
                <div className="p-3.5 bg-teal-50/50 rounded-2xl border border-teal-100">
                  <span className="text-[10px] uppercase font-bold text-teal-800">
                    {t('admin.tourRequested')}
                  </span>
                  <p className="font-bold text-navy-950 text-sm mt-0.5">
                    {activeInquiry.tourTitle}
                  </p>
                  {activeInquiry.travelDate && (
                    <p className="text-navy-600 text-[11px] mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-teal-600" />
                      {activeInquiry.travelDate}
                    </p>
                  )}
                  {activeInquiry.travelersCount && (
                    <p className="text-navy-600 text-[11px] mt-0.5 flex items-center gap-1">
                      <Users className="w-3 h-3 text-teal-600" />
                      {activeInquiry.travelersCount} travelers
                    </p>
                  )}
                </div>
              )}

              <div>
                <span className="text-[10px] uppercase font-bold text-navy-400 block mb-1">
                  {t('admin.inquiryMessage')}
                </span>
                <div className="p-3.5 bg-navy-50 rounded-2xl border border-navy-100 text-navy-700 leading-relaxed">
                  {activeInquiry.notes || activeInquiry.message || '—'}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-navy-100">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteTarget(activeInquiry);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  {t('admin.delete')}
                </button>

                <div className="flex items-center gap-2">
                  {activeInquiry.phone && (
                    <a
                      href={`https://wa.me/${activeInquiry.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(activeInquiry.fullName || activeInquiry.name || '')}%2C%20thank%20you%20for%20contacting%20H%20%26%20M%20Travel%20Agency!`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{t('admin.replyWhatsApp')}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={t('admin.deleteModalTitle')}
        message={t('admin.deleteModalDesc')}
        confirmText={t('admin.delete')}
        cancelText={t('admin.cancel')}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
