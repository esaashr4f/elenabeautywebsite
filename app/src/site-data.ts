// Facts come from the salon's Google Business listing and the owner's own
// opening hours and price list. Nothing here is invented.

export const SITE = {
  name: "Elena Beauty Expert",
  url: "https://elenabeautyexpert.higgsfield.app",
  description:
    "Elena Beauty Expert is a 5.0-rated beauty salon in Woodford Green: HydraFacial, carbon laser peels, PRP facials, laser hair and tattoo removal. Treatments from £65. Open Monday to Saturday, 9am to 5pm. Call 07957 941155.",
  phoneDisplay: "07957 941155",
  phoneHref: "tel:+447957941155",
  street: "2 Warley Rd",
  locality: "Woodford Green",
  area: "Woodford",
  postcode: "IG8 9AX",
  bookingHref:
    "https://www.fresha.com/en-GB/a/elena-beauty-expert-woodford-station-40-cavendish-ave-mlzr3b58/all-offer",
  instagramHandle: "@elena__beautyexpert",
  instagramHref: "https://www.instagram.com/elena__beautyexpert/",
  rating: "5.0",
  reviewCount: 14,
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Elena+Beauty+Expert%2C+2+Warley+Rd%2C+Woodford+Green+IG8+9AX",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Elena+Beauty+Expert%2C+2+Warley+Rd%2C+Woodford+Green+IG8+9AX",
} as const;

// Opening hours, Monday first. `null` means closed.
export const HOURS: { day: string; short: string; open: string | null }[] = [
  { day: "Monday", short: "Mon", open: "9am to 5pm" },
  { day: "Tuesday", short: "Tue", open: "9am to 5pm" },
  { day: "Wednesday", short: "Wed", open: "9am to 5pm" },
  { day: "Thursday", short: "Thu", open: "9am to 5pm" },
  { day: "Friday", short: "Fri", open: "9am to 5pm" },
  { day: "Saturday", short: "Sat", open: "9am to 5pm" },
  { day: "Sunday", short: "Sun", open: null },
];
export const OPEN_HOUR = 9;
export const CLOSE_HOUR = 17;

export type Photo = { src: string; alt: string };

export const GALLERY: (Photo & { caption: string; width: number; height: number; shape: "wide" | "tall" })[] = [
  {
    src: "/assets/laser-suite.webp",
    alt: "The laser treatment room with two laser machines, a fur-covered bed and lit shelves",
    caption: "Laser treatment room",
    width: 1920,
    height: 1084,
    shape: "wide",
  },
  {
    src: "/assets/elena-mirror.webp",
    alt: "Elena holding a mirror for a client during a consultation",
    caption: "Consultation with Elena",
    width: 1400,
    height: 879,
    shape: "wide",
  },
  {
    src: "/assets/clinic-room.webp",
    alt: "The facial room with a skylight, a treatment bed and shelves of skincare",
    caption: "Facial room",
    width: 1400,
    height: 867,
    shape: "wide",
  },
];

export const INSTAGRAM_PHOTOS: Photo[] = [
  { src: "/assets/elena-laser.webp", alt: "Elena performing a carbon laser peel" },
  { src: "/assets/facial-mask.webp", alt: "A cleansing mask being removed during a facial" },
  { src: "/assets/arch-lounge.webp", alt: "The backlit sign in the waiting area" },
  { src: "/assets/elena-mirror.webp", alt: "Elena with a client during a consultation" },
  { src: "/assets/laser-suite.webp", alt: "The laser treatment room" },
  { src: "/assets/elena-portrait.webp", alt: "Elena at the clinic entrance" },
];

export type MenuItem = {
  name: string;
  duration?: string;
  note: string;
  price: string;
  was?: string;
  save?: string;
};

export type MenuGroup = { id: string; title: string; intro?: string; image?: Photo; items: MenuItem[] };

export const FEATURED: MenuItem[] = [
  {
    name: "Signature Deep Cleansing Facial + Peeling",
    duration: "1 hour",
    note: "A refreshing cleanse with a peel matched to you: acne and congestion, brightening for dullness, or ultra-hydrating for thirsty skin.",
    price: "£95",
  },
  {
    name: "Lipolytics",
    duration: "1 hour",
    note: "Targets stubborn fat deposits to help you achieve a more contoured silhouette.",
    price: "from £95",
  },
  {
    name: "Sculptural Face Lifting Massage",
    duration: "50 mins",
    note: "A luxurious massage that lifts and sculpts facial contours for a youthful glow.",
    price: "£65",
  },
];

