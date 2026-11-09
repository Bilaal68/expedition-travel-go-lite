export const companyInfo = {
  name: "Expedition Travel – Go Lite",
  brandName: "Expedition Travel",
  subBrand: "Go Lite",
  tagline: "Expedition Travel, Refined & Lite.",
  shortDesc: "An accredited Ethiopian travel agency offering Guzo-certified flight ticketing, corridor tour operations, B2B corporate logistics, and vetted local hospitality curation across Ethiopia.",
  primaryContact: "Hana Lema",
  association: "Ethiopian Travel Agents Association (ETAA)",
  tradeLicense: "MOT/ETA/2024/042",
  location: "Addis Ababa, Ethiopia",
  address: "Addis Ababa, Ethiopia",
  email: "expeditionsguzo@gmail.com",
  phones: [
    { display: "+251 912 669 088", raw: "251912669088", primary: true, label: "Direct Desk / WhatsApp" },
  ],
  socials: {
    facebook: {
      name: "Facebook",
      handle: "Expedition Travel Go Lite",
      url: "https://www.facebook.com",
    },
    instagram: {
      name: "Instagram",
      handle: "@expeditiontravel.et",
      url: "https://www.instagram.com",
    },
    linkedin: {
      name: "LinkedIn",
      handle: "Expedition Travel Go Lite",
      url: "https://www.linkedin.com",
    },
  },
  hours: "Monday – Saturday: 8:30 AM – 6:00 PM (EAT)",
  disclaimer: "All reservations, corridor operations, and corporate ticketing pipelines are coordinated through confirmed direct arrangements under Ethiopian trade license MOT/ETA/2024/042."
};

export const fourServices = [
  {
    id: "guzo-certified-ticketing",
    slug: "guzo-certified-ticketing",
    number: "01",
    title: "Guzo Certified Ticketing",
    tag: "Aviation & Ticketing",
    shortDesc: "Domestic and international flight bookings, seat allocations, flight changes, and route adjustments.",
    highlights: [
      "Domestic and international flight bookings",
      "Seat allocations & priority preferences",
      "Flight changes & rapid route adjustments",
      "Full itinerary management across regional carriers"
    ],
    inclusions: [
      "Certified Guzo e-ticket issuance",
      "Schedule review and flight options comparison",
      "Assistance with seat preferences and baggage allowance",
      "Prompt support for date modifications and reissues"
    ],
    exclusions: [
      "Voluntary airline amendment fees or airline penalties",
      "Personal travel insurance"
    ],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "corridor-tour-operations",
    slug: "corridor-tour-operations",
    number: "02",
    title: "Corridor Tour Operations",
    tag: "Expeditions & Heritage",
    shortDesc: "Curated holiday packages, transit corridor logistics, and guided cultural expeditions across regional destinations.",
    highlights: [
      "Curated holiday packages tailored to distinct traveler profiles",
      "Transit corridor logistics & comfortable regional transfer networks",
      "Guided cultural expeditions across historical and geological landmarks",
      "Safety-checked travel schedules coordinated with local specialists"
    ],
    inclusions: [
      "Comprehensive expedition logistics & corridor planning",
      "Vetted hotel and lodge reservations along the route",
      "Ground vehicle transportation with experienced drivers",
      "Accredited local guides and site entrance permits"
    ],
    exclusions: [
      "International flights to/from Ethiopia",
      "Personal incidentals and gratuities"
    ],
    image: "/images/hero-1.jpg"
  },
  {
    id: "b2b-corporate-travel-logistics",
    slug: "b2b-corporate-travel-logistics",
    number: "03",
    title: "B2B Corporate Travel Logistics",
    tag: "Enterprise & Accounts",
    shortDesc: "Enterprise travel account management, structured booking pipelines, and streamlined travel expense workflows.",
    highlights: [
      "Enterprise travel account management for firms and NGOs",
      "Structured booking pipelines with centralized billing records",
      "Streamlined travel expense workflows and consolidated reporting",
      "Priority assistance for corporate delegates and visiting teams"
    ],
    inclusions: [
      "Dedicated corporate account liaison",
      "Flexible enterprise reservation pipeline",
      "Transparent monthly itemized statements and invoicing",
      "Emergency rebooking support for business travelers"
    ],
    exclusions: [
      "Discretionary personal expenses outside corporate mandate"
    ],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "local-hospitality-curation",
    slug: "local-hospitality-curation",
    number: "04",
    title: "Local Hospitality Curation",
    tag: "Stays & Hospitality",
    shortDesc: "Ground transport coordination, multilingual tour guide matching, and vetted local hotel booking networks.",
    highlights: [
      "Ground transport coordination with vetted vehicles and drivers",
      "Multilingual tour guide matching tailored to your expedition",
      "Vetted local hotel booking networks across Ethiopia's regions",
      "Airport VIP reception and seamless regional transit"
    ],
    inclusions: [
      "Verified booking vouchers with partner properties",
      "Professional driver coordination & fuel management",
      "Matching with licensed, vetted local multilingual guides",
      "Dedicated Addis Ababa support desk"
    ],
    exclusions: [
      "Personal mini-bar or incidental hotel fees"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
  }
];

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Destinations", path: "/destinations" },
  { name: "Contact", path: "/contact" },
];

export const footerQuickLinks = [
  { name: "Home", path: "/" },
  { name: "About Expedition Travel", path: "/about" },
  { name: "Guzo Certified Ticketing", path: "/services/guzo-certified-ticketing" },
  { name: "Corridor Tour Operations", path: "/services/corridor-tour-operations" },
  { name: "B2B Corporate Travel Logistics", path: "/services/b2b-corporate-travel-logistics" },
  { name: "Local Hospitality Curation", path: "/services/local-hospitality-curation" },
  { name: "Illustrative Destinations", path: "/destinations" },
  { name: "Inquire / Contact", path: "/contact" },
];
