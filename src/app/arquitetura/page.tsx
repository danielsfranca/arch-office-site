"use client";

import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";

export default function ArquiteturaPage() {
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
                            src="/vista3-arcos.png"
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
                            color: "#ffffff",
                            textTransform: "uppercase",
                            textShadow: "0 2px 20px rgba(0,0,0,0.5)" // Added shadow for legibility
                        }}>
                            Arquitetura e Interiores
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
                            Projetos desenvolvidos com foco na experiência, contexto e materialidade.
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
                            <h2 style={{
                                fontSize: "0.75rem",
                                fontWeight: 300,
                                letterSpacing: "0.5em",
                                color: "#999",
                                textTransform: "uppercase",
                                marginBottom: "1rem"
                            }}>
                                Serviços
                            </h2>
                            <h3 style={{
                                fontSize: "2rem",
                                fontWeight: 300,
                                letterSpacing: "-0.02em",
                                color: "var(--text-primary)",
                                opacity: 0.7
                            }}>
                                O Que Fazemos
                            </h3>
                        </div>

                        <div className="services-grid">
                            {[
                                {
                                    title: "Projeto de Arquitetura",
                                    description: "Concepção de espaços que unem estética, função e a identidade única de quem habita."
                                },
                                {
                                    title: "Projeto de Interiores",
                                    description: "Ambientes pensados para o bem-estar, com foco em conforto, design atemporal e exclusividade."
                                },
                                {
                                    title: "Projeto de Iluminação",
                                    description: "Luz como elemento de design, criando atmosferas envolventes e valorizando a arquitetura."
                                },
                                {
                                    title: "Gestão de Projetos Complementares",
                                    description: "Compatibilização rigorosa de disciplinas técnicas para garantir uma obra sem imprevistos."
                                },
                                {
                                    title: "Gestão de Fornecedores e Orçamentos",
                                    description: "Curadoria e negociação estratégica para otimizar custos sem abrir mão da qualidade."
                                },
                                {
                                    title: "Fiscalização de Obra",
                                    description: "Acompanhamento técnico preciso para assegurar a fidelidade entre o projeto e a execução."
                                },
                                {
                                    title: "Visualização Arquitetônica",
                                    description: "Imagens e experiências imersivas que antecipam o futuro e materializam sonhos."
                                }
                            ].map((service, index) => (
                                <div key={index} style={{
                                    textAlign: "center",
                                    position: "relative",
                                    gridColumn: index === 0 ? "1 / -1" : "auto",
                                    maxWidth: index === 0 ? "600px" : "auto",
                                    margin: index === 0 ? "0 auto" : "0"
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
                                        {service.description}
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
                                onClick={() => window.location.href = "mailto:arq.dfranca@gmail.com"}
                            >
                                Vamos conversar sobre seu projeto
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
