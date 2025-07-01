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
  Moon,
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
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const isAutoScrollingRef = useRef(false);
  const listenNowRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't show header during automatic upward scrolling
      if (isAutoScrollingRef.current && currentScrollY > lastScrollY.current) {
        lastScrollY.current = currentScrollY;
        return;
      }

      // Keep header visible if mobile menu is open
      if (isMobileMenuOpen) {
        setShowHeader(true);
      } else {
        if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
          setShowHeader(false); // scrolling down
        } else {
          setShowHeader(true); // scrolling up
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Click outside handler to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Track active section for navigation highlighting
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "-100px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId || "");
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Clear active section when scrolling back to hero section
  useEffect(() => {
    const handleScrollToTop = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScrollToTop);
    return () => window.removeEventListener("scroll", handleScrollToTop);
  }, []);

  // Auto-close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const handleMobileNavLink = (target) => {
    setIsMobileMenuOpen(false);

    // Use setTimeout to ensure menu closes before scrolling
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) {
        const headerHeight = 100;
        const elementPosition = el.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }, 150);
  };

  const handleMobileClick = (target) => {
    console.log("Mobile click triggered for:", target);

    // Find the element
    const element = document.getElementById(target.replace("#", ""));
    console.log("Found element:", element);

    if (element) {
      // Close menu first
      setIsMobileMenuOpen(false);

      // Add a delay to ensure menu closes before scrolling
      setTimeout(() => {
        console.log("Scrolling to element");

        // Try scrollIntoView first
        try {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } catch (error) {
          console.log("scrollIntoView failed, trying alternative method");
          // Fallback to window.scrollTo
          const headerHeight = 100;
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      }, 300); // Increased delay to ensure menu animation completes
    } else {
      console.log("Element not found for target:", target);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    console.log("Toggle mobile menu called, current state:", isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

  const handleListenNowMouseMove = (e) => {
    const btn = listenNowRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        document.cookie = `theme=${next}; path=/; max-age=31536000`;
        localStorage.setItem("theme", next);
      }
      return next;
    });
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
            <span className="text-2xl font-black gradient-text tracking-widest uppercase">
              EUQSAROSA
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center">
            <a
              href="#music"
              className={`nav-underline font-bold transition-colors ${
                activeSection === "music"
                  ? "text-white nav-underline-active"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Music
            </a>
            <a
              href="#about"
              className={`nav-underline font-bold transition-colors ${
                activeSection === "about"
                  ? "text-white nav-underline-active"
                  : "text-white/80 hover:text-white"
              }`}
            >
              About
            </a>
            <a
              href="#contact"
              className={`nav-underline font-bold transition-colors ${
                activeSection === "contact"
                  ? "text-white nav-underline-active"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Contact
            </a>
            {/* Light/Dark Mode Toggle */}
            <button
              className={`ml-10 p-2 rounded-full border border-white/20 transition-colors focus:outline-none ${
                theme === "dark"
                  ? "ring-2 ring-[#a084e8] bg-[#2d0a4b]"
                  : "hover:bg-white/10"
              }`}
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
              type="button"
            >
              <Moon
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-white" : "text-white"
                }`}
              />
            </button>
          </nav>

          {/* Mobile Navigation Button and Theme Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              className="p-3 text-white/80 hover:text-white transition-colors touch-manipulation select-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              ref={mobileMenuButtonRef}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <button
              className={`p-2 rounded-full border border-white/20 transition-colors focus:outline-none ${
                theme === "dark"
                  ? "ring-2 ring-[#a084e8] bg-[#2d0a4b]"
                  : "hover:bg-white/10"
              }`}
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
              type="button"
              style={{ minWidth: "40px", minHeight: "40px" }}
            >
              <Moon
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-white" : "text-white"
                }`}
              />
            </button>
          </div>
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
          className="lg:hidden overflow-hidden bg-black/30 backdrop-blur-md border-t border-gray-800"
          ref={mobileMenuRef}
          style={{ touchAction: "manipulation" }}
        >
          <nav className="flex flex-col py-3">
            <a
              href="#music"
              className={`mobile-nav-underline font-bold transition-colors py-4 px-6 cursor-pointer touch-manipulation select-none border-b border-white/10 ${
                activeSection === "music"
                  ? "text-white mobile-nav-underline-active"
                  : "text-white/80 hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Music link clicked");
                handleMobileClick("#music");
              }}
              style={{ minHeight: "44px" }}
            >
              <span>Music</span>
            </a>
            <a
              href="#about"
              className={`mobile-nav-underline font-bold transition-colors py-4 px-6 cursor-pointer touch-manipulation select-none border-b border-white/10 ${
                activeSection === "about"
                  ? "text-white mobile-nav-underline-active"
                  : "text-white/80 hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("About link clicked");
                handleMobileClick("#about");
              }}
              style={{ minHeight: "44px" }}
            >
              <span>About</span>
            </a>
            <a
              href="#contact"
              className={`mobile-nav-underline font-bold transition-colors py-4 px-6 cursor-pointer touch-manipulation select-none ${
                activeSection === "contact"
                  ? "text-white mobile-nav-underline-active"
                  : "text-white/80 hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Contact link clicked");
                handleMobileClick("#contact");
              }}
              style={{ minHeight: "44px" }}
            >
              <span>Contact</span>
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
              <h1 className="title lights text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center leading-tight">
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
              }}
            >
              DRUM & BASS PRODUCER
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
              <a
                href="#music"
                ref={listenNowRef}
                className="listen-now-btn relative bg-gradient-to-r from-[#2d0a4b] via-[#3a0d5c] to-[#2d0a4b] hover:from-[#5f259f] hover:to-[#a084e8] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-extrabold text-base sm:text-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 drop-shadow-md w-full sm:w-auto overflow-hidden group animated-gradient-box"
                style={{ textShadow: "0 1px 8px rgba(80,0,120,0.4)" }}
                onMouseMove={handleListenNowMouseMove}
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Listen Now</span>
                <div className="pointer-events-none absolute inset-0 z-10 animated-gradient-overlay" />
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
      <section id="music" className="py-16 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 gradient-text leading-normal"
              style={{ paddingBottom: "0.15em" }}
            >
              Releases Spotlight
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
                className="music-card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 about-section">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-center">
            About Euqsarosa
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 flex flex-col-reverse md:flex-row items-stretch justify-center gap-6 md:gap-0 shadow-lg">
            {/* Desktop: Photo on the left */}
            <div className="hidden md:flex flex-1 md:flex-[1] justify-center w-full mb-6 md:mb-0">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl md:rounded-r-none shadow-xl border-4 border-white/10 overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Photograph of Euqsarosa"
                  fill
                  className="rounded-2xl md:rounded-r-none object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text content with integrated photo for mobile */}
            <div className="flex-1 md:flex-[2] flex flex-col items-start text-left w-full bg-black/10 rounded-xl md:rounded-l-none shadow border border-white/10 p-4 sm:p-6">
              {/* Mobile: Photo integrated at top left with text wrapping */}
              <div className="md:hidden relative">
                <div className="float-left mr-4 mb-2">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl shadow-lg border-2 border-white/10 overflow-hidden flex-shrink-0">
                    <Image
                      src="/profile.jpg"
                      alt="Photograph of Euqsarosa"
                      fill
                      className="rounded-2xl object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p
                  className="text-white/80 text-left text-sm leading-relaxed"
                  style={{ hyphens: "auto", textWrap: "balance" }}
                >
                  Shahrose Atique is a producer based in Dubai, UAE.
                  <br />
                  <br />
                  What initially started out as a curious hobby back in his
                  university days eventually led up to his obsession with
                  producing music as a creative outlet, all the while being
                  deployed out in the oilfields for months at a time.
                  <br />
                  <br />
                  His love for D&amp;B as well as inspiration drew from artists
                  like Calibre, Mohican Sun, LSB, Tokyo Prose, Etherwood,
                  Technimatic, and many more.
                </p>
              </div>

              {/* Desktop: Full text */}
              <p className="hidden md:block text-white/80 text-left text-base sm:text-base leading-relaxed">
                Shahrose Atique is a Drum & Bass producer based in Dubai, UAE.
                <br />
                <br />
                What initially started out as a curious hobby back in his
                university days eventually led up to his obsession with
                producing music as a creative outlet, all the while being
                deployed out in the oilfields for months at a time.
                <br />
                <br />
                His love for D&amp;B as well as inspiration drew from artists
                like Calibre, Mohican Sun, LSB, Tokyo Prose, Etherwood,
                Technimatic, and many more.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-black/20 contact-section">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Connect
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Follow and stay updated with the latest releases
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <a
              href="https://open.spotify.com/artist/2qvorxtBtHDDhTGbMBUDdT?si=rq7hX1P7RAyVyicI-7Ff6g"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 group connect-social"
            >
              <Headphones className="w-8 h-8 mx-auto mb-3 text-green-500 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">Spotify</span>
            </a>
            <a
              href="https://www.instagram.com/euqsarosa/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 group connect-social"
            >
              <Instagram className="w-8 h-8 mx-auto mb-3 text-pink-500 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">Instagram</span>
            </a>
            <a
              href="https://soundcloud.com/euqsarosa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 group connect-social"
            >
              <Music className="w-8 h-8 mx-auto mb-3 text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">SoundCloud</span>
            </a>
            <a
              href="https://www.youtube.com/@euqsarosa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 group connect-social"
            >
              <Youtube className="w-8 h-8 mx-auto mb-3 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">YouTube</span>
            </a>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
            <p className="text-white/80 mb-6 text-sm md:text-base leading-relaxed">
              For bookings, collaborations, or just to say hello, reach out
              through any of the social channels above or send a direct message.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="mailto:euqsarosaprod@gmail.com"
                className="email-btn bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
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
            <span className="text-xl font-black gradient-text tracking-widest uppercase">
              EUQSAROSA
            </span>
          </div>
          <p className="text-white/60 text-sm font-medium tracking-wide">
            ©2025 Euqsarosa
          </p>
        </div>
      </footer>
    </motion.main>
  );
}
