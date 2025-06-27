import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Euqsarosa - D&B Producer",
  description:
    "Official site for Euqsarosa (Shahrose Atique). Shahrose Atique is a Drum & Bass producer based in Dubai, UAE. Stream and discover the latest tracks, EPs, and albums.",
  keywords:
    "Euqsarosa, Shahrose, Atique, Shahrose Atique, music production, electronic music, producer, streaming, drum and bass, DnB, Dubai, artist, album, EP, single, streaming platforms, Spotify, Apple Music, YouTube, SoundCloud, Bandcamp, Beatport, Tidal, Deezer, Qobuz, Anghami, JunoDownload, iTunes Store, Sub Wavelength, Flight Pattern, Dialect Audio, Lizplay Records, Beatalistics, Liquid Flow Records",
  authors: [{ name: "Euqsarosa" }],
  metadataBase: new URL("https://euqsarosa.com"),
  alternates: {
    canonical: "https://euqsarosa.com",
  },
  openGraph: {
    title: "Euqsarosa - D&B Producer",
    description:
      "Official site for Euqsarosa (Shahrose Atique). Shahrose Atique is a Drum & Bass producer based in Dubai, UAE. Stream and discover the latest tracks, EPs, and albums.",
    type: "website",
    url: "https://euqsarosa.com",
    siteName: "Euqsarosa",
    locale: "en_US",
    images: ["/favicon.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shahrose Atique",
              alternateName: "Euqsarosa",
              url: "https://euqsarosa.com",
              image: "https://euqsarosa.com/favicon.svg",
              jobTitle: "Drum & Bass Producer",
              sameAs: [
                "https://instagram.com/euqsarosa",
                "https://soundcloud.com/euqsarosa",
                "https://open.spotify.com/artist/2qvorxtBtHDDhTGbMBUDdT",
                "https://www.youtube.com/@euqsarosa",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://euqsarosa.com",
              name: "Euqsarosa",
              alternateName: "Shahrose Atique",
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
