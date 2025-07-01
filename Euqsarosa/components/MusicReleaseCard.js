"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
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
import { createPortal } from "react-dom";

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
      className="platform-link-box relative flex items-center bg-gradient-to-r from-[#2d0a4b] via-[#3a0d5c] to-[#2d0a4b] rounded-xl shadow-md p-3 transition-colors duration-200 overflow-hidden animated-gradient-box group"
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
          loading="lazy"
        />
      </div>
      <span
        className={`platform-link-btn ml-auto px-4 py-2 rounded-lg bg-[#5f259f] text-white font-sans font-extrabold tracking-wide shadow transition-colors ${buttonHoverClass}`}
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
  const subWavelengthBoxRef = useRef(null);
  const embedHeight = release.type === "album" ? "152" : "80";
  const [showOverlay, setShowOverlay] = useState(false);
  const [showAuroraOverlay, setShowAuroraOverlay] = useState(false);
  const [showEyesOverlay, setShowEyesOverlay] = useState(false);
  const [showGrowOverlay, setShowGrowOverlay] = useState(false);
  const [showKeepingOnOverlay, setShowKeepingOnOverlay] = useState(false);
  const [showIncongruencyOverlay, setShowIncongruencyOverlay] = useState(false);

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

  // Mouse move handler for Sub Wavelength box
  const handleSubWavelengthMouseMove = (e) => {
    const box = subWavelengthBoxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    box.style.setProperty("--x", `${x}px`);
    box.style.setProperty("--y", `${y}px`);
  };

  const handleMusicServiceClick = () => {
    // No longer close the dropdown on click
    setTimeout(() => {}, 100);
  };

  // Update handleOpenOverlay to handle Aurora
  const handleOpenOverlay = () => {
    if (release.title === "Never Let Go / Used To") {
      setShowOverlay(true);
    } else if (release.title === "Aurora") {
      setShowAuroraOverlay(true);
    } else if (release.title === "In Your Eyes") {
      setShowEyesOverlay(true);
    } else if (release.title === "Grow") {
      setShowGrowOverlay(true);
    } else if (release.title === "Keeping On") {
      setShowKeepingOnOverlay(true);
    } else if (release.title === "Incongruency") {
      setShowIncongruencyOverlay(true);
    } else {
      onToggle();
    }
  };
  const handleCloseOverlay = (e) => {
    e.stopPropagation();
    setShowOverlay(false);
    setShowEyesOverlay(false);
    setShowGrowOverlay(false);
    setShowKeepingOnOverlay(false);
    setShowIncongruencyOverlay(false); // Also close Incongruency overlay
  };
  const handleCloseAuroraOverlay = (e) => {
    e.stopPropagation();
    setShowAuroraOverlay(false);
  };

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (
      (release.title === "Never Let Go / Used To" && showOverlay) ||
      (release.title === "Aurora" && showAuroraOverlay) ||
      (release.title === "In Your Eyes" && showEyesOverlay) ||
      (release.title === "Grow" && showGrowOverlay) ||
      (release.title === "Keeping On" && showKeepingOnOverlay) ||
      (release.title === "Incongruency" && showIncongruencyOverlay)
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [
    showOverlay,
    showAuroraOverlay,
    showEyesOverlay,
    showGrowOverlay,
    showKeepingOnOverlay,
    showIncongruencyOverlay,
    release.title,
  ]);

  return (
    <>
      <motion.div
        ref={cardRef}
        layout
        className="music-card bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden"
      >
        <motion.div
          layout
          onClick={handleOpenOverlay}
          className="cursor-pointer"
        >
          <div className="w-full h-80 mb-4 relative group">
            <Image
              src={release.imageUrl}
              alt={
                release.title === "Never Let Go / Used To"
                  ? "Cover art of Never Let Go / Used To"
                  : release.title === "Aurora"
                  ? "Cover art of Aurora"
                  : release.title === "In Your Eyes"
                  ? "Cover art of In Your Eyes"
                  : release.title === "Grow"
                  ? "Cover art of Grow"
                  : release.title === "Keeping On"
                  ? "Cover art of Keeping On"
                  : release.title === "Incongruency"
                  ? "Cover art of Incongruency"
                  : `${release.title} album art`
              }
              fill
              className="rounded-xl object-contain"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-white text-sm tracking-wide bg-black/60 px-6 py-2 rounded-xl shadow-lg">
                Buy/Stream
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <h3
              className="text-2xl font-extrabold text-center text-white"
              style={{
                letterSpacing: "0.01em",
                margin: 0,
                padding: 0,
              }}
            >
              {release.title}
            </h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <ChevronDown className="w-6 h-6 text-white/80" />
            </motion.div>
          </div>
          {/* Additional info for Never Let Go / Used To */}
          {release.title === "Never Let Go / Used To" && (
            <div className="mb-6">
              <div
                className="text-sm text-white"
                style={{
                  letterSpacing: "0.02em",
                  marginBottom: "2px",
                  textAlign: "left",
                  fontWeight: 400,
                }}
              >
                June 13, 2025
              </div>
              <div
                className="text-sm italic text-white/80"
                style={{
                  letterSpacing: "0.04em",
                  fontWeight: 400,
                  opacity: 0.85,
                  textAlign: "left",
                }}
              >
                Sub Wavelength Recordings
              </div>
            </div>
          )}
          {/* Additional info for Aurora */}
          {release.title === "Aurora" && (
            <div className="mb-6">
              <div
                className="text-sm text-white"
                style={{
                  letterSpacing: "0.02em",
                  marginBottom: "2px",
                  textAlign: "left",
                  fontWeight: 400,
                }}
              >
                April 10, 2025
              </div>
              <div
                className="text-sm italic text-white/80"
                style={{
                  letterSpacing: "0.04em",
                  fontWeight: 400,
                  opacity: 0.85,
                  textAlign: "left",
                }}
              >
                Flight Pattern Records
              </div>
            </div>
          )}
          {/* Additional info for In Your Eyes */}
          {release.title === "In Your Eyes" && (
            <div className="mb-6">
              <div
                className="text-sm text-white"
                style={{
                  letterSpacing: "0.02em",
                  marginBottom: "2px",
                  textAlign: "left",
                  fontWeight: 400,
                }}
              >
                December 16, 2023
              </div>
              <div
                className="text-sm italic text-white/80"
                style={{
                  letterSpacing: "0.04em",
                  fontWeight: 400,
                  opacity: 0.85,
                  textAlign: "left",
                }}
              >
                Dialect Audio
              </div>
            </div>
          )}
          {/* Additional info for Grow */}
          {release.title === "Grow" && (
            <div className="mb-6">
              <div
                className="text-sm text-white"
                style={{
                  letterSpacing: "0.02em",
                  marginBottom: "2px",
                  textAlign: "left",
                  fontWeight: 400,
                }}
              >
                October 11, 2024
              </div>
              <div
                className="text-sm italic text-white/80"
                style={{
                  letterSpacing: "0.04em",
                  fontWeight: 400,
                  opacity: 0.85,
                  textAlign: "left",
                }}
              >
                DNBB Group / Liquid Flow
              </div>
            </div>
          )}
          {/* Additional info for Keeping On */}
          {release.title === "Keeping On" && (
            <div className="mb-6">
              <div
                className="text-sm text-white"
                style={{
                  letterSpacing: "0.02em",
                  marginBottom: "2px",
                  textAlign: "left",
                  fontWeight: 400,
                }}
              >
                October 18, 2024
              </div>
              <div
                className="text-sm italic text-white/80"
                style={{
                  letterSpacing: "0.04em",
                  fontWeight: 400,
                  opacity: 0.85,
                  textAlign: "left",
                }}
              >
                Beatalistics Rec.
              </div>
            </div>
          )}
          {/* Additional info for Incongruency */}
          {release.title === "Incongruency" && (
            <div className="mb-6">
              <div
                className="text-sm text-white"
                style={{
                  letterSpacing: "0.02em",
                  marginBottom: "2px",
                  textAlign: "left",
                  fontWeight: 400,
                }}
              >
                October 15, 2024
              </div>
              <div
                className="text-sm italic text-white/80"
                style={{
                  letterSpacing: "0.04em",
                  fontWeight: 400,
                  opacity: 0.85,
                  textAlign: "left",
                }}
              >
                Lizplay Records
              </div>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto", y: 0 },
                collapsed: { opacity: 0, height: 0, y: -24 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="overflow-hidden"
            >
              {/* Dropdown for Aurora */}
              {release.title === "Aurora" &&
                showAuroraOverlay &&
                typeof window !== "undefined" &&
                createPortal(
                  <div
                    className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg py-12 overflow-y-auto max-h-screen"
                    onClick={handleCloseAuroraOverlay}
                  >
                    <div className="fixed top-4 right-4 z-[100]">
                      <button
                        onClick={handleCloseAuroraOverlay}
                        className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
                        aria-label="Close"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div
                      className="platform-overlay-box bg-[#1a1333] rounded-2xl shadow-2xl p-0 w-full max-w-[320px] mx-auto relative flex flex-col items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Cover Art at the top */}
                      <div className="w-full flex justify-center items-center">
                        <Image
                          src={release.imageUrl}
                          alt={release.title + " cover art"}
                          width={320}
                          height={320}
                          className="rounded-xl object-contain w-full max-w-[320px] h-80"
                          style={{ maxWidth: "90vw", maxHeight: "90vw" }}
                          priority
                        />
                      </div>
                      {/* Music Title below cover art */}
                      <div
                        className="text-xl font-extrabold text-center text-white mt-4 mb-6"
                        style={{
                          letterSpacing: "0.01em",
                          margin: 4,
                          padding: 0,
                        }}
                      >
                        {release.title}
                      </div>
                      {/* Spotify Preview Embed */}
                      <div className="mb-5 mt-5 flex justify-center items-center w-full">
                        <div
                          className="spotify-embed-container group w-full max-w-[320px]"
                          style={{ borderRadius: "16px" }}
                        >
                          <iframe
                            className="spotify-embed-frame"
                            style={{
                              borderRadius: "16px",
                              border: "2px solid #a084e8",
                              width: "100%",
                              height: "96px",
                              background: "#18181b",
                              margin: 0,
                              padding: 0,
                              display: "block",
                            }}
                            src="https://open.spotify.com/embed/track/1tdu2HljUSbkDYTkTlZVC9?utm_source=generator"
                            width="100%"
                            height="96"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            allowFullScreen
                            title="Spotify Preview"
                          ></iframe>
                        </div>
                      </div>
                      <div className="font-semibold text-white mb-2 text-center">
                        Choose music service
                      </div>
                      <div className="flex flex-col divide-y divide-white/20 pb-0 mb-0 w-full">
                        {/* Platform links, use same buttonLabel style as overlay */}
                        <AnimatedDropdownBox
                          svgSrc="/Spotify.svg"
                          alt="Spotify"
                          link="https://open.spotify.com/album/4exvuPpkjAyzQXHa2sSasH?go=1&nd=1&dlsi=506c1a2743f84f0a"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/AppleMusic.svg"
                          alt="Apple Music"
                          link="https://music.apple.com/gb/song/aurora/1802621118"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/YouTube.svg"
                          alt="YouTube"
                          link="https://www.youtube.com/watch?v=_tm1V6L6ZKw"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Watch
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Bandcamp.svg"
                          alt="Bandcamp"
                          link="https://flightpattern.bandcamp.com/album/arrivals-vol-8"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Go To
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/junodownload.svg"
                          alt="JunoDownload"
                          link="https://www.junodownload.com/products/euqsarosa-mac-v-tim-cant-arrivals-vol-8/7039671-02/"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Download
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Beatport.svg"
                          alt="Beatport"
                          link="https://www.beatport.com/release/arrivals-vol-8/4993670"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Soundcloud.svg"
                          alt="SoundCloud"
                          link="https://soundcloud.com/flight-pattern-records/sets/arrivals-vol-8"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Tidal.svg"
                          alt="Tidal"
                          link="https://tidal.com/album/424419881"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Deezer.svg"
                          alt="Deezer"
                          link="https://www.deezer.com/us/album/728705471?app_id=140685"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Qobuz.svg"
                          alt="Qobuz"
                          link="https://www.qobuz.com/us-en/album/arrivals-vol-8-various-artists/ge4z162j49dbc?lf=976dbaa90b12506c7fa3288f2ba000da"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Anghami.svg"
                          alt="Anghami"
                          link="https://play.anghami.com/album/1066129009?lf=976dbaa90b12506c7fa3288f2ba000da"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                      </div>
                    </div>
                  </div>,
                  document.body
                )}

              {/* Dropdown for In Your Eyes */}
              {release.title === "In Your Eyes" && showEyesOverlay && (
                <div className="mb-4">
                  {/* Spotify Preview Embed - compact, interactive */}
                  <div className="mb-2 flex justify-center items-center w-full">
                    <div
                      className="spotify-embed-container group w-full max-w-[320px]"
                      style={{ borderRadius: "16px" }}
                    >
                      <iframe
                        className="spotify-embed-frame"
                        style={{
                          borderRadius: "16px",
                          border: "2px solid #a084e8",
                          width: "100%",
                          height: "96px",
                          background: "#18181b",
                          margin: 0,
                          padding: 0,
                          display: "block",
                        }}
                        src="https://open.spotify.com/embed/track/0SCoNAciqsTEKWpHiSfYVk?utm_source=generator"
                        width="100%"
                        height="96"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        allowFullScreen
                        title="Spotify Preview"
                      ></iframe>
                    </div>
                  </div>
                  <div className="font-semibold text-white mb-2 text-center">
                    Choose music service
                  </div>
                  <div className="flex flex-col divide-y divide-white/20">
                    {/* Spotify */}
                    <AnimatedDropdownBox
                      svgSrc="/Spotify.svg"
                      alt="Spotify"
                      link="https://open.spotify.com/track/0SCoNAciqsTEKWpHiSfYVk?si=82e8f9fc2079489c"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Play
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                    {/* YouTube */}
                    <AnimatedDropdownBox
                      svgSrc="/YouTube.svg"
                      alt="YouTube"
                      link="https://youtu.be/wV0v1IWZ4t0?si=DCzOBC7zmZDBAV8D"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Watch
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                    {/* YouTube Music */}
                    <AnimatedDropdownBox
                      svgSrc="/YoutubeMusic.svg"
                      alt="YouTube Music"
                      link="https://music.youtube.com/watch?v=5nAl6yfc5CY"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Play
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                    {/* Bandcamp */}
                    <AnimatedDropdownBox
                      svgSrc="/Bandcamp.svg"
                      alt="Bandcamp"
                      link="https://dialectaudio.bandcamp.com/track/dialective-euqsarosa-in-your-eyes"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Go To
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                    {/* Beatport */}
                    <AnimatedDropdownBox
                      svgSrc="/Beatport.svg"
                      alt="Beatport"
                      link="https://www.beatport.com/track/in-your-eyes-feat-dialective/18414572"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Play
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                    {/* SoundCloud */}
                    <AnimatedDropdownBox
                      svgSrc="/Soundcloud.svg"
                      alt="SoundCloud"
                      link="https://soundcloud.com/liquiddnbftws/dialective-euqsarosa-open-your-eyes?si=c329ba9a40c8433f9415724303f6222e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Play
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                    {/* Apple Music */}
                    <AnimatedDropdownBox
                      svgSrc="/AppleMusic.svg"
                      alt="Apple Music"
                      link="https://music.apple.com/ae/song/in-your-eyes-feat-dialective/1718743426"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Play
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                    {/* JunoDownload */}
                    <AnimatedDropdownBox
                      svgSrc="/junodownload.svg"
                      alt="JunoDownload"
                      link="https://www.junodownload.com/products/liquid-selections-i/6411214-02/"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Download
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                    {/* iTunes Store */}
                    <AnimatedDropdownBox
                      svgSrc="/itunesStore.svg"
                      alt="iTunes Store"
                      link="https://music.apple.com/ae/song/in-your-eyes-feat-dialective/1718743426"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Download
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                    {/* Amazon Music */}
                    <AnimatedDropdownBox
                      svgSrc="/AmazonMusic.svg"
                      alt="Amazon Music"
                      link="https://music.amazon.com/tracks/B0CP44LGT2?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_ERCrjWIVIqyvmExWqcryPMKx5"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Play
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                    {/* Tidal */}
                    <AnimatedDropdownBox
                      svgSrc="/Tidal.svg"
                      alt="Tidal"
                      link="https://listen.tidal.com/album/331634282"
                      buttonLabel={
                        <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                          Play
                        </span>
                      }
                      buttonHoverClass="hover:bg-[#a084e8]"
                      onMusicServiceClick={handleMusicServiceClick}
                    />
                  </div>
                </div>
              )}

              {/* Dropdown for Grow */}
              {release.title === "Grow" &&
                showGrowOverlay &&
                typeof window !== "undefined" &&
                createPortal(
                  <div
                    className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg py-12 overflow-y-auto max-h-screen"
                    onClick={handleCloseOverlay}
                  >
                    <div className="fixed top-4 right-4 z-[100]">
                      <button
                        onClick={handleCloseOverlay}
                        className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
                        aria-label="Close"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div
                      className="platform-overlay-box bg-[#1a1333] rounded-2xl shadow-2xl p-0 w-full max-w-[320px] mx-auto relative flex flex-col items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Cover Art at the top */}
                      <div className="w-full flex justify-center items-center">
                        <Image
                          src={release.imageUrl}
                          alt={release.title + " cover art"}
                          width={320}
                          height={320}
                          className="rounded-xl object-contain w-full max-w-[320px] h-80"
                          style={{ maxWidth: "90vw", maxHeight: "90vw" }}
                          priority
                        />
                      </div>
                      {/* Music Title below cover art */}
                      <div
                        className="text-xl font-extrabold text-center text-white mt-4 mb-6"
                        style={{
                          letterSpacing: "0.01em",
                          margin: 4,
                          padding: 0,
                        }}
                      >
                        {release.title}
                      </div>
                      {/* Spotify Preview Embed */}
                      <div className="mb-5 mt-5 flex justify-center items-center w-full">
                        <div
                          className="spotify-embed-container group w-full max-w-[320px]"
                          style={{ borderRadius: "16px" }}
                        >
                          <iframe
                            className="spotify-embed-frame"
                            style={{
                              borderRadius: "16px",
                              border: "2px solid #a084e8",
                              width: "100%",
                              height: "96px",
                              background: "#18181b",
                              margin: 0,
                              padding: 0,
                              display: "block",
                            }}
                            src="https://open.spotify.com/embed/track/12iUl8zcG0fZlbxcIOMM0u?utm_source=generator"
                            width="100%"
                            height="96"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            allowFullScreen
                            title="Spotify Preview"
                          ></iframe>
                        </div>
                      </div>
                      <div className="font-semibold text-white mb-2 text-center">
                        Choose music service
                      </div>
                      <div className="flex flex-col divide-y divide-white/20 pb-0 mb-0 w-full">
                        <AnimatedDropdownBox
                          svgSrc="/Spotify.svg"
                          alt="Spotify"
                          link="https://open.spotify.com/track/12iUl8zcG0fZlbxcIOMM0u?si=1181d59ecf744eb3"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/AppleMusic.svg"
                          alt="Apple Music"
                          link="https://music.apple.com/ae/album/grow-single/1767963358"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/YouTube.svg"
                          alt="YouTube"
                          link="https://www.youtube.com/watch?v=2ZdGuNoNQDI"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Watch
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/YoutubeMusic.svg"
                          alt="YouTube Music"
                          link="https://music.youtube.com/watch?v=3Uoou8Tp2NM&si=ieMfu_lE2QJk-zC7"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/AmazonMusic.svg"
                          alt="Amazon Music"
                          link="https://music.amazon.fr/albums/B0DGRLFL6B"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Tidal.svg"
                          alt="Tidal"
                          link="https://listen.tidal.com/album/385446483/track/385446485"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Deezer.svg"
                          alt="Deezer"
                          link="https://www.deezer.com/en/album/641878811"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Beatport.svg"
                          alt="Beatport"
                          link="https://www.beatport.com/release/grow/4731227"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Anghami.svg"
                          alt="Anghami"
                          link="https://play.anghami.com/album/1057858206?refer=believe"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Bandcamp.svg"
                          alt="Bandcamp"
                          link="https://dnbbrecords.bandcamp.com/album/grow"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Go To
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Soundcloud.svg"
                          alt="SoundCloud"
                          link="https://soundcloud.com/dnbbrecords/euqsarosa-grow"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/itunesStore.svg"
                          alt="iTunes Store"
                          link="https://music.apple.com/ae/album/grow-single/1767963358"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Download
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                      </div>
                    </div>
                  </div>,
                  document.body
                )}

              {/* Dropdown for Keeping On */}
              {release.title === "Keeping On" &&
                showKeepingOnOverlay &&
                typeof window !== "undefined" &&
                createPortal(
                  <div
                    className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg py-12 overflow-y-auto max-h-screen"
                    onClick={handleCloseOverlay}
                  >
                    <div className="fixed top-4 right-4 z-[100]">
                      <button
                        onClick={handleCloseOverlay}
                        className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
                        aria-label="Close"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div
                      className="platform-overlay-box bg-[#1a1333] rounded-2xl shadow-2xl p-0 w-full max-w-[320px] mx-auto relative flex flex-col items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Cover Art at the top */}
                      <div className="w-full flex justify-center items-center">
                        <Image
                          src={release.imageUrl}
                          alt={release.title + " cover art"}
                          width={320}
                          height={320}
                          className="rounded-xl object-contain w-full max-w-[320px] h-80"
                          style={{ maxWidth: "90vw", maxHeight: "90vw" }}
                          priority
                        />
                      </div>
                      {/* Music Title below cover art */}
                      <div
                        className="text-xl font-extrabold text-center text-white mt-4 mb-6"
                        style={{
                          letterSpacing: "0.01em",
                          margin: 4,
                          padding: 0,
                        }}
                      >
                        {release.title}
                      </div>
                      {/* Spotify Preview Embed */}
                      <div className="mb-5 mt-5 flex justify-center items-center w-full">
                        <div
                          className="spotify-embed-container group w-full max-w-[320px]"
                          style={{ borderRadius: "16px" }}
                        >
                          <iframe
                            className="spotify-embed-frame"
                            style={{
                              borderRadius: "16px",
                              border: "2px solid #a084e8",
                              width: "100%",
                              height: "96px",
                              background: "#18181b",
                              margin: 0,
                              padding: 0,
                              display: "block",
                            }}
                            src="https://open.spotify.com/embed/track/3RxWpfV6ilqc7GQSTY2IDJ?utm_source=generator"
                            width="100%"
                            height="96"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            allowFullScreen
                            title="Spotify Preview"
                          ></iframe>
                        </div>
                      </div>
                      <div className="font-semibold text-white mb-2 text-center">
                        Choose music service
                      </div>
                      <div className="flex flex-col divide-y divide-white/20 pb-0 mb-0 w-full">
                        <AnimatedDropdownBox
                          svgSrc="/Spotify.svg"
                          alt="Spotify"
                          link="https://open.spotify.com/track/3RxWpfV6ilqc7GQSTY2IDJ?si=3d174ecd1af745a7"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/YouTube.svg"
                          alt="YouTube"
                          link="https://youtu.be/XxP6uCYHL70?si=GMjDYb_Ou_bSFsca"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Watch
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Soundcloud.svg"
                          alt="SoundCloud"
                          link="https://soundcloud.com/beatalistics-records/euqsarosa-keeping-on"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Bandcamp.svg"
                          alt="Bandcamp"
                          link="https://beatalisticsrecords.bandcamp.com/track/keeping-on"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Go To
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/itunesStore.svg"
                          alt="iTunes Store"
                          link="https://music.apple.com/us/album/keeping-on/1766713846?i=1766713847"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Download
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Beatport.svg"
                          alt="Beatport"
                          link="https://www.beatport.com/release/keeping-on/4721259"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/AppleMusic.svg"
                          alt="Apple Music"
                          link="https://music.apple.com/us/album/keeping-on/1766713846?i=1766713847"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Deezer.svg"
                          alt="Deezer"
                          link="https://www.deezer.com/en/track/2980820181"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/AmazonMusic.svg"
                          alt="Amazon Music"
                          link="https://music.amazon.com/albums/B0DG5QQBK6?trackAsin=B0DG5S7LBC"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                      </div>
                    </div>
                  </div>,
                  document.body
                )}

              {/* Dropdown for Incongruency */}
              {release.title === "Incongruency" &&
                showIncongruencyOverlay &&
                typeof window !== "undefined" &&
                createPortal(
                  <div
                    className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg py-12 overflow-y-auto max-h-screen"
                    onClick={handleCloseOverlay}
                  >
                    <div className="fixed top-4 right-4 z-[100]">
                      <button
                        onClick={handleCloseOverlay}
                        className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
                        aria-label="Close"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div
                      className="platform-overlay-box bg-[#1a1333] rounded-2xl shadow-2xl p-0 w-full max-w-[320px] mx-auto relative flex flex-col items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Cover Art at the top */}
                      <div className="w-full flex justify-center items-center">
                        <Image
                          src={release.imageUrl}
                          alt={release.title + " cover art"}
                          width={320}
                          height={320}
                          className="rounded-xl object-contain w-full max-w-[320px] h-80"
                          style={{ maxWidth: "90vw", maxHeight: "90vw" }}
                          priority
                        />
                      </div>
                      {/* Music Title below cover art */}
                      <div
                        className="text-xl font-extrabold text-center text-white mt-4 mb-6"
                        style={{
                          letterSpacing: "0.01em",
                          margin: 4,
                          padding: 0,
                        }}
                      >
                        {release.title}
                      </div>
                      {/* Spotify Preview Embed */}
                      <div className="mb-5 mt-5 flex justify-center items-center w-full">
                        <div
                          className="spotify-embed-container group w-full max-w-[320px]"
                          style={{ borderRadius: "16px" }}
                        >
                          <iframe
                            className="spotify-embed-frame"
                            style={{
                              borderRadius: "16px",
                              border: "2px solid #a084e8",
                              width: "100%",
                              height: "96px",
                              background: "#18181b",
                              margin: 0,
                              padding: 0,
                              display: "block",
                            }}
                            src="https://open.spotify.com/embed/track/4xnVoqewkPXTcKYMKGPJNI?utm_source=generator"
                            width="100%"
                            height="96"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            allowFullScreen
                            title="Spotify Preview"
                          ></iframe>
                        </div>
                      </div>
                      <div className="font-semibold text-white mb-2 text-center">
                        Choose music service
                      </div>
                      <div className="flex flex-col divide-y divide-white/20 pb-0 mb-0 w-full">
                        <AnimatedDropdownBox
                          svgSrc="/Spotify.svg"
                          alt="Spotify"
                          link="https://open.spotify.com/track/4xnVoqewkPXTcKYMKGPJNI?si=6c738753830443a6"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Bandcamp.svg"
                          alt="Bandcamp"
                          link="https://lizplayrecords.bandcamp.com/track/incongruency"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Go To
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Beatport.svg"
                          alt="Beatport"
                          link="https://www.beatport.com/release/incongruency/4704042"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/AppleMusic.svg"
                          alt="Apple Music"
                          link="https://music.apple.com/us/album/incongruency-single/1764451904"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/junodownload.svg"
                          alt="JunoDownload"
                          link="https://www.junodownload.com/products/euqsarosa-incongruency/6755535-02/"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Download
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/AmazonMusic.svg"
                          alt="Amazon Music"
                          link="https://music.amazon.com/tracks/B0DF1Z81SM"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/YouTube.svg"
                          alt="YouTube"
                          link="https://youtu.be/BbU-IXzRNys?si=Kn3o0HHzq9FH32K7"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Watch
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                        <AnimatedDropdownBox
                          svgSrc="/Anghami.svg"
                          alt="Anghami"
                          link="https://play.anghami.com/album/1066129009?lf=976dbaa90b12506c7fa3288f2ba000da"
                          buttonLabel={
                            <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                              Play
                            </span>
                          }
                          buttonHoverClass="hover:bg-[#a084e8]"
                          onMusicServiceClick={handleMusicServiceClick}
                        />
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Overlay for Never Let Go / Used To - rendered at root level for fullscreen */}
      {release.title === "Never Let Go / Used To" &&
        showOverlay &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg py-12 overflow-y-auto max-h-screen"
            onClick={handleCloseOverlay}
          >
            <div className="fixed top-4 right-4 z-[100]">
              <button
                onClick={handleCloseOverlay}
                className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div
              className="platform-overlay-box bg-[#1a1333] rounded-2xl shadow-2xl p-0 w-full max-w-[320px] mx-auto relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Art at the top - match card size */}
              <div className="w-full flex justify-center items-center">
                <Image
                  src={release.imageUrl}
                  alt={release.title + " cover art"}
                  width={320}
                  height={320}
                  className="rounded-xl object-contain w-full max-w-[320px] h-80"
                  style={{ maxWidth: "90vw", maxHeight: "90vw" }}
                  priority
                />
              </div>
              {/* Music Title below cover art with extra spacing */}
              <div
                className="text-xl font-extrabold text-center text-white mt-4 mb-6"
                style={{
                  letterSpacing: "0.01em",
                  margin: 4,
                  padding: 0,
                }}
              >
                {release.title}
              </div>
              {/* Spotify Preview Embed - match Aurora spacing */}
              <div className="mb-5 mt-5 flex justify-center items-center w-full">
                <div
                  className="spotify-embed-container group w-full max-w-[320px]"
                  style={{ borderRadius: "16px" }}
                >
                  <iframe
                    className="spotify-embed-frame"
                    style={{
                      borderRadius: "16px",
                      border: "2px solid #a084e8",
                      width: "100%",
                      height: "96px",
                      background: "#18181b",
                      margin: 0,
                      padding: 0,
                      display: "block",
                    }}
                    src="https://open.spotify.com/embed/album/1bAqTRWU3QALt1F8doULon?utm_source=generator"
                    width="100%"
                    height="96"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    allowFullScreen
                    title="Spotify Preview"
                  ></iframe>
                </div>
              </div>
              <div className="font-semibold text-white mb-2 text-center">
                Choose music service
              </div>
              <div className="flex flex-col divide-y divide-white/20 pb-0 mb-0 w-full">
                {/* Buy on Sub Wavelength - in box, no icon or play button, fully interactive */}
                <a
                  href="https://sub-wavelength.com/album/3506288/never-let-go-used-to"
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={subWavelengthBoxRef}
                  className="platform-link-box relative flex items-center bg-gradient-to-r from-[#2d0a4b] via-[#3a0d5c] to-[#2d0a4b] rounded-xl shadow-md p-3 transition-colors duration-200 overflow-hidden animated-gradient-box group text-center justify-center cursor-pointer w-full"
                  style={{ letterSpacing: "0.05em" }}
                  onMouseMove={handleSubWavelengthMouseMove}
                >
                  <span className="platform-link-btn w-full px-4 py-2 rounded-lg text-white font-sans font-extrabold tracking-wide shadow transition-colors text-lg">
                    BUY ON SUB WAVELENGTH
                  </span>
                  <div className="pointer-events-none absolute inset-0 z-10 animated-gradient-overlay" />
                </a>
                {/* Spotify */}
                <AnimatedDropdownBox
                  svgSrc="/Spotify.svg"
                  alt="Spotify"
                  link="https://open.spotify.com/album/1bAqTRWU3QALt1F8doULon?si=v3MlnzzuR32IP844W8A5rA"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                {/* YouTube */}
                <AnimatedDropdownBox
                  svgSrc="/YouTube.svg"
                  alt="YouTube"
                  link="https://www.youtube.com/watch?v=zRuqVyBsQZ0&list=PL4_s4Xs2m-BR4AKIHwVLeZ7qjHG8he86F"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Watch
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                {/* Bandcamp */}
                <AnimatedDropdownBox
                  svgSrc="/Bandcamp.svg"
                  alt="Bandcamp"
                  link="https://subwavelengthrecordings.bandcamp.com/album/never-let-go-used-to"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Go To
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                {/* Beatport */}
                <AnimatedDropdownBox
                  svgSrc="/Beatport.svg"
                  alt="Beatport"
                  link="https://www.beatport.com/release/never-let-go-used-to/5101656"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                {/* JunoDownload */}
                <AnimatedDropdownBox
                  svgSrc="/junodownload.svg"
                  alt="JunoDownload"
                  link="https://www.junodownload.com/products/euqsarosa-never-let-go-used-to/7130385-02/"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Download
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Overlay for Aurora - rendered at root level for fullscreen */}
      {release.title === "Aurora" &&
        showAuroraOverlay &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg py-12 overflow-y-auto max-h-screen"
            onClick={handleCloseAuroraOverlay}
          >
            <div className="fixed top-4 right-4 z-[100]">
              <button
                onClick={handleCloseAuroraOverlay}
                className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div
              className="platform-overlay-box bg-[#1a1333] rounded-2xl shadow-2xl p-0 w-full max-w-[320px] mx-auto relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Art at the top */}
              <div className="w-full flex justify-center items-center">
                <Image
                  src={release.imageUrl}
                  alt={release.title + " cover art"}
                  width={320}
                  height={320}
                  className="rounded-xl object-contain w-full max-w-[320px] h-80"
                  style={{ maxWidth: "90vw", maxHeight: "90vw" }}
                  priority
                />
              </div>
              {/* Music Title below cover art */}
              <div
                className="text-xl font-extrabold text-center text-white mt-4 mb-6"
                style={{
                  letterSpacing: "0.01em",
                  margin: 4,
                  padding: 0,
                }}
              >
                {release.title}
              </div>
              {/* Spotify Preview Embed */}
              <div className="mb-5 mt-5 flex justify-center items-center w-full">
                <div
                  className="spotify-embed-container group w-full max-w-[320px]"
                  style={{ borderRadius: "16px" }}
                >
                  <iframe
                    className="spotify-embed-frame"
                    style={{
                      borderRadius: "16px",
                      border: "2px solid #a084e8",
                      width: "100%",
                      height: "96px",
                      background: "#18181b",
                      margin: 0,
                      padding: 0,
                      display: "block",
                    }}
                    src="https://open.spotify.com/embed/track/1tdu2HljUSbkDYTkTlZVC9?utm_source=generator"
                    width="100%"
                    height="96"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    allowFullScreen
                    title="Spotify Preview"
                  ></iframe>
                </div>
              </div>
              <div className="font-semibold text-white mb-2 text-center">
                Choose music service
              </div>
              <div className="flex flex-col divide-y divide-white/20 pb-0 mb-0 w-full">
                {/* Platform links, use same buttonLabel style as overlay */}
                <AnimatedDropdownBox
                  svgSrc="/Spotify.svg"
                  alt="Spotify"
                  link="https://open.spotify.com/album/4exvuPpkjAyzQXHa2sSasH?go=1&nd=1&dlsi=506c1a2743f84f0a"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/AppleMusic.svg"
                  alt="Apple Music"
                  link="https://music.apple.com/gb/song/aurora/1802621118"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/YouTube.svg"
                  alt="YouTube"
                  link="https://www.youtube.com/watch?v=_tm1V6L6ZKw"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Watch
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Bandcamp.svg"
                  alt="Bandcamp"
                  link="https://flightpattern.bandcamp.com/album/arrivals-vol-8"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Go To
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/junodownload.svg"
                  alt="JunoDownload"
                  link="https://www.junodownload.com/products/euqsarosa-mac-v-tim-cant-arrivals-vol-8/7039671-02/"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Download
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Beatport.svg"
                  alt="Beatport"
                  link="https://www.beatport.com/release/arrivals-vol-8/4993670"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Soundcloud.svg"
                  alt="SoundCloud"
                  link="https://soundcloud.com/flight-pattern-records/sets/arrivals-vol-8"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Tidal.svg"
                  alt="Tidal"
                  link="https://tidal.com/album/424419881"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Deezer.svg"
                  alt="Deezer"
                  link="https://www.deezer.com/us/album/728705471?app_id=140685"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Qobuz.svg"
                  alt="Qobuz"
                  link="https://www.qobuz.com/us-en/album/arrivals-vol-8-various-artists/ge4z162j49dbc?lf=976dbaa90b12506c7fa3288f2ba000da"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Anghami.svg"
                  alt="Anghami"
                  link="https://play.anghami.com/album/1066129009?lf=976dbaa90b12506c7fa3288f2ba000da"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Overlay for In Your Eyes - rendered at root level for fullscreen */}
      {release.title === "In Your Eyes" &&
        showEyesOverlay &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg py-12 overflow-y-auto max-h-screen"
            onClick={handleCloseOverlay}
          >
            <div className="fixed top-4 right-4 z-[100]">
              <button
                onClick={handleCloseOverlay}
                className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div
              className="platform-overlay-box bg-[#1a1333] rounded-2xl shadow-2xl p-0 w-full max-w-[320px] mx-auto relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Art at the top */}
              <div className="w-full flex justify-center items-center">
                <Image
                  src={release.imageUrl}
                  alt={release.title + " cover art"}
                  width={320}
                  height={320}
                  className="rounded-xl object-contain w-full max-w-[320px] h-80"
                  style={{ maxWidth: "90vw", maxHeight: "90vw" }}
                  priority
                />
              </div>
              {/* Music Title below cover art */}
              <div
                className="text-xl font-extrabold text-center text-white mt-4 mb-6"
                style={{
                  letterSpacing: "0.01em",
                  margin: 4,
                  padding: 0,
                }}
              >
                {release.title}
              </div>
              {/* Spotify Preview Embed */}
              <div className="mb-5 mt-5 flex justify-center items-center w-full">
                <div
                  className="spotify-embed-container group w-full max-w-[320px]"
                  style={{ borderRadius: "16px" }}
                >
                  <iframe
                    className="spotify-embed-frame"
                    style={{
                      borderRadius: "16px",
                      border: "2px solid #a084e8",
                      width: "100%",
                      height: "96px",
                      background: "#18181b",
                      margin: 0,
                      padding: 0,
                      display: "block",
                    }}
                    src="https://open.spotify.com/embed/track/0SCoNAciqsTEKWpHiSfYVk?utm_source=generator"
                    width="100%"
                    height="96"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    allowFullScreen
                    title="Spotify Preview"
                  ></iframe>
                </div>
              </div>
              <div className="font-semibold text-white mb-2 text-center">
                Choose music service
              </div>
              <div className="flex flex-col divide-y divide-white/20 pb-0 mb-0 w-full">
                <AnimatedDropdownBox
                  svgSrc="/Spotify.svg"
                  alt="Spotify"
                  link="https://open.spotify.com/track/0SCoNAciqsTEKWpHiSfYVk?si=82e8f9fc2079489c"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/YouTube.svg"
                  alt="YouTube"
                  link="https://youtu.be/wV0v1IWZ4t0?si=DCzOBC7zmZDBAV8D"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Watch
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/YoutubeMusic.svg"
                  alt="YouTube Music"
                  link="https://music.youtube.com/watch?v=5nAl6yfc5CY"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Bandcamp.svg"
                  alt="Bandcamp"
                  link="https://dialectaudio.bandcamp.com/track/dialective-euqsarosa-in-your-eyes"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Go To
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Beatport.svg"
                  alt="Beatport"
                  link="https://www.beatport.com/track/in-your-eyes-feat-dialective/18414572"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Soundcloud.svg"
                  alt="SoundCloud"
                  link="https://soundcloud.com/liquiddnbftws/dialective-euqsarosa-open-your-eyes?si=c329ba9a40c8433f9415724303f6222e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/AppleMusic.svg"
                  alt="Apple Music"
                  link="https://music.apple.com/ae/song/in-your-eyes-feat-dialective/1718743426"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/junodownload.svg"
                  alt="JunoDownload"
                  link="https://www.junodownload.com/products/liquid-selections-i/6411214-02/"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Download
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/itunesStore.svg"
                  alt="iTunes Store"
                  link="https://music.apple.com/ae/song/in-your-eyes-feat-dialective/1718743426"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Download
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/AmazonMusic.svg"
                  alt="Amazon Music"
                  link="https://music.amazon.com/tracks/B0CP44LGT2?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_ERCrjWIVIqyvmExWqcryPMKx5"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Tidal.svg"
                  alt="Tidal"
                  link="https://tidal.com/album/331634282"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Overlay for Grow - rendered at root level for fullscreen */}
      {release.title === "Grow" &&
        showGrowOverlay &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg py-12 overflow-y-auto max-h-screen"
            onClick={handleCloseOverlay}
          >
            <div className="fixed top-4 right-4 z-[100]">
              <button
                onClick={handleCloseOverlay}
                className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div
              className="platform-overlay-box bg-[#1a1333] rounded-2xl shadow-2xl p-0 w-full max-w-[320px] mx-auto relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Art at the top */}
              <div className="w-full flex justify-center items-center">
                <Image
                  src={release.imageUrl}
                  alt={release.title + " cover art"}
                  width={320}
                  height={320}
                  className="rounded-xl object-contain w-full max-w-[320px] h-80"
                  style={{ maxWidth: "90vw", maxHeight: "90vw" }}
                  priority
                />
              </div>
              {/* Music Title below cover art */}
              <div
                className="text-xl font-extrabold text-center text-white mt-4 mb-6"
                style={{
                  letterSpacing: "0.01em",
                  margin: 4,
                  padding: 0,
                }}
              >
                {release.title}
              </div>
              {/* Spotify Preview Embed */}
              <div className="mb-5 mt-5 flex justify-center items-center w-full">
                <div
                  className="spotify-embed-container group w-full max-w-[320px]"
                  style={{ borderRadius: "16px" }}
                >
                  <iframe
                    className="spotify-embed-frame"
                    style={{
                      borderRadius: "16px",
                      border: "2px solid #a084e8",
                      width: "100%",
                      height: "96px",
                      background: "#18181b",
                      margin: 0,
                      padding: 0,
                      display: "block",
                    }}
                    src="https://open.spotify.com/embed/track/12iUl8zcG0fZlbxcIOMM0u?utm_source=generator"
                    width="100%"
                    height="96"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    allowFullScreen
                    title="Spotify Preview"
                  ></iframe>
                </div>
              </div>
              <div className="font-semibold text-white mb-2 text-center">
                Choose music service
              </div>
              <div className="flex flex-col divide-y divide-white/20 pb-0 mb-0 w-full">
                <AnimatedDropdownBox
                  svgSrc="/Spotify.svg"
                  alt="Spotify"
                  link="https://open.spotify.com/track/12iUl8zcG0fZlbxcIOMM0u?si=1181d59ecf744eb3"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/AppleMusic.svg"
                  alt="Apple Music"
                  link="https://music.apple.com/ae/album/grow-single/1767963358"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/YouTube.svg"
                  alt="YouTube"
                  link="https://www.youtube.com/watch?v=2ZdGuNoNQDI"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Watch
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/YoutubeMusic.svg"
                  alt="YouTube Music"
                  link="https://music.youtube.com/watch?v=3Uoou8Tp2NM&si=ieMfu_lE2QJk-zC7"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/AmazonMusic.svg"
                  alt="Amazon Music"
                  link="https://music.amazon.fr/albums/B0DGRLFL6B"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Tidal.svg"
                  alt="Tidal"
                  link="https://listen.tidal.com/album/385446483/track/385446485"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Deezer.svg"
                  alt="Deezer"
                  link="https://www.deezer.com/en/album/641878811"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Beatport.svg"
                  alt="Beatport"
                  link="https://www.beatport.com/release/grow/4731227"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Anghami.svg"
                  alt="Anghami"
                  link="https://play.anghami.com/album/1057858206?refer=believe"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Bandcamp.svg"
                  alt="Bandcamp"
                  link="https://dnbbrecords.bandcamp.com/album/grow"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Go To
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Soundcloud.svg"
                  alt="SoundCloud"
                  link="https://soundcloud.com/dnbbrecords/euqsarosa-grow"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/itunesStore.svg"
                  alt="iTunes Store"
                  link="https://music.apple.com/ae/album/grow-single/1767963358"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Download
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Overlay for Keeping On - rendered at root level for fullscreen */}
      {release.title === "Keeping On" &&
        showKeepingOnOverlay &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg py-12 overflow-y-auto max-h-screen"
            onClick={handleCloseOverlay}
          >
            <div className="fixed top-4 right-4 z-[100]">
              <button
                onClick={handleCloseOverlay}
                className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div
              className="platform-overlay-box bg-[#1a1333] rounded-2xl shadow-2xl p-0 w-full max-w-[320px] mx-auto relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Art at the top */}
              <div className="w-full flex justify-center items-center">
                <Image
                  src={release.imageUrl}
                  alt={release.title + " cover art"}
                  width={320}
                  height={320}
                  className="rounded-xl object-contain w-full max-w-[320px] h-80"
                  style={{ maxWidth: "90vw", maxHeight: "90vw" }}
                  priority
                />
              </div>
              {/* Music Title below cover art */}
              <div
                className="text-xl font-extrabold text-center text-white mt-4 mb-6"
                style={{
                  letterSpacing: "0.01em",
                  margin: 4,
                  padding: 0,
                }}
              >
                {release.title}
              </div>
              {/* Spotify Preview Embed */}
              <div className="mb-5 mt-5 flex justify-center items-center w-full">
                <div
                  className="spotify-embed-container group w-full max-w-[320px]"
                  style={{ borderRadius: "16px" }}
                >
                  <iframe
                    className="spotify-embed-frame"
                    style={{
                      borderRadius: "16px",
                      border: "2px solid #a084e8",
                      width: "100%",
                      height: "96px",
                      background: "#18181b",
                      margin: 0,
                      padding: 0,
                      display: "block",
                    }}
                    src="https://open.spotify.com/embed/track/3RxWpfV6ilqc7GQSTY2IDJ?utm_source=generator"
                    width="100%"
                    height="96"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    allowFullScreen
                    title="Spotify Preview"
                  ></iframe>
                </div>
              </div>
              <div className="font-semibold text-white mb-2 text-center">
                Choose music service
              </div>
              <div className="flex flex-col divide-y divide-white/20 pb-0 mb-0 w-full">
                <AnimatedDropdownBox
                  svgSrc="/Spotify.svg"
                  alt="Spotify"
                  link="https://open.spotify.com/track/3RxWpfV6ilqc7GQSTY2IDJ?si=3d174ecd1af745a7"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/YouTube.svg"
                  alt="YouTube"
                  link="https://youtu.be/XxP6uCYHL70?si=GMjDYb_Ou_bSFsca"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Watch
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Soundcloud.svg"
                  alt="SoundCloud"
                  link="https://soundcloud.com/beatalistics-records/euqsarosa-keeping-on"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Bandcamp.svg"
                  alt="Bandcamp"
                  link="https://beatalisticsrecords.bandcamp.com/track/keeping-on"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Go To
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/itunesStore.svg"
                  alt="iTunes Store"
                  link="https://music.apple.com/us/album/keeping-on/1766713846?i=1766713847"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Download
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Beatport.svg"
                  alt="Beatport"
                  link="https://www.beatport.com/release/keeping-on/4721259"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/AppleMusic.svg"
                  alt="Apple Music"
                  link="https://music.apple.com/us/album/keeping-on/1766713846?i=1766713847"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Deezer.svg"
                  alt="Deezer"
                  link="https://www.deezer.com/en/track/2980820181"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/AmazonMusic.svg"
                  alt="Amazon Music"
                  link="https://music.amazon.com/albums/B0DG5QQBK6?trackAsin=B0DG5S7LBC"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Overlay for Incongruency - rendered at root level for fullscreen */}
      {release.title === "Incongruency" &&
        showIncongruencyOverlay &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg py-12 overflow-y-auto max-h-screen"
            onClick={handleCloseOverlay}
          >
            <div className="fixed top-4 right-4 z-[100]">
              <button
                onClick={handleCloseOverlay}
                className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div
              className="platform-overlay-box bg-[#1a1333] rounded-2xl shadow-2xl p-0 w-full max-w-[320px] mx-auto relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Art at the top */}
              <div className="w-full flex justify-center items-center">
                <Image
                  src={release.imageUrl}
                  alt={release.title + " cover art"}
                  width={320}
                  height={320}
                  className="rounded-xl object-contain w-full max-w-[320px] h-80"
                  style={{ maxWidth: "90vw", maxHeight: "90vw" }}
                  priority
                />
              </div>
              {/* Music Title below cover art */}
              <div
                className="text-xl font-extrabold text-center text-white mt-4 mb-6"
                style={{
                  letterSpacing: "0.01em",
                  margin: 4,
                  padding: 0,
                }}
              >
                {release.title}
              </div>
              {/* Spotify Preview Embed */}
              <div className="mb-5 mt-5 flex justify-center items-center w-full">
                <div
                  className="spotify-embed-container group w-full max-w-[320px]"
                  style={{ borderRadius: "16px" }}
                >
                  <iframe
                    className="spotify-embed-frame"
                    style={{
                      borderRadius: "16px",
                      border: "2px solid #a084e8",
                      width: "100%",
                      height: "96px",
                      background: "#18181b",
                      margin: 0,
                      padding: 0,
                      display: "block",
                    }}
                    src="https://open.spotify.com/embed/track/4xnVoqewkPXTcKYMKGPJNI?utm_source=generator"
                    width="100%"
                    height="96"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    allowFullScreen
                    title="Spotify Preview"
                  ></iframe>
                </div>
              </div>
              <div className="font-semibold text-white mb-2 text-center">
                Choose music service
              </div>
              <div className="flex flex-col divide-y divide-white/20 pb-0 mb-0 w-full">
                <AnimatedDropdownBox
                  svgSrc="/Spotify.svg"
                  alt="Spotify"
                  link="https://open.spotify.com/track/4xnVoqewkPXTcKYMKGPJNI?si=6c738753830443a6"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Bandcamp.svg"
                  alt="Bandcamp"
                  link="https://lizplayrecords.bandcamp.com/track/incongruency"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Go To
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Beatport.svg"
                  alt="Beatport"
                  link="https://www.beatport.com/release/incongruency/4704042"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/AppleMusic.svg"
                  alt="Apple Music"
                  link="https://music.apple.com/us/album/incongruency-single/1764451904"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/junodownload.svg"
                  alt="JunoDownload"
                  link="https://www.junodownload.com/products/euqsarosa-incongruency/6755535-02/"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Download
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/AmazonMusic.svg"
                  alt="Amazon Music"
                  link="https://music.amazon.com/tracks/B0DF1Z81SM"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/YouTube.svg"
                  alt="YouTube"
                  link="https://youtu.be/BbU-IXzRNys?si=Kn3o0HHzq9FH32K7"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Watch
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
                <AnimatedDropdownBox
                  svgSrc="/Anghami.svg"
                  alt="Anghami"
                  link="https://play.anghami.com/album/1066129009?lf=976dbaa90b12506c7fa3288f2ba000da"
                  buttonLabel={
                    <span className="text-white text-sm font-extrabold min-w-[80px] w-20 text-center inline-block py-1">
                      Play
                    </span>
                  }
                  buttonHoverClass="hover:bg-[#a084e8]"
                  onMusicServiceClick={handleMusicServiceClick}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
