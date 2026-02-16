"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Instagram, Linkedin, Mail, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Suspense } from "react";
// import { useWindSfx } from "../hooks/use-wind-sfx"; // Removed
import Navbar from "@/components/Navbar";

// Mock Data for Projects
// Mock Data for Projects
const projectsData = [
  { id: 100, title: "Loft A", category: "Residencial", year: "2021", src: "/loft-a-cover.png" },
  { id: 200, title: "Casa Arcos", category: "Residencial", year: "2024", src: "/casa-arcos/main.png" },
  { id: 300, title: "Quarta Esquina", category: "Comercial", year: "2023", src: "/quarta-esquina/main-v2.png" },
];



const LOFT_A_IMAGES = [
  "/loft-a-cover.png?v=2",
  "/loft-a-view2.png?v=3",
  "/loft-a-view3-v3.png?v=2",
  "/loft-a-plan.png?v=2",
  "/loft-a-section.png?v=2"
];

const CASA_ARCOS_IMAGES = [
  "/casa-arcos/main.png",
  "/casa-arcos/view2.png",
  "/casa-arcos/view3.png",
  "/casa-arcos/view4.png",
  "/casa-arcos/view5.png",
  "/casa-arcos/planta.png",
  "/casa-arcos/fachada.png"
];

const QUARTA_ESQUINA_IMAGES = [
  "/quarta-esquina/main-v2.png",
  "/quarta-esquina/view2.png",
  "/quarta-esquina/implantacao.png",
  "/quarta-esquina/corte.png",
  "/quarta-esquina/elevacao-oeste.png",
  "/quarta-esquina/planta-inferior.png"
];

