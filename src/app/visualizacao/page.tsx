"use client";

import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";

export default function VisualizacaoPage() {
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
                            color: "#aaa",
                            textTransform: "uppercase",
                            marginBottom: "2rem"
                        }}>
                            Archviz & Representação
                        </h2>
                        <h1 style={{
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            marginBottom: "1.5rem",
                            fontWeight: 300,
                            letterSpacing: "0.4em",
                            color: "#ffffff",
                            textTransform: "uppercase",
                            textShadow: "0 2px 20px rgba(0,0,0,0.5)"
                        }}>
                            Visualização Arquitetônica
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
                            Tradução técnica e sensibilidade artística para dar vida ao seu projeto.
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
                            <h2 style={{
                                fontSize: "0.75rem",
                                fontWeight: 300,
                                letterSpacing: "0.5em",
                                color: "#999",
                                textTransform: "uppercase",
                                marginBottom: "1rem"
                            }}>
                                Nossas Entregas
                            </h2>
                            <h3 style={{
                                fontSize: "2rem",
                                fontWeight: 300,
                                letterSpacing: "-0.02em",
                                color: "#1a1a1a",
                                opacity: 0.7
                            }}>
                                Imagens que Comunicam
                            </h3>
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            gap: "2rem",
                            marginBottom: "8rem"
                        }}>
                            {[
                                {
                                    title: "Renders Fotorrealistas",
                                    desc: "Imagens que capturam a luz e a materialidade com precisão, antecipando a realidade construída."
                                },
                                {
                                    title: "Plantas Humanizadas",
                                    desc: "Layouts claros e didáticos que facilitam a compreensão espacial e encantam clientes."
                                },
                                {
                                    title: "Diagramas Axonométricos",
                                    desc: "Representações tridimensionais esquemáticas para explicar conceitos, volumetria e setorização."
                                },
                                {
                                    title: "Consultoria em Representação",
                                    desc: "Orientação estratégica para elevar o nível visual de portfólios e apresentações de projeto."
                                },
                                {
                                    title: "Representação artística",
                                    desc: "Ilustrações com linguagem autoral e expressiva, focadas em transmitir a atmosfera e a emoção."
                                }
                            ].map((service, index) => (
                                <div key={index} style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "0.7rem", color: "#ccc", marginBottom: "1.5rem", letterSpacing: "0.2em" }}>
                                        0{index + 1}
                                    </div>
                                    <h4 style={{
                                        fontSize: "0.85rem",
                                        fontWeight: 300,
                                        letterSpacing: "0.15em",
                                        lineHeight: "1.4",
                                        color: "#1a1a1a",
                                        textTransform: "uppercase",
                                        opacity: 0.8,
                                        marginBottom: "0.8rem"
                                    }}>
                                        {service.title}
                                    </h4>
                                    <p style={{
                                        fontSize: "12px",
                                        fontWeight: 300,
                                        color: "#666",
                                        lineHeight: "1.6",
                                        maxWidth: "90%",
                                        margin: "0 auto",
                                        letterSpacing: "0.05em",
                                        opacity: 0.85
                                    }}>
                                        {service.desc}
                                    </p>
                                    <div style={{ width: "20px", height: "1px", background: "#e0e0e0", margin: "1.5rem auto 0" }} />
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
                                opacity: 0.85
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.15)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                                onClick={() => window.location.href = "mailto:arq.dfranca@gmail.com"}
                            >
                                Inicie sua visualização hoje
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
                                    onClick={() => window.location.href = "/projetos"}
                                >
                                    Ver projetos
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
      `}</style>
        </>
    );
}
