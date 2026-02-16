"use client";

import { useState } from "react";
import {
  Home,
  User,
  MessageSquare,
  Image as ImageIcon,
  CheckCircle,
  LogOut,
  Download,
  Clock
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { getClientDataAction } from "../actions/client-data";

// Mock Data removed, using dynamic state now.

// --- COMPONENTS ---

// 1. Client Gantt (Read Only)
const ClientGantt = ({ project }: { project: string }) => (
  <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", marginTop: "1rem" }}>
    <h4 style={{ fontSize: "14px", marginBottom: "1.5rem" }}>Cronograma do Projeto: {project}</h4>
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {["Levantamento", "Estudo Preliminar", "Anteprojeto", "Legal", "Executivo", "Interiores"].map((stage, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "150px 1fr", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "12px", color: i < 2 ? "#1a1a1a" : "#aaa", fontWeight: i < 2 ? "bold" : "normal" }}>{stage}</span>
          <div style={{ background: "#f5f5f5", height: "8px", borderRadius: "4px", position: "relative" }}>
            <div style={{
              width: i === 0 ? "100%" : i === 1 ? "60%" : "0%",
              background: i === 0 ? "#4CAF50" : "#1a1a1a",
              height: "100%", borderRadius: "4px"
            }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 2. Collaboration (Same as Admin but Client View)
const CollaborationCanvas = () => {
  const [markers, setMarkers] = useState<{ x: number, y: number, id: number }[]>([]);

  // In a real app, existing markers from admin would be loaded here

  const addMarker = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = markers.length + 1;
    setMarkers([...markers, { x, y, id }]);
  };

  return (
    <div style={{ display: "flex", gap: "2rem", height: "500px" }}>
      <div style={{ flex: 2, position: "relative", background: "#ddd", borderRadius: "8px", overflow: "hidden", cursor: "crosshair" }} onClick={addMarker}>
        <Image src="/vista3-arcos.png" alt="Colaboração" fill style={{ objectFit: "contain" }} />
        {markers.map(m => (
          <div key={m.id} style={{
            position: "absolute", top: m.y, left: m.x, width: "24px", height: "24px",
            background: "#4CAF50", color: "white", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: "bold", transform: "translate(-50%, -50%)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)"
          }}>
            {m.id}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid #eee" }}>
        <p style={{ fontSize: "12px", color: "#666", marginBottom: "1rem" }}>
          Clique na imagem para adicionar um comentário ou dúvida. O arquiteto receberá uma notificação.
        </p>
        {markers.map(m => (
          <div key={m.id} style={{ marginBottom: "0.5rem", fontSize: "12px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "16px", height: "16px", background: "#4CAF50", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "8px" }}>{m.id}</div>
            <input placeholder="Digite seu comentário..." style={{ border: "none", borderBottom: "1px solid #eee", width: "100%", outline: "none", fontSize: "12px" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const progressImages = [
  { id: 1, src: "/casa-arcos/view1.png", stage: "Estudo Preliminar", date: "15/01/2026" },
  { id: 2, src: "/casa-arcos/view2.png", stage: "Anteprojeto", date: "10/02/2026" },
];

export default function ClientDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("timeline");
  const [firstTime, setFirstTime] = useState(true); // Simulating first access
  const [selectedService, setSelectedService] = useState("");

  // New States
  const [clientData, setClientData] = useState<any>(null);
  const [serialInput, setSerialInput] = useState("");

  useEffect(() => {
    const savedSerial = localStorage.getItem("clientSerial");
    if (savedSerial) {
      setSerialInput(savedSerial);
      getClientDataAction(savedSerial).then(data => {
        if (data) {
          setClientData(data);
          setFirstTime(false);
        }
      });
    }
  }, []);

  const handleLogin = async () => {
    const data = await getClientDataAction(serialInput.toUpperCase());
    if (data) {
      setClientData(data);
      setFirstTime(false);
      localStorage.setItem("clientSerial", serialInput.toUpperCase());
    } else {
      alert("Serial não encontrado. Tente 'LOFT', 'ARCO' ou 'QUAR'.");
    }
  };

  if (firstTime) {
    return (
      <div className="welcome-modal">
        <div className="modal-content">
          <h1>Bem-vindo à Área do Cliente</h1>
          <p>Estamos felizes em iniciar essa jornada com você. Para configurarmos seu painel, confirme o tipo de serviço contratado:</p>

          <div className="service-options">
            <button onClick={() => setSelectedService("arquitetura")} className={selectedService === "arquitetura" ? "selected" : ""}>
              Arquitetura & Interiores
            </button>
            <button onClick={() => setSelectedService("visualizacao")} className={selectedService === "visualizacao" ? "selected" : ""}>
              Visualização 3D (Archviz)
            </button>
          </div>

          {selectedService && (
            <div className="serial-input">
              <label>Insira seu Número de Série (enviado por email)</label>
              <input type="text" placeholder="EX: LOFT" maxLength={4} value={serialInput} onChange={e => setSerialInput(e.target.value)} />
              <button onClick={handleLogin} className="start-btn">Acessar Meu Painel</button>
            </div>
          )}
        </div>

        <style jsx>{`
                .welcome-modal { position: fixed; inset: 0; background: white; z-index: 100; display: flex; align-items: center; justifyContent: center; }
                .modal-content { max-width: 500px; text-align: center; display: flex; flex-direction: column; gap: 2rem; }
                h1 { font-size: 2rem; font-weight: 300; letter-spacing: -0.02em; }
                p { color: #666; font-weight: 300; line-height: 1.6; }
                .service-options { display: flex; gap: 1rem; justify-content: center; }
                .service-options button { padding: 1rem 2rem; border: 1px solid #ddd; background: transparent; cursor: pointer; transition: all 0.2s; }
                .service-options button:hover, .service-options button.selected { background: #1a1a1a; color: white; border-color: #1a1a1a; }
                .serial-input { display: flex; flex-direction: column; gap: 0.5rem; text-align: left; max-width: 300px; margin: 0 auto; width: 100%; }
                .serial-input label { font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; }
                .serial-input input { padding: 0.8rem; border: 1px solid #ddd; text-align: center; letter-spacing: 0.5em; font-size: 1.2rem; outline: none; }
                .start-btn { margin-top: 1rem; padding: 1rem; background: #1a1a1a; color: white; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.8rem; }
              `}</style>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "timeline": return (
        <div className="fade-in">
          <h3>Progresso Geral</h3>
          <div className="stats-header">
            <div className="stat-box">
              <span>Status Atual</span>
              <strong>Em Andamento</strong>
            </div>
            <div className="stat-box">
              <span>Próxima Entrega</span>
              <strong>20 Jan 2026</strong>
              <strong>{clientData.nextDeliveryDate || "N/A"}</strong>
            </div>
            <div className="stat-box">
              <span>Etapa</span>
              <strong>{clientData.currentStage || "N/A"}</strong>
            </div>
          </div>
          <ClientGantt project={clientData.project} />
        </div>
      );

      case "data": return (
        <div className="fade-in">
          <h3>Meus Dados</h3>
          <div className="data-card">
            <div className="field">
              <label>Nome Principal</label>
              <p>{clientData.name}</p>
            </div>
            <div className="field">
              <label>Projeto</label>
              <p>{clientData.project}</p>
            </div>
            <div className="field">
              <label>Endereço da Obra</label>
              <p>{clientData.address}</p>
            </div>
            <div className="field">
              <label>Contatos</label>
              <p>{clientData.email} | {clientData.phone}</p>
            </div>
          </div>
        </div>
      );

      case "collab": return (
        <div className="fade-in">
          <h3>Colaboração em Imagens</h3>
          <p style={{ fontSize: "14px", color: "#888", marginBottom: "1rem" }}>Visualize as imagens em desenvolvimento e deixe seus apontamentos em tempo real.</p>
          <CollaborationCanvas />
        </div>
      );

      case "progress": return (
        <div className="fade-in">
          <h3>Imagens do Processo</h3>
          <div className="gallery-grid">
            {progressImages.map(img => (
              <div key={img.id} className="image-card">
                <div className="img-wrapper">
                  {/* Placeholder for real image */}
                  <div style={{ width: "100%", height: "200px", background: "#eee" }} />
                </div>
                <div className="img-info">
                  <span>{img.stage}</span>
                  <small>{img.date}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      case "deliveries": return (
        <div className="fade-in">
          <h3>Entregas Finais & Documentos</h3>
          <div className="deliveries-list">
            {clientData.deliveries && clientData.deliveries.length > 0 ? clientData.deliveries.map((d: any) => (
              <div key={d.id} className="delivery-item">
                <div className="d-icon"><CheckCircle size={20} color={d.status === "Approved" ? "#4CAF50" : "#ccc"} /></div>
                <div className="d-info">
                  <span className="d-name">{d.name}</span>
                  <span className="d-date">{d.date}</span>
                </div>
                <div className="d-actions">
                  {d.status === "Pending" ? (
                    <span className="badge-pending">Aguardando Aprovação</span>
                  ) : (
                    <button className="download-btn"><Download size={16} /> Baixar (Original)</button>
                  )}
                </div>
              </div>
            )) : <p>Nenhuma entrega disponível no momento.</p>}
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
          <span className="logo-label" style={{ color: "#aaa" }}>ÁREA DO CLIENTE</span>
        </div>

        <nav className="nav-menu">
          <button className={`nav-item ${activeTab === "timeline" ? "active" : ""}`} onClick={() => setActiveTab("timeline")}>
            <Clock size={18} /> <span>Linha do Tempo</span>
          </button>
          <button className={`nav-item ${activeTab === "data" ? "active" : ""}`} onClick={() => setActiveTab("data")}>
            <User size={18} /> <span>Meus Dados</span>
          </button>
          <button className={`nav-item ${activeTab === "collab" ? "active" : ""}`} onClick={() => setActiveTab("collab")}>
            <MessageSquare size={18} /> <span>Colaboração</span>
          </button>
          <button className={`nav-item ${activeTab === "progress" ? "active" : ""}`} onClick={() => setActiveTab("progress")}>
            <ImageIcon size={18} /> <span>Progresso</span>
          </button>
          <button className={`nav-item ${activeTab === "deliveries" ? "active" : ""}`} onClick={() => setActiveTab("deliveries")}>
            <CheckCircle size={18} /> <span>Entregas Finais</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => router.push("/login")} className="logout-btn">
            <LogOut size={16} /> <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-header">
          <h2>{clientData.project}</h2>
          <div className="user-pill">
            <span>{clientData.name}</span>
            <div className="avatar">F</div>
          </div>
        </header>

        <div className="content-scroll">
          {renderContent()}
        </div>
      </main>

      <style jsx>{`
        .dashboard-container { display: flex; height: 100vh; width: 100vw; background: #fff; font-family: 'Inter', sans-serif; overflow: hidden; }
        
        /* SIDEBAR - Lighter theme for Client */
        .sidebar { width: 250px; background: #f8f8f8; color: #333; display: flex; flex-direction: column; padding: 1.5rem; border-right: 1px solid #eee; }
        .sidebar-header { margin-bottom: 3rem; display: flex; align-items: center; gap: 0.8rem; }
        .logo-text { font-weight: 700; font-size: 1.5rem; color: #1a1a1a; }
        .nav-menu { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
        .nav-item { display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: transparent; border: none; border-radius: 6px; color: #666; font-size: 0.9rem; cursor: pointer; text-align: left; }
        .nav-item:hover { background: #eee; color: #1a1a1a; }
        .nav-item.active { background: #1a1a1a; color: white; font-weight: 500; }
        .sidebar-footer { padding-top: 1rem; border-top: 1px solid #eee; }
        .logout-btn { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: #888; cursor: pointer; font-size: 0.85rem; }
        .logout-btn:hover { color: #d9534f; }

        /* MAIN */
        .main-content { flex: 1; display: flex; flex-direction: column; }
        .top-header { height: 70px; border-bottom: 1px solid #eee; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; background: white; }
        .top-header h2 { font-size: 1.1rem; font-weight: 500; color: #1a1a1a; }
        .user-pill { display: flex; align-items: center; gap: 0.8rem; font-size: 0.9rem; font-weight: 500; }
        .avatar { width: 32px; height: 32px; background: #1a1a1a; color: white; borderRadius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; }
        
        .content-scroll { padding: 2rem; overflow-y: auto; flex: 1; background: #fafafa; }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* WIDGETS */
        .stats-header { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .stat-box { background: white; padding: 1.5rem; border: 1px solid #eee; border-radius: 8px; display: flex; flex-direction: column; gap: 0.5rem; }
        .stat-box span { font-size: 0.75rem; text-transform: uppercase; color: #888; letter-spacing: 0.05em; }
        .stat-box strong { font-size: 1.2rem; color: #1a1a1a; }

        .data-card { background: white; padding: 2rem; border-radius: 8px; border: 1px solid #eee; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .field label { display: block; font-size: 0.75rem; color: #888; margin-bottom: 0.5rem; text-transform: uppercase; }
        .field p { font-size: 1rem; color: #1a1a1a; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.5rem; }

        .image-card { background: white; border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
        .img-info { padding: 1rem; }
        .img-info span { display: block; font-weight: 500; font-size: 0.9rem; }
        .img-info small { color: #888; font-size: 0.8rem; }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }

        .deliveries-list { display: flex; flex-direction: column; gap: 1rem; }
        .delivery-item { background: white; padding: 1rem; border: 1px solid #eee; border-radius: 8px; display: flex; align-items: center; gap: 1rem; }
        .d-info { flex: 1; display: flex; flex-direction: column; }
        .d-name { font-weight: 500; font-size: 0.9rem; }
        .d-date { font-size: 0.8rem; color: #888; }
        .badge-pending { font-size: 0.75rem; background: #fff3cd; color: #856404; padding: 0.2rem 0.6rem; border-radius: 12px; }
        .download-btn { background: #1a1a1a; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
      `}</style>
    </div>
  );
}