export default function Home() {
  const router = useRouter();
  const [currentView, setCurrentViewInternal] = useState("hero");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const isDraggingRef = useRef(false);


  // Custom History Management
  const setCurrentView = (view: string) => {
    setCurrentViewInternal(view);
    const url = new URL(window.location.href);
    url.searchParams.set("view", view);
    window.history.pushState({ view }, "", url.toString());
  };

  useEffect(() => {
    // 1. Initial Load: Read URL param
    const params = new URLSearchParams(window.location.search);
    const initialView = params.get("view");
    if (initialView) {
      setCurrentViewInternal(initialView);
    } else {
      // Set default history state if none
      window.history.replaceState({ view: "hero" }, "", window.location.href);
    }

    // 2. Handle Back Button (PopState)
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentViewInternal(event.state.view);
      } else {
        setCurrentViewInternal("hero");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const overlayRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]); // To track floating elements for shadow
  const [isDark, setIsDark] = useState(false); // Default to White (Light Mode), Dark Mode on Standby
  const [isHovering, setIsHovering] = useState(false); // Cursor scaling state
  const [hasLeftHero, setHasLeftHero] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [clickVideoPlaying, setClickVideoPlaying] = useState(false);
  const [isReturningVisit, setIsReturningVisit] = useState(false);

  useEffect(() => {
    if (currentView !== "hero") {
      setHasLeftHero(true);
      setVideoFinished(false);
      setClickVideoPlaying(false);
    }
    // Close any open project when changing views
    setSelectedProject(null);
  }, [currentView]);

  // Lightbox Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;

      if (e.key === "Escape") {
        setLightboxImage(null);
      } else {
        const currentGallery = LOFT_A_IMAGES.includes(lightboxImage) ? LOFT_A_IMAGES : (CASA_ARCOS_IMAGES.includes(lightboxImage) ? CASA_ARCOS_IMAGES : (QUARTA_ESQUINA_IMAGES.includes(lightboxImage) ? QUARTA_ESQUINA_IMAGES : []));
        if (currentGallery.length === 0) return;

        if (e.key === "ArrowLeft") {
          const currentIndex = currentGallery.indexOf(lightboxImage);
          const prevIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
          setLightboxImage(currentGallery[prevIndex]);
        } else if (e.key === "ArrowRight") {
          const currentIndex = currentGallery.indexOf(lightboxImage);
          const nextIndex = (currentIndex + 1) % currentGallery.length;
          setLightboxImage(currentGallery[nextIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  // Listen for Navbar view changes
  useEffect(() => {
    const handleViewChange = (e: any) => {
      if (e.detail) {
        setCurrentViewInternal(e.detail);
        setSelectedProject(null); // Close any open project overlay
      }
    };
    window.addEventListener("viewChange", handleViewChange);
    return () => window.removeEventListener("viewChange", handleViewChange);
  }, []);

  // Handle returning from separate pages (Arquitetura, Visualização, etc.)
  useEffect(() => {
    const wasInSite = sessionStorage.getItem("wasInSite");
    if (wasInSite) {
      setIsReturningVisit(true);
      if (!hasLeftHero && currentView === "hero") {
        setHasLeftHero(true);
        setVideoFinished(false);
      }
    }
    // Mark that the user has visited the site in this session
    sessionStorage.setItem("wasInSite", "true");
  }, [currentView, hasLeftHero]);

  // Sound Effects
  // Sound Effects usage removed
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);

  // Handlers for hover effect
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  useEffect(() => {
    // Immediate reset: Clear effects if not in Dark Hero mode
    if (!isDark || currentView !== "hero") {
      if (overlayRef.current) overlayRef.current.style.opacity = "0";
      elementsRef.current.forEach(el => {
        if (el) {
          el.style.textShadow = "none";
          el.style.boxShadow = "none";
          el.style.filter = "none";
          el.style.opacity = "1";
        }
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Define Attractor Points
      // Get dynamic center of the logo if possible
      let logoX = w * 0.5;
      let logoY = h * 0.5;
      if (elementsRef.current[5]) {
        const rect = elementsRef.current[5].getBoundingClientRect();
        logoX = rect.left + rect.width / 2;
        logoY = rect.top + rect.height / 2;
      }

      const targets = [
        { x: logoX, y: logoY },                  // Center Logo (Index 0) - Dynamic
        { x: 130, y: 60 },                       // Top Left Logo
        { x: w * 0.15 + 80, y: h * 0.40 + 20 },  // Sobre (Left)
        { x: w * 0.85 - 80, y: h * 0.35 + 20 },  // Projetos (Right)
        { x: w - 130, y: 60 },                   // Client Area (Top Right)
        { x: w * 0.605, y: h * 0.81 },           // Bottom Square (Sq3) - Index 5
      ];

      // Find closest target and its index to determine type
      let closestTarget = targets[0];
      let minDist = Infinity;
      let targetIndex = 0;

      targets.forEach((target, index) => {
        const dist = Math.sqrt(Math.pow(clientX - target.x, 2) + Math.pow(clientY - target.y, 2));
        if (dist < minDist) {
          minDist = dist;
          closestTarget = target;
          targetIndex = index;
        }
      });

      // Calculate Expansion Radius & Intensity (Flashlight Effect)
      const threshold = 450;

      // Define Max Radius based on target type
      // Index 0 is Central Logo -> 2x larger (1200px)
      // Index 5 is Bottom Square -> 10x smaller (60px)
      // Others are normal buttons -> 10x button size (approx 600px)
      const baseMaxRadius = 375;
      let maxRadius = baseMaxRadius;
      if (targetIndex === 0) maxRadius = baseMaxRadius * 1.65;
      else if (targetIndex === 5) maxRadius = baseMaxRadius * 0.38;

      let radius = 0;
      let opacity = 0;

      const isFlashlightActive = isDark && currentView === "hero";

      if (isFlashlightActive && minDist < threshold && targetIndex === 0) {
        const progress = (threshold - minDist) / threshold;

        // Radius expansion: nonlinear
        radius = Math.pow(progress, 2.5) * maxRadius;

        // Intensity: Fades in
        opacity = Math.min(progress * 1.5, 1);
      }

      // Update Overlay Style
      if (overlayRef.current) {
        overlayRef.current.style.width = `${radius * 2}px`;
        overlayRef.current.style.height = `${radius * 2}px`;
        overlayRef.current.style.top = `${clientY}px`;
        overlayRef.current.style.left = `${clientX}px`;
        overlayRef.current.style.transform = "translate(-50%, -50%)";

        // Opacity manages the "intensify" effect
        overlayRef.current.style.opacity = opacity.toFixed(2);
      }

      // Calculate Shadows & Opacity for Floating Elements
      const elementPositions = [
        { x: w * 0.18, y: h * 0.42 }, // 0: Sobre
        { x: w * 0.82, y: h * 0.37 }, // 1: Projetos
        { x: w * 0.125, y: h * 0.46 }, // 2: Sq1
        { x: w * 0.875, y: h * 0.41 }, // 3: Sq2
        { x: w * 0.605, y: h * 0.81 }, // 4: Sq3
        { x: w * 0.5, y: h * 0.5 },    // 5: Central Logo (Always Lit)
        { x: 130, y: 60 },             // 6: Top Left Logo
        { x: w - 130, y: 60 },         // 7: Client Area
      ];

      elementsRef.current.forEach((el, index) => {
        if (!el || !elementPositions[index]) return;
        const pos = elementPositions[index];
        const dx = pos.x - clientX;
        const dy = pos.y - clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Determine if element is "Lit" (inside flashlight radius)
        const isLit = isFlashlightActive && dist < radius;

        // --- Opacity Logic ---
        // If Flashlight is inactive (Light Mode), ensure full visibility
        if (!isFlashlightActive) {
          // Check if element should be hidden based on active view
          let isHidden = false;
          // 0: Sobre Btn, 2: Sobre Square
          if ((index === 0 || index === 2) && currentView === "about") isHidden = true;
          // 1: Projetos Btn, 3: Projetos Square
          if ((index === 1 || index === 3) && currentView === "projects_hub") isHidden = true;
          // 4: Contato Square (Btn is index 8 and not in loop)
          if (index === 4 && currentView === "contact") isHidden = true;

          el.style.opacity = isHidden ? "0" : "1";
        } else {
          // Dark Mode Logic
          if (index >= 2 && index <= 5) {
            el.style.opacity = "1";
          } else {
            el.style.opacity = isLit ? "1" : "0.1";
          }
          el.style.transition = "opacity 0.3s ease, text-shadow 0.3s ease, box-shadow 0.3s ease";
        }

        // --- Shadow Logic (Only 0-4) ---
        if (isLit) {
          // Shadow projects away from light
          const factor = 0.08;
          const moveX = dx * factor;
          const moveY = dy * factor;
          const shadowColor = "rgba(0,0,0,0.6)";

          if (index < 2) {
            // Text Buttons
            el.style.textShadow = `${moveX}px ${moveY}px 5px ${shadowColor}`;
          } else if (index < 5) {
            // Squares
            el.style.boxShadow = `${moveX}px ${moveY}px 10px ${shadowColor}`;
          }
          // 5, 6, 7 No Shadow
        } else {
          // Reset shadow if outside light
          if (index < 2) {
            el.style.textShadow = "none";
          } else if (index < 5) {
            el.style.boxShadow = "none";
          }
        }
      }); // Close forEach

      /* Sound logic removed */
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering, isDark, currentView]);

  return (
    <>
      <style jsx global>{`
        @keyframes pulse-scale {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.2); }
          100% { transform: scale(0.8); }
        }

        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes mask-wipe {
          0% { mask-position: 0 0; -webkit-mask-position: 0 0; }
          100% { mask-position: 100% 0; -webkit-mask-position: 100% 0; }
        }

        @keyframes square-drop {
          0% { transform: translateY(-30%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes logo-reveal-franca {
          0% { clip-path: inset(40% 0 0 100%); }
          100% { clip-path: inset(40% 0 0 45%); }
        }
      `}</style>

      {/* Radial Inversion Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "0px",
          height: "0px",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)", // Maximum transparency/softness
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 1100, // Above Nav (1000) so it inverts nav elements too
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s ease-out, height 0.2s ease-out", // Reverted to faster speed
        }}
      />

      <main
        style={{
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          transition: "filter 0.5s ease",
          filter: (isDark && currentView === "hero") ? "invert(1)" : "none",
        }}
      >

        <Suspense>
          <Navbar />
        </Suspense>

        {/* Hero View */}
        <section className="hero" style={{ height: "100vh", width: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
          {/* Center Content Wrapper */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem", width: "100%", zIndex: 10 }}>

            {/* Central Logo - Click to Invert */}
            <div
              ref={(el) => { elementsRef.current[5] = el; }}
              onClick={() => { setIsDark(!isDark); }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="hero-logo-container"
              style={{ width: "55%", maxWidth: "650px", position: "relative", aspectRatio: "3.5/1", cursor: "pointer", left: "12px" }}
            >
              {/* 1. Band Layer (Delay 1.0s - Advanced) */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                maskImage: 'linear-gradient(to right, transparent 34%, black 66%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 34%, black 66%)',
                maskSize: '300% 100%',
                WebkitMaskSize: '300% 100%',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: isReturningVisit ? '100% 0' : '0 0',
                WebkitMaskPosition: isReturningVisit ? '100% 0' : '0 0',
                animation: isReturningVisit ? 'none' : 'mask-wipe 3s ease-in-out 1.0s forwards'
              }}>
                <Image src="/ref2-band.png" alt="Band" fill style={{ objectFit: "contain" }} priority />
              </div>

              {/* 2. Daniel Text Layer (Fade In - Perfectly Synced Easing) */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                opacity: isReturningVisit ? 1 : 0,
                animation: isReturningVisit ? 'none' : 'fade-in 4s ease-in-out 0s forwards'
              }}>
                <Image src="/ref2-daniel.png" alt="Daniel França" fill style={{ objectFit: "contain" }} priority />
              </div>

              {/* 3. Drop Square or Video Animation */}
              {/* Layer 3A: Dark Mode Video (Always mounted but hidden/paused when light) */}
              <div style={{
                position: 'absolute',
                left: 'calc(14.5% - 46px)',
                top: 'calc(22% - 70px)',
                width: '12.04%',
                zIndex: 3,
                opacity: isDark ? 0.8 : 0, // Hide when not dark, but keep in DOM to preserve state
                pointerEvents: isDark ? "auto" : "none",
                display: "block" // Always render to keep state
              }}>
                <video
                  ref={(el) => {
                    if (el) {
                      if (isDark) {
                        el.play().catch(() => { }); // Ignore autoplay policies
                      } else {
                        el.pause();
                      }
                    }
                  }}
                  src="/0001.mp4"
                  muted
                  playsInline
                  onEnded={() => {
                    // Optional: logic when it ends naturally, if needed. 
                    // Currently just stops on last frame naturally without loop.
                  }}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </div>

              {/* Layer 3B: Light Mode Interactive Elements (Only show when NOT dark) */}
              {!isDark && (
                !hasLeftHero ? (
                  // Initial Load: Drop Animation
                  <div style={{
                    position: 'absolute', inset: 0, zIndex: 3,
                    opacity: 0,
                    animation: 'square-drop 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.5s forwards'
                  }}>
                    <Image src="/ref2-square.png" alt="Square" fill style={{ objectFit: "contain" }} priority />
                  </div>
                ) : clickVideoPlaying ? (
                  // Click Interaction: Play Click Video
                  <div style={{
                    position: 'absolute',
                    left: 'calc(14.5% - 46px)',
                    top: 'calc(22% - 70px)',
                    width: '12.04%',
                    zIndex: 3
                  }}>
                    <video
                      src="/hero-square-click.mp4"
                      autoPlay
                      muted
                      playsInline
                      onEnded={() => setClickVideoPlaying(false)}
                      style={{ width: "100%", height: "auto", objectFit: "contain", opacity: 0.8 }}
                    />
                  </div>
                ) : !videoFinished ? (
                  // Returning: Play Return Video
                  <div style={{
                    position: 'absolute',
                    left: 'calc(14.5% - 46px)',
                    top: 'calc(22% - 70px)',
                    width: '12.04%',
                    zIndex: 3
                  }}>
                    <video
                      src="/hero-square-anim.mp4"
                      autoPlay
                      muted
                      playsInline
                      onEnded={() => setVideoFinished(true)}
                      style={{ width: "100%", height: "auto", objectFit: "contain", opacity: 0.8 }}
                    />
                  </div>
                ) : (
                  // Static State: Image + Invisible Click Trigger
                  <>
                    <div style={{
                      position: 'absolute', inset: 0, zIndex: 3
                    }}>
                      <Image src="/ref2-square.png" alt="Square" fill style={{ objectFit: "contain" }} priority />
                    </div>

                    {/* Specific Click Trigger */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setClickVideoPlaying(true);
                        // triggerSwitch(); // Sound removed
                      }}
                      style={{
                        position: 'absolute',
                        left: 'calc(14.5% - 46px)',
                        top: 'calc(22% - 70px)',
                        width: '12.04%',
                        aspectRatio: "1/1",
                        zIndex: 10,
                        cursor: "pointer",
                        background: "transparent"
                      }}
                    />
                  </>
                )
              )}

              {/* 4. Dot (Delay 3.0s) */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 3,
                opacity: isReturningVisit ? 1 : 0,
                animation: isReturningVisit ? 'none' : 'fade-in 1s ease 3.0s forwards'
              }}>
                <Image src="/ref2-dot.png" alt="Dot" fill style={{ objectFit: "contain" }} priority />
              </div>

              {/* 5. Arquitetura (Delay 4.0s) */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 3,
                opacity: isReturningVisit ? 1 : 0,
                animation: isReturningVisit ? 'none' : 'fade-in 2s ease 4.0s forwards'
              }}>
                <Image src="/ref2-arq.png" alt="Arquitetura" fill style={{ objectFit: "contain" }} priority />
              </div>
            </div>

            {/* Subtitle Text */}
            <div style={{
              width: "auto",
              gap: "2rem",
              display: "flex",
              justifyContent: "center",
              color: "#888",
              fontSize: "0.6rem", // Slightly smaller to fit
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: isReturningVisit ? 1 : 0,
              // Fade in last, after the logo is mostly built
              animation: isReturningVisit ? "none" : "fade-in 2s ease 4.5s forwards",
              fontWeight: 300,
              position: "relative",
              left: "6px"
            }}>
              <span>Arquitetura</span>
              <span>|</span>
              <span>Interiores</span>
              <span>|</span>
              <span>Visualização Arquitetônica</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          {currentView === "hero" && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: 0.5,
              animation: 'pulse-scale 2s infinite'
            }}>
              <ArrowRight className="text-black" size={20} style={{ transform: "rotate(90deg)" }} />
            </div>
          )}
        </section>

        {/* SECTION: Philosophy & Projects Navigation (Moved phrase here) */}
        {currentView === "hero" && (
          <section
            id="comparison-section"
            style={{
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {/* Header Area */}
            <div style={{
              padding: "4rem 2rem",
              textAlign: "center",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "1200px"
            }}>
              <h2 style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                marginBottom: "2rem",
                maxWidth: "800px",
                lineHeight: "1.6",
                opacity: 0.9,
                letterSpacing: "0.01em"
              }}>
                Arquitetura e visualização arquitetônica. Projetos e imagens como parte do mesmo processo.
              </h2>

              <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                <button
                  onClick={() => router.push("/arquitetura")}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    padding: "1rem 3rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    borderRadius: "2px",
                    opacity: 0.9
                  }}
                  className="hover:bg-white hover:text-black"
                >
                  Ver Arquitetura
                </button>
                <button
                  onClick={() => router.push("/visualizacao")}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    padding: "1rem 3rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    borderRadius: "2px",
                    opacity: 0.9
                  }}
                  className="hover:bg-white hover:text-black"
                >
                  Ver Visualização
                </button>
              </div>
            </div>

            {/* Interactive Image Comparison Container */}
            <div
              style={{
                width: "100%",
                position: "relative",
                cursor: "col-resize",
                overflow: "hidden",
                touchAction: "none",
                filter: (isDark && currentView === "hero") ? "invert(1)" : "none"
              }}
              onMouseDown={() => { isDraggingRef.current = true; }}
              onMouseUp={() => { isDraggingRef.current = false; }}
              onMouseLeave={() => { isDraggingRef.current = false; }}
              onMouseMove={(e) => {
                if (!isDraggingRef.current) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

                const slider = document.getElementById("compare-slider-overlay");
                const handle = document.getElementById("compare-handle");
                if (slider && handle) {
                  slider.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
                  handle.style.left = `${percent}%`;
                }
              }}
              onTouchStart={() => { isDraggingRef.current = true; }}
              onTouchEnd={() => { isDraggingRef.current = false; }}
              onTouchMove={(e) => {
                if (!isDraggingRef.current) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

                const slider = document.getElementById("compare-slider-overlay");
                const handle = document.getElementById("compare-handle");
                if (slider && handle) {
                  slider.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
                  handle.style.left = `${percent}%`;
                }
              }}
            >
              {/* Background Image (AFTER - RENDER) */}
              <img
                src={isDark ? "/render-casa-arcos-v07.png" : "/render-casa-arcos-v04.png"}
                alt="Render Final"
                style={{ width: "100%", height: "auto", display: "block" }}
                draggable="false"
              />

              {/* Foreground Image (BEFORE - BASE) - Clipped */}
              <div
                id="compare-slider-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  clipPath: "inset(0 85.72% 0 0)",
                  pointerEvents: "none"
                }}
              >
                <Image
                  src="/before-state.png"
                  alt="Base"
                  fill
                  style={{ objectFit: "cover" }}
                  draggable="false"
                />
              </div>

              {/* Slider Handle */}
              <div
                id="compare-handle"
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "14.28%",
                  width: "2px",
                  background: "rgba(255,255,255,0.8)",
                  pointerEvents: "none",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                  zIndex: 10
                }}
              >
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "40px",
                  height: "40px",
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(4px)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18-6-6 6-6" />
                    <path d="m15 6 6 6-6 6" />
                  </svg>
                </div>
              </div>

              {/* Arraste Hint (Moved to bottom of image area) */}
              <div style={{
                position: "absolute",
                bottom: "5%",
                left: 0,
                width: "100%",
                textAlign: "center",
                pointerEvents: "none",
                zIndex: 20
              }}>
                <p style={{
                  fontSize: "0.7rem",
                  color: "white",
                  opacity: 0.4,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase"
                }}>
                  Arraste para comparar
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Overlays / Pages */}
        {currentView === "about" && (
          <section style={{ position: "fixed", inset: 0, background: "var(--bg-primary)", zIndex: 50, overflow: "hidden" }}>
            <div className="container h-full flex flex-col md:flex-row items-center justify-center p-8 gap-24 about-container" style={{ maxWidth: "1200px", margin: "0 auto", gap: "8rem" }}>
              <div className="about-text no-scrollbar" style={{
                flex: 1,
                maxWidth: "600px",
                maxHeight: "85vh",
                overflowY: "auto",
                paddingRight: "1rem",
                WebkitOverflowScrolling: "touch"
              }}>
                <br /><br /><br /><br /><br /><br /><br /><br />
                <h2 style={{ fontSize: "0.75rem", marginBottom: "3rem", fontWeight: 300, letterSpacing: "0.4em", color: "#999", textTransform: "uppercase" }}>SOBRE O ESTÚDIO</h2>

                <div style={{ lineHeight: 1.8, fontSize: "12px", fontWeight: 300, letterSpacing: "0.05em", color: "#555", opacity: 0.85 }}>
                  <p style={{ marginBottom: "1.5rem" }}>
                    O Daniel França Arquitetura é um estúdio que opera na intersecção entre a prática projetual e a representação visual. Fundado sob a premissa de que a imagem é parte indissociável do processo de arquitetura, o escritório atua em duas frentes complementares: o desenvolvimento de projetos de arquitetura e interiores, e a produção de visualização arquitetônica (Archviz) para arquitetos e incorporadores.
                  </p>
                  <p style={{ marginBottom: "1.5rem" }}>
                    Nossa metodologia rejeita a produção de imagens genéricas. Entendemos a visualização como uma ferramenta de investigação e síntese. Para nós, renderizar é construir virtulamente: exige leitura técnica, compreensão estrutural e sensibilidade à luz e aos materiais.
                  </p>
                  <p style={{ marginBottom: "1rem" }}>
                    Seja projetando espaços ou traduzindo projetos de terceiros em imagens, o foco permanece o mesmo: clareza arquitetônica, rigor técnico e uma estética silenciosa, que valoriza a essência do objeto construído.
                  </p>
                </div>

                <div style={{ marginBottom: "1rem", opacity: 0.9 }}>
                  <Image
                    src="/signature.png"
                    alt="Assinatura Daniel França"
                    width={300}
                    height={150}
                    style={{ height: "180px", width: "auto" }}
                  />
                </div>

                <div style={{ marginTop: "1rem", borderTop: "1px solid #f0f0f0", paddingTop: "3rem" }}>
                  <h2 style={{ fontSize: "0.75rem", marginBottom: "0.8rem", fontWeight: 300, letterSpacing: "0.4em", color: "#999", textTransform: "uppercase" }}>Daniel Soares França</h2>
                  <h3 style={{ fontSize: "0.65rem", marginBottom: "3rem", fontWeight: 300, letterSpacing: "0.5em", textTransform: "uppercase", color: "#bbb" }}>arquiteto & engenheiro civil</h3>

                  <div style={{ lineHeight: 1.8, fontSize: "12px", fontWeight: 300, letterSpacing: "0.05em", color: "#555", opacity: 0.85 }}>
                    <p style={{ marginBottom: "1.5rem" }}>
                      A arquitetura de Daniel Soares França nasce da convergência entre a precisão técnica e a sensibilidade projetual. Graduando pelo <strong>IAU-USP</strong> e Engenheiro Civil formado pela <strong>UFU</strong>, sua trajetória é alicerçada em uma compreensão profunda do construir.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                      Sua visão foi refinada internacionalmente em <strong>Zurique, Suíça</strong>, colaborando com o escritório <em>merkli degen architekten</em>, onde absorveu o rigor do detalhamento europeu e a excelência em projetos de interiores. No Brasil, atuou no renomado <em>Acayaba + Rosenberg</em>, desenvolvendo arquitetura residencial de alto padrão.
                    </p>
                    <p>
                      O estúdio combina essa bagagem global com pesquisa acadêmica em tecnologias construtivas e modelagem BIM avançada, criando espaços que não apenas habitam le presente, mas dialogam com a memória e a técnica.
                    </p>
                  </div>

                  <button
                    onClick={() => router.push("/portfolio")}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="hover-underline-animation"
                    style={{
                      marginTop: "3rem", // Spacing from text
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#888",
                      fontSize: "0.75rem",
                      fontWeight: 300,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase", // Matching style
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                  >
                    portfólio acadêmico <ArrowRight size={14} />
                  </button>
                </div>
                {/* 11 empty lines remaining at bottom */}
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              </div>

              <div
                className="about-image"
                style={{
                  flex: 1,
                  position: "relative",
                  width: "100%",
                  maxWidth: "400px",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
                  animation: "fade-in 1s ease-out 0.2s backwards"
                }}
              >
                <Image
                  src="/daniel-profile.jpg"
                  alt="Daniel França"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center 20%",
                    filter: "grayscale(100%)",
                    transform: "scale(1.1)"
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Projects Hub (Selection Screen) */}




        {(currentView === "gallery_academic" || currentView === "gallery_projects") && (
          <section style={{
            position: "fixed",
            inset: 0,
            background: "#ffffff",
            zIndex: 50,
            overflowY: "auto",
            overflowX: "hidden",
            padding: "8rem 2rem 4rem"
          }}>
            <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
              <div style={{ marginBottom: "4rem", textAlign: "center" }}>
                <h3 style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text-secondary)", fontWeight: 300 }}>
                  {currentView === "gallery_academic" ? "Portfólio Acadêmico" : "Projetos Selecionados"}
                </h3>
              </div>

              {/* Gallery Grid */}
              <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4rem" }}>
                {projectsData.filter(p => currentView === "gallery_academic" ? p.category === "Acadêmico" : p.category !== "Acadêmico").map(project => (
                  <div
                    key={project.id}
                    className="project-card"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // Only allow click for specific project "Loft A" (ID 100) or all? 
                      // User said "ele deve ser clicável", implying others might not be or only this one.
                      // But for consistency I'll enable for all, but only Loft A has gallery data.
                      // If I want to be safe, I check ID.
                      if (project.id === 100 || project.id === 11 || project.id === 12) {
                        setSelectedProject(project);
                      }
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", marginBottom: "1rem", overflow: "hidden", background: "#f5f5f5" }}>
                      <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition: project.id === 100 ? "left" : "center",
                          transition: "transform 0.5s ease"
                        }}
                        className="project-img"
                      />
                    </div>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 400, marginBottom: "0.2rem" }}>{project.title}</h4>
                    <p style={{ fontSize: "0.75rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em" }}>{project.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact View */}
        {currentView === "contact" && (
          <section style={{ position: "fixed", inset: 0, background: "var(--bg-primary)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: "1000px", padding: "2rem", display: "flex", flexDirection: "row", gap: "6rem", alignItems: "flex-start", flexWrap: "wrap" }}>

              {/* Left: Form */}
              <div style={{ flex: "1 1 400px" }}>
                <h2 style={{ textAlign: "left", marginBottom: "3rem", fontSize: "0.8rem", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888" }}>DEIXE UM RECADO</h2>
                <form style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <input type="text" placeholder="NOME" style={{ background: "transparent", border: "none", borderBottom: "1px solid #ddd", padding: "1rem 0", fontSize: "12px", outline: "none", letterSpacing: "0.1em", color: "#333", opacity: 0.85 }} />
                  <input type="email" placeholder="EMAIL" style={{ background: "transparent", border: "none", borderBottom: "1px solid #ddd", padding: "1rem 0", fontSize: "12px", outline: "none", letterSpacing: "0.1em", color: "#333", opacity: 0.85 }} />
                  <textarea placeholder="MENSAGEM" rows={1} style={{ background: "transparent", border: "none", borderBottom: "1px solid #ddd", padding: "1rem 0", fontSize: "12px", outline: "none", letterSpacing: "0.1em", resize: "none", color: "#333", opacity: 0.85 }} />
                  <button
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ marginTop: "2rem", padding: "1rem 2rem", background: "none", border: "1px solid #ddd", color: "#333", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", cursor: "pointer", alignSelf: "flex-start", transition: "all 0.3s ease" }}
                  >
                    Enviar
                  </button>
                </form>
              </div>

              {/* Right: Info */}
              <div style={{ flex: "1 1 300px", paddingTop: "5rem", display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "flex-end", position: "relative" }}>
                <a
                  href="mailto:arq.dfranca@gmail.com"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ fontSize: "12px", fontWeight: 300, color: "#555", opacity: 0.85, letterSpacing: "0.05em", textDecoration: "none" }}
                >
                  arq.dfranca@gmail.com
                </a>
                <a
                  href="tel:+5534999232927"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ fontSize: "12px", fontWeight: 300, color: "#555", opacity: 0.85, letterSpacing: "0.05em", textDecoration: "none" }}
                >
                  (34) 9 9923 2927
                </a>
                <a
                  href="https://instagram.com/dafrarq"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ fontSize: "12px", fontWeight: 300, color: "#555", opacity: 0.85, letterSpacing: "0.05em", textDecoration: "none" }}
                >
                  @dafrarq
                </a>
                <video
                  src="/project-header-anim.mp4"
                  autoPlay
                  muted
                  playsInline
                  onLoadedMetadata={(e) => { e.currentTarget.currentTime = 1; }}
                  style={{
                    position: "absolute",
                    right: "-160px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    marginTop: "33px",
                    width: "135px",
                    height: "auto",
                    opacity: 0.8,
                    mixBlendMode: "multiply",
                    pointerEvents: "none"
                  }}
                />
              </div>

            </div>
          </section>
        )}

        {/* Project Detail Overlay */}
        {selectedProject && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "#ffffff",
              zIndex: 100, // Higher than everything
              overflowY: "auto",
              padding: "12rem 2rem",
              animation: "fade-in 0.5s ease-out"
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: "fixed",
                top: "2rem",
                right: "2rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                zIndex: 101,
                fontSize: "1.5rem",
                color: "#1a1a1a",
                fontWeight: 300
              }}
            >
              ✕
            </button>

            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              {/* Header */}
              <div style={{ marginBottom: "6rem", textAlign: "center" }}>
                <h2 style={{
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase"
                }}>
                  {selectedProject.title}
                </h2>
                <p style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase"
                }}>
                  {selectedProject.category} | {selectedProject.year}
                </p>
              </div>

              {/* Gallery Content - Specific for Loft A */}
              {selectedProject.id === 100 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6rem", marginTop: "6rem" }}>

                  {/* 1. Cover Image (Vista 1_4) */}
                  <div style={{ width: "100%", aspectRatio: "16/9", position: "relative" }}>
                    <img
                      src="/loft-a-cover.png?v=2"
                      alt="Capa"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/loft-a-cover.png?v=2"); }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, cursor: "zoom-in", filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))" }}
                    />
                  </div>

                  {/* 2. Description (Conceptual Text) */}
                  <div style={{ display: "flex", gap: "2rem", margin: "6rem 0 0 0" }}>
                    <div style={{ flex: 3, textAlign: "left", lineHeight: "1.8", color: "#555", fontSize: "12px", fontWeight: 300, opacity: 0.85 }}>
                      <p style={{ marginBottom: "2rem" }}>
                        O Loft A surge como um refúgio contemporâneo imerso na paisagem tropical, explorando a honestidade dos materiais em sua forma mais pura. A robustez do concreto pré-fabricado contrasta harmoniosamente com o calor da madeira natural, criando uma atmosfera de serenidade e permanência. Grandes aberturas envidraçadas dissolvem os limites entre interior e exterior, permitindo que a luz e a vegetação se tornem protagonistas da experiência espacial, em um diálogo constante entre a arquitetura e seu entorno.
                      </p>
                      <p>
                        A casa possui área de 78 m², sendo 18 m² da varanda coberta que separa os quartos do restante da casa. O sistema construtivo é o pilar-viga de concreto pré-fabricado, sendo as paredes externas, as escadas e as lajes feitas com concreto alveolar. As paredes internas são de alvenaria e o fechamento de esquadria metálica e vidro temperado. A fachada norte é protegida por um brise horizontal de madeira que dialoga com o ripado.
                      </p>
                    </div>
                    <div style={{ flex: 4 }} />
                  </div>

                  {/* 3. Implantação & Corte */}
                  <div style={{ display: "flex", gap: "2rem", alignItems: "center", margin: "20rem 0 calc(20rem - 30px) 0" }}>
                    <div style={{ flex: 3, aspectRatio: "4/3", position: "relative" }}>
                      <img
                        src="/loft-a-plan.png?v=2"
                        alt="Implantação"
                        onClick={(e) => { e.stopPropagation(); setLightboxImage("/loft-a-plan.png?v=2"); }}
                        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "left", transform: "scale(2.3)", transformOrigin: "left center", cursor: "zoom-in" }}
                      />
                    </div>

                    <div style={{ flex: 4, aspectRatio: "16/9", position: "relative" }}>
                      <img
                        src="/loft-a-section.png?v=2"
                        alt="Corte"
                        onClick={(e) => { e.stopPropagation(); setLightboxImage("/loft-a-section.png?v=2"); }}
                        style={{ width: "100%", height: "100%", objectFit: "contain", transform: "translate(200px, 200px)", cursor: "zoom-in" }}
                      />
                    </div>
                  </div>

                  {/* Two Column Grid for Renders */}
                  {/* 4. Full Width Renders (Vista 2 & 3) */}
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    gap: "80px",
                    width: "100vw",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginTop: "4rem"
                  }}>
                    <img
                      src="/loft-a-view2.png?v=3"
                      alt="Vista 2"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/loft-a-view2.png?v=3"); }}
                      style={{ height: "65vh", width: "auto", maxWidth: "48vw", objectFit: "contain", cursor: "zoom-in", filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))" }}
                    />
                    <img
                      src="/loft-a-view3-v3.png?v=2"
                      alt="Vista 3"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/loft-a-view3-v3.png?v=2"); }}
                      style={{ height: "45vh", width: "auto", maxWidth: "48vw", objectFit: "contain", cursor: "zoom-in", marginBottom: "80px", filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))" }}
                    />
                  </div>

                </div>
              )}

              {/* Gallery Content - Specific for Casa Arcos (ID 11) */}
              {/* Gallery Content - Specific for Casa Arcos (ID 11) */}
              {selectedProject.id === 11 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6rem", marginTop: "6rem" }}>

                  {/* 1. Cover Image (Now Facade) */}
                  <div style={{ width: "100%", aspectRatio: "16/9", position: "relative" }}>
                    <img
                      src="/casa-arcos/fachada.png"
                      alt="Fachada Casa Arcos"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/casa-arcos/fachada.png"); }}
                      style={{ width: "100%", height: "100%", objectFit: "contain", position: "absolute", top: 0, left: 0, cursor: "zoom-in", filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))" }}
                    />
                  </div>

                  {/* 2. Description (Conceptual Text) */}
                  <div style={{ display: "flex", gap: "2rem", margin: "6rem 0 0 0" }}>
                    <div style={{ flex: 3, textAlign: "left", lineHeight: "1.8", color: "#555", fontSize: "12px", fontWeight: 300, opacity: 0.85 }}>
                      <p style={{ marginBottom: "2rem" }}>
                        A Casa Arcos se define pela pureza geométrica e pela integração fluida entre interior e exterior. Sua volumetria, marcada por arcos suaves, cria uma transição poética entre os espaços de convívio e a natureza circundante. O projeto explora a dualidade entre a rigidez estrutural e a leveza das formas curvas, resultando em uma arquitetura que acolhe e surpreende.
                      </p>
                      <p>
                        Situada em um terreno privilegiado, a residência se orienta para capturar a luz natural e enquadrar as vistas da paisagem. O uso de materiais naturais em tons terrosos reforça a sensação de atemporalidade, enquanto os pátios internos promovem a ventilação cruzada e garantem a privacidade dos moradores.
                      </p>
                    </div>
                    <div style={{ flex: 4 }} />
                  </div>

                  {/* 3. Main Image (Moved here) */}
                  <div style={{ width: "100%", aspectRatio: "16/9", position: "relative", marginTop: "4rem" }}>
                    <img
                      src="/casa-arcos/main.png"
                      alt="Capa Casa Arcos"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/casa-arcos/main.png"); }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, cursor: "zoom-in", filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))" }}
                    />
                  </div>

                  {/* 4. Implantação (Fachada removed) */}
                  <div style={{ display: "flex", gap: "2rem", alignItems: "center", margin: "10rem 0 4rem 0", justifyContent: "center" }}>
                    <div style={{ width: "82.5%", aspectRatio: "4/3", position: "relative" }}>
                      <img
                        src="/casa-arcos/planta.png"
                        alt="Planta"
                        onClick={(e) => { e.stopPropagation(); setLightboxImage("/casa-arcos/planta.png"); }}
                        style={{ width: "100%", height: "100%", objectFit: "contain", cursor: "zoom-in" }}
                      />
                    </div>
                  </div>

                  {/* 5. Stacked Renders (View 3 & 4) - Moved Here */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8rem",
                    width: "100%",
                    marginTop: "4rem",
                    marginBottom: "8rem"
                  }}>
                    <img
                      src="/casa-arcos/view3.png"
                      alt="Vista 3"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/casa-arcos/view3.png"); }}
                      style={{ height: "auto", width: "80%", maxWidth: "1200px", objectFit: "contain", cursor: "zoom-in", filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))" }}
                    />
                    <img
                      src="/casa-arcos/view4.png"
                      alt="Vista 4"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/casa-arcos/view4.png"); }}
                      style={{ height: "auto", width: "80%", maxWidth: "1200px", objectFit: "contain", cursor: "zoom-in", filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))" }}
                    />
                  </div>

                  {/* 6. Renders Grid (View 2 & 5) */}
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    gap: "80px",
                    width: "100vw",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginTop: "4rem"
                  }}>
                    <img
                      src="/casa-arcos/view2.png"
                      alt="Vista 2"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/casa-arcos/view2.png"); }}
                      style={{ height: "50vh", width: "auto", maxWidth: "48vw", objectFit: "contain", cursor: "zoom-in", filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))" }}
                    />
                    <img
                      src="/casa-arcos/view5.png"
                      alt="Vista 5"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/casa-arcos/view5.png"); }}
                      style={{ height: "35vh", width: "auto", maxWidth: "48vw", objectFit: "contain", cursor: "zoom-in", marginBottom: "80px", filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))", clipPath: "inset(0 0 0 14.28%)", marginLeft: "-4vw" }}
                    />
                  </div>

                </div>
              )}

              {/* Gallery Content - Specific for Quarta Esquina (ID 12) */}
              {selectedProject.id === 12 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6rem", marginTop: "6rem" }}>

                  {/* 1. Cover Image */}
                  <div style={{ width: "100%", aspectRatio: "16/9", position: "relative" }}>
                    <img
                      src="/quarta-esquina/main-v2.png"
                      alt="Capa Quarta Esquina"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/quarta-esquina/main-v2.png"); }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, cursor: "zoom-in" }}
                    />
                  </div>

                  {/* 2. Description (Conceptual Text) */}
                  <div style={{ display: "flex", gap: "2rem", margin: "6rem 0 0 0" }}>
                    <div style={{ flex: 3, textAlign: "left", lineHeight: "1.8", color: "#555", fontSize: "12px", fontWeight: 300, opacity: 0.85 }}>
                      <p style={{ marginBottom: "2rem" }}>
                        O projeto Quarta Esquina nasce da intenção de resignificar o espaço urbano através de uma arquitetura que convida ao encontro. Localizado em um ponto de convergência importante, o edifício se volta para a cidade, criando interfaces permeáveis entre o público e o privado.
                      </p>
                      <p>
                        A materialidade do concreto aparente dialoga com a estrutura existente, enquanto elementos de transparência sugerem novos usos e dinâmicas. O resultado é uma intervenção que respeita a memória do lugar ao mesmo tempo em que propõe uma nova vitalidade urbana.
                      </p>
                    </div>
                    <div style={{ flex: 4 }} />
                  </div>

                  {/* 3. Stacked Images - Drawings */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8rem",
                    width: "100%",
                    marginTop: "4rem",
                    marginBottom: "8rem"
                  }}>
                    <img
                      src="/quarta-esquina/implantacao.png?v=2"
                      alt="Implantação"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/quarta-esquina/implantacao.png?v=2"); }}
                      style={{ height: "auto", width: "80%", maxWidth: "1200px", objectFit: "contain", cursor: "zoom-in" }}
                    />


                  </div>

                  {/* 4. Full Width Render */}
                  <div style={{ width: "100%", aspectRatio: "16/9", position: "relative", marginTop: "4rem" }}>
                    <img
                      src="/quarta-esquina/view2.png"
                      alt="Vista 02"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage("/quarta-esquina/view2.png"); }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, cursor: "zoom-in" }}
                    />
                  </div>

                </div>
              )}
            </div>
          </div>
        )}

      </main >

      {/* Lightbox Overlay (ArchDaily Style with Navigation) */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Milky glass effect
            backdropFilter: "blur(50px)",
            zIndex: 99999,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "default",
            animation: "fadeIn 0.3s ease-out"
          }}
        >
          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentGallery = LOFT_A_IMAGES.includes(lightboxImage) ? LOFT_A_IMAGES : (CASA_ARCOS_IMAGES.includes(lightboxImage) ? CASA_ARCOS_IMAGES : (QUARTA_ESQUINA_IMAGES.includes(lightboxImage) ? QUARTA_ESQUINA_IMAGES : []));
              if (currentGallery.length === 0) return;
              const currentIndex = currentGallery.indexOf(lightboxImage);
              const prevIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
              setLightboxImage(currentGallery[prevIndex]);
            }}
            style={{
              position: "absolute", left: "2rem", top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", padding: "1rem",
              color: "#333", opacity: 0.7, transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>

          {/* Conditionally render based on image type (All White Frame except View 2) */
            (!lightboxImage.includes("view2")) ? (
              // Drawing/Presentation Layout: White Presentation Board
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "80vw",
                  aspectRatio: "16/9",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                  position: "relative"
                }}
              >
                <img
                  src={lightboxImage}
                  alt="Fullscreen Presentation"
                  style={{
                    width: (lightboxImage.includes("cover") || lightboxImage.includes("main") || lightboxImage.includes("view3")) ? "100%" : "auto",
                    height: (lightboxImage.includes("cover") || lightboxImage.includes("main") || lightboxImage.includes("view3")) ? "100%" : "auto",
                    maxHeight: (lightboxImage.includes("cover") || lightboxImage.includes("main") || lightboxImage.includes("view3")) ? "100%" : "70%",
                    maxWidth: (lightboxImage.includes("cover") || lightboxImage.includes("main") || lightboxImage.includes("view3")) ? "100%" : "70%",
                    objectFit: (lightboxImage.includes("cover") || lightboxImage.includes("main") || lightboxImage.includes("view3")) ? "cover" : "contain",
                    userSelect: "none",
                    boxShadow: (lightboxImage.includes("cover") || lightboxImage.includes("main") || lightboxImage.includes("view3")) ? "0 25px 60px rgba(0,0,0,0.3)" : "none"
                  }}
                />
              </div>
            ) : (
              // Realistic Fullscreen Layout (Only for View 2)
              <img
                src={lightboxImage}
                alt="Fullscreen Render"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: "95vh", maxWidth: "95vw", objectFit: "contain", userSelect: "none", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}
              />
            )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentGallery = LOFT_A_IMAGES.includes(lightboxImage) ? LOFT_A_IMAGES : (CASA_ARCOS_IMAGES.includes(lightboxImage) ? CASA_ARCOS_IMAGES : (QUARTA_ESQUINA_IMAGES.includes(lightboxImage) ? QUARTA_ESQUINA_IMAGES : []));
              if (currentGallery.length === 0) return;
              const currentIndex = currentGallery.indexOf(lightboxImage);
              const nextIndex = (currentIndex + 1) % currentGallery.length;
              setLightboxImage(currentGallery[nextIndex]);
            }}
            style={{
              position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", padding: "1rem",
              color: "#333", opacity: 0.7, transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        </div>
      )}
    </>
  );
}
