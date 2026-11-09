import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { tours as localTours } from '../data/tours';
import { destinations as localDestinations } from '../data/destinations';
import { blogPosts as localBlogPosts } from '../data/blogPosts';
import { companyInfo as localCompanyInfo } from '../data/navigation';
import { dataCache } from '../utils/cache';

export const adminService = {
  // ==========================================
  // STORAGE: Image Uploads
  // Uses buckets: tour-images, destination-images, blog-images
  // ==========================================
  async uploadImage(file, bucketName) {
    if (!isSupabaseConfigured()) {
      // Offline fallback: create an object URL for preview
      return URL.createObjectURL(file);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  // ==========================================
  // TOURS CRUD (table: tours)
  // Schema: id, created_at, title, slug, description, duration, price, itinerary, images, destination_id, is_published
  // ==========================================
  async getTours() {
    if (!isSupabaseConfigured()) {
      return [...localTours];
    }
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase getTours query error:', error);
      return [...localTours];
    }

    if (!data || data.length === 0) {
      return [...localTours];
    }

    return data.map(t => {
      const imagesArr = Array.isArray(t.images) ? t.images : (t.images ? [t.images] : []);
      const coverImg = imagesArr[0] || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80';
      return {
        id: t.id,
        slug: t.slug,
        title: t.title,
        destination: 'Ethiopian Destinations',
        category: 'Planned Trips and Tours',
        duration: t.duration || 'Flexible',
        difficulty: 'Moderate',
        startingPoint: 'Addis Ababa (Bole)',
        groupSize: 'Individual & Group Options',
        featured: Boolean(t.is_published),
        is_published: t.is_published !== false,
        priceNote: t.price ? (typeof t.price === 'number' ? `$${t.price}` : String(t.price)) : 'Contact for custom pricing',
        priceValue: typeof t.price === 'number' ? t.price : (parseFloat(t.price) || 0),
        coverImage: coverImg,
        gallery: imagesArr.slice(1),
        overview: t.description || '',
        description: t.description || '',
        highlights: [],
        inclusions: [],
        exclusions: [],
        itinerary: Array.isArray(t.itinerary) ? t.itinerary : [],
        destination_id: t.destination_id,
        createdAt: t.created_at,
      };
    });
  },

  async createTour(tour) {
    if (!isSupabaseConfigured()) {
      return { id: `tour-${Date.now()}`, ...tour };
    }
    const images = [tour.coverImage, ...(Array.isArray(tour.gallery) ? tour.gallery : [])].filter(Boolean);
    const payload = {
      title: tour.title,
      slug: tour.slug,
      description: tour.overview || tour.description || '',
      duration: tour.duration || '',
      price: tour.priceValue ? String(tour.priceValue) : (tour.priceNote || tour.price || ''),
      itinerary: Array.isArray(tour.itinerary) ? tour.itinerary : [],
      images: images,
      destination_id: tour.destination_id || null,
      is_published: tour.is_published !== false && tour.featured !== false,
    };

    const { data, error } = await supabase
      .from('tours')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    dataCache.invalidate('tours:');
    return data;
  },

  async updateTour(id, tour) {
    if (!isSupabaseConfigured()) {
      dataCache.invalidate('tours:');
      return { id, ...tour };
    }
    const images = [tour.coverImage, ...(Array.isArray(tour.gallery) ? tour.gallery : [])].filter(Boolean);
    const payload = {
      title: tour.title,
      slug: tour.slug,
      description: tour.overview || tour.description || '',
      duration: tour.duration || '',
      price: tour.priceValue ? String(tour.priceValue) : (tour.priceNote || tour.price || ''),
      itinerary: Array.isArray(tour.itinerary) ? tour.itinerary : [],
      images: images,
      destination_id: tour.destination_id || null,
      is_published: tour.is_published !== false && tour.featured !== false,
    };

    const { data, error } = await supabase
      .from('tours')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    dataCache.invalidate('tours:');
    return data;
  },

  async deleteTour(id) {
    if (!isSupabaseConfigured()) {
      dataCache.invalidate('tours:');
      return true;
    }
    const { error } = await supabase
      .from('tours')
      .delete()
      .eq('id', id);

    if (error) throw error;
    dataCache.invalidate('tours:');
    return true;
  },

  // ==========================================
  // DESTINATIONS CRUD (table: destinations)
  // Schema: id, created_at, name, slug, description, image_url, is_published
  // ==========================================
  async getDestinations() {
    if (!isSupabaseConfigured()) {
      return [...localDestinations];
    }
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.warn('Supabase getDestinations error:', error);
      return [...localDestinations];
    }

    if (!data || data.length === 0) {
      return [...localDestinations];
    }

    return data.map(d => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      region: 'Saudi Arabia',
      subtitle: 'Holy Sanctuary & Islamic Heritage',
      description: d.description,
      image: d.image_url || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
      coverImage: d.image_url || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
      tourCount: 1,
      highlights: [],
      is_published: d.is_published !== false,
    }));
  },

  async createDestination(dest) {
    if (!isSupabaseConfigured()) {
      return { id: `dest-${Date.now()}`, ...dest };
    }
    const payload = {
      slug: dest.slug,
      name: dest.name,
      description: dest.description || '',
      image_url: dest.coverImage || dest.image || dest.image_url || '',
      is_published: dest.is_published !== false,
    };

    const { data, error } = await supabase
      .from('destinations')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    dataCache.invalidate('destinations:');
    return data;
  },

  async updateDestination(id, dest) {
    if (!isSupabaseConfigured()) {
      dataCache.invalidate('destinations:');
      return { id, ...dest };
    }
    const payload = {
      slug: dest.slug,
      name: dest.name,
      description: dest.description || '',
      image_url: dest.coverImage || dest.image || dest.image_url || '',
      is_published: dest.is_published !== false,
    };

    const { data, error } = await supabase
      .from('destinations')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    dataCache.invalidate('destinations:');
    return data;
  },

  async deleteDestination(id) {
    if (!isSupabaseConfigured()) {
      dataCache.invalidate('destinations:');
      return true;
    }
    const { error } = await supabase
      .from('destinations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    dataCache.invalidate('destinations:');
    return true;
  },

  // ==========================================
  // BLOG POSTS CRUD (table: blog_posts)
  // Schema: id, created_at, title, slug, cover_image, excerpt, content, is_published
  // ==========================================
  async getBlogPosts() {
    if (!isSupabaseConfigured()) {
      return [...localBlogPosts];
    }
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase getBlogPosts error:', error);
      return [...localBlogPosts];
    }

    if (!data || data.length === 0) {
      return [...localBlogPosts];
    }

    return data.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category || 'Ethiopia Travel Guide',
      date: p.created_at ? p.created_at.split('T')[0] : '',
      readTime: '5 min read',
      author: p.author || 'Expedition Travel Editorial',
      image: p.cover_image || 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80',
      coverImage: p.cover_image || 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80',
      excerpt: p.excerpt,
      content: p.content,
      is_published: p.is_published !== false,
      createdAt: p.created_at,
    }));
  },

  async createBlogPost(post) {
    if (!isSupabaseConfigured()) {
      return { id: `post-${Date.now()}`, ...post };
    }
    const payload = {
      slug: post.slug,
      title: post.title,
      cover_image: post.coverImage || post.image || post.cover_image || '',
      excerpt: post.excerpt || '',
      content: typeof post.content === 'string' ? post.content : JSON.stringify(post.content || ''),
      is_published: post.is_published !== false,
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    dataCache.invalidate('blog:');
    return data;
  },

  async updateBlogPost(id, post) {
    if (!isSupabaseConfigured()) {
      dataCache.invalidate('blog:');
      return { id, ...post };
    }
    const payload = {
      slug: post.slug,
      title: post.title,
      cover_image: post.coverImage || post.image || post.cover_image || '',
      excerpt: post.excerpt || '',
      content: typeof post.content === 'string' ? post.content : JSON.stringify(post.content || ''),
      is_published: post.is_published !== false,
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    dataCache.invalidate('blog:');
    return data;
  },

  async deleteBlogPost(id) {
    if (!isSupabaseConfigured()) {
      dataCache.invalidate('blog:');
      return true;
    }
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    dataCache.invalidate('blog:');
    return true;
  },

  // ==========================================
  // INQUIRIES CRUD (table: inquiries)
  // Schema: id, created_at, customer_name, phone, email, message, tour_id, travel_date, travelers, status
  // ==========================================
  async getInquiries() {
    if (!isSupabaseConfigured()) {
      return [];
    }

    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase getInquiries error (requires authenticated admin session):', error);
      return [];
    }

    return data.map(inq => {
      let extractedTitle = inq.tour_id || 'Service Inquiry';
      if (inq.message && inq.message.includes('Package/Service:')) {
        extractedTitle = inq.message.split('Package/Service:')[1].split('\n')[0].trim();
      } else if (inq.message && inq.message.includes('Subject:')) {
        extractedTitle = inq.message.split('Subject:')[1].split(']')[0].trim();
      }

      return {
        id: inq.id,
        reference_id: inq.id ? `HM-${String(inq.id).slice(-6)}` : 'HM-100001',
        full_name: inq.customer_name || 'Anonymous Visitor',
        fullName: inq.customer_name || 'Anonymous Visitor',
        phone: inq.phone || '',
        email: inq.email || '',
        tour_id: inq.tour_id,
        tour_title: extractedTitle,
        tourTitle: extractedTitle,
        travel_date: inq.travel_date || '',
        travelDate: inq.travel_date || '',
        travelers: inq.travelers || 1,
        notes: inq.message || '',
        message: inq.message || '',
        status: inq.status || 'new',
        created_at: inq.created_at,
        createdAt: inq.created_at,
      };
    });
  },

  async updateInquiryStatus(id, status) {
    if (!isSupabaseConfigured()) {
      return true;
    }
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  async deleteInquiry(id) {
    if (!isSupabaseConfigured()) {
      return true;
    }
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // ==========================================
  // SITE SETTINGS (table: site_settings)
  // Schema: id, updated_at, company_name, phone, email, address, social_links
  // ==========================================
  async getSiteSettings() {
    if (!isSupabaseConfigured()) {
      return { ...localCompanyInfo };
    }
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn('Supabase getSiteSettings error:', error);
      return { ...localCompanyInfo };
    }
    if (!data) return { ...localCompanyInfo };

    return {
      name: data.company_name || localCompanyInfo.name,
      tagline: localCompanyInfo.tagline,
      shortDesc: localCompanyInfo.shortDesc,
      location: localCompanyInfo.location,
      address: data.address || localCompanyInfo.address,
      hours: localCompanyInfo.hours,
      phones: data.phone 
        ? [{ label: 'Primary Office', number: data.phone, display: data.phone, raw: data.phone.replace(/\D/g, '') }] 
        : localCompanyInfo.phones,
      socials: data.social_links || localCompanyInfo.socials,
      disclaimer: localCompanyInfo.disclaimer,
    };
  },

  async updateSiteSettings(settings) {
    if (!isSupabaseConfigured()) {
      return settings;
    }
    const payload = {
      company_name: settings.name || settings.company_name || 'Expedition Travel – Go Lite',
      phone: settings.phones?.[0]?.number || settings.phone || '+251 911 209405',
      email: settings.email || 'expeditionsguzo@gmail.com',
      address: settings.address || 'Africa Avenue, Bedesta Building, 6th Floor, Addis Ababa, Ethiopia',
      social_links: settings.socials || settings.social_links || {},
      updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1)
      .maybeSingle();

    let result;
    if (existing?.id) {
      result = await supabase
        .from('site_settings')
        .update(payload)
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('site_settings')
        .insert([payload])
        .select()
        .single();
    }

    if (result.error) throw result.error;
    dataCache.invalidate('settings:');
    return result.data;
  },

  // ==========================================
  // DASHBOARD OVERVIEW METRICS (Optimized for low-bandwidth)
  // ==========================================
  async getDashboardMetrics() {
    if (!isSupabaseConfigured()) {
      return {
        totalTours: localTours.length,
        totalDestinations: localDestinations.length,
        totalPosts: localBlogPosts.length,
        totalInquiries: 0,
        newInquiriesCount: 0,
        recentInquiries: [],
        recentTours: localTours.slice(0, 4),
      };
    }

    try {
      // Execute lightweight parallel queries: count-only head requests + small limited sets
      const [
        toursCountRes,
        destCountRes,
        blogCountRes,
        inquiriesRes,
        recentToursRes
      ] = await Promise.all([
        supabase.from('tours').select('id', { count: 'exact', head: true }),
        supabase.from('destinations').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('tours').select('id, title, slug, duration, images, is_published, destination_id').order('created_at', { ascending: false }).limit(4),
      ]);

      const totalTours = toursCountRes.count ?? localTours.length;
      const totalDestinations = destCountRes.count ?? localDestinations.length;
      const totalPosts = blogCountRes.count ?? localBlogPosts.length;
      
      const inquiriesList = (inquiriesRes.data || []).map(inq => {
        let extractedTitle = inq.tour_id || 'Service Inquiry';
        if (inq.message && inq.message.includes('Package/Service:')) {
          extractedTitle = inq.message.split('Package/Service:')[1].split('\n')[0].trim();
        } else if (inq.message && inq.message.includes('Subject:')) {
          extractedTitle = inq.message.split('Subject:')[1].split(']')[0].trim();
        }
        return {
          id: inq.id,
          fullName: inq.customer_name || 'Anonymous Traveler',
          phone: inq.phone || '',
          email: inq.email || '',
          tourTitle: extractedTitle,
          status: inq.status || 'new',
          createdAt: inq.created_at,
        };
      });

      const newInquiries = inquiriesList.filter(
        (inq) => !inq.status || inq.status === 'new' || inq.status === 'pending'
      );

      const recentTours = (recentToursRes.data || []).map(t => {
        const imagesArr = Array.isArray(t.images) ? t.images : (t.images ? [t.images] : []);
        return {
          id: t.id,
          title: t.title,
          slug: t.slug,
          duration: t.duration || 'Flexible',
          destination: 'Ethiopian Destinations',
          coverImage: imagesArr[0] || 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=400&q=70',
          featured: Boolean(t.is_published),
        };
      });

      return {
        totalTours,
        totalDestinations,
        totalPosts,
        totalInquiries: inquiriesList.length,
        newInquiriesCount: newInquiries.length,
        recentInquiries: inquiriesList.slice(0, 5),
        recentTours: recentTours.length > 0 ? recentTours : localTours.slice(0, 4),
      };
    } catch (err) {
      console.warn('Dashboard metrics optimized fallback:', err);
      return {
        totalTours: localTours.length,
        totalDestinations: localDestinations.length,
        totalPosts: localBlogPosts.length,
        totalInquiries: 0,
        newInquiriesCount: 0,
        recentInquiries: [],
        recentTours: localTours.slice(0, 4),
      };
    }
  },
};
