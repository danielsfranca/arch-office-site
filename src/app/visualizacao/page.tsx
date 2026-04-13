"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

function VisualizacaoContent() {
    const router = useRouter();
    const { t } = useLanguage();

    return (
        <>
            <Navbar 
                logoColor="#ffffff" 
                textColor="#ffffff" 
                scrolledTextColor="#1a1a1a"
                scrolledLogoColor="#1a1a1a"
                scrolledBg="rgba(255,255,255,0.95)"
                transparent={true}
            />
            
            <main style={{ marginTop: "0" }}>
                <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#fff" }}>
                    {/* Hero Section */}
                    <section style={{
                        height: "100vh",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        backgroundColor: "#000"
                    }}>
                        {/* Background Image/Video */}
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 0
                        }}>
                            <img 
                                src="/quarta-esquina/main-v2.webp" 
                                alt="Visualização Arquitetônica"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    filter: "brightness(0.65) contrast(1.05)"
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

                    {/* Services Section */}
                    <section className="section" style={{ 
                        padding: "8rem 0", 
                        backgroundColor: "#ffffff",
                        minHeight: "90vh",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
                            <div style={{ textAlign: "center", marginBottom: "6rem" }}>
                                <h2>
                                    {t.visualization.services.subtitle}
                                </h2>
                                <h3>
                                    {t.visualization.services.title}
                                </h3>
                            </div>
                            {/* Row 1: 5 Items */}
                            <div className="services-grid">
                                {[
                                    t.visualization.services.items.render,
                                    t.visualization.services.items.plans,
                                    t.visualization.services.items.diagrams,
                                    t.visualization.services.items.artistic,
                                    t.visualization.services.items.consulting
                                ].map((service, index) => (
                                    <div key={index} style={{
                                        textAlign: "center",
                                        flex: "0 1 240px"
                                    }}>
                                        <div style={{ fontSize: "0.7rem", color: "#ccc", marginBottom: "1rem", letterSpacing: "0.2em" }}>
                                            0{index + 1}
                                        </div>
                                        <h4 style={{ fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.1em", color: "#1a1a1a", textTransform: "uppercase", marginBottom: "1rem" }}>
                                            {service.title}
                                        </h4>
                                        <p style={{ fontSize: "11px", color: "#666", lineHeight: "1.6", maxWidth: "220px", margin: "0 auto", opacity: 0.85 }}>
                                            {service.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Process & CTA Section (Inverted) */}
                    <section style={{ padding: "10rem 1rem", backgroundColor: "#1a1a1a", color: "#ffffff" }}>
                        <div className="container" style={{ maxWidth: "1100px" }}>
                            {/* Process Diagram */}
                            <div style={{ marginBottom: "8rem", textAlign: "center" }}>
                                <h3 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.4em", color: "#888", marginBottom: "5rem", fontWeight: 300 }}>Processo</h3>
                                <div className="process-grid">
                                    {[
                                        "Definição de estilo (artístico, realista, etc.)",
                                        "Definição da cena",
                                        "Definição dos materiais, luz e paisagismo",
                                        "Aprimoramento",
                                        "Aprovação"
                                    ].map((step, idx) => (
                                        <div key={idx} style={{ flex: "1", minWidth: "160px", textAlign: "center" }}>
                                            <div style={{ fontSize: "10px", color: "#555", marginBottom: "0.8rem", letterSpacing: "0.1em" }}>0{idx + 1}</div>
                                            <div style={{ fontSize: "10px", color: "#fff", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 300, lineHeight: 1.6 }}>
                                                {step}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div style={{ textAlign: "center" }}>
                                <button style={{
                                    padding: "1.2rem 3rem",
                                    background: "#ffffff",
                                    color: "#1a1a1a",
                                    border: "none",
                                    borderRadius: "2px",
                                    fontSize: "0.8rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.2em",
                                    cursor: "pointer",
                                    transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                                    opacity: 1
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-5px)";
                                        e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.5)";
                                        e.currentTarget.style.background = "#f0f0f0";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
                                        e.currentTarget.style.background = "#ffffff";
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
                                            borderBottom: "1px solid #ffffff",
                                            padding: "0.2rem 0",
                                            fontFamily: "inherit",
                                            fontSize: "0.75rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.2em",
                                            color: "#ffffff",
                                            cursor: "pointer",
                                            opacity: 0.6,
                                            transition: "opacity 0.3s ease"
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = "0.6"}
                                        onClick={() => router.push("/?view=gallery_projects")}
                                    >
                                        {t.visualization.cta.projects}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <style jsx>{`
                @keyframes pulse-scale {
                    0% { transform: scale(0.95) translateY(0); opacity: 0.3; }
                    50% { transform: scale(1.05) translateY(10px); opacity: 0.7; }
                    100% { transform: scale(0.95) translateY(0); opacity: 0.3; }
                }
                .services-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 6rem 4rem;
                    margin-bottom: 8rem;
                }
                .process-grid {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 1.5rem;
                }
                @media (max-width: 900px) {
                    .services-grid {
                        flex-direction: column;
                        align-items: center;
                        gap: 4rem;
                    }
                    .process-grid {
                        flex-direction: column;
                        align-items: center;
                        gap: 3rem;
                    }
                }
            `}</style>
        </>
    );
}

export default function VisualizacaoPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <VisualizacaoContent />
        </Suspense>
    );
}
