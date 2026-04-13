"use client";

import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function ArquiteturaPage() {
    const { t } = useLanguage();
    const router = useRouter();
    return (
        <>
            <Suspense>
                <Navbar />
            </Suspense>
            <main style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>

                {/* --- Hero Section --- */}
                <section style={{
                    height: "100vh",
                    width: "100%",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#1a1a1a",
                    overflow: "hidden"
                }}>
                    {/* Background Image */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
                        <img
                            src="/vista3-arcos.webp"
                            alt="Casa Arcos Vista 3"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "brightness(0.6) grayscale(20%)" // Darken image for better text contrast
                            }}
                        />
                    </div>

                    {/* Subtle Overlay Pattern or Gradient */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
                        pointerEvents: "none",
                        zIndex: 2
                    }} />

                    <div className="container" style={{ textAlign: "center", zIndex: 10, position: "relative" }}>
                        <h1 style={{
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            marginBottom: "1.5rem",
                            fontWeight: 300,
                            letterSpacing: "0.4em",
                            color: "#e0e0e0",
                            textTransform: "uppercase",
                            textShadow: "0 2px 20px rgba(0,0,0,0.5)"
                        }}>
                            {t.architecturePage.hero.title}
                        </h1>
                        <p style={{
                            fontSize: "12px",
                            fontWeight: 300,
                            letterSpacing: "0.15em",
                            color: "#eeeeee",
                            opacity: 0.85,
                            maxWidth: "700px",
                            margin: "0 auto",
                            lineHeight: "1.8",
                            textShadow: "0 2px 10px rgba(0,0,0,0.5)" // Added shadow for legibility
                        }}>
                            {t.architecturePage.hero.subtitle}
                        </p>

                        <div style={{
                            marginTop: "4rem",
                            opacity: 0.8,
                            animation: "pulse-scale 2s infinite ease-in-out"
                        }}>
                            <ArrowRight size={24} color="#ffffff" style={{ transform: "rotate(90deg)" }} />
                        </div>
                    </div>
                </section>

                {/* --- O Que Fazemos Section --- */}
                <section className="section" style={{ padding: "10rem 0", backgroundColor: "var(--bg-primary)" }}>
                    <div className="container" style={{ maxWidth: "1000px" }}>
                        <div style={{ textAlign: "center", marginBottom: "6rem" }}>
                            <h2>
                                {t.services.title}
                            </h2>
                            <h3>
                                {t.services.subtitle}
                            </h3>
                        </div>

                        <div className="services-grid">
                            {[
                                t.services.items.architecture,
                                t.services.items.interiors,
                                t.services.items.management,
                                t.services.items.suppliers,
                                t.services.items.supervision,
                                t.services.items.visualization
                            ].map((service, index) => (
                                <div key={index} style={{
                                    textAlign: "center",
                                    position: "relative",
                                    maxWidth: "auto",
                                    margin: "0"
                                }}>
                                    <div style={{
                                        fontSize: "0.7rem",
                                        color: "#ccc",
                                        marginBottom: "1rem",
                                        fontWeight: 400,
                                        letterSpacing: "0.2em"
                                    }}>
                                        0{index + 1}
                                    </div>
                                    <h4 style={{
                                        fontSize: "1.1rem",
                                        fontWeight: 300,
                                        letterSpacing: "0.1em",
                                        color: "var(--text-primary)",
                                        textTransform: "uppercase",
                                        opacity: 0.8,
                                        marginBottom: "1rem"
                                    }}>
                                        {service.title}
                                    </h4>
                                    <p style={{
                                        fontSize: "12px",
                                        fontWeight: 300,
                                        color: "#555",
                                        lineHeight: "1.6",
                                        maxWidth: "300px",
                                        margin: "0 auto",
                                        opacity: 0.85,
                                        letterSpacing: "0.05em"
                                    }}>
                                        {service.desc}
                                    </p>
                                    <div style={{
                                        width: "20px",
                                        height: "1px",
                                        background: "#e0e0e0",
                                        margin: "1.5rem auto 0"
                                    }} />
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div style={{ textAlign: "center" }}>
                            <button style={{
                                padding: "1.2rem 3rem",
                                background: "#1a1a1a",
                                color: "white",
                                border: "none",
                                borderRadius: "2px",
                                fontSize: "0.8rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.2em",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                opacity: 0.85
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.2)";
                                    e.currentTarget.style.background = "#000";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                                    e.currentTarget.style.background = "#1a1a1a";
                                }}
                                onClick={() => router.push("/?view=contact")}
                            >
                                {t.services.cta}
                            </button>
                            <div style={{ marginTop: "1.5rem" }}>
                                <button
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        borderBottom: "1px solid #1a1a1a",
                                        padding: "0.2rem 0",
                                        fontFamily: "inherit",
                                        fontSize: "0.75rem",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.2em",
                                        color: "#1a1a1a",
                                        cursor: "pointer",
                                        opacity: 0.7,
                                        transition: "opacity 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
                                    onClick={() => router.push("/?view=gallery_projects")}
                                >
                                    {t.services.viewProjects}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Spacer --- */}
                <div style={{ height: "10vh", backgroundColor: "var(--bg-primary)" }} />

            </main>

            <style jsx>{`
        @keyframes pulse-scale {
          0% { transform: scale(0.95) translateY(0); opacity: 0.3; }
          50% { transform: scale(1.05) translateY(10px); opacity: 0.7; }
          100% { transform: scale(0.95) translateY(0); opacity: 0.3; }
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4rem 2rem;
            margin-bottom: 8rem;
        }

        @media (max-width: 900px) {
            .services-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
        }
      `}</style>
        </>
    );
}
