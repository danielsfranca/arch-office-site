"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail, User, ChevronRight, Phone } from "lucide-react";
import { registerAction } from "../actions/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await registerAction(null, formData);
      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else {
        setErrorMessage(result.message || "Erro no cadastro");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("Erro de conexão.");
      setIsLoading(false);
    }
  }

  return (
    <div className="register-container">
      {/* Background Ambience */}
      <div className="register-bg">
        <div className="noise-overlay" />
      </div>

      <div className="register-content">
        {/* Header */}
        <div className="register-header">
          <button onClick={() => router.push("/")} className="back-btn">
            <ArrowLeft size={16} />
            <span>Voltar ao site</span>
          </button>
          <div className="logo-area">
            <h1 className="brand">DANIEL FRANÇA</h1>
            <p className="sub-brand">NOVO CADASTRO</p>
          </div>
        </div>

        {/* Register Form Card */}
        <div className="register-card">
          <form action={handleSubmit} className="register-form">

            <div className="input-group">
              <label>Nome Completo</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Telefone / WhatsApp</label>
              <div className="input-wrapper">
                <Phone size={16} className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="row-group">
              <div className="input-group">
                <label>Senha</label>
                <div className="input-wrapper">
                  <Lock size={16} className="input-icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Confirmar Senha</label>
                <div className="input-wrapper">
                  <Lock size={16} className="input-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}>
                {errorMessage}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="loader"></span>
              ) : (
                <>
                  <span>Criar Conta</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="login-link">
            Já tem uma conta? <button type="button" onClick={() => router.push("/login")}>Fazer Login</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .register-container {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #f9f9f9;
          overflow: hidden;
          padding: 2rem 0; /* Ensure spacing on small screens */
        }

        .register-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f0f0f0 100%);
        }

        .register-content {
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
          max-width: 450px; /* Slightly wider than login */
          padding: 1rem;
        }

        .register-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #888;
          font-size: 0.8rem;
          transition: color 0.2s;
        }
        .back-btn:hover { color: #1a1a1a; }

        .brand {
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: #1a1a1a;
          margin: 0;
        }

        .sub-brand {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          color: #888;
          margin-top: 0.5rem;
        }

        .register-card {
          width: 100%;
          background: white;
          padding: 2.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          border: 1px solid #eee;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          animation: slide-up 0.5s ease-out;
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .row-group {
            display: flex;
            gap: 1rem;
        }
        .row-group .input-group { flex: 1; }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group label {
          font-size: 0.8rem;
          color: #666;
          font-weight: 400;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: #aaa;
        }

        .input-wrapper input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.8rem;
          border: 1px solid #eee;
          background: #fafafa;
          font-size: 0.95rem;
          transition: all 0.2s;
          outline: none;
        }

        .input-wrapper input:focus {
          border-color: #1a1a1a;
          background: white;
        }

        .submit-btn {
          margin-top: 1rem;
          width: 100%;
          padding: 1rem;
          background: #1a1a1a;
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          transition: background 0.2s, transform 0.1s;
        }

        .submit-btn:hover {
          background: #333;
        }
        .submit-btn:active {
          transform: scale(0.98);
        }

        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .login-link {
          text-align: center;
          font-size: 0.85rem;
          color: #666;
        }
        
        .login-link button {
          background: none;
          border: none;
          color: #1a1a1a;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
           margin-left: 0.3rem;
        }

        .loader {
          width: 18px;
          height: 18px;
          border: 2px solid #fff;
          border-bottom-color: transparent;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
