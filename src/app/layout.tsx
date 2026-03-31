import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zoecc.co.uk"),
  title: "ZoeCC - Cat Care in Teddington - £8/visit - Cat Sitter Teddington",
  description:
    "Professional cat care services in Teddington. £8/visit for feeding, litter cleaning, play time & photo updates. Gentle, loving care for every cat personality while you're on holiday. Cat Sitting in Teddington.",
  keywords: [
    "cat care",
    "pet sitting",
    "cat sitter",
    "Teddington",
    "Kingston",
    "holiday pet care",
    "cat feeding",
    "litter cleaning",
    "professional pet care",
    "affordable cat care",
    "Teddington cat care",
    "Zoe cat care",
    "Cat Sitter Teddington",
    "Teddington cat sitter",
  ],
  authors: [{ name: "Zoe Forrest" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-GB": "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://zoecc.co.uk",
    title: "ZoeCC - Professional Cat Care Services in Teddington - £8/visit",
    description:
      "Professional cat care services in Teddington. £8/visit for feeding, litter cleaning, play time & photo updates. Gentle, loving care for every cat personality while you're on holiday. Cat Sitting in Teddington.",
    images: [{ url: "/photos/cat1.jpeg" }],
    siteName: "ZoeCC Cat Care",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZoeCC - Professional Cat Care Services in Teddington - £8/visit",
    description:
      "Professional cat care services in Teddington. £8/visit for feeding, litter cleaning, play time & photo updates. Gentle, loving care for every cat personality while you're on holiday. Cat Sitting in Teddington.",
    images: ["/photos/cat1.jpeg"],
  },
  themeColor: "#8B4513",
  applicationName: "ZoeCC Cat Care",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ZoeCC",
  },
  other: {
    "geo.region": "GB-ENG",
    "geo.placename": "Teddington",
    "geo.position": "51.4264;-0.3236",
    ICBM: "51.4264, -0.3236",
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <meta name="apple-mobile-web-app-title" content="ZoeCC" />
      <body className="font-sans">
        <Providers>{children}</Providers>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LGS95FEFQL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-LGS95FEFQL');`}
        </Script>
      </body>
    </html>
  );
}
