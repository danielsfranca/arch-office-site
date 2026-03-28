"use client";

import { signIn } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginAction } from "../actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "admin">("client");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (role === 'client' && videoRef.current) {
      videoRef.current.playbackRate = 1.2;
      // Re-trigger play in case it stopped
      videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
    }
    if (role === 'admin') {
      setIsFinished(false);
    }
  }, [role]);

  async function handleEmailLogin(formData: FormData) {
    setIsLoading(true);
    setError("");
    try {
      formData.set("role", role);

      const result = await loginAction(null, formData);
      if (result?.success) {
        window.location.href = result.redirectUrl || "/client-dashboard";
      } else {
        setError(result?.message || "Erro ao entrar.");
        setIsLoading(false);

        if (role === 'admin') {
          setTimeout(() => {
            setRole("client");
            setError("Acesso administrativo negado. Redirecionando para área do cliente...");
          }, 1000);
        }
      }
    } catch (e) {
      setError("Erro de conexão.");
      setIsLoading(false);
    }
  }

  const handleOAuthLogin = async (provider: "google" | "azure-ad") => {
    setIsLoading(true);
    await signIn(provider, { redirectTo: "/client-dashboard" });
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Header - Minimalist */}
        <div className="login-header">
          <button
            onClick={() => router.push("/")}
            className="back-btn"
          >
            <ArrowLeft size={14} /> Voltar ao site
          </button>
          <h1 className="brand-title">Daniel França</h1>
          <p className="sub-title">
            {role === "client" ? "Área do Cliente" : "Área Administrativa"}
          </p>
        </div>

        {/* Role Toggle */}
        <div className="role-toggle">
          <button
            type="button"
            className={`toggle-btn ${role === "client" ? "active" : ""}`}
            onClick={() => setRole("client")}
          >
            Sou Cliente
          </button>
          <button
            type="button"
            className={`toggle-btn ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
          >
            Administração
          </button>
        </div>

        {role === "admin" ? (
          <form action={handleEmailLogin} className="login-form">
            <div className="input-group">
              <label>Email</label>
              <input
                required
                type="email"
                name="email"
                placeholder="seu@email.com"
              />
            </div>

            <div className="input-group">
              <label>Senha</label>
              <input
                required
                type="password"
                name="password"
                placeholder="••••••••"
              />
            </div>

            <input type="hidden" name="role" value={role} />

            {error && (
              <div className="error-msg">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="submit-btn"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        ) : (
          <div className="coming-soon-container">
             <video
               ref={videoRef}
               src="/hand-drawn-animation.mp4"
               autoPlay
               muted
               playsInline
               className="small-video"
             />
             
             <div className="revealed-content visible">
               <h2 className="loading-text">
                 {"Em breve...".split("").map((char, i) => (
                   <span 
                     key={i} 
                     style={{ animationDelay: `${i * 0.15}s` }}
                   >
                     {char === " " ? "\u00A0" : char}
                   </span>
                 ))}
               </h2>
             </div>
          </div>
        )}

      </div>

      <style jsx>{`
        /* Minimalist Global Reset for this view */
        .login-container {
            width: 100vw;
            min-height: 100vh;
            background: #fff;
            color: #1a1a1a;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            font-family: var(--font-main-sans), "Inter", sans-serif;
        }

        .login-card {
            width: 100%;
            max-width: 400px;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .login-header {
            text-align: center;
            margin-bottom: 1rem;
        }

        .back-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            background: none;
            border: none;
            font-size: 0.75rem;
            color: #888;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin: 0 auto 2rem auto;
            transition: color 0.2s;
        }
        .back-btn:hover { color: #1a1a1a; }

        .brand-title {
            font-size: 1.5rem;
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            margin-bottom: 0.5rem;
        }

        .sub-title {
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: #888;
        }

        .login-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            animation: fadeIn 0.3s ease;
        }

        .input-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .input-group label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #555;
            opacity: 0.85;
        }

        .input-group input {
            width: 100%;
            border: none;
            border-bottom: 1px solid #ddd;
            padding: 0.8rem 0;
            background: transparent;
            font-size: 0.9rem;
            font-weight: 300;
            color: #333;
            outline: none;
            transition: border-color 0.2s;
            border-radius: 0;
        }
        .input-group input:focus {
            border-bottom-color: #1a1a1a;
        }
        .input-group input::placeholder {
            color: #ccc;
        }

        .error-msg {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #d32f2f;
            font-size: 0.75rem;
            background: #fff5f5;
            padding: 0.75rem;
            border-radius: 4px;
        }

        .submit-btn {
            width: 100%;
            background: #1a1a1a;
            color: #fff;
            padding: 1rem;
            border: none;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            cursor: pointer;
            margin-top: 1rem;
            transition: background 0.2s;
        }
        .submit-btn:hover { background: #333; }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Toggle Styles */
        .role-toggle {
            display: flex;
            border-bottom: 1px solid #eee;
            margin-bottom: 2rem;
        }
        
        .toggle-btn {
            flex: 1;
            background: none;
            border: none;
            padding: 1rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #aaa;
            cursor: pointer;
            transition: all 0.2s;
            border-bottom: 2px solid transparent;
        }
        
        .toggle-btn:hover { color: #555; }
        
        .toggle-btn.active {
            color: #1a1a1a;
            border-bottom-color: #1a1a1a;
            font-weight: 600;
        }

        /* Coming Soon Styles */
        .coming-soon-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem 0;
            animation: fadeIn 0.4s ease;
        }

        .small-video {
            width: 130px;
            height: auto;
            border-radius: 8px;
            opacity: 0.75;
        }

        .revealed-content {
            margin-top: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            height: 0;
            cursor: default;
        }

        .revealed-content.visible {
            opacity: 1;
            visibility: visible;
            height: auto;
        }

        .revealed-content h2 {
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: #888;
            font-weight: 400;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .loading-text span {
            display: inline-block;
            opacity: 0;
            animation: textLoading 7s infinite both;
        }

        @keyframes textLoading {
            0% {
                opacity: 0;
                transform: translateX(-4px);
            }
            5%, 70% {
                opacity: 1;
                transform: translateX(0);
            }
            75%, 100% {
                opacity: 0;
                transform: translateX(4px);
            }
        }

        .return-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem 1.5rem;
            border: 1px solid #ddd;
            border-radius: 30px;
            background: transparent;
            color: #666;
            cursor: pointer;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: all 0.3s ease;
        }

        .return-btn:hover {
            background-color: #f9f9f9;
            color: #1a1a1a;
            border-color: #bbb;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }

      `}</style>
    </div>
  );
}
