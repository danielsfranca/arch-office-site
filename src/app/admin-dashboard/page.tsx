"use client";

import { getDocumentTemplate } from "../../utils/documentTemplates";

import { useState, useRef } from "react";
import {
  Briefcase,
  Calendar,
  Users,
  FileText,
  LogOut,
  Search,
  Plus,
  Settings,
  MoreVertical,
  FolderPlus,
  TrendingUp,
  Image as ImageIcon,
  Shield,
  Folder,
  Upload,
  Download,
  MessageSquare,
  File,
  ChevronRight,
  ChevronDown,
  Instagram,
  Printer,
  Eye,
  Check,
  Send
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addDeliveryAction, getClientsAction } from "../actions/client-data";

// --- MOCK DATA ---
// --- MOCK DATA ---
const clients = [
  { id: 1, name: "Cliente Loft", project: "Loft A", status: "Concluído", progress: 100, deadline: "01/02/2026", email: "loft@example.com", phone: "(11) 99999-9999", serial: "LOFT" },
  { id: 2, name: "Cliente Arcos", project: "Casa Arcos", status: "Em Andamento", progress: 80, deadline: "15/04/2026", email: "arcos@example.com", phone: "(11) 88888-8888", serial: "ARCO" },
  { id: 3, name: "Cliente Quarta", project: "Quarta Esquina", status: "Em Andamento", progress: 40, deadline: "20/06/2026", email: "quarta@example.com", phone: "(21) 77777-7777", serial: "QUAR" },
];

const mockFiles = [
  { name: "Levantamento_Arcos.dwg", date: "10/02/2026", size: "2.4 MB", type: "dwg" },
  { name: "Ref_Loft_A.pdf", date: "11/02/2026", size: "15 MB", type: "pdf" },
];

const mockOutputFiles = [
  { name: "Estudo_Arcos_v01.pdf", date: "14/02/2026", size: "22 MB", type: "pdf" },
  { name: "Render_Quarta_Final.png", date: "14/02/2026", size: "5 MB", type: "png" },
];

const explorerData = [
  {
    name: "Daniel França Arquitetura (G:)",
    type: "drive",
    id: "root", // Triggers fetch of Google Drive Root
    children: [] // Empty to force fetch
  }
];

// --- COMPONENTS ---

// 1. File Explorer Component
// 1. File Explorer Component (Async)
const FileNode = ({ node, level = 0 }: { node: any, level?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<any[]>(node.children || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(!!node.children && node.children.length > 0);

  const handleToggle = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);

    if (!isLoaded && (node.type === "drive" || node.type === "folder")) {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/drive?folderId=${node.id || 'root'}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const files = await res.json();

        // Map Google Drive API response to our node structure
        const mappedChildren = files.map((f: any) => ({
          id: f.id,
          name: f.name,
          type: f.mimeType === 'application/vnd.google-apps.folder' ? 'folder' : 'file',
          children: [] // Start empty, fetch on demand
        }));

        setChildren(mappedChildren);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching drive files:", error);
        // Fallback to existing mock children if any, or empty
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{ marginLeft: level * 12 }}>
      <div
        className="file-row"
        onClick={handleToggle}
        style={{ display: "flex", alignItems: "center", padding: "4px 8px", cursor: "pointer", borderRadius: "4px" }}
      >
        {(node.type === "drive" || node.type === "folder") ? (
          isOpen ? <ChevronDown size={14} style={{ marginRight: 6 }} /> : <ChevronRight size={14} style={{ marginRight: 6 }} />
        ) : <div style={{ width: 20 }} />}

        {node.type === "drive" ? <Shield size={16} color="#4A90E2" style={{ marginRight: 6 }} /> :
          node.type === "folder" ? <Folder size={16} color="#FFC107" fill="#FFC107" style={{ marginRight: 6 }} /> :
            <File size={16} color="#999" style={{ marginRight: 6 }} />}

        <span style={{ fontSize: "13px", color: "#333" }}>{node.name}</span>
        {isLoading && <span style={{ fontSize: "10px", color: "#888", marginLeft: "8px" }}>Carregando...</span>}
      </div>
      {isOpen && (
        <div>
          {children.length > 0 ? (
            children.map((child: any, i: number) => (
              <FileNode key={child.id || i} node={child} level={level + 1} />
            ))
          ) : (
            isLoaded && <div style={{ marginLeft: 20, fontSize: "11px", color: "#888", padding: "4px 0" }}>Pasta vazia</div>
          )}
        </div>
      )}
    </div>
  );
};

