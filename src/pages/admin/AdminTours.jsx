import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  Compass, 
  Clock, 
  MapPin, 
  Tag, 
  Sparkles,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import ImageUploader from '../../components/admin/ImageUploader';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { useLanguage } from '../../context/LanguageContext';

const initialTourState = {
  title: '',
  slug: '',
  destination: '',
  category: 'Planned Trips and Tours',
  duration: 'Flexible',
  difficulty: 'Moderate',
  startingPoint: 'Addis Ababa (Bole)',
  groupSize: '2 - 12 Travelers',
  priceNote: 'Contact for custom pricing',
  priceValue: '',
  featured: false,
  coverImage: '',
  gallery: [],
  overview: '',
  highlights: '',
  inclusions: '',
  exclusions: '',
  itinerary: [{ day: 1, title: 'Arrival & Orientation', description: '' }],
};

export default function AdminTours() {
  const { t, getLocalized } = useLanguage();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialTourState);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    setLoading(true);
    try {
      const data = await adminService.getTours();
      setTours(data);
    } catch (err) {
      console.error('Error loading tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialTourState);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (tour) => {
    setEditingId(tour.id);
    setFormData({
      title: tour.title || '',
      slug: tour.slug || '',
      destination: tour.destination || '',
      category: tour.category || 'Planned Trips and Tours',
      duration: tour.duration || '',
      difficulty: tour.difficulty || 'Moderate',
      startingPoint: tour.startingPoint || 'Addis Ababa (Bole)',
      groupSize: tour.groupSize || '2 - 12 Travelers',
      priceNote: tour.priceNote || '',
      priceValue: tour.priceValue || '',
      featured: Boolean(tour.featured),
      coverImage: tour.coverImage || '',
      gallery: tour.gallery || [],
      overview: tour.overview || '',
      highlights: Array.isArray(tour.highlights) ? tour.highlights.join('\n') : '',
      inclusions: Array.isArray(tour.inclusions) ? tour.inclusions.join('\n') : '',
      exclusions: Array.isArray(tour.exclusions) ? tour.exclusions.join('\n') : '',
      itinerary: tour.itinerary && tour.itinerary.length > 0 
        ? tour.itinerary 
        : [{ day: 1, title: 'Day 1', description: '' }],
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (!editingId) {
      // Auto slug
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, title, slug: generatedSlug }));
    } else {
      setFormData(prev => ({ ...prev, title }));
    }
  };

  const handleAddItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: prev.itinerary.length + 1, title: `Day ${prev.itinerary.length + 1}`, description: '' }
      ]
    }));
  };

  const handleRemoveItineraryDay = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index).map((day, i) => ({
        ...day,
        day: i + 1,
      }))
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.itinerary];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, itinerary: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.title.trim()) {
      setFormError('Please enter a tour title.');
      return;
    }
    if (!formData.destination.trim()) {
      setFormError('Please enter a destination.');
      return;
    }

    setFormSubmitting(true);

    try {
      const payload = {
        ...formData,
        highlights: formData.highlights.split('\n').map(s => s.trim()).filter(Boolean),
        inclusions: formData.inclusions.split('\n').map(s => s.trim()).filter(Boolean),
        exclusions: formData.exclusions.split('\n').map(s => s.trim()).filter(Boolean),
      };

      if (editingId) {
        await adminService.updateTour(editingId, payload);
      } else {
        await adminService.createTour(payload);
      }

      setIsFormOpen(false);
      await loadTours();
    } catch (err) {
      console.error('Failed to save tour:', err);
      setFormError(err.message || 'Failed to save tour package.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await adminService.deleteTour(deleteTarget.id);
      setDeleteTarget(null);
      await loadTours();
    } catch (err) {
      console.error('Failed to delete tour:', err);
      alert('Failed to delete tour: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered tours
  const filteredTours = tours.filter((t) => {
    const matchesSearch = 
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = 
      categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = ['All', ...new Set(tours.map(t => t.category).filter(Boolean))];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-navy-950 tracking-tight">
            {t('admin.toursTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 mt-1">
            {t('admin.toursSubtitle')}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-700/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('admin.addNewTour')}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-navy-100 p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('admin.searchTours')}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-navy-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-navy-200 bg-white text-navy-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-full md:w-48"
          >
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'All' ? t('admin.all') : (t(`tours.categories.${cat}`) || cat)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-3xl border border-navy-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-navy-400 flex flex-col items-center">
            <div className="w-8 h-8 border-3 border-teal-500/30 border-t-teal-600 rounded-full animate-spin mb-3" />
            <span>{t('admin.loadingTours')}</span>
          </div>
        ) : filteredTours.length === 0 ? (
          <div className="p-12 text-center">
            <Compass className="w-10 h-10 text-navy-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-navy-800">{t('admin.noToursFound')}</h3>
            <p className="text-xs text-navy-500 mt-1">{t('admin.noToursFoundDesc')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50/60 text-[11px] font-bold text-navy-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">{t('admin.colTour')}</th>
                  <th className="py-3.5 px-4">{t('admin.colDestination')}</th>
                  <th className="py-3.5 px-4">{t('admin.colCategory')}</th>
                  <th className="py-3.5 px-4">{t('admin.colDuration')}</th>
                  <th className="py-3.5 px-4">{t('admin.colStatus')}</th>
                  <th className="py-3.5 px-4 text-right">{t('admin.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50 text-xs">
                {filteredTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-navy-50/40 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-navy-100 shrink-0 border border-navy-100">
                          <img
                            src={tour.coverImage}
                            alt={tour.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-navy-900 truncate max-w-xs">{getLocalized(tour, 'title') || tour.title}</p>
                          <p className="text-[11px] text-navy-400 font-mono mt-0.5 truncate max-w-xs">/tours/{tour.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-navy-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{getLocalized(tour, 'destination') || tour.destination}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-navy-600">
                      <span className="px-2.5 py-1 rounded-full bg-navy-50 text-navy-700 text-[11px] font-semibold border border-navy-100">
                        {t(`tours.categories.${tour.category}`) || tour.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-navy-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-navy-400" />
                        <span>{tour.duration}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {tour.featured ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          {t('admin.featured')}
                        </span>
                      ) : (
                        <span className="text-navy-400 text-[11px]">{t('admin.standard')}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/tours/${tour.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-navy-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          title={t('admin.viewOnSite')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(tour)}
                          className="p-1.5 text-navy-400 hover:text-navy-900 hover:bg-navy-100 rounded-lg transition-colors"
                          title={t('admin.edit')}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(tour)}
                          className="p-1.5 text-navy-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t('admin.delete')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-navy-100 w-full max-w-4xl my-8 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between bg-navy-50/50 sticky top-0 z-10">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-navy-950">
                  {editingId ? t('admin.editTour') : t('admin.createTour')}
                </h3>
                <p className="text-xs text-navy-500 mt-0.5">{t('admin.tourModalSub')}</p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-navy-400 hover:text-navy-800 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelTitle')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Northern Historical Circuit (7 Days)"
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
                    placeholder="northern-historical-circuit"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelDestination')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="e.g. Lalibela, Ethiopia"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelCategory')}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  >
                    <option value="Planned Trips and Tours">Planned Trips and Tours</option>
                    <option value="Flight Ticket Reservations">Flight Ticket Reservations</option>
                    <option value="Hotel Reservations">Hotel Reservations</option>
                    <option value="Group Travel Packages">Group Travel Packages</option>
                    <option value="Travel Planning and Suggestions">Travel Planning and Suggestions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelDuration')}
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g. 4 Days / 3 Nights"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelStartingPoint')}
                  </label>
                  <input
                    type="text"
                    value={formData.startingPoint}
                    onChange={(e) => setFormData(prev => ({ ...prev, startingPoint: e.target.value }))}
                    placeholder="e.g. Addis Ababa (Bole)"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.groupSizeLabel') || t('admin.labelGroupSize')}
                  </label>
                  <input
                    type="text"
                    value={formData.groupSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, groupSize: e.target.value }))}
                    placeholder="e.g. 2 - 10 Travelers"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelPriceNote')}
                  </label>
                  <input
                    type="text"
                    value={formData.priceNote}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceNote: e.target.value }))}
                    placeholder="e.g. Custom Quote on Inquiry"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-navy-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-navy-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                  <span className="text-xs font-bold text-navy-800">{t('admin.labelFeatured')}</span>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="pt-2 border-t border-navy-100">
                <ImageUploader
                  label={t('admin.labelCoverImage')}
                  value={formData.coverImage}
                  onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                  bucketName="tour-images"
                />
              </div>

              {/* Overview */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                  {t('admin.labelOverview')}
                </label>
                <textarea
                  rows={3}
                  value={formData.overview}
                  onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
                  placeholder="Comprehensive description of the travel experience..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              {/* Highlights & Inclusions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelHighlights')}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.highlights}
                    onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value }))}
                    placeholder="Visit rock-hewn churches&#10;Panoramic canyon sunset"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelInclusions')}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.inclusions}
                    onChange={(e) => setFormData(prev => ({ ...prev, inclusions: e.target.value }))}
                    placeholder="Professional local guide&#10;Hotel accommodation"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelExclusions')}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.exclusions}
                    onChange={(e) => setFormData(prev => ({ ...prev, exclusions: e.target.value }))}
                    placeholder="International flights&#10;Personal souvenirs"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              {/* Day-by-Day Itinerary Editor */}
              <div className="pt-4 border-t border-navy-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700">
                    {t('admin.labelItinerary')} ({formData.itinerary.length} {t('tours.daysTotal', { count: formData.itinerary.length }) || 'Days'})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('admin.addDay')}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.itinerary.map((dayItem, index) => (
                    <div key={index} className="p-3.5 bg-navy-50/50 rounded-2xl border border-navy-100 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {dayItem.day}
                        </span>
                        <input
                          type="text"
                          value={dayItem.title}
                          onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                          placeholder={`${t('admin.day')} ${dayItem.day} ${t('admin.dayTitle')}`}
                          className="flex-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-navy-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                        {formData.itinerary.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItineraryDay(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title={t('admin.delete')}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={2}
                        value={dayItem.description}
                        onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                        placeholder="Activities, sightseeing, meals and overnight location for this day..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-navy-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
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
                  <span>{formSubmitting ? t('admin.saving') : (editingId ? t('admin.saveChanges') : t('admin.publishTour'))}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={t('admin.deleteModalTitle')}
        message={`${t('admin.deleteModalDesc')} ("${deleteTarget?.title}")`}
        confirmText={t('admin.delete')}
        cancelText={t('admin.cancel')}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
