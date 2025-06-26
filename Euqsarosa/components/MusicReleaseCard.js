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
  const subWavelengthBoxRef = useRef(null);
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
              open: { opacity: 1, height: "auto", y: 0 },
              collapsed: { opacity: 0, height: 0, y: -24 },
            }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* Dropdown for Aurora */}
            {release.title === "Aurora" && (
              <div className="mb-4">
                {/* Spotify Preview Embed - compact, interactive */}
                <div className="mb-2 flex justify-center items-center">
                  <div
                    className="spotify-embed-container group"
                    style={{ width: "95%", borderRadius: "16px" }}
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
                <div className="flex flex-col gap-3">
                  {/* Spotify */}
                  <AnimatedDropdownBox
                    svgSrc="/Spotify.svg"
                    alt="Spotify"
                    link="https://open.spotify.com/album/4exvuPpkjAyzQXHa2sSasH?go=1&nd=1&dlsi=506c1a2743f84f0a"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Apple Music */}
                  <AnimatedDropdownBox
                    svgSrc="/AppleMusic.svg"
                    alt="Apple Music"
                    link="https://music.apple.com/gb/song/aurora/1802621118"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://www.youtube.com/watch?v=_tm1V6L6ZKw"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Watch
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Bandcamp (Go to) */}
                  <AnimatedDropdownBox
                    svgSrc="/Bandcamp.svg"
                    alt="Bandcamp"
                    link="https://flightpattern.bandcamp.com/album/arrivals-vol-8"
                    buttonLabel="Go To"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* JunoDownload (Download) */}
                  <AnimatedDropdownBox
                    svgSrc="/junodownload.svg"
                    alt="JunoDownload"
                    link="https://www.junodownload.com/products/euqsarosa-mac-v-tim-cant-arrivals-vol-8/7039671-02/"
                    buttonLabel="Download"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Beatport */}
                  <AnimatedDropdownBox
                    svgSrc="/Beatport.svg"
                    alt="Beatport"
                    link="https://www.beatport.com/release/arrivals-vol-8/4993670"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* SoundCloud */}
                  <AnimatedDropdownBox
                    svgSrc="/Soundcloud.svg"
                    alt="SoundCloud"
                    link="https://soundcloud.com/flight-pattern-records/sets/arrivals-vol-8"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Tidal */}
                  <AnimatedDropdownBox
                    svgSrc="/Tidal.svg"
                    alt="Tidal"
                    link="https://tidal.com/album/424419881"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Deezer */}
                  <AnimatedDropdownBox
                    svgSrc="/Deezer.svg"
                    alt="Deezer"
                    link="https://www.deezer.com/us/album/728705471?app_id=140685"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Qobuz (placeholder) */}
                  <AnimatedDropdownBox
                    svgSrc="/Qobuz.svg"
                    alt="Qobuz"
                    link="https://www.qobuz.com/us-en/album/arrivals-vol-8-various-artists/ge4z162j49dbc?lf=976dbaa90b12506c7fa3288f2ba000da"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Anghami (custom logo) */}
                  <AnimatedDropdownBox
                    svgSrc="/Anghami.svg"
                    alt="Anghami"
                    link="https://play.anghami.com/album/1066129009?lf=976dbaa90b12506c7fa3288f2ba000da"
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
                {/* Spotify Preview Embed - compact, interactive */}
                <div className="mb-2 flex justify-center items-center">
                  <div
                    className="spotify-embed-container group"
                    style={{ width: "95%", borderRadius: "16px" }}
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
                <div className="flex flex-col gap-3">
                  {/* Spotify */}
                  <AnimatedDropdownBox
                    svgSrc="/Spotify.svg"
                    alt="Spotify"
                    link="https://open.spotify.com/track/0SCoNAciqsTEKWpHiSfYVk?si=82e8f9fc2079489c"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
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
                    buttonLabel="Download"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* iTunes Store */}
                  <AnimatedDropdownBox
                    svgSrc="/itunesStore.svg"
                    alt="iTunes Store"
                    link="https://music.apple.com/ae/song/in-your-eyes-feat-dialective/1718743426"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
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
                    link="https://tidal.com/browse/track/331634289?u"
                    buttonLabel="Play"
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                </div>
              </div>
            )}

            {/* Dropdown for Never Let Go / Used To */}
            {release.title === "Never Let Go / Used To" && (
              <div className="mb-4">
                {/* Spotify Preview Embed - compact, interactive */}
                <div className="mb-2 flex justify-center items-center">
                  <div
                    className="spotify-embed-container group"
                    style={{ width: "95%", borderRadius: "16px" }}
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
                <div className="flex flex-col gap-3">
                  {/* Buy on Sub Wavelength - in box, no icon or play button, fully interactive */}
                  <a
                    href="https://sub-wavelength.com/album/3506288/never-let-go-used-to"
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={subWavelengthBoxRef}
                    className="relative flex items-center bg-gradient-to-r from-[#2d0a4b] via-[#3a0d5c] to-[#2d0a4b] rounded-xl shadow-md p-3 transition-all duration-200 overflow-hidden animated-gradient-box group text-center justify-center cursor-pointer"
                    style={{ letterSpacing: "0.05em" }}
                    onMouseMove={handleSubWavelengthMouseMove}
                  >
                    <span className="w-full px-4 py-2 rounded-lg text-white font-sans font-extrabold tracking-wide shadow transition-colors text-lg">
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
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
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
                      <span className="text-white text-base font-extrabold">
                        Download
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                </div>
              </div>
            )}

            {/* Dropdown for Grow */}
            {release.title === "Grow" && (
              <div className="mb-4">
                {/* Spotify Preview Embed - compact, interactive */}
                <div className="mb-2 flex justify-center items-center">
                  <div
                    className="spotify-embed-container group"
                    style={{ width: "95%", borderRadius: "16px" }}
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
                <div className="flex flex-col gap-3">
                  {/* Spotify */}
                  <AnimatedDropdownBox
                    svgSrc="/Spotify.svg"
                    alt="Spotify"
                    link="https://open.spotify.com/track/12iUl8zcG0fZlbxcIOMM0u?si=1181d59ecf744eb3"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://music.apple.com/ae/album/grow-single/1767963358"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://www.youtube.com/watch?v=2ZdGuNoNQDI"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://music.youtube.com/watch?v=3Uoou8Tp2NM&si=ieMfu_lE2QJk-zC7"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Play
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Amazon Music */}
                  <AnimatedDropdownBox
                    svgSrc="/AmazonMusic.svg"
                    alt="Amazon Music"
                    link="https://music.amazon.fr/albums/B0DGRLFL6B"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://tidal.com/browse/track/404050903"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Play
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Deezer */}
                  <AnimatedDropdownBox
                    svgSrc="/Deezer.svg"
                    alt="Deezer"
                    link="https://www.deezer.com/en/album/641878811"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Play
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Beatport */}
                  <AnimatedDropdownBox
                    svgSrc="/Beatport.svg"
                    alt="Beatport"
                    link="https://www.beatport.com/release/grow/4731227"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Play
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Anghami */}
                  <AnimatedDropdownBox
                    svgSrc="/Anghami.svg"
                    alt="Anghami"
                    link="https://play.anghami.com/album/1057858206?refer=believe"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://dnbbrecords.bandcamp.com/album/grow"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Go To
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* SoundCloud */}
                  <AnimatedDropdownBox
                    svgSrc="/Soundcloud.svg"
                    alt="SoundCloud"
                    link="https://soundcloud.com/dnbbrecords/euqsarosa-grow"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Play
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* iTunes Store */}
                  <AnimatedDropdownBox
                    svgSrc="/itunesStore.svg"
                    alt="iTunes Store"
                    link="https://music.apple.com/ae/album/grow-single/1767963358"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Download
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                </div>
              </div>
            )}

            {/* Dropdown for Keeping On */}
            {release.title === "Keeping On" && (
              <div className="mb-4">
                {/* Spotify Preview Embed - compact, interactive */}
                <div className="mb-2 flex justify-center items-center">
                  <div
                    className="spotify-embed-container group"
                    style={{ width: "95%", borderRadius: "16px" }}
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
                <div className="flex flex-col gap-3">
                  {/* Spotify */}
                  <AnimatedDropdownBox
                    svgSrc="/Spotify.svg"
                    alt="Spotify"
                    link="https://open.spotify.com/track/3RxWpfV6ilqc7GQSTY2IDJ?si=3d174ecd1af745a7"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://youtu.be/XxP6uCYHL70?si=GMjDYb_Ou_bSFsca"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Watch
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* SoundCloud */}
                  <AnimatedDropdownBox
                    svgSrc="/Soundcloud.svg"
                    alt="SoundCloud"
                    link="https://soundcloud.com/beatalistics-records/euqsarosa-keeping-on"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://beatalisticsrecords.bandcamp.com/track/keeping-on"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Go To
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* iTunes Store */}
                  <AnimatedDropdownBox
                    svgSrc="/itunesStore.svg"
                    alt="iTunes Store"
                    link="https://music.apple.com/us/album/keeping-on/1766713846?i=1766713847"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Download
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Beatport */}
                  <AnimatedDropdownBox
                    svgSrc="/Beatport.svg"
                    alt="Beatport"
                    link="https://www.beatport.com/release/keeping-on/4721259"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://music.apple.com/us/album/keeping-on/1766713846?i=1766713847"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Play
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Deezer */}
                  <AnimatedDropdownBox
                    svgSrc="/Deezer.svg"
                    alt="Deezer"
                    link="https://www.deezer.com/en/track/2980820181"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Play
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                  {/* Amazon Music */}
                  <AnimatedDropdownBox
                    svgSrc="/AmazonMusic.svg"
                    alt="Amazon Music"
                    link="https://music.amazon.com/albums/B0DG5QQBK6?trackAsin=B0DG5S7LBC"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://listen.tidal.com/album/385446483/track/385446485"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://www.junodownload.com/products/euqsarosa-keeping-on/6771904-02/"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Download
                      </span>
                    }
                    buttonHoverClass="hover:bg-[#a084e8]"
                    onMusicServiceClick={handleMusicServiceClick}
                  />
                </div>
              </div>
            )}

            {/* Dropdown for Incongruency */}
            {release.title === "Incongruency" && (
              <div className="mb-4">
                {/* Spotify Preview Embed - compact, interactive */}
                <div className="mb-2 flex justify-center items-center">
                  <div
                    className="spotify-embed-container group"
                    style={{ width: "95%", borderRadius: "16px" }}
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
                <div className="flex flex-col gap-3">
                  {/* Spotify */}
                  <AnimatedDropdownBox
                    svgSrc="/Spotify.svg"
                    alt="Spotify"
                    link="https://open.spotify.com/track/4xnVoqewkPXTcKYMKGPJNI?si=6c738753830443a6"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://lizplayrecords.bandcamp.com/track/incongruency"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://www.beatport.com/release/incongruency/4704042"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://music.apple.com/us/album/incongruency-single/1764451904"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://www.junodownload.com/products/euqsarosa-incongruency/6755535-02/"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://music.amazon.com/tracks/B0DF1Z81SM"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
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
                    link="https://youtu.be/BbU-IXzRNys?si=Kn3o0HHzq9FH32K7"
                    buttonLabel={
                      <span className="text-white text-base font-extrabold">
                        Watch
                      </span>
                    }
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
