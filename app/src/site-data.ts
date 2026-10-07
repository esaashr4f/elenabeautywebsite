// Every fact on the page comes from the salon's Google Business listing.
// Nothing here is invented: no prices, awards or opening history.

export const SITE = {
  name: "Elena Beauty Expert",
  url: "https://elenabeautyexpert.higgsfield.app",
  description:
    "Elena Beauty Expert is a 5.0-rated beauty salon in Woodford Green, offering personalised facials, laser and light treatments and massage. Call 07957 941155.",
  phoneDisplay: "07957 941155",
  phoneHref: "tel:+447957941155",
  street: "2 Warley Rd",
  locality: "Woodford Green",
  area: "Woodford",
  postcode: "IG8 9AX",
  plusCode: "J22H+MP Woodford Green",
  rating: "5.0",
  reviewCount: 14,
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Elena+Beauty+Expert%2C+2+Warley+Rd%2C+Woodford+Green+IG8+9AX",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Elena+Beauty+Expert%2C+2+Warley+Rd%2C+Woodford+Green+IG8+9AX",
} as const;

export type Treatment = {
  id: string;
  name: string;
  line: string;
  body: string;
  image: string;
  alt: string;
};

export const TREATMENTS: Treatment[] = [
  {
    id: "facials",
    name: "Bespoke facials",
    line: "Tailored to your skin, on the day",
    body:
      "Every facial begins with a consultation and is built around what your skin needs, including sensitive skin. Arrive with a goal in mind and Elena will shape the treatment around it.",
    image: "/assets/brush.webp",
    alt: "A soft fan brush applying a treatment gel to glowing skin",
  },
  {
    id: "laser",
    name: "Laser & light treatments",
    line: "Advanced devices, careful hands",
    body:
      "In-clinic laser and IPL light treatments for the face, carried out with protective eyewear, with consultation and aftercare as part of the visit.",
    image: "/assets/ipl-facial.webp",
    alt: "A light treatment handpiece in use during a facial at the clinic",
  },
  {
    id: "acne",
    name: "Care for acne-prone skin",
    line: "A steady, long-term plan",
    body:
      "Clients with acne-prone skin have trusted Elena for years. Each visit is planned around how your skin is behaving, so the approach evolves with you.",
    image: "/assets/serum.webp",
    alt: "Frosted glass serum bottles on a travertine plinth",
  },
  {
    id: "massage",
    name: "Facial & honey massage",
    line: "A therapeutic touch, face and body",
    body:
      "Holistic facial massage to relax and revive, and honey massage for the body, often booked as a series to help skin feel firmer and smoother.",
    image: "/assets/honey.webp",
    alt: "Golden honey ribboning from a dipper into a glass bowl",
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

export const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": SITE.url + "/#salon",
  name: SITE.name,
  url: SITE.url + "/",
  description: SITE.description,
  telephone: "+447957941155",
  image: [SITE.url + "/assets/og.jpg", SITE.url + "/assets/clinic-room.webp"],
  logo: SITE.url + "/apple-touch-icon.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    addressLocality: SITE.locality,
    postalCode: SITE.postcode,
    addressCountry: "GB",
  },
  hasMap: SITE.mapsHref,
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
