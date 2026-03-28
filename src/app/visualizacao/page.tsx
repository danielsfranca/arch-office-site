"use client";

import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function VisualizacaoPage() {
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
                    backgroundColor: "#111111",
                    overflow: "hidden"
                }}>
                    {/* Background Image - Using a placeholder high-quality render style */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
                        <img
                            src="/v01_centro.png"
                            alt="Visualização Arquitetônica - Centro"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "brightness(0.5) contrast(1.1)"
                            }}
                        />
                    </div>

                    {/* Overlay */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
                        pointerEvents: "none",
                        zIndex: 2
                    }} />

                    <div className="container" style={{ textAlign: "center", zIndex: 10, position: "relative" }}>
                        <h2 style={{
                            fontSize: "0.75rem",
                            fontWeight: 300,
                            letterSpacing: "0.6em",
                            color: "#dcdcdc",
                            textTransform: "uppercase",
                            marginBottom: "2rem"
                        }}>
                            {t.visualization.hero.subtitle}
                        </h2>
                        <h1 style={{
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            marginBottom: "1.5rem",
                            fontWeight: 300,
                            letterSpacing: "0.4em",
                            color: "#e0e0e0",
                            textTransform: "uppercase",
                            textShadow: "0 2px 20px rgba(0,0,0,0.5)"
                        }}>
                            {t.visualization.hero.title}
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
                            textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                        }}>
                            {t.visualization.hero.desc}
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

                {/* --- Services Section --- */}
                <section className="section" style={{ padding: "10rem 0", backgroundColor: "#ffffff" }}>
                    <div className="container" style={{ maxWidth: "1000px" }}>
                        <div style={{ textAlign: "center", marginBottom: "6rem" }}>
                            <h2>
                                {t.visualization.services.subtitle}
                            </h2>
                            <h3>
                                {t.visualization.services.title}
                            </h3>
                        </div>

                        <div className="services-grid">
                            {[
                                t.visualization.services.items.render,
                                t.visualization.services.items.plans,
                                t.visualization.services.items.diagrams,
                                t.visualization.services.items.consulting,
                                t.visualization.services.items.artistic
                            ].map((service, index) => (
                                <div key={index} style={{
                                    textAlign: "center",
                                    position: "relative",
                                    gridColumn: index === 3 ? "2 / span 2" : index === 4 ? "4 / span 2" : "span 2",
                                    maxWidth: "400px",
                                    margin: "0 auto"
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
                                        color: "#1a1a1a",
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

                        {/* CTA */}
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
                                {t.visualization.cta.button}
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
                                    {t.visualization.cta.projects}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <style jsx>{`
        @keyframes pulse-scale {
          0% { transform: scale(0.95) translateY(0); opacity: 0.3; }
          50% { transform: scale(1.05) translateY(10px); opacity: 0.7; }
          100% { transform: scale(0.95) translateY(0); opacity: 0.3; }
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 4rem 2rem;
            margin-bottom: 8rem;
        }

        @media (max-width: 900px) {
            .services-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            .services-grid > div {
                grid-column: 1 / -1 !important;
            }
        }
      `}</style>
        </>
    );
}
