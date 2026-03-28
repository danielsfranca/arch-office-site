"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactForm() {
    const searchParams = useSearchParams();
    const initialSubject = searchParams.get("assunto") || "";

    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message")
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("idle");
                alert("Houve um erro ao enviar sua mensagem. Tente novamente.");
            }
        } catch (error) {
            console.error(error);
            setStatus("idle");
            alert("Erro de conexão. Tente novamente.");
        }
    };

    if (status === "success") {
        const successText = "Obrigado pelo contato! Logo retornaremos.";
        return (
            <div className="h-[50vh] flex flex-col items-center justify-center text-center space-y-6 animate-fade-in relative">
                <h2 className="flex items-center justify-center flex-wrap max-w-lg" style={{
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    color: "#888",
                    fontWeight: 400
                }}>
                    {successText.split("").map((char, i) => (
                        <span 
                            key={i} 
                            style={{ 
                                animationDelay: `${i * 0.1}s`,
                                display: "inline-block",
                                opacity: char === " " ? 1 : 0,
                                animation: char !== " " ? "textLoadingContact 12s infinite both" : "none",
                                width: char === " " ? "0.5em" : "auto"
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </h2>
                <button onClick={() => setStatus("idle")} className="mt-12 text-[10px] uppercase tracking-[0.2em] border-b border-gray-300 pb-1 text-gray-400 hover:text-black hover:border-black transition-colors">Enviar outra mensagem</button>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes textLoadingContact {
                        0% { opacity: 0; transform: translateX(-4px); }
                        5%, 70% { opacity: 1; transform: translateX(0); }
                        75%, 100% { opacity: 0; transform: translateX(4px); }
                    }
                `}} />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#555] opacity-85">Nome</label>
                <input required name="name" type="text" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-[12px] font-light text-[#555] opacity-85" placeholder="Seu nome completo" />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#555] opacity-85">E-mail</label>
                <input required name="email" type="email" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-[12px] font-light text-[#555] opacity-85" placeholder="seu@email.com" />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#555] opacity-85">Assunto</label>
                <div className="relative">
                    <select required name="subject" defaultValue={initialSubject} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none appearance-none text-[12px] font-light text-[#555] opacity-85">
                        <option value="" disabled>Selecione um assunto</option>
                        <option value="arquitetura">Projeto de Arquitetura</option>
                        <option value="visualizacao">Visualização 3D</option>
                        <option value="imprensa">Imprensa</option>
                        <option value="outro">Outro</option>
                    </select>
                    <div className="absolute right-0 top-4 pointer-events-none text-gray-400">▼</div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#555] opacity-85">Mensagem</label>
                <textarea required name="message" rows={4} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none resize-none text-[12px] font-light text-[#555] opacity-85" placeholder="Como podemos ajudar?"></textarea>
            </div>

            <div className="pt-8 text-right">
                <button disabled={status === "submitting"} type="submit" className="bg-[#1a1a1a] text-white px-12 py-5 uppercase text-xs tracking-[0.2em] hover:bg-gray-800 transition-colors disabled:opacity-50 w-full md:w-auto">
                    {status === "submitting" ? "Enviando..." : "Enviar Mensagem"}
                </button>
            </div>
        </form>
    );
}

export default function ContatoPage() {
    return (
        <main className="w-full pt-32 pb-20 bg-white text-black min-h-screen">
            <div className="container mx-auto px-6 max-w-2xl">
                <h1 className="text-3xl font-light mb-16 uppercase tracking-widest text-center md:text-left">Contato</h1>
                <Suspense fallback={<div>Carregando formulário...</div>}>
                    <ContactForm />
                </Suspense>
            </div>
        </main>
    );
}
