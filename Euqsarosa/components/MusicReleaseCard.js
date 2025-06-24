"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  FaSpotify,
  FaYoutube,
  FaSoundcloud,
  FaBandcamp,
  FaDeezer,
  FaMusic,
} from "react-icons/fa";
import {
  SiBeatport,
  SiTidal,
  SiQobuz,
  SiAnghami,
  SiJunodownload,
} from "react-icons/si";

function AnimatedDropdownBox({
  svgSrc,
  alt,
  link,
  buttonLabel,
  buttonHoverClass,
  onMusicServiceClick,
}) {
  const boxRef = useRef(null);
  const handleMouseMove = (e) => {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    box.style.setProperty("--x", `${x}px`);
    box.style.setProperty("--y", `${y}px`);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (onMusicServiceClick) {
      onMusicServiceClick();
    }
    // Open the link in a new tab after a short delay
    setTimeout(() => {
      window.open(link, "_blank", "noopener,noreferrer");
    }, 100);
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      ref={boxRef}
      className="relative flex items-center bg-gradient-to-r from-[#2d0a4b] via-[#3a0d5c] to-[#2d0a4b] rounded-xl shadow-md p-3 transition-colors duration-200 overflow-hidden animated-gradient-box group"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center w-20 h-20 mr-3">
        <Image
          src={svgSrc}
          alt={alt}
          width={80}
          height={80}
          className="object-contain w-full h-full"
        />
      </div>
      <span
        className={`ml-auto px-4 py-2 rounded-lg bg-[#5f259f] text-white font-sans font-extrabold tracking-wide shadow transition-colors ${buttonHoverClass}`}
      >
        {buttonLabel}
      </span>
      <div className="pointer-events-none absolute inset-0 z-10 animated-gradient-overlay" />
    </a>
  );
}

