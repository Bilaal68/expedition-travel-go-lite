import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Edit3, 
  Trash2, 
  X, 
  Calendar, 
  Clock, 
  ExternalLink,
  AlertCircle 
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import ImageUploader from '../../components/admin/ImageUploader';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { useLanguage } from '../../context/LanguageContext';

const initialPostState = {
  title: '',
  slug: '',
  category: 'Ethiopia Travel Guide',
  date: new Date().toISOString().split('T')[0],
  readTime: '5 min read',
  coverImage: '',
  excerpt: '',
  content: '',
};

export default function AdminBlog() {
  const { t, getLocalized, formatDate } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialPostState);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await adminService.getBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialPostState);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title || '',
      slug: post.slug || '',
      category: post.category || 'Travel Guide',
      date: post.date || new Date().toISOString().split('T')[0],
      readTime: post.readTime || '5 min read',
      coverImage: post.coverImage || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (!editingId) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, title, slug: generatedSlug }));
    } else {
      setFormData(prev => ({ ...prev, title }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.title.trim()) {
      setFormError('Please enter a blog post title.');
      return;
    }

    setFormSubmitting(true);
    try {
      if (editingId) {
        await adminService.updateBlogPost(editingId, formData);
      } else {
        await adminService.createBlogPost(formData);
      }

      setIsFormOpen(false);
      await loadPosts();
    } catch (err) {
      console.error('Failed to save blog post:', err);
      setFormError(err.message || 'Failed to save blog article.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await adminService.deleteBlogPost(deleteTarget.id);
      setDeleteTarget(null);
      await loadPosts();
    } catch (err) {
      console.error('Failed to delete blog post:', err);
      alert('Failed to delete blog article: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = posts.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt && p.excerpt.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = 
      categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Ethiopia Travel Guide', 'Destination Spotlight', 'Travel Tips & Preparation', 'Culture & Heritage'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-navy-950 tracking-tight">
            {t('admin.blogTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 mt-1">
            {t('admin.blogSubtitle')}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-700/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('admin.newArticle')}</span>
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
            placeholder={t('admin.searchArticles')}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-navy-200 bg-white text-navy-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-full md:w-48"
        >
          {categories.map(c => (
            <option key={c} value={c}>
              {c === 'All' ? t('admin.all') : (t(`blog.categories.${c}`) || c)}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-3xl border border-navy-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-navy-400 flex flex-col items-center">
            <div className="w-8 h-8 border-3 border-teal-500/30 border-t-teal-600 rounded-full animate-spin mb-3" />
            <span>{t('admin.loadingArticles')}</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-10 h-10 text-navy-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-navy-800">{t('admin.noArticlesFound')}</h3>
            <p className="text-xs text-navy-500 mt-1">{t('admin.noArticlesFoundDesc')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50/60 text-[11px] font-bold text-navy-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">{t('admin.colArticle')}</th>
                  <th className="py-3.5 px-4">{t('admin.colCategory')}</th>
                  <th className="py-3.5 px-4">{t('admin.colPublishedDate')}</th>
                  <th className="py-3.5 px-4">{t('admin.colReadTime')}</th>
                  <th className="py-3.5 px-4 text-right">{t('admin.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50 text-xs">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-navy-50/40 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-navy-100 shrink-0 border border-navy-100">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-navy-900 truncate max-w-sm">{getLocalized(post, 'title') || post.title}</p>
                          <p className="text-[11px] text-navy-400 font-mono mt-0.5 truncate max-w-sm">
                            /blog/{post.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-semibold border border-teal-100">
                        {t(`blog.categories.${post.category}`) || post.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-navy-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-navy-400" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-navy-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-navy-400" />
                        <span>{post.readTime}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-navy-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          title={t('admin.viewOnSite')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 text-navy-400 hover:text-navy-900 hover:bg-navy-100 rounded-lg transition-colors"
                          title={t('admin.edit')}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(post)}
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
          <div className="bg-white rounded-3xl shadow-2xl border border-navy-100 w-full max-w-3xl my-8 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between bg-navy-50/50 sticky top-0 z-10">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-navy-950">
                  {editingId ? t('admin.editArticle') : t('admin.createArticle')}
                </h3>
                <p className="text-xs text-navy-500 mt-0.5">{t('admin.articleModalSub')}</p>
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
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelArticleTitle')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. A Traveler's Guide to Lalibela's Rock-Hewn Churches"
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
                    placeholder="lalibela-rock-hewn-churches-guide"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
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
                    <option value="Ethiopia Travel Guide">Ethiopia Travel Guide</option>
                    <option value="Destination Spotlight">Destination Spotlight</option>
                    <option value="Travel Tips & Preparation">Travel Tips & Preparation</option>
                    <option value="Culture & Heritage">Culture & Heritage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelPublishDate')}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                    {t('admin.labelReadTime')}
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Cover Image Upload (blog-images bucket) */}
              <div className="pt-2 border-t border-navy-100">
                <ImageUploader
                  label={t('admin.labelCoverImage')}
                  value={formData.coverImage}
                  onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                  bucketName="blog-images"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                  {t('admin.labelExcerpt')}
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="A compelling 1-2 sentence teaser for cards and search engines..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                  {t('admin.labelContent')}
                </label>
                <textarea
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Full article content and stories..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-sans"
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
                  <span>{formSubmitting ? t('admin.saving') : (editingId ? t('admin.saveChanges') : t('admin.publishArticle'))}</span>
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
