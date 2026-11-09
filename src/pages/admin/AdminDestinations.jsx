import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
  Edit3, 
  Trash2, 
  X, 
  AlertCircle, 
  Compass,
  Sparkles
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import ImageUploader from '../../components/admin/ImageUploader';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { useLanguage } from '../../context/LanguageContext';

const initialDestinationState = {
  name: '',
  slug: '',
  region: '',
  tourCount: 1,
  coverImage: '',
  description: '',
  highlights: '',
};

export default function AdminDestinations() {
  const { t, getLocalized } = useLanguage();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialDestinationState);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    setLoading(true);
    try {
      const data = await adminService.getDestinations();
      setDestinations(data);
    } catch (err) {
      console.error('Failed to load destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialDestinationState);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (dest) => {
    setEditingId(dest.id);
    setFormData({
      name: dest.name || '',
      slug: dest.slug || '',
      region: dest.region || '',
      tourCount: dest.tourCount || 1,
      coverImage: dest.coverImage || '',
      description: dest.description || '',
      highlights: Array.isArray(dest.highlights) ? dest.highlights.join('\n') : '',
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    if (!editingId) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, name, slug: generatedSlug }));
    } else {
      setFormData(prev => ({ ...prev, name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Please enter a destination name.');
      return;
    }

    setFormSubmitting(true);
    try {
      const payload = {
        ...formData,
        tourCount: Number(formData.tourCount) || 1,
        highlights: formData.highlights.split('\n').map(s => s.trim()).filter(Boolean),
      };

      if (editingId) {
        await adminService.updateDestination(editingId, payload);
      } else {
        await adminService.createDestination(payload);
      }

      setIsFormOpen(false);
      await loadDestinations();
    } catch (err) {
      console.error('Failed to save destination:', err);
      setFormError(err.message || 'Failed to save destination.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await adminService.deleteDestination(deleteTarget.id);
      setDeleteTarget(null);
      await loadDestinations();
    } catch (err) {
      console.error('Failed to delete destination:', err);
      alert('Failed to delete destination: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = destinations.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    (d.region && d.region.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-navy-950 tracking-tight">
            {t('admin.destinationsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 mt-1">
            {t('admin.destinationsSubtitle')}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-700/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('admin.addDestination')}</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-navy-100 p-4 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('admin.searchDestinations')}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Destinations Grid / Cards */}
      {loading ? (
        <div className="bg-white rounded-3xl border border-navy-100 p-12 text-center text-xs text-navy-400 flex flex-col items-center">
          <div className="w-8 h-8 border-3 border-teal-500/30 border-t-teal-600 rounded-full animate-spin mb-3" />
          <span>{t('admin.loadingDestinations')}</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-navy-100 p-12 text-center">
          <MapPin className="w-10 h-10 text-navy-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-navy-800">{t('admin.noDestinationsFound')}</h3>
          <p className="text-xs text-navy-500 mt-1">{t('admin.noDestinationsFoundDesc')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl border border-navy-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
            >
              <div className="relative h-44 overflow-hidden bg-navy-100">
                <img
                  src={dest.coverImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {dest.region || 'Saudi Arabia'}
                  </span>
                  <h3 className="text-lg font-heading font-extrabold text-white mt-1 drop-shadow-sm">
                    {getLocalized(dest, 'name') || dest.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-navy-600 line-clamp-3 leading-relaxed">
                    {getLocalized(dest, 'description') || dest.description || 'Explore scenic landscapes and historic cultural sites across Ethiopia.'}
                  </p>

                  {dest.highlights && dest.highlights.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {dest.highlights.slice(0, 3).map((hl, i) => (
                        <span key={i} className="text-[10px] bg-navy-50 text-navy-600 px-2 py-0.5 rounded-md font-medium border border-navy-100/60">
                          {hl}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-navy-100 flex items-center justify-between">
                  <span className="text-xs text-navy-500 flex items-center gap-1 font-medium">
                    <Compass className="w-3.5 h-3.5 text-teal-600" />
                    <span>{dest.tourCount || 1} {t('admin.colTourCount')}</span>
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(dest)}
                      className="p-1.5 text-navy-500 hover:text-navy-900 hover:bg-navy-100 rounded-lg transition-colors"
                      title={t('admin.edit')}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(dest)}
                      className="p-1.5 text-navy-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title={t('admin.delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-navy-100 w-full max-w-2xl my-8 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between bg-navy-50/50 sticky top-0 z-10">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-navy-950">
                  {editingId ? t('admin.editDestination') : t('admin.createDestination')}
                </h3>
                <p className="text-xs text-navy-500 mt-0.5">{t('admin.destModalSub')}</p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-navy-400 hover:text-navy-800 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelDestName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="e.g. Lalibela"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelSlug')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="lalibela"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelDestRegion')}
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                    placeholder="e.g. Amhara Region, Ethiopia"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelTourCount')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.tourCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, tourCount: e.target.value }))}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Cover Image Upload (destination-images bucket) */}
              <div className="pt-2 border-t border-navy-100">
                <ImageUploader
                  label={t('admin.labelCoverImage')}
                  value={formData.coverImage}
                  onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                  bucketName="destination-images"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                  {t('admin.labelOverview')}
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Overview of this Ethiopian destination, scenery, and travel appeal..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                  {t('admin.labelHighlights')}
                </label>
                <textarea
                  rows={3}
                  value={formData.highlights}
                  onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value }))}
                  placeholder="Sanetti Plateau&#10;Harenna Forest&#10;Endemic Ethiopian Wolf"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div className="pt-4 border-t border-navy-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-navy-700 bg-navy-100 hover:bg-navy-200 rounded-xl transition-colors"
                >
                  {t('admin.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {formSubmitting && (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  <span>{formSubmitting ? t('admin.saving') : (editingId ? t('admin.saveChanges') : t('admin.saveDestination'))}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={t('admin.deleteModalTitle')}
        message={`${t('admin.deleteModalDesc')} ("${deleteTarget?.name}")`}
        confirmText={t('admin.delete')}
        cancelText={t('admin.cancel')}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