export default function MusicReleaseCard({
  release,
  isOpen,
  onToggle,
  onAutoScroll,
}) {
  const cardRef = useRef(null);
  const hasAutoScrolledRef = useRef(false);
  const embedHeight = release.type === "album" ? "152" : "80";

  // Scroll to center when dropdown is opened
  useEffect(() => {
    if (isOpen && cardRef.current && !hasAutoScrolledRef.current) {
      // Mark that we've auto-scrolled for this dropdown
      hasAutoScrolledRef.current = true;

      // Wait for the dropdown animation to complete (0.5s duration from the motion component)
      setTimeout(() => {
        const card = cardRef.current;
        if (card) {
          const rect = card.getBoundingClientRect();
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const headerHeight = 80;

          // Get the image element within the card
          const imageElement = card.querySelector("img");
          if (imageElement) {
            const imageRect = imageElement.getBoundingClientRect();

            // Calculate the center position of the image
            const imageTop = imageRect.top + scrollTop;
            const imageHeight = imageRect.height;
            const viewportHeight = window.innerHeight;

            // Position to place the image 75% up from the bottom of the viewport
            const targetScrollTop =
              imageTop - viewportHeight * 0.25 + imageHeight / 2 - headerHeight;

            console.log("Scrolling to image:", {
              imageTop,
              imageHeight,
              viewportHeight,
              targetScrollTop,
              currentScrollTop: scrollTop,
            });

            // Use onAutoScroll to prevent header interference
            onAutoScroll(() => {
              window.scrollTo({
                top: Math.max(0, targetScrollTop),
                behavior: "auto",
              });
            });
          }
        }
      }, 300); // Reduced delay for snappier response
    }

    // Reset the flag when dropdown closes
    if (!isOpen) {
      hasAutoScrolledRef.current = false;
    }
  }, [isOpen, onAutoScroll]);

  const handleMusicServiceClick = () => {
    // Close the dropdown
    onToggle();
    // No scroll logic here anymore
    setTimeout(() => {}, 100);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden"
    >
      <motion.div layout onClick={onToggle} className="cursor-pointer">
        <div className="w-full h-80 mb-4 relative group">
          <Image
            src={release.imageUrl}
            alt={`${release.title} album art`}
            layout="fill"
            objectFit="contain"
            className="rounded-xl"
          />
          <div className="absolute inset-0 rounded-xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-12 h-12 text-white/80" />
            </motion.div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-white">{release.title}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <ChevronDown className="w-6 h-6 text-white/80" />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            {/* Dropdown for Aurora */}
            {release.title === "Aurora" && (
              <div className="mb-4">
                <div className="font-semibold text-white mb-2">
                  Choose music service
                </div>
                <div className="flex flex-col gap-3">
                  {/* Spotify */}
                  <AnimatedDropdownBox
                    svgSrc="/Spotify.svg"
                    alt="Spotify"
                    link="https://open.spotify.com/track/aurora"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* YouTube */}
                  <AnimatedDropdownBox
                    svgSrc="/YouTube.svg"
                    alt="YouTube"
                    link="https://youtube.com/watch?v=aurora"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Bandcamp (Go to) */}
                  <AnimatedDropdownBox
                    svgSrc="/Bandcamp.svg"
                    alt="Bandcamp"
                    link="https://bandcamp.com/aurora"
                    buttonLabel="Go To"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* JunoDownload (Download) */}
                  <AnimatedDropdownBox
                    svgSrc="/JunoDownload.svg"
                    alt="JunoDownload"
                    link="https://junodownload.com/aurora"
                    buttonLabel="Download"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Beatport */}
                  <AnimatedDropdownBox
                    svgSrc="/Beatport.svg"
                    alt="Beatport"
                    link="https://beatport.com/aurora"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* SoundCloud */}
                  <AnimatedDropdownBox
                    svgSrc="/SoundCloud.svg"
                    alt="SoundCloud"
                    link="https://soundcloud.com/aurora"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Tidal */}
                  <AnimatedDropdownBox
                    svgSrc="/Tidal.svg"
                    alt="Tidal"
                    link="https://tidal.com/aurora"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Deezer */}
                  <AnimatedDropdownBox
                    svgSrc="/Deezer.svg"
                    alt="Deezer"
                    link="https://deezer.com/aurora"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Qobuz (placeholder) */}
                  <AnimatedDropdownBox
                    svgSrc="/Qobuz.svg"
                    alt="Qobuz"
                    link="https://qobuz.com/aurora"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Anghami (custom logo) */}
                  <AnimatedDropdownBox
                    svgSrc="/Anghami.svg"
                    alt="Anghami"
                    link="https://anghami.com/aurora"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                </div>
              </div>
            )}

            {/* Dropdown for In Your Eyes */}
            {release.title === "In Your Eyes" && (
              <div className="mb-4">
                <div className="font-semibold text-white mb-2">
                  Choose music service
                </div>
                <div className="flex flex-col gap-3">
                  {/* Spotify */}
                  <AnimatedDropdownBox
                    svgSrc="/Spotify.svg"
                    alt="Spotify"
                    link="https://open.spotify.com/track/0SCoNAciqsTEKWpHiSfYVk?utm_source=generator"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* YouTube */}
                  <AnimatedDropdownBox
                    svgSrc="/YouTube.svg"
                    alt="YouTube"
                    link="https://youtube.com/watch?v=inyoureyes"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Bandcamp (Go to) */}
                  <AnimatedDropdownBox
                    svgSrc="/Bandcamp.svg"
                    alt="Bandcamp"
                    link="https://bandcamp.com/inyoureyes"
                    buttonLabel="Go To"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* JunoDownload (Download) */}
                  <AnimatedDropdownBox
                    svgSrc="/JunoDownload.svg"
                    alt="JunoDownload"
                    link="https://junodownload.com/inyoureyes"
                    buttonLabel="Download"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Beatport */}
                  <AnimatedDropdownBox
                    svgSrc="/Beatport.svg"
                    alt="Beatport"
                    link="https://beatport.com/inyoureyes"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* SoundCloud */}
                  <AnimatedDropdownBox
                    svgSrc="/SoundCloud.svg"
                    alt="SoundCloud"
                    link="https://soundcloud.com/inyoureyes"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Tidal */}
                  <AnimatedDropdownBox
                    svgSrc="/Tidal.svg"
                    alt="Tidal"
                    link="https://tidal.com/inyoureyes"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Deezer */}
                  <AnimatedDropdownBox
                    svgSrc="/Deezer.svg"
                    alt="Deezer"
                    link="https://deezer.com/inyoureyes"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Qobuz (placeholder) */}
                  <AnimatedDropdownBox
                    svgSrc="/Qobuz.svg"
                    alt="Qobuz"
                    link="https://qobuz.com/inyoureyes"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Anghami (custom logo) */}
                  <AnimatedDropdownBox
                    svgSrc="/Anghami.svg"
                    alt="Anghami"
                    link="https://anghami.com/inyoureyes"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                </div>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
