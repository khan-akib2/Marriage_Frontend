import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://grandgoldenlawn.com"),
  title: "Grand Golden Wedding Lawn | Luxury Wedding & Event Destination",
  description: "Experience the ultimate luxury wedding destination. Grand Golden Wedding Lawn offers cinematic settings, premium amenities, and bespoke event decor for unforgettable celebrations.",
  keywords: "wedding lawn, luxury wedding venue, destination wedding, wedding lawn banquet, premium wedding hall",
  openGraph: {
    title: "Grand Golden Wedding Lawn | Luxury Wedding Venue",
    description: "Cinematic, luxury wedding destination for timeless celebrations.",
    url: "https://grandgoldenlawn.com",
    siteName: "Grand Golden Wedding Lawn",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Grand Golden Wedding Lawn luxury setup",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5B1C1C",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  "name": "Grand Golden Wedding Lawn",
  "description": "Grand Golden Wedding Lawn - An ultra-premium destination for luxury weddings, receptions, and celebrations.",
  "image": "https://grandgoldenlawn.com/images/hero-bg.jpg",
  "telephone": "+919876543210",
  "url": "https://grandgoldenlawn.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Front of Huda Park Rd, opp. Bharat Ghare, Kausa, Mumbra",
    "addressLocality": "Thane",
    "addressRegion": "MH",
    "postalCode": "400612",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.1585651,
    "longitude": 73.0289655
  },
  "priceRange": "$$$$"
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#FAFAF9] text-[#171717] selection:bg-[#5B1C1C] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
