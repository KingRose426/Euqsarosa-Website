import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Euqsarosa - D&B Producer",
  description:
    "Official music production site for Euqsarosa. Stream and discover the latest tracks, EPs, and albums.",
  keywords:
    "Euqsarosa, music production, electronic music, producer, streaming, drum and bass, DnB, Dubai, artist, album, EP, single, streaming platforms, Spotify, Apple Music, YouTube, SoundCloud, Bandcamp, Beatport, Tidal, Deezer, Qobuz, Anghami, JunoDownload, iTunes Store, Sub Wavelength, Flight Pattern, Dialect Audio, Lizplay Records, Beatalistics, Liquid Flow Records",
  authors: [{ name: "Euqsarosa" }],
  metadataBase: new URL("https://euqsarosa.com"),
  alternates: {
    canonical: "https://euqsarosa.com",
  },
  openGraph: {
    title: "Euqsarosa - D&B Producer",
    description:
      "Official music production site for Euqsarosa. Stream and discover the latest tracks, EPs, and albums.",
    type: "website",
    url: "https://euqsarosa.com",
    siteName: "Euqsarosa",
    locale: "en_US",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary",
    site: "@euqsarosa", // Replace with actual Twitter handle if available
    title: "Euqsarosa - D&B Producer",
    description:
      "Official music production site for Euqsarosa. Stream and discover the latest tracks, EPs, and albums.",
    images: ["/favicon.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
