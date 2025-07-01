import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

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
    icon: ["/favicon.svg", { url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  let theme = "light";
  if (typeof window === "undefined") {
    // SSR: read from cookies
    const cookieStore = cookies();
    theme = cookieStore.get("theme")?.value || "light";
  }
  return (
    <html lang="en" data-theme={theme} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
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
      <body
        className={`${inter.variable} ${dmSans.variable} bg-gray-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
