"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { loginAction } from "../actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "admin">("client");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setErrorMessage("");

    // Append role manually since it's a state, not an input
    formData.append("role", role);

    try {
      const result = await loginAction(null, formData);
      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else {
        setErrorMessage(result.message || "Erro no login");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("Erro de conexão.");
      setIsLoading(false);
    }
  }

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#ffffff" // Pure white background like contact section
    }}>

      <div style={{ width: "100%", maxWidth: "400px", padding: "2rem", display: "flex", flexDirection: "column", gap: "3rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              position: "absolute", top: "2rem", left: "2rem",
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "0.5rem",
              color: "#888", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase"
            }}
          >
            <ArrowLeft size={14} /> Voltar
          </button>

          <h1 style={{ fontSize: "1.2rem", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1a1a" }}>
            Área do Cliente
          </h1>
        </div>

        {/* Form */}
        <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* Role Switcher - Minimalist Text Toggle */}
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginBottom: "1rem" }}>
            <button
              type="button"
              onClick={() => setRole("client")}
              style={{
                background: "none", border: "none", borderBottom: role === "client" ? "1px solid #1a1a1a" : "1px solid transparent",
                paddingBottom: "0.2rem", cursor: "pointer",
                fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: role === "client" ? "#1a1a1a" : "#aaa",
                transition: "all 0.3s ease"
              }}
            >
              Sou Cliente
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              style={{
                background: "none", border: "none", borderBottom: role === "admin" ? "1px solid #1a1a1a" : "1px solid transparent",
                paddingBottom: "0.2rem", cursor: "pointer",
                fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: role === "admin" ? "#1a1a1a" : "#aaa",
                transition: "all 0.3s ease"
              }}
            >
              Admin
            </button>
          </div>

          <input
            type="email"
            name="email"
            placeholder={role === "client" ? "SEU EMAIL" : "EMAIL ADMIN"}
            required
            style={{
              background: "transparent", border: "none", borderBottom: "1px solid #ddd",
              padding: "1rem 0", fontSize: "0.9rem", outline: "none", letterSpacing: "0.1em",
              color: "#1a1a1a"
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="SENHA"
            required
            style={{
              background: "transparent", border: "none", borderBottom: "1px solid #ddd",
              padding: "1rem 0", fontSize: "0.9rem", outline: "none", letterSpacing: "0.1em",
              color: "#1a1a1a"
            }}
          />

          {errorMessage && (
            <div style={{ color: "#d9534f", fontSize: "0.75rem", textAlign: "center", marginTop: "-1rem" }}>
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: "1rem", padding: "1rem", background: "#1a1a1a", color: "white",
              border: "none", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", cursor: "pointer",
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#888" }}>ou</p>
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <button
              type="button"
              style={{ background: "none", border: "1px solid #eee", padding: "0.8rem 2rem", width: "100%", cursor: "pointer", fontSize: "0.75rem", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Entrar com Gmail (Google)
            </button>
            <button
              type="button"
              style={{ background: "none", border: "1px solid #eee", padding: "0.8rem 2rem", width: "100%", cursor: "pointer", fontSize: "0.75rem", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Entrar com Outlook (Microsoft)
            </button>

            <button
              type="button"
              onClick={() => router.push("/register")}
              style={{ marginTop: "1rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color: "#888", letterSpacing: "0.1em", textDecoration: "underline" }}
            >
              Criar uma conta
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
