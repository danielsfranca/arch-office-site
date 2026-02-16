"use client";

import { useState } from "react";
import { Save, FolderPlus, Download } from "lucide-react";
import { createProjectStructure, saveDocument, generateSketchupPlugin } from "@/app/actions/projectActions";

export default function BriefingGenerator() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Project Data
    const [clientName, setClientName] = useState("");
    const [projectName, setProjectName] = useState("");

    // Briefing Data
    const [projectType, setProjectType] = useState("");
    const [objective, setObjective] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [atmosphere, setAtmosphere] = useState("");
    const [deadlines, setDeadlines] = useState("");

    // Plugin Code
    const [pluginCode, setPluginCode] = useState("");

    const handleCreateProject = async () => {
        if (!clientName || !projectName) {
            setMessage("Preencha o nome do cliente e do projeto.");
            return;
        }

        setLoading(true);
        const result = await createProjectStructure(clientName, projectName);
        setLoading(false);

        if (result.success) {
            setMessage("✅ Estrutura de pastas criada com sucesso!");
            setStep(2); // Move to briefing fields
        } else {
            setMessage("❌ " + result.message);
        }
    };

    const handleSaveBriefing = async () => {
        const content = `
BRIEFING OFICIAL - ${projectName}
Cliente: ${clientName}
Data: ${new Date().toLocaleDateString()}
_____________________________________

1. TIPO DO PROJETO
${projectType}

2. OBJETIVO DAS IMAGENS
${objective}

3. PÚBLICO-ALVO
${targetAudience}

4. ATMOSFERA E LINGUAGEM
${atmosphere}

5. PRAZOS E CRONOGRAMA
${deadlines}

_____________________________________
Aprovado por: _______________________
`;

        setLoading(true);
        const result = await saveDocument(clientName, projectName, "00_BRIEFING", "briefing_inicial.txt", content);

        if (result.success) {
            setMessage("✅ Briefing salvo na pasta do projeto!");

            // Generate Plugin
            const ruby = await generateSketchupPlugin(clientName, projectName);
            setPluginCode(ruby);
            setStep(3); // Move to plugin step
        } else {
            setMessage("❌ " + result.message);
        }
        setLoading(false);
    };

    const downloadPlugin = () => {
        const element = document.createElement("a");
        const file = new Blob([pluginCode], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${projectName.replace(/\s+/g, '_')}_plugin.rb`;
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="briefing-container fade-in">
            <h3 className="section-title">Novo Projeto e Briefing</h3>

            {/* Progress Steps */}
            <div className="steps">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Projeto</div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Briefing</div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Automação</div>
            </div>

            <div className="form-panel">
                {message && <div className="status-msg">{message}</div>}

                {/* STEP 1: INITIALIZE */}
                {step === 1 && (
                    <div className="step-content">
                        <h4>Dados Iniciais</h4>
                        <div className="form-group">
                            <label>Nome do Cliente</label>
                            <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Ex: Construtora X" />
                        </div>
                        <div className="form-group">
                            <label>Nome do Projeto</label>
                            <input value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="Ex: Edifício Central" />
                        </div>
                        <button className="primary-btn" onClick={handleCreateProject} disabled={loading}>
                            <FolderPlus size={18} />
                            {loading ? "Criando pastas..." : "Criar Estrutura de Pastas"}
                        </button>
                    </div>
                )}

                {/* STEP 2: BRIEFING */}
                {step === 2 && (
                    <div className="step-content">
                        <h4>Preenchimento do Briefing</h4>
                        <div className="form-group">
                            <label>Tipo de Projeto</label>
                            <select value={projectType} onChange={e => setProjectType(e.target.value)}>
                                <option value="">Selecione...</option>
                                <option value="Residencial Unifamiliar">Residencial Unifamiliar</option>
                                <option value="Edifício Multifamiliar">Edifício Multifamiliar</option>
                                <option value="Comercial / Corporativo">Comercial / Corporativo</option>
                                <option value="Urbanismo">Urbanismo</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Objetivo das Imagens</label>
                            <textarea value={objective} onChange={e => setObjective(e.target.value)} placeholder="Venda, Aprovação, Concurso..." />
                        </div>
                        <div className="form-group">
                            <label>Público Alvo</label>
                            <input value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="Investidores, Famílias, Jovens..." />
                        </div>
                        <div className="form-group">
                            <label>Atmosfera Desejada</label>
                            <textarea value={atmosphere} onChange={e => setAtmosphere(e.target.value)} placeholder="Dramática, Diurna, Clean, Minimalista..." />
                        </div>
                        <div className="form-group">
                            <label>Prazos / Expectativas</label>
                            <input value={deadlines} onChange={e => setDeadlines(e.target.value)} placeholder="Data final ideal" />
                        </div>

                        <button className="primary-btn" onClick={handleSaveBriefing} disabled={loading}>
                            <Save size={18} />
                            {loading ? "Salvando..." : "Salvar Briefing e Gerar Plugin"}
                        </button>
                    </div>
                )}

                {/* STEP 3: PLUGIN */}
                {step === 3 && (
                    <div className="step-content">
                        <h4>Automação SketchUp</h4>
                        <p className="desc">Baixe o script abaixo e coloque na pasta de Plugins do SketchUp para integrar este projeto.</p>

                        <div className="code-preview">
                            <pre>{pluginCode}</pre>
                        </div>

                        <button className="primary-btn" onClick={downloadPlugin}>
                            <Download size={18} />
                            Baixar Plugin (.rb)
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .briefing-container { max-width: 800px; margin: 0 auto; padding-bottom: 4rem; }
                .section-title { font-size: 1.5rem; margin-bottom: 1.5rem; color: #1a1a1a; }
                
                .steps { display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
                .step { color: #aaa; font-weight: 500; font-size: 0.9rem; }
                .step.active { color: #1a1a1a; font-weight: 700; }

                .form-panel { background: white; padding: 2rem; border-radius: 8px; border: 1px solid #eee; }
                .step-content { display: flex; flex-direction: column; gap: 1.2rem; }
                
                h4 { margin: 0 0 1rem 0; font-size: 1.1rem; }
                .desc { color: #666; font-size: 0.9rem; margin-bottom: 1rem; }

                .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
                label { font-size: 0.85rem; font-weight: 500; color: #555; }
                
                input, select, textarea {
                    padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px;
                    font-size: 0.95rem; width: 100%; font-family: inherit;
                }
                
                .primary-btn {
                    background: #1a1a1a; color: white; border: none; padding: 0.8rem;
                    border-radius: 6px; cursor: pointer; font-weight: 500;
                    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
                    margin-top: 1rem;
                }
                .primary-btn:hover { background: #333; }
                .primary-btn:disabled { opacity: 0.7; cursor: not-allowed; }

                .status-msg {
                    padding: 1rem; background: #f8f9fa; border-left: 4px solid #1a1a1a;
                    margin-bottom: 1.5rem; font-size: 0.9rem;
                }

                .code-preview {
                    background: #f4f4f4; padding: 1rem; border-radius: 6px;
                    max-height: 200px; overflow-y: auto; font-size: 0.8rem;
                    font-family: monospace; border: 1px solid #ddd;
                }
            `}</style>
        </div>
    );
}
