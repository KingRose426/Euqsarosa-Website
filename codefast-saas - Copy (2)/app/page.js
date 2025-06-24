"use client";

import Image from "next/image";
import {
  Music,
  Play,
  Instagram,
  Twitter,
  Youtube,
  Headphones,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import MusicReleaseCard from "@/components/MusicReleaseCard";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const musicReleases = [
    {
      title: "Never Let Go / Used To",
      spotifyUrl:
        "https://open.spotify.com/embed/album/1bAqTRWU3QALt1F8doULon?utm_source=generator",
      imageUrl: "/neverletgousedto.jpg",
      type: "album",
    },
    {
      title: "Aurora",
      imageUrl: "/aurora.jpg",
      type: "track",
    },
    {
      title: "In Your Eyes",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0SCoNAciqsTEKWpHiSfYVk?utm_source=generator",
      imageUrl: "/inyoureyes.jpg",
      type: "track",
    },
    {
      title: "Grow",
      spotifyUrl:
        "https://open.spotify.com/embed/track/12iUl8zcG0fZlbxcIOMM0u?utm_source=generator",
      imageUrl: "/grow.jpg",
      type: "track",
    },
    {
      title: "Keeping On",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3RxWpfV6ilqc7GQSTY2IDJ?utm_source=generator",
      imageUrl: "/keepingon.jpg",
      type: "track",
    },
    {
      title: "Incongruency",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4xnVoqewkPXTcKYMKGPJNI?utm_source=generator",
      imageUrl: "/incongruency.jpg",
      type: "track",
    },
  ];

  const socialLinks = [
    {
      name: "Spotify",
      icon: Headphones,
      url: "https://open.spotify.com/artist/euqsarosa",
      color: "text-green-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/euqsarosa",
      color: "text-pink-500",
    },
    {
      name: "SoundCloud",
      icon: Music,
      url: "https://soundcloud.com/euqsarosa",
      color: "text-orange-500",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@euqsarosa",
      color: "text-red-500",
    },
  ];

  const [showHeader, setShowHeader] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMusicCard, setOpenMusicCard] = useState(null);
  const lastScrollY = useRef(0);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't show header during automatic upward scrolling
      if (isAutoScrollingRef.current && currentScrollY > lastScrollY.current) {
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMobileNavClick = (e, target) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Add a small delay to ensure the menu closes before scrolling
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) {
        // Calculate the offset for the fixed header
        const headerHeight = 80; // Approximate header height
        const elementPosition = el.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleMusicCardToggle = (cardTitle) => {
    setOpenMusicCard(openMusicCard === cardTitle ? null : cardTitle);
  };

  const handleAutoScroll = (callback) => {
    isAutoScrollingRef.current = true;
    callback();
    // Reset the flag after the scroll completes
    setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 500);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white"
    >
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-gray-800 transition-transform duration-200 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2 cursor-pointer">
            <span
              className="text-2xl font-black gradient-text tracking-widest uppercase"
              style={{
                fontFamily: "Inter, DM Sans, Arial, sans-serif",
              }}
            >
              EUQSAROSA
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#music"
              className="text-white/80 hover:text-white transition-colors"
            >
              Music
            </a>
            <a
              href="#about"
              className="text-white/80 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-white/80 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: "auto" },
            closed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden bg-black/30 backdrop-blur-md border-t border-gray-800"
        >
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <a
              href="#music"
              className="text-white/80 hover:text-white transition-colors py-3 border-b border-gray-700/50 cursor-pointer touch-manipulation"
              onClick={(e) => handleMobileNavClick(e, "#music")}
            >
              Music
            </a>
            <a
              href="#about"
              className="text-white/80 hover:text-white transition-colors py-3 border-b border-gray-700/50 cursor-pointer touch-manipulation"
              onClick={(e) => handleMobileNavClick(e, "#about")}
            >
              About
            </a>
            <a
              href="#contact"
              className="text-white/80 hover:text-white transition-colors py-3 cursor-pointer touch-manipulation"
              onClick={(e) => handleMobileNavClick(e, "#contact")}
            >
              Contact
            </a>
          </nav>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/herovid.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Stronger, blurred overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 pointer-events-none" />
        <div className="relative z-20 text-center w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-full flex justify-center items-center mb-4">
              <h1
                className="title lights text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center leading-tight"
                style={{ fontFamily: "Inter, DM Sans, Arial, sans-serif" }}
              >
                EUQSAROSA
              </h1>
            </div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-white/90 mb-8 tracking-widest uppercase text-center"
              style={{
                textShadow: "0 0 16px #a084e8, 0 2px 4px rgba(0,0,0,0.5)",
                fontFamily: "Inter, DM Sans, Arial, sans-serif",
              }}
            >
              DRUM & BASS PRODUCER
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
              <a
                href="#music"
                className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-extrabold text-base sm:text-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 drop-shadow-md w-full sm:w-auto"
                style={{ textShadow: "0 1px 8px rgba(80,0,120,0.4)" }}
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Listen Now</span>
              </a>
              <a
                href="#contact"
                className="border-2 border-white/60 hover:border-purple-300 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-extrabold text-base sm:text-lg shadow-lg transition-all duration-300 drop-shadow-md flex items-center justify-center w-full sm:w-auto"
                style={{ textShadow: "0 1px 8px rgba(80,0,120,0.4)" }}
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Latest Releases
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {musicReleases.map((release, index) => (
              <MusicReleaseCard
                key={index}
                release={release}
                isOpen={openMusicCard === release.title}
                onToggle={() => handleMusicCardToggle(release.title)}
                onAutoScroll={handleAutoScroll}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
            About
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-white/80 mb-6">
                Euqsarosa is a forward-thinking electronic music producer
                pushing the boundaries of sound design and rhythm. With a focus
                on innovative production techniques and powerful basslines, each
                release showcases a unique approach to electronic music.
              </p>
              <p className="text-lg text-white/80 mb-6">
                From atmospheric soundscapes to high-energy dance tracks, the
                music spans multiple genres while maintaining a distinctive
                signature sound that has captivated listeners worldwide.
              </p>
              <p className="text-lg text-white/80">
                Based on years of experimentation and dedication to the craft,
                Euqsarosa continues to evolve and push the limits of what's
                possible in electronic music production.
              </p>
            </div>
            <div className="relative w-full h-96">
              <Image
                src="/profile.jpg"
                alt="A photo of Euqsarosa"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-black/20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
            Connect
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Follow and stay updated with the latest releases
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 group"
              >
                <social.icon
                  className={`w-8 h-8 mx-auto mb-3 ${social.color} group-hover:scale-110 transition-transform`}
                />
                <span className="text-white font-medium">{social.name}</span>
              </a>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
            <p className="text-white/80 mb-6">
              For bookings, collaborations, or just to say hello, reach out
              through any of the social channels above or send a direct message.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="mailto:contact@euqsarosa.com"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Email
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span
              className="text-xl font-black gradient-text tracking-widest uppercase"
              style={{
                fontFamily: "Inter, DM Sans, Arial, sans-serif",
              }}
            >
              EUQSAROSA
            </span>
          </div>
          <p className="text-white/60">
            © 2025 Euqsarosa. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.main>
  );
}
