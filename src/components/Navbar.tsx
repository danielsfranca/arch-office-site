"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isHome = pathname === "/";
  const isDashboard = pathname.startsWith("/admin-dashboard") || pathname.startsWith("/client-dashboard") || pathname.startsWith("/dashboard");

  // Hide on dashboards
  if (isDashboard) return null;

  const navigateToHomeView = (view: string) => {
    if (isHome) {
      // If we are on home, we expect the home component to react to search params or we can use a custom event
      // However, since we are in a separate component, the cleanest way is updating the URL
      const url = new URL(window.location.href);
      url.searchParams.set("view", view);
      window.history.pushState({ view }, "", url.toString());
      // Trigger a custom event that Home component can listen to
      window.dispatchEvent(new CustomEvent("viewChange", { detail: view }));
    } else {
      router.push(`/?view=${view}`);
    }
  };

  const navLinks = [
    { name: "Home", action: () => isHome ? navigateToHomeView("hero") : router.push("/") },
    { name: "Arquitetura", action: () => router.push("/arquitetura") },
    { name: "Visualização", action: () => router.push("/visualizacao") },
    { name: "Projetos", action: () => navigateToHomeView("gallery_projects") },
    { name: "Sobre", action: () => navigateToHomeView("about") },
    { name: "Contato", action: () => navigateToHomeView("contact") },
  ];

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "80px",
        padding: "0 2rem",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f0f0f0",
        pointerEvents: "auto"
      }}>
        {/* Desktop Links - Centered */}
        <div className="desktop-menu" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={link.action}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#333",
                fontSize: "0.85rem",
                fontWeight: 300,
                textTransform: "capitalize",
                letterSpacing: "0.05em",
                transition: "color 0.2s"
              }}
              className="nav-btn"
            >
              {link.name}
            </button>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            right: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer"
          }}
          onClick={() => router.push("/login")}
          className="client-area-trigger"
        >
          <span style={{
            color: "#333",
            fontSize: "0.80rem",
            fontWeight: 300,
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }}>
            ÁREA DO CLIENTE
          </span>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: "none", position: "absolute", left: "2rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none" }}
        >
          {isOpen ? <X size={24} color="#333" /> : <Menu size={24} color="#333" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          position: "fixed",
          top: "80px",
          left: 0,
          width: "100%",
          background: "white",
          zIndex: 999,
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
        }}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                link.action();
                setIsOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                fontSize: "1.1rem",
                color: "#333",
                textTransform: "uppercase",
                fontWeight: 300,
                letterSpacing: "0.05em"
              }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => {
              router.push("/login");
              setIsOpen(false);
            }}
            style={{
              background: "#1a1a1a",
              color: "white",
              padding: "1rem",
              textAlign: "center",
              borderRadius: "4px",
              border: "none",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}
          >
            Área do Cliente
          </button>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .nav-btn:hover {
          color: #000 !important;
          opacity: 0.7;
        }
        .client-area-trigger:hover span {
          color: #000;
          opacity: 0.7;
        }
      `}</style>
    </>
  );
}