// 2. Gantt Chart Component
const GanttChart = () => (
  <div className="gantt-container">
    <div className="gantt-header" style={{ display: "grid", gridTemplateColumns: "200px repeat(12, 1fr)", gap: "1px", background: "#eee", padding: "10px", borderRadius: "4px" }}>
      <div style={{ fontWeight: "bold", fontSize: "12px" }}>Projeto / Etapa</div>
      {[...Array(12)].map((_, i) => <div key={i} style={{ fontSize: "10px", textAlign: "center" }}>Mês {i + 1}</div>)}
    </div>
    <div className="gantt-body" style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
      {clients.map(client => (
        <div key={client.id} className="gantt-row" style={{ display: "grid", gridTemplateColumns: "200px repeat(12, 1fr)", alignItems: "center", gap: "1px" }}>
          <div style={{ fontSize: "12px", fontWeight: "500" }}>{client.project}</div>
          <div style={{ gridColumn: `2 / span 12`, position: "relative", height: "24px", background: "#f5f5f5", borderRadius: "12px" }}>
            <div
              style={{
                position: "absolute",
                left: `${Math.random() * 20}%`,
                width: `${Math.random() * 40 + 20}%`,
                height: "100%",
                background: client.status === "Atrasado" ? "#ff5252" : "#1a1a1a",
                borderRadius: "12px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: "10px"
              }}
            >
              {client.progress}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 3. Collaboration Component
const CollaborationCanvas = () => {
  const [markers, setMarkers] = useState<{ x: number, y: number, id: number }[]>([]);
  const [comments, setComments] = useState<{ id: number, text: string }[]>([]);

  const addMarker = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = markers.length + 1;

    setMarkers([...markers, { x, y, id }]);
    setComments([...comments, { id, text: "" }]);
  };

  return (
    <div style={{ display: "flex", gap: "2rem", height: "600px" }}>
      <div style={{ flex: 2, position: "relative", background: "#ddd", borderRadius: "8px", overflow: "hidden", cursor: "crosshair" }} onClick={addMarker}>
        <Image src="/vista3-arcos.png" alt="Colaboração" fill style={{ objectFit: "contain" }} />
        {markers.map(m => (
          <div key={m.id} style={{
            position: "absolute", top: m.y, left: m.x, width: "24px", height: "24px",
            background: "#ff5252", color: "white", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: "bold", transform: "translate(-50%, -50%)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)"
          }}>
            {m.id}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid #eee", overflowY: "auto" }}>
        <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "1rem" }}>Comentários</h3>
        {comments.length === 0 && <p style={{ fontSize: "12px", color: "#999" }}>Clique na imagem para adicionar um apontamento.</p>}
        {comments.map((c, i) => (
          <div key={i} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #f5f5f5" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <div style={{ width: "20px", height: "20px", background: "#ff5252", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>{c.id}</div>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>Ponto {c.id}</span>
            </div>
            <textarea
              placeholder="Escreva um comentário..."
              className="w-full text-xs p-2 border border-gray-200 rounded"
              style={{ width: "100%", fontSize: "12px", padding: "8px", border: "1px solid #eee", borderRadius: "4px", outline: "none" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Document Generator Component (Enhanced)
const DocumentGenerator = () => {
  const [selectedDoc, setSelectedDoc] = useState("welcome");
  const [formData, setFormData] = useState<any>({});
  const [serial, setSerial] = useState("");
  const [dbClients, setDbClients] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  useState(() => {
    getClientsAction().then(data => setDbClients(data));
  });

  const docTypes = [
    { id: "welcome", name: "01. Kit de Boas Vindas + Acesso" },
    { id: "proposal", name: "02. Proposta Comercial" },
    { id: "contract_arch", name: "03. Contrato de Arquitetura" },
    { id: "contract_viz", name: "04. Contrato de Archviz" },
    { id: "briefing", name: "05. Formulário de Briefing" },
    { id: "schedule", name: "06. Cronograma Físico-Financeiro" },
    { id: "delivery", name: "07. Termo de Entrega de Chaves/Projeto" },
  ];

  const generateSerial = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    setSerial(result);
    setFormData({ ...formData, serial: result });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSendToClient = async () => {
    if (!selectedClientId) {
      alert("Selecione um cliente da lista (simulada) para enviar.");
      return;
    }
    const result = await addDeliveryAction(selectedClientId, selectedDoc, formData.project || "Projeto");
    if (result.success) {
      alert("Documento enviado para a área do cliente com sucesso!");
    } else {
      alert("Erro ao enviar: " + result.message);
    }
  };

  const handlePrint = () => {
    const content = getDocumentTemplate(selectedDoc, { ...formData, serial });
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${docTypes.find(d => d.id === selectedDoc)?.name || "Documento"}</title>
            <style>
              body { margin: 0; padding: 0; }
              @media print {
                @page { margin: 0; }
                body { margin: 1.6cm; }
              }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print(); // Trigger print dialog
    }
  };

  // Dynamic Fields Logic
  const renderFields = () => {
    switch (selectedDoc) {
      case "welcome":
        return (
          <>
            <div className="form-group">
              <label>Nome do Cliente</label>
              <input type="text" placeholder="Ex: Família Silva" onChange={e => handleInputChange('client', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Nome do Projeto</label>
              <input type="text" placeholder="Ex: Residência Lago" onChange={e => handleInputChange('project', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Serial de Acesso (Área do Cliente)</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input type="text" value={serial} readOnly placeholder="----" style={{ textAlign: "center", letterSpacing: "5px", width: "100px" }} />
                <button className="btn-secondary" onClick={generateSerial}>Gerar Novo</button>
              </div>
            </div>
          </>
        );
      case "proposal":
        return (
          <>
            <div className="form-group">
              <label>Cliente (Vincular à conta)</label>
              <select onChange={e => {
                const c = dbClients.find(cl => cl.id === Number(e.target.value));
                if (c) {
                  setSelectedClientId(c.id);
                  handleInputChange('client', c.name);
                }
              }} style={{ padding: "0.8rem", border: "1px solid #eee", borderRadius: "6px" }}>
                <option value="">Selecione...</option>
                {dbClients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Projeto</label><input type="text" onChange={e => handleInputChange('project', e.target.value)} /></div>
            <div className="form-group"><label>Objetivo</label><input type="text" placeholder="Ex: Venda, Aprovação" onChange={e => handleInputChange('objective', e.target.value)} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group"><label>Qtd. Imagens</label><input type="number" onChange={e => handleInputChange('quantity', e.target.value)} /></div>
              <div className="form-group"><label>Tipos</label><input type="text" placeholder="Ex: Internas" onChange={e => handleInputChange('viewTypes', e.target.value)} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group"><label>Prazo (dias)</label><input type="number" onChange={e => handleInputChange('deadline', e.target.value)} /></div>
              <div className="form-group"><label>Valor Total (R$)</label><input type="text" onChange={e => handleInputChange('price', e.target.value)} /></div>
            </div>
          </>
        );
      case "contract_arch":
      case "contract_viz":
        return (
          <>
            <div className="form-group"><label>Contratante</label><input type="text" onChange={e => handleInputChange('client', e.target.value)} /></div>
            <div className="form-group"><label>Projeto</label><input type="text" onChange={e => handleInputChange('project', e.target.value)} /></div>
            <div className="form-group"><label>CPF / CNPJ</label><input type="text" onChange={e => handleInputChange('doc', e.target.value)} /></div>
          </>
        );
      case "briefing":
        return (
          <>
            <div className="form-group"><label>Projeto</label><input type="text" onChange={e => handleInputChange('project', e.target.value)} /></div>
            <div className="form-group"><label>Localização</label><input type="text" onChange={e => handleInputChange('location', e.target.value)} /></div>
            <div className="form-group"><label>Fase</label><select onChange={e => handleInputChange('phase', e.target.value)} style={{ padding: "0.8rem", border: "1px solid #eee", borderRadius: "6px" }}><option>Estudo Preliminar</option><option>Anteprojeto</option><option>Executivo</option></select></div>
            <div className="form-group"><label>Atmosfera</label><input type="text" placeholder="Ex: Diurna, Dramática" onChange={e => handleInputChange('atmosphere', e.target.value)} /></div>
            <div className="form-group"><label>Notas/Restrições</label><textarea rows={3} onChange={e => handleInputChange('notes', e.target.value)} /></div>
          </>
        );
      case "delivery":
        return (
          <>
            <div className="form-group"><label>Projeto</label><input type="text" onChange={e => handleInputChange('project', e.target.value)} /></div>
            <div className="form-group"><label>Cliente</label><input type="text" onChange={e => handleInputChange('client', e.target.value)} /></div>
            <div className="form-group"><label>Qtd. Arquivos</label><input type="number" onChange={e => handleInputChange('quantity', e.target.value)} /></div>
          </>
        );
      default:
        return <p style={{ color: "#888", fontSize: "12px" }}>Preencha os dados padrão do documento selecionado.</p>;
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", height: "100%" }}>

      {/* Control Panel */}
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", border: "1px solid #eee", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>Tipo de Documento</label>
          <div className="relative">
            <select
              value={selectedDoc}
              onChange={(e) => setSelectedDoc(e.target.value)}
              style={{ width: "100%", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", appearance: "none", background: "white" }}
            >
              {docTypes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <ChevronDown size={16} style={{ position: "absolute", right: "1rem", top: "1.2rem", color: "#888", pointerEvents: "none" }} />
          </div>
        </div>

        <div style={{ borderTop: "1px solid #eee", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {renderFields()}
        </div>

        <div style={{ marginTop: "auto", display: "flex", gap: "1rem" }}>
          <div style={{ marginTop: "auto", display: "flex", gap: "1rem" }}>
            <button className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}><Eye size={16} /> Pré-visualizar</button>
            <button className="btn-secondary" onClick={handlePrint} style={{ flex: 1, justifyContent: "center" }}><Printer size={16} /> PDF</button>
            <button className="primary-btn" onClick={handleSendToClient} style={{ flex: 1, justifyContent: "center" }}><Send size={16} /> Enviar p/ Cliente</button>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div style={{ background: "#525659", padding: "2rem", borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ background: "white", width: "100%", height: "100%", maxWidth: "500px", boxShadow: "0 0 20px rgba(0,0,0,0.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div
            style={{ flex: 1, overflowY: "auto", padding: "0" }}
            dangerouslySetInnerHTML={{ __html: getDocumentTemplate(selectedDoc, { ...formData, serial }) }}
          />
        </div>
      </div>

      <style jsx>{`
                .form-group { display: flex; flexDirection: column; gap: 0.5rem; }
                .form-group label { fontSize: 11px; fontWeight: bold; color: #888; textTransform: uppercase; }
                .form-group input, .form-group textarea { padding: 0.8rem; border: 1px solid #eee; borderRadius: 6px; fontSize: 13px; width: 100%; outline: none; }
                .form-group input:focus, .form-group textarea:focus { border-color: #1a1a1a; }
            `}</style>
    </div>
  );
};


export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // State for AI Marketing Logic
  const [aiCaption, setAiCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Tab Content Helper
  const renderContent = () => {
    switch (activeTab) {
      case "overview": return (
        <div className="fade-in">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Projetos Ativos</span>
              <span className="stat-value">8</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Clientes</span>
              <span className="stat-value">12</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Prazos Próximos</span>
              <span className="stat-value">3</span>
            </div>
            <div className="stat-card highlight">
              <span className="stat-label">A receber</span>
              <span className="stat-value">R$ 15k</span>
            </div>
          </div>

          <div className="section-spacing">
            <h3>Visão Geral de Cronogramas</h3>
            <GanttChart />
          </div>
        </div>
      );

      case "projects": return (
        <div className="fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3>Explorador de Projetos (G:)</h3>
            <button className="primary-btn"><Plus size={14} /> Nova Pasta</button>
          </div>
          <div style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid #eee", minHeight: "400px" }}>
            {explorerData.map((node, i) => <FileNode key={i} node={node} />)}
          </div>
        </div>
      );

      case "clients": return (
        <div className="fade-in">
          <h3>Clientes & Dados</h3>
          <div className="table-container">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Projeto</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Serial</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.project}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td><code style={{ background: "#eee", padding: "2px 4px", borderRadius: "4px" }}>{client.serial}</code></td>
                    <td><button className="icon-btn-small"><Settings size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      case "schedules": return (
        <div className="fade-in">
          <h3>Cronogramas Detalhados</h3>
          <GanttChart />
        </div>
      );

      case "inputs": return (
        <div className="fade-in">
          <h3>Entradas (Recebidos dos Clientes)</h3>
          <div className="file-grid">
            {mockFiles.map((f, i) => (
              <div key={i} className="file-card">
                <div className="file-icon"><File size={24} color="#888" /></div>
                <div className="file-info">
                  <span className="file-name">{f.name}</span>
                  <span className="file-meta">{f.date} • {f.size}</span>
                </div>
                <button className="icon-btn-small ml-auto"><Download size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      );

      case "outputs": return (
        <div className="fade-in">
          <h3>Saídas (Enviados aos Clientes)</h3>
          <div className="file-grid">
            {mockOutputFiles.map((f, i) => (
              <div key={i} className="file-card">
                <div className="file-icon"><File size={24} color="#1a1a1a" /></div>
                <div className="file-info">
                  <span className="file-name">{f.name}</span>
                  <span className="file-meta">{f.date} • {f.size}</span>
                </div>
                <button className="icon-btn-small ml-auto"><Upload size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      );

      case "collab": return (
        <div className="fade-in">
          <h3>Colaboração & Comentários</h3>
          <CollaborationCanvas />
        </div>
      );

      case "docs": return (
        <div className="fade-in" style={{ height: "calc(100vh - 150px)" }}>
          <DocumentGenerator />
        </div>
      );

      case "finance": return (
        <div className="fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3>Controle Financeiro</h3>
            <button className="btn-secondary" onClick={() => window.open("https://docs.google.com", "_blank")}>Abrir Planilha Original</button>
          </div>
          <div style={{ width: "100%", height: "600px", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #ccc" }}>
            <div style={{ textAlign: "center", color: "#888" }}>
              <TrendingUp size={48} style={{ margin: "0 auto 1rem" }} />
              <p>Planilha Google Sheets integrada aparecerá aqui.</p>
            </div>
          </div>
        </div>
      );

      case "marketing": return (
        <div className="fade-in">
          <h3>Marketing & Instagram</h3>
          <div style={{ display: "flex", gap: "2rem", height: "600px" }}>
            <div style={{ flex: 2, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", alignContent: "start" }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} onClick={() => { setIsGenerating(true); setTimeout(() => { setAiCaption("Projeto Casa Arcos destaca-se pela materialidade bruta e integração com a natureza. #arquitetura #design"); setIsGenerating(false); }, 1500); }}
                  style={{ aspectRatio: "1", background: "#eee", borderRadius: "8px", cursor: "pointer", position: "relative", overflow: "hidden" }} className="img-hover">
                  <Image src={`/casa-arcos/view${i > 5 ? 2 : i < 2 ? 2 : i}.png`} alt="Post" fill style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>

            <div style={{ flex: 1, background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #eee", display: "flex", flexDirection: "column" }}>
              <h4 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Instagram size={18} /> Legenda IA</h4>
              <textarea
                value={isGenerating ? "Gerando legenda com IA..." : aiCaption}
                onChange={(e) => setAiCaption(e.target.value)}
                placeholder="Selecione uma imagem para gerar..."
                style={{ flex: 1, margin: "1rem 0", padding: "1rem", border: "1px solid #eee", borderRadius: "8px", resize: "none", fontSize: "14px", fontFamily: "sans-serif" }}
              />
              <button className="primary-btn" style={{ justifyContent: "center", background: "#E1306C" }}>Publicar no Instagram</button>
            </div>
          </div>
        </div>
      );

      case "admin": return (
        <div className="fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3>Administração Geral (Drive)</h3>
            <button className="btn-secondary" onClick={() => window.open("https://drive.google.com", "_blank")}>Abrir Drive</button>
          </div>
          <div style={{ width: "100%", height: "600px", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #ccc" }}>
            <div style={{ textAlign: "center", color: "#888" }}>
              <Folder size={48} style={{ margin: "0 auto 1rem" }} />
              <p>Google Drive Administrativo integrado aparecerá aqui.</p>
            </div>
          </div>
        </div>
      );

      default: return null;
    }
  };


  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-text">DF</div>
          <span className="logo-label">ADMIN</span>
        </div>

        <nav className="nav-menu">
          <button className={`nav-item ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
            <Briefcase size={18} /> <span>Painel</span>
          </button>

          <div className="nav-divider">PROJETOS</div>

          <button className={`nav-item ${activeTab === "projects" ? "active" : ""}`} onClick={() => setActiveTab("projects")}>
            <Folder size={18} /> <span>Projetos (Explorer)</span>
          </button>
          <button className={`nav-item ${activeTab === "schedules" ? "active" : ""}`} onClick={() => setActiveTab("schedules")}>
            <Calendar size={18} /> <span>Cronogramas</span>
          </button>
          <button className={`nav-item ${activeTab === "inputs" ? "active" : ""}`} onClick={() => setActiveTab("inputs")}>
            <Download size={18} /> <span>Entradas clients</span>
          </button>
          <button className={`nav-item ${activeTab === "outputs" ? "active" : ""}`} onClick={() => setActiveTab("outputs")}>
            <Upload size={18} /> <span>Saídas clients</span>
          </button>
          <button className={`nav-item ${activeTab === "collab" ? "active" : ""}`} onClick={() => setActiveTab("collab")}>
            <MessageSquare size={18} /> <span>Colaboração</span>
          </button>

          <div className="nav-divider">GESTÃO</div>

          <button className={`nav-item ${activeTab === "clients" ? "active" : ""}`} onClick={() => setActiveTab("clients")}>
            <Users size={18} /> <span>Clientes</span>
          </button>
          <button className={`nav-item ${activeTab === "docs" ? "active" : ""}`} onClick={() => setActiveTab("docs")}>
            <FileText size={18} /> <span>Documentos</span>
          </button>
          <button className={`nav-item ${activeTab === "finance" ? "active" : ""}`} onClick={() => setActiveTab("finance")}>
            <TrendingUp size={18} /> <span>Finanças</span>
          </button>
          <button className={`nav-item ${activeTab === "marketing" ? "active" : ""}`} onClick={() => setActiveTab("marketing")}>
            <Instagram size={18} /> <span>Marketing</span>
          </button>
          <button className={`nav-item ${activeTab === "admin" ? "active" : ""}`} onClick={() => setActiveTab("admin")}>
            <Shield size={18} /> <span>Administração</span>
          </button>

        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">D</div>
            <div className="user-details">
              <span className="name">Daniel França</span>
            </div>
          </div>
          <button onClick={() => router.push("/login")} className="logout-btn">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-header">
          <h2 style={{ fontSize: "1.2rem", fontWeight: "600", textTransform: "capitalize" }}>
            {activeTab === "overview" && "Visão Geral"}
            {activeTab === "projects" && "Explorador de Arquivos"}
            {activeTab === "schedules" && "Cronogramas Gantt"}
            {activeTab === "inputs" && "Arquivos Recebidos"}
            {activeTab === "outputs" && "Entregas Realizadas"}
            {activeTab === "collab" && "Colaboração Visual"}
            {activeTab === "clients" && "Base de Clientes"}
            {activeTab === "docs" && "Emissão de Documentos"}
            {activeTab === "finance" && "Gestão Financeira"}
            {activeTab === "marketing" && "Social Media"}
            {activeTab === "admin" && "Arquivos Administrativos"}
          </h2>
          <div className="actions">
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Buscar..." />
            </div>
            <button className="icon-btn"><Settings size={20} /></button>
          </div>
        </header>

        <div className="content-scroll">
          {renderContent()}
        </div>
      </main>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          background: #f8f9fa;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* SIDEBAR */
        .sidebar {
          width: 260px;
          background: #111;
          color: white;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          z-index: 10;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .logo-text { font-weight: 700; font-size: 1.5rem; color: white; }
        .logo-label { font-size: 0.7rem; font-weight: 500; color: #888; letter-spacing: 0.1em; }

        .nav-menu { display: flex; flex-direction: column; gap: 0.2rem; flex: 1; overflow-y: auto; }

        .nav-divider {
            font-size: 0.65rem;
            color: #555;
            letter-spacing: 0.1em;
            margin: 1rem 0 0.5rem;
            padding-left: 0.5rem;
            font-weight: 600;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.6rem 0.8rem;
          background: transparent;
          border: none;
          border-radius: 6px;
          color: #aaa;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }

        .nav-item:hover { background: #222; color: white; }
        .nav-item.active { background: #333; color: white; font-weight: 500; }

        .sidebar-footer {
          border-top: 1px solid #222;
          padding-top: 1rem;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .user-info { display: flex; align-items: center; gap: 0.8rem; }
        .avatar { width: 32px; height: 32px; background: #333; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; color: white; font-size: 0.8rem; }
        .name { font-size: 0.8rem; font-weight: 500; }
        .logout-btn { background: none; border: none; color: #666; cursor: pointer; padding: 0.5rem; transition: color 0.2s; }
        .logout-btn:hover { color: #fff; }

        /* MAIN */
        .main-content { flex: 1; display: flex; flex-direction: column; position: relative; }

        .top-header {
          height: 70px;
          background: white;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }

        .search-bar { display: flex; align-items: center; background: #f5f5f5; padding: 0.5rem 1rem; border-radius: 6px; width: 300px; gap: 0.8rem; }
        .search-bar input { background: transparent; border: none; outline: none; width: 100%; font-size: 0.85rem; }
        .search-icon { color: #888; }
        .actions { display: flex; gap: 1rem; align-items: center; }
        .icon-btn { background: none; border: 1px solid #eee; width: 36px; height: 36px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #555; }

        .btn-secondary { background: white; border: 1px solid #ddd; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .primary-btn { background: #1a1a1a; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 500; }

        .content-scroll { padding: 2rem; overflow-y: auto; flex: 1; }

        /* CARDS & GRIDS */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .stat-card { background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #eee; display: flex; flex-direction: column; gap: 0.5rem; }
        .stat-card.highlight { border-left: 4px solid #1a1a1a; }
        .stat-label { font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; }
        .stat-value { font-size: 1.8rem; font-weight: 600; color: #1a1a1a; }

        .section-spacing { margin-top: 2rem; }

        /* TABLES */
        .table-container { background: white; border-radius: 12px; border: 1px solid #eee; padding: 1rem; overflow-x: auto; }
        .clients-table { width: 100%; border-collapse: collapse; }
        .clients-table th { text-align: left; padding: 1rem; font-size: 0.75rem; color: #888; font-weight: 600; border-bottom: 1px solid #f0f0f0; text-transform: uppercase; }
        .clients-table td { padding: 1rem; font-size: 0.9rem; border-bottom: 1px solid #f9f9f9; color: #333; }
        .icon-btn-small { background: none; border: none; cursor: pointer; color: #aaa; }
        .icon-btn-small:hover { color: #1a1a1a; }

        /* FILES */
        .file-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
        .file-card { background: white; padding: 1rem; border-radius: 8px; border: 1px solid #eee; display: flex; alignItems: center; gap: 1rem; }
        .file-info { display: flex; flex-direction: column; }
        .file-name { font-size: 0.9rem; font-weight: 500; }
        .file-meta { font-size: 0.75rem; color: #888; }
        
        .fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .img-hover:hover { opacity: 0.8; }
      `}</style>
    </div>
  );
}
