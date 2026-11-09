import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { PageSkeleton } from './components/common/Skeleton';

// Public Layout
import RootLayout from './layouts/RootLayout';

// Lazy-Loaded Public Pages for optimal code splitting & fast mobile load
const Home = lazy(() => import('./pages/Home'));
const Tours = lazy(() => import('./pages/Tours'));
const TourDetails = lazy(() => import('./pages/TourDetails'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Destinations = lazy(() => import('./pages/Destinations'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy-Loaded Admin Layout & Pages (never downloaded by public visitors)
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminTours = lazy(() => import('./pages/admin/AdminTours'));
const AdminDestinations = lazy(() => import('./pages/admin/AdminDestinations'));
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              {/* Public Website Routes */}
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="tours" element={<Tours />} />
                <Route path="tours/:slug" element={<TourDetails />} />
                <Route path="services" element={<Tours />} />
                <Route path="services/:slug" element={<TourDetails />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="destinations" element={<Destinations />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Portal */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="tours" element={<AdminTours />} />
                <Route path="destinations" element={<AdminDestinations />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="inquiries" element={<AdminInquiries />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
