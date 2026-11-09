# H & M Travel Agency — Official Web Application

> **Explore Ethiopia, Your Way.**  
> A premium, production-grade travel platform for **H & M Travel Agency**, a premier tourism and travel agency based in Addis Ababa, Ethiopia.

---

## 1. Project Overview

**H & M Travel Agency** provides bespoke travel planning across Ethiopia’s most iconic historic treasures, geological marvels, and cultural heritage sites. This modern web application delivers an immersive, editorial digital experience tailored for both international tourists and domestic travelers.

### Key Capabilities
- **Trilingual Localization**: Complete native translations in **English (EN)**, **Amharic (AM - አማርኛ)**, and **Afaan Oromoo (OM)** with real-time language switching.
- **Cinematic Hero Experience**: Multi-slide atmospheric crossfade featuring high-definition Ethiopian landscapes (Simien Mountains, Lake Karum & Danakil Salt Flats, and Highland Escarpments) with interactive location badges.
- **Low-Data & Offline Resilient**: Core imagery and vector branding assets are bundled locally in `public/images/` to ensure instant loading (< 5ms) on slow, 2G/3G mobile networks.
- **Infinite Rotating Carousels**:
  - **Popular Destinations Carousel**: Continuous, smooth 55-second horizontal marquee displaying Ethiopia's 7 premier destinations with pause-on-hover.
  - **Official Airline Partners Marquee**: Slow-drifting vector logo track showcasing 9 leading global airline partners.
- **Service Inquiries & Direct WhatsApp Integration**: Pre-filled international WhatsApp routing and interactive booking forms for flight tickets, hotel reservations, guided tours, and group packages.
- **Admin Management Portal**: Protected administration dashboard for managing tours, destinations, inquiries, and settings with Supabase backend compatibility.

---

## 2. Technology Stack

- **Framework**: React 18 with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system extensions
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/) (v6)
- **Database & Auth (Optional)**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Typography**: 
  - Serif Display: *Playfair Display*
  - Sans UI: *Plus Jakarta Sans* & *Inter*
- **Hosting Target**: [Vercel](https://vercel.com/) (preconfigured `vercel.json` with SPA rewrites)

---

## 3. Brand & Business Details

- **Company**: H & M Travel Agency (H & M Travel)
- **Tagline**: *Explore Ethiopia, Your Way.*
- **Headquarters**: Africa Avenue, Bedesta Building, 6th Floor, Addis Ababa, Ethiopia
- **Email**: [info@handmtravel.com](mailto:info@handmtravel.com) | [henok@handmtravel.com](mailto:henok@handmtravel.com)
- **Phone / WhatsApp**: `+251 911 209405`
- **Hours**: Monday – Saturday: 8:30 AM – 6:00 PM (EAT)
- **Socials**:
  - Facebook: [H & M Travel Agency](https://www.facebook.com/handmtravel)
  - Instagram: [@handmtravel](https://www.instagram.com/handmtravel)
  - LinkedIn: [H & M Travel Agency Ethiopia](https://www.linkedin.com/company/handmtravel)

---

## 4. Official Airline Partners

The platform features seamless ticketing and flight reservations in partnership with 9 premier global carriers:

1. **Ethiopian Airlines** (National Flag Carrier • ADD Hub)
2. **Turkish Airlines** (Global Network • IST Hub)
3. **Emirates** (Middle East & Global • DXB Hub)
4. **Qatar Airways** (Global Transit • DOH Hub)
5. **Lufthansa** (European Connections • FRA Hub)
6. **Saudia** (Saudi Arabian Airlines • JED/RUH Hubs)
7. **EgyptAir** (North Africa & Middle East • CAI Hub)
8. **Gulf Air** (Kingdom of Bahrain • BAH Hub)
9. **South African Airways** (Southern Africa • JNB Hub)

---

## 5. Featured Ethiopian Destinations

1. **Lalibela**: UNESCO World Heritage 12th-century monolithic rock-hewn churches.
2. **Gondar**: The 17th-century royal castles of Fasil Ghebbi and Debre Berhan Selassie.
3. **Axum**: Ancient Aksumite obelisks, monolithic granite stelae, and Queen of Sheba palace.
4. **Harar Jugol**: The historic walled cultural capital with 82 mosques and age-old traditions.
5. **Blue Nile Falls (Tis Issat)**: Spectacular cascading waterfalls and mist-covered river gorges.
6. **Sof Omar Caves**: Soaring subterranean limestone pillars and underground river passage.
7. **Dallol & Danakil Depression**: Unique neon hydrothermal springs and extensive salt flats.

---

## 6. Project Architecture

```
hm-travel-agency/
├── public/
│   ├── favicon.svg              # Gold compass icon mark
│   ├── hm-logo.svg              # Primary brand logo
│   ├── hm-logo-white.svg        # White contrast brand logo
│   └── images/
│       ├── airlines/            # 9 official vector SVG airline logos
│       ├── hero-1.jpg           # Simien Mountains 1920x1080
│       ├── hero-2.jpg           # Lake Karum Salt Flats 1920x1080
│       ├── hero-3.jpg           # Highland Escarpments 1920x1080
│       └── *.jpg                # High-res local destination photography
├── src/
│   ├── components/
│   │   ├── admin/               # AdminHeader, AdminSidebar, AdminLayout, ConfirmModal
│   │   ├── common/              # Navbar, Footer, Button, PageHero, WhatsAppButton
│   │   ├── home/                # Hero, AirlinePartners, PopularDestinations, ServicesStrip, TrustIntro, FeaturedTours, CTASection
│   │   └── tours/               # TourCard, TourFilters, BookingInquiryForm
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication state for admin portal
│   │   └── LanguageContext.jsx  # EN / AM / OM localization provider
│   ├── data/                    # navigation.js, destinations.js, tours.js, blogPosts.js
│   ├── locales/                 # en.js, am.js, om.js translation dictionaries
│   ├── pages/                   # Home, About, Destinations, Tours, Contact, Blog, Admin
│   ├── services/                # tourService, blogService, inquiryService, adminService
│   ├── utils/                   # whatsapp.js, cache.js, imageOptimizer.js
│   ├── App.jsx                  # Application routing definitions
│   ├── index.css                # Tailwind directives & motion system
│   └── main.jsx                 # Entry point
├── vercel.json                  # SPA routing configuration for Vercel
├── vite.config.js               # Vite build configuration
└── package.json
```

---

## 7. Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/hm-travel-agency.git

# Navigate into the project directory
cd hm-travel-agency

# Install dependencies
npm install
```

### Local Development
```bash
npm run dev
```
Starts the local development server at `http://localhost:3000` (or `http://localhost:5173`).

### Production Build
```bash
npm run build
```
Compiles and bundles the application to the `dist/` folder with asset optimization.

### Preview Production Build
```bash
npm run preview
```

---

## 8. Deployment Guide (Vercel)

The repository is pre-configured for one-click deployment on **Vercel**:

1. Push your latest code to your GitHub repository:
   ```bash
   git push -u origin master
   ```
2. Navigate to [vercel.com/new](https://vercel.com/new) and log in.
3. Import your `hm-travel-agency` repository.
4. Framework preset will automatically detect **Vite**.
5. Click **Deploy**.

The included `vercel.json` ensures that all dynamic client-side routes (e.g. `/destinations`, `/services`, `/about`, `/contact`) resolve properly to `index.html`.

---

## 9. License

Private & Proprietary — All rights reserved by **H & M Travel Agency**, Addis Ababa, Ethiopia.
