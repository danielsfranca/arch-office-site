"use client";

import { useState } from "react";
import { Copy, Printer, Save } from "lucide-react";
import { saveDocument } from "@/app/actions/projectActions";

export default function ContractGenerator() {
    // Form State
    const [clientName, setClientName] = useState("");
    const [projectName, setProjectName] = useState("");
    const [scope, setScope] = useState("");
    const [deadlines, setDeadlines] = useState("");
    const [value, setValue] = useState("");
    const [imagesCount, setImagesCount] = useState("3");
    const [message, setMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Preview Generation
    const generateContractText = () => {
        const date = new Date().toLocaleDateString('pt-BR');

        return `PROPOSTA COMERCIAL

DANIEL FRANÇA ARQUITETURA E ARCHVIZ
Data: ${date}
Cliente: ${clientName || "[NOME DO CLIENTE]"}
Projeto: ${projectName || "[NOME DO PROJETO]"}

1. ESCOPO
Produção de ${imagesCount} imagens de visualização arquitetônica, conforme briefing aprovado.
Detalhes:
${scope || "[Descreva o escopo detalhado aqui...]"}

2. ENTREGÁVEIS
* Quantidade: ${imagesCount} imagens
* Resolução: 4K (3840x2160px)
* Formato: JPEG/PNG

3. REVISÕES
* 2 rodadas de ajustes finos (iluminação, materiais, enquadramento).
* Alterações de projeto (geometria/layout) não estão incluídas e serão orçadas à parte.

4. PRAZO
Prazo estimado de ${deadlines || "X"} dias úteis após recebimento do material completo (3D/DWG) e aprovação da imagem base.

5. INVESTIMENTO
Valor Total: R$ ${value || "0,00"}
Condição: 50% no aceite da proposta / 50% na entrega final.

6. VALIDADE
Proposta válida por 15 dias.

_______________________
TERMOS DO SERVIÇO (ANEXO)

OBJETO: Prestação de serviços de arquitetura e visualização.
DIREITOS: O estúdio mantém os direitos autorais, concedendo ao cliente direito de uso para apresentação e marketing. O estúdio pode usar as imagens em portfólio.
CANCELAMENTO: Valores pagos não são reembolsáveis após início do serviço.
ACEITE: O pagamento do sinal confirma o aceite desta proposta e dos termos acima.

Daniel França`;
    };

    const handlePrint = () => {
        const printContent = document.getElementById("contract-preview");
        if (printContent) {
            const windowUrl = 'about:blank';
            const uniqueName = new Date();
            const windowName = 'Print' + uniqueName.getTime();
            const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');

            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Proposta - ${clientName}</title>
                            <style>
                                body { font-family: 'Courier New', Courier, monospace; white-space: pre-wrap; padding: 40px; }
                            </style>
                        </head>
                        <body>
                            ${generateContractText()}
                        </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }
        }
    };

    const handleSaveToFolder = async () => {
        if (!clientName || !projectName) {
            setMessage("Preencha Cliente e Projeto para salvar.");
            return;
        }
        setIsSaving(true);
        const content = generateContractText();
        // Save to '00_BRIEFING' or create a '00_CONTRATOS' if we wanted, sticking to plan structure maybe 00_BRIEFING or root? 
        // Plan says ADMIN/CONTRATOS structure, but let's put in project folder for now as per user request for organization.
        // Actually Module 12 says ADMIN/CONTRATOS... but "linked to sketchup plugin" implies project folder.
        // Let's save to 00_BRIEFING for now or just root of project.
        // I'll save to 00_BRIEFING as it often contains initial docs.
        const result = await saveDocument(clientName, projectName, "00_BRIEFING", "proposta_comercial.txt", content);

        if (result.success) {
            setMessage("✅ Salvo na pasta do projeto!");
        } else {
            setMessage("❌ " + result.message);
        }
        setIsSaving(false);
    };

    return (
        <div className="contract-generator fade-in">
            <div className="header-actions">
                <h3 className="section-title">Gerador de Contratos</h3>
                <div className="btn-group">
                    {message && <span className="status-text">{message}</span>}
                    <button className="secondary-btn" onClick={() => navigator.clipboard.writeText(generateContractText())}>
                        <Copy size={16} /> Copiar
                    </button>
                    <button className="secondary-btn" onClick={handleSaveToFolder} disabled={isSaving}>
                        <Save size={16} /> {isSaving ? "Salvando..." : "Salvar no Projeto"}
                    </button>
                    <button className="primary-btn" onClick={handlePrint}>
                        <Printer size={16} /> Imprimir
                    </button>
                </div>
            </div>

            <div className="generator-grid">
                {/* FORM */}
                <div className="form-panel">
                    <div className="form-group">
                        <label>Nome do Cliente</label>
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="Ex: Construtora Horizon"
                        />
                    </div>
                    <div className="form-group">
                        <label>Nome do Projeto</label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Ex: Edifício Aurora"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group half">
                            <label>Valor (R$)</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="3.500,00"
                            />
                        </div>
                        <div className="form-group half">
                            <label>Imagens</label>
                            <input
                                type="number"
                                value={imagesCount}
                                onChange={(e) => setImagesCount(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Prazo (dias úteis)</label>
                        <input
                            type="text"
                            value={deadlines}
                            onChange={(e) => setDeadlines(e.target.value)}
                            placeholder="Ex: 10"
                        />
                    </div>
                    <div className="form-group">
                        <label>Escopo Detalhado</label>
                        <textarea
                            rows={6}
                            value={scope}
                            onChange={(e) => setScope(e.target.value)}
                            placeholder="Descreva as imagens, ambientes e particularidades..."
                        />
                    </div>
                </div>

                {/* PREVIEW */}
                <div className="preview-panel">
                    <div className="paper-preview" id="contract-preview">
                        {generateContractText()}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .contract-generator {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    height: 100%;
                }
                
                .header-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1a1a1a;
                }

                .btn-group {
                    display: flex;
                    gap: 1rem;
                }

                .primary-btn, .secondary-btn {
                    padding: 0.6rem 1.2rem;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                    cursor: pointer;
                    font-weight: 500;
                }

                .primary-btn {
                    background: #1a1a1a;
                    color: white;
                    border: none;
                }

                .secondary-btn {
                    background: white;
                    color: #333;
                    border: 1px solid #ddd;
                }

                .generator-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    height: 100%;
                }

                .form-panel {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    border: 1px solid #eee;
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .form-row {
                    display: flex;
                    gap: 1rem;
                }

                .form-group.half { flex: 1; }

                label {
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: #666;
                }

                input, textarea {
                    padding: 0.8rem;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 0.95rem;
                    outline: none;
                    font-family: inherit;
                }

                input:focus, textarea:focus {
                    border-color: #1a1a1a;
                }

                .preview-panel {
                    background: #555;
                    padding: 2rem;
                    border-radius: 12px;
                    overflow-y: auto;
                    display: flex;
                    justify-content: center;
                }

                .paper-preview {
                    background: white;
                    width: 100%;
                    max-width: 500px;
                    min-height: 700px;
                    padding: 3rem;
                    white-space: pre-wrap;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 0.85rem;
                    line-height: 1.5;
                    color: #333;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }

                .status-text {
                    font-size: 0.85rem;
                    color: #1a1a1a;
                    background: #e8f5e9;
                    padding: 0.4rem 0.8rem;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </div>
    );
}
