import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Euqsarosa - D&B Producer",
  description:
    "Official music production site for Euqsarosa. Stream and discover the latest tracks, EPs, and albums.",
  keywords:
    "Euqsarosa, music production, electronic music, producer, streaming",
  authors: [{ name: "Euqsarosa" }],
  openGraph: {
    title: "Euqsarosa - D&B Producer",
    description:
      "Official music production site for Euqsarosa. Stream and discover the latest tracks, EPs, and albums.",
    type: "website",
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
