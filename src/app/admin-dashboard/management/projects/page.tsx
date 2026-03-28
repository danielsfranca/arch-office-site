'use client';

import React, { useState, useEffect } from 'react';
import { getProjectsAction, createProjectAction } from '@/app/actions/project-actions';
import { Project, Client } from '@/lib/db';
import { COLORS } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { Plus, X, Search, Calendar, User, MoreVertical, Briefcase } from 'lucide-react';

export default function ProjectsDashboard() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        client_user_id: '',
        start_date: '',
        deadline: '',
        complexity: 'baixa' as 'baixa' | 'media' | 'alta'
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const data = await getProjectsAction();
            setProjects(data.projects);
            setClients(data.clients);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.client_user_id) return alert('Preencha nome e cliente.');

        setIsLoading(true);
        const result = await createProjectAction({
            name: formData.name,
            client_user_id: formData.client_user_id,
            start_date: formData.start_date,
            deadline: formData.deadline,
            complexity: formData.complexity
        });

        if (result.success && result.project) {
            setProjects([...projects, result.project]);
            setIsModalOpen(false);
            setFormData({ name: '', client_user_id: '', start_date: '', deadline: '', complexity: 'baixa' });
            router.push(`/admin-dashboard/management/projects/${result.project.id}`);
        } else {
            alert(result.message);
        }
        setIsLoading(false);
    };

    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* HEADER DASBOARD */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.textPrimary }}>Painel de Projetos</h1>
                    <p style={{ color: COLORS.textSecondary, fontSize: '0.9rem' }}>Gestão de obras e cronogramas (Admin).</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    {/* SEARCH */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Search size={16} style={{ position: 'absolute', left: '10px', color: COLORS.textSecondary }} />
                        <input
                            type="text"
                            placeholder="Buscar projetos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                padding: '0.6rem 1rem 0.6rem 2rem',
                                border: `1px solid ${COLORS.border}`,
                                borderRadius: '6px',
                                outline: 'none',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>

                    {/* ADD BUTTON */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            background: COLORS.textPrimary,
                            color: COLORS.bgPrimary,
                            border: 'none',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: 500,
                            transition: 'opacity 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        <Plus size={16} /> Novo Projeto
                    </button>
                </div>
            </div>

            {/* Tabela Exibição */}
            <div style={{ background: COLORS.bgPrimary, borderRadius: '8px', border: `1px solid ${COLORS.border}`, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f9f9f9', borderBottom: `1px solid ${COLORS.border}` }}>
                        <tr>
                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: COLORS.textSecondary, fontWeight: 600 }}>PROJETO</th>
                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: COLORS.textSecondary, fontWeight: 600 }}>CLIENTE (OWNER)</th>
                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: COLORS.textSecondary, fontWeight: 600 }}>STATUS</th>
                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: COLORS.textSecondary, fontWeight: 600 }}>PROGRESSO</th>
                            <th style={{ padding: '1rem', fontSize: '0.8rem', color: COLORS.textSecondary, fontWeight: 600 }}>PRAZO FINAL</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center' }}>Carregando projetos...</td></tr>
                        ) : filteredProjects.length === 0 ? (
                            <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: COLORS.textSecondary }}>Nenhum projeto encontrado.</td></tr>
                        ) : filteredProjects.map((project) => {
                            const client = clients.find(c => c.id?.toString() === project.client_user_id?.toString());

                            const statusColors = {
                                'lead': COLORS.warning,
                                'active': COLORS.info,
                                'finished': COLORS.success
                            };
                            const statusText = {
                                'lead': 'Prospecto / Negociação',
                                'active': 'Em Andamento',
                                'finished': 'Concluído'
                            };

                            return (
                                <tr
                                    key={project.id}
                                    onClick={() => router.push(`/admin-dashboard/management/projects/${project.id}`)}
                                    style={{ borderBottom: `1px solid ${COLORS.border}`, cursor: 'pointer' }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ background: '#f5f5f5', padding: '8px', borderRadius: '6px' }}><Briefcase size={16} color={COLORS.textPrimary} /></div>
                                        <span style={{ fontWeight: 500, color: COLORS.textPrimary }}>{project.name}</span>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> {client ? client.name : 'Desconhecido'}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            background: statusColors[project.status] + '20',
                                            color: statusColors[project.status],
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: 600
                                        }}>
                                            {statusText[project.status]}
                                        </span>
                                    </td>
                                    {/* Fake Progress For Now (needs connection to Tasks schema next interface) */}
                                    <td style={{ padding: '1rem', minWidth: '150px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ flex: 1, height: '6px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ width: project.status === 'lead' ? '5%' : project.status === 'finished' ? '100%' : '45%', height: '100%', background: COLORS.textPrimary }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.8rem', color: '#888' }}>
                                                {project.status === 'lead' ? '5%' : project.status === 'finished' ? '100%' : '45%'}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {project.deadline ? new Date(project.deadline).toLocaleDateString('pt-BR') : 'Sem prazo'}</div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888' }}>
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


            {/* MODAL CRIAÇÃO DE PROJETO */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Criar Novo Projeto</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: COLORS.textSecondary }}>Nome da Obra/Projeto</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: Reforma Apartamento Pinheiros"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ padding: '0.8rem', border: `1px solid ${COLORS.border}`, borderRadius: '6px', outline: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: COLORS.textSecondary }}>Vincular a um Cliente Existente</label>
                                <select
                                    required
                                    value={formData.client_user_id}
                                    onChange={e => setFormData({ ...formData, client_user_id: e.target.value })}
                                    style={{ padding: '0.8rem', border: `1px solid ${COLORS.border}`, borderRadius: '6px', outline: 'none', background: 'white' }}
                                >
                                    <option value="">Selecione um cliente da base...</option>
                                    {clients.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} - ({c.email})</option>
                                    ))}
                                </select>
                                <span style={{ fontSize: '0.75rem', color: '#888' }}>O cliente receberá links automáticos para acessar arquivos.</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: COLORS.textSecondary }}>Nível de Complexidade do Projeto</label>
                                <select
                                    required
                                    value={formData.complexity}
                                    onChange={e => setFormData({ ...formData, complexity: e.target.value as 'baixa' | 'media' | 'alta' })}
                                    style={{ padding: '0.8rem', border: `1px solid ${COLORS.border}`, borderRadius: '6px', outline: 'none', background: 'white' }}
                                >
                                    <option value="baixa">Baixa Complexidade</option>
                                    <option value="media">Média Complexidade</option>
                                    <option value="alta">Alta Complexidade</option>
                                </select>
                                <span style={{ fontSize: '0.75rem', color: '#888' }}>Define automaticamente o fluxograma e as macro/microetapas no Quadro Kanban.</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: COLORS.textSecondary }}>Data de Início</label>
                                    <input
                                        type="date"
                                        value={formData.start_date}
                                        onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                                        style={{ padding: '0.8rem', border: `1px solid ${COLORS.border}`, borderRadius: '6px', outline: 'none' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: COLORS.textSecondary }}>Previsão de Entrega</label>
                                    <input
                                        type="date"
                                        value={formData.deadline}
                                        onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                        style={{ padding: '0.8rem', border: `1px solid ${COLORS.border}`, borderRadius: '6px', outline: 'none' }}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    marginTop: '1rem',
                                    background: COLORS.textPrimary,
                                    color: COLORS.bgPrimary,
                                    border: 'none',
                                    padding: '1rem',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                            >
                                {isLoading ? 'Criando Projeto...' : 'Criar Novo Projeto'}
                            </button>
                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}
