"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactForm() {
    const searchParams = useSearchParams();
    const initialSubject = searchParams.get("assunto") || "";

    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
        }, 1500);
    };

    if (status === "success") {
        return (
            <div className="h-[50vh] flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <h2 className="text-2xl font-light">Obrigado pelo contato.</h2>
                <p className="text-gray-500">Recebemos sua mensagem. Entraremos em contato em até 24 horas úteis.</p>
                <button onClick={() => setStatus("idle")} className="mt-8 text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50">Enviar outra mensagem</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#555] opacity-85">Nome</label>
                <input required type="text" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-[12px] font-light text-[#555] opacity-85" placeholder="Seu nome completo" />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#555] opacity-85">E-mail</label>
                <input required type="email" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-[12px] font-light text-[#555] opacity-85" placeholder="seu@email.com" />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#555] opacity-85">Assunto</label>
                <div className="relative">
                    <select defaultValue={initialSubject} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none appearance-none text-[12px] font-light text-[#555] opacity-85">
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
                <textarea required rows={4} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none resize-none text-[12px] font-light text-[#555] opacity-85" placeholder="Como podemos ajudar?"></textarea>
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