export const MENU: MenuGroup[] = [
  {
    id: "facials",
    title: "Facials",
    intro: "Each facial is adjusted to your skin on the day.",
    image: {
      src: "/assets/facial-mask.webp",
      alt: "A client relaxing as a cleansing mask is removed during a facial",
    },
    items: [
      {
        name: "Deep Cleansing Facial",
        duration: "40 mins",
        note: "Removes impurities and targets congestion, with extractions as needed.",
        price: "£85",
      },
      {
        name: "Signature Deep Cleansing Facial + Peeling",
        duration: "1 hour",
        note: "Customised for acne and congestion, brightening or deep hydration.",
        price: "£95",
      },
      {
        name: "Sculptural Face Lifting Massage",
        duration: "50 mins",
        note: "Lifts and sculpts facial contours for a youthful glow.",
        price: "£65",
      },
      {
        name: "Carbon Laser Peeling",
        duration: "50 mins",
        note: "Gentle laser and activated carbon to reduce impurities and smooth texture.",
        price: "£125",
      },
      {
        name: "HydraFacial",
        duration: "1 hour",
        note: "Cleansing, exfoliation and hydration in one, for dull, dry or congested skin.",
        price: "£145",
      },
      {
        name: "PRP Facial",
        duration: "20 mins",
        note: "Uses your own plasma to improve skin quality, texture and freshness.",
        price: "£210",
      },
    ],
  },
  {
    id: "hair-removal",
    title: "Laser hair removal",
    items: [
      {
        name: "Full Face Laser Hair Removal",
        duration: "30 mins",
        note: "Gently targets unwanted facial hair for smooth skin.",
        price: "£120",
      },
      {
        name: "Laser Hair Removal, full body",
        duration: "1 hour",
        note: "Targets unwanted hair across the body for lasting results.",
        price: "£280",
      },
    ],
  },
  {
    id: "tattoo-removal",
    title: "Laser tattoo removal",
    intro: "Single sessions priced by area size, or save with a course of five.",
    image: {
      src: "/assets/elena-laser.webp",
      alt: "Elena, in protective glasses, using a laser handpiece on a client",
    },
    items: [
      { name: "Small area, up to 5 cm", duration: "20 mins", note: "Single session.", price: "£65" },
      { name: "Medium area, up to 20 cm", duration: "25 mins", note: "Single session.", price: "£95" },
      { name: "Large area, up to 25 cm", duration: "40 mins", note: "Single session.", price: "£140" },
      {
        name: "5 Laser Removal Sessions, small area",
        duration: "1 hour 40 mins",
        note: "A course of five focused sessions for unwanted hair or tattoos.",
        price: "£275",
        was: "£325",
        save: "Save 15%",
      },
      {
        name: "5 Laser Removal Sessions, medium area",
        duration: "2 hours 5 mins",
        note: "A course of five sessions to reduce unwanted tattoos.",
        price: "£425",
        was: "£475",
        save: "Save 11%",
      },
      {
        name: "5 Laser Removal Sessions, large area",
        duration: "3 hours 20 mins",
        note: "A course of five sessions for larger tattoos.",
        price: "£650",
        was: "£700",
        save: "Save 7%",
      },
    ],
  },
  {
    id: "body",
    title: "Body contouring",
    items: [
      {
        name: "Lipolytics",
        duration: "1 hour",
        note: "Designed to dissolve stubborn fat deposits for a more contoured appearance.",
        price: "from £95",
      },
    ],
  },
];

export type Review = { quote: string; name: string; meta: string };

// Verbatim from the salon's Google reviews (all five stars).
export const REVIEWS: Review[] = [
  {
    quote:
      "I’ve been Elena’s client for 4-5 years and I just love her facial, always makes my skin look perfect! And every summer I do a series of honey massage which helps to reduce cellulite and makes body firm. Highly recommend Elena’s beauty services!",
    name: "Mariia Fomina",
    meta: "Google review",
  },
  {
    quote:
      "The service was amazing and the clinic is very premium. The consultation and aftercare was great. The clinician was professional and friendly.",
    name: "Chris Bartley",
    meta: "Local Guide, Google review",
  },
  {
    quote:
      "I had an amazing experience , very luxurious space, very welcoming. My facial was incredible ! I recommend 10/10",
    name: "Edward Ali",
    meta: "Local Guide, Google review",
  },
];

const priceNumber = (p: string) => p.replace(/[^0-9.]/g, "");

export const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": SITE.url + "/#salon",
  name: SITE.name,
  url: SITE.url + "/",
  description: SITE.description,
  telephone: "+447957941155",
  priceRange: "£65 to £650",
  image: [SITE.url + "/assets/og.jpg", SITE.url + "/assets/laser-suite.webp", SITE.url + "/assets/clinic-room.webp"],
  logo: SITE.url + "/apple-touch-icon.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    addressLocality: SITE.locality,
    postalCode: SITE.postcode,
    addressCountry: "GB",
  },
  hasMap: SITE.mapsHref,
  sameAs: [SITE.instagramHref],
  potentialAction: {
    "@type": "ReserveAction",
    target: { "@type": "EntryPoint", urlTemplate: SITE.bookingHref },
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Treatments",
    itemListElement: MENU.map((g) => ({
      "@type": "OfferCatalog",
      name: g.title,
      itemListElement: g.items.map((i) => ({
        "@type": "Offer",
        price: priceNumber(i.price),
        priceCurrency: "GBP",
        itemOffered: { "@type": "Service", name: i.name, description: i.note },
      })),
    })),
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SITE.rating,
    reviewCount: SITE.reviewCount,
    bestRating: "5",
  },
  review: REVIEWS.map((r) => ({
    "@type": "Review",
    reviewBody: r.quote,
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  })),
});
