'use client';

import React, { useState, useMemo } from 'react';
import { BoardColumn, Task } from '@/lib/db';
import { updateTaskAction, deleteTaskAction, createTaskAction } from '@/app/actions/kanban-actions';
import { COLORS } from '@/lib/constants';
import { Calendar, Trash2, X, Plus, ChevronDown, ChevronRight, AlignLeft, CheckSquare, Clock } from 'lucide-react';

interface KanbanBoardProps {
    projectId: string;
    initialColumns: BoardColumn[];
    initialTasks: Task[];
}

export default function KanbanBoard({ projectId, initialColumns, initialTasks }: KanbanBoardProps) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [columns] = useState<BoardColumn[]>(initialColumns.sort((a, b) => a.order_index - b.order_index));
    const [expandedCols, setExpandedCols] = useState<Record<string, boolean>>(
        initialColumns.reduce((acc, col) => ({ ...acc, [col.id]: true }), {})
    );

    // Side Drawer state
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const toggleColumn = (colId: string) => {
        setExpandedCols(prev => ({ ...prev, [colId]: !prev[colId] }));
    };

    const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
        const newTasks = tasks.map(t => t.id.toString() === taskId ? { ...t, ...updates } : t);
        setTasks(newTasks);
        if (activeTask && activeTask.id.toString() === taskId) {
            setActiveTask({ ...activeTask, ...updates });
        }
        await updateTaskAction(taskId, updates);
    };

    const handleDeleteTask = async (taskId: string) => {
        const confirm = window.confirm("Deseja realmente excluir esta tarefa?");
        if (confirm) {
            setTasks(tasks.filter(t => t.id.toString() !== taskId));
            setActiveTask(null);
            await deleteTaskAction(taskId);
        }
    };

    const handleCreateTask = async (columnId: string) => {
        const title = prompt("Digite o título da nova tarefa:");
        if (!title) return;
        const res = await createTaskAction(projectId, columnId, title, '', '');
        if (res.success && res.task) {
            setTasks([...tasks, res.task]);
        }
    };

    // Helper functions for UI
    const getTaskDuration = (task: Task) => {
        if (task.description && task.description.includes('semana')) {
            const match = task.description.match(/(\d+)\s*semana/i);
            if (match) return `${match[1]} semanas`;
        }
        return '-';
    };

    return (
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative', marginTop: '1rem', border: `1px solid ${COLORS.border}`, borderRadius: '8px', background: '#fff' }}>

            {/* Esquerda: Tabela de Tarefas (Tree List) */}
            <div style={{ flex: activeTask ? '0 0 60%' : '1', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', overflowY: 'auto', borderRight: activeTask ? `1px solid ${COLORS.border}` : 'none' }}>

                {/* Cabeçalho da Tabela */}
                <div style={{ display: 'grid', gridTemplateColumns: '80px 3fr 1fr 1fr 1fr', padding: '12px 16px', background: '#f9fafb', borderBottom: `1px solid ${COLORS.border}`, fontSize: '0.75rem', fontWeight: 600, color: COLORS.textSecondary, textTransform: 'uppercase', position: 'sticky', top: 0, zIndex: 10 }}>
                    <div>Nº</div>
                    <div>Etapas / Tarefas</div>
                    <div>Duração</div>
                    <div>Início</div>
                    <div>Fim</div>
                </div>

                {/* Linhas da Tabela */}
                <div style={{ paddingBottom: '2rem' }}>
                    {columns.map((col, colIdx) => {
                        const colTasks = tasks.filter(t => t.column_id.toString() === col.id.toString());
                        const isExpanded = expandedCols[col.id];

                        return (
                            <React.Fragment key={col.id}>
                                {/* Linha da Macroetapa (Header Group) */}
                                <div
                                    onClick={() => toggleColumn(col.id.toString())}
                                    style={{
                                        display: 'grid', gridTemplateColumns: '80px 3fr 1fr 1fr 1fr', padding: '12px 16px',
                                        borderBottom: `1px solid #f0f0f0`, background: '#fafafa', cursor: 'pointer',
                                        alignItems: 'center', fontSize: '0.85rem', fontWeight: 600, color: COLORS.textPrimary
                                    }}>
                                    <div>{colIdx + 1}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: COLORS.accent }}></div>
                                        {col.name}
                                    </div>
                                    <div style={{ color: COLORS.textSecondary, fontSize: '0.75rem', fontWeight: 400 }}>{colTasks.length} tarefas</div>
                                    <div>-</div>
                                    <div>-</div>
                                </div>

                                {/* Linhas das Microetapas (Tasks) */}
                                {isExpanded && colTasks.map((task, taskIdx) => (
                                    <div
                                        key={task.id}
                                        onClick={() => setActiveTask(task)}
                                        style={{
                                            display: 'grid', gridTemplateColumns: '80px 3fr 1fr 1fr 1fr', padding: '12px 16px',
                                            borderBottom: `1px solid #f5f5f5`, cursor: 'pointer',
                                            alignItems: 'center', fontSize: '0.85rem', color: COLORS.textPrimary,
                                            background: activeTask?.id === task.id ? '#f3f4f6' : 'white',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseOver={(e) => { if (activeTask?.id !== task.id) e.currentTarget.style.backgroundColor = '#f9fafb' }}
                                        onMouseOut={(e) => { if (activeTask?.id !== task.id) e.currentTarget.style.backgroundColor = 'white' }}
                                    >
                                        <div style={{ color: COLORS.textSecondary, paddingLeft: '8px' }}>{colIdx + 1}.{taskIdx + 1}</div>
                                        <div style={{ paddingLeft: '28px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {task.title}
                                        </div>
                                        <div style={{ color: COLORS.textSecondary }}>{getTaskDuration(task)}</div>
                                        <div style={{ color: COLORS.textSecondary }}>-</div>
                                        <div style={{ color: COLORS.textSecondary }}>{task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : '-'}</div>
                                    </div>
                                ))}

                                {/* Botão Adicionar rápida */}
                                {isExpanded && (
                                    <div style={{ padding: '8px 16px', paddingLeft: '124px', borderBottom: `1px solid #f0f0f0` }}>
                                        <button
                                            onClick={() => handleCreateTask(col.id.toString())}
                                            style={{ background: 'transparent', border: 'none', color: COLORS.textSecondary, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                                        >
                                            <Plus size={12} /> Adicionar nova tarefa
                                        </button>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Direita: Painel Lateral da Tarefa (Drawer) */}
            {activeTask && (
                <div style={{ flex: '0 0 40%', background: '#fff', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

                    {/* Drawer Header */}
                    <div style={{ padding: '16px 24px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
                        <span style={{ fontSize: '0.8rem', color: COLORS.textSecondary, fontWeight: 500 }}>Detalhes da Tarefa</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => handleDeleteTask(activeTask.id.toString())} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#dc2626', padding: '4px' }} title="Excluir">
                                <Trash2 size={16} />
                            </button>
                            <button onClick={() => setActiveTask(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: COLORS.textSecondary, padding: '4px' }}>
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Drawer Content */}
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Title Edit */}
                        <textarea
                            value={activeTask.title}
                            onChange={(e) => handleUpdateTask(activeTask.id.toString(), { title: e.target.value })}
                            style={{ fontSize: '1.25rem', fontWeight: 600, border: 'none', width: '100%', outline: 'none', resize: 'none', fontFamily: 'inherit', color: COLORS.textPrimary, background: 'transparent' }}
                            rows={2}
                        />

                        {/* Status / Dates grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <span style={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>Status</span>
                                <select style={{ padding: '6px 8px', borderRadius: '4px', border: `1px solid ${COLORS.border}`, fontSize: '0.85rem', outline: 'none', background: '#f9fafb' }}>
                                    <option>Planejada</option>
                                    <option>Em Andamento</option>
                                    <option>Concluída</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <span style={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>Previsão de Fim</span>
                                <input
                                    type="date"
                                    value={activeTask.due_date || ''}
                                    onChange={(e) => handleUpdateTask(activeTask.id.toString(), { due_date: e.target.value })}
                                    style={{ padding: '6px 8px', borderRadius: '4px', border: `1px solid ${COLORS.border}`, fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }}
                                />
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: `1px solid ${COLORS.border}`, margin: '0.5rem 0' }} />

                        {/* Description */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.textPrimary, fontWeight: 500, fontSize: '0.9rem' }}>
                                <AlignLeft size={16} /> Descrição
                            </div>
                            <textarea
                                value={activeTask.description || ''}
                                placeholder="Adicione uma descrição detalhada..."
                                onChange={(e) => handleUpdateTask(activeTask.id.toString(), { description: e.target.value })}
                                style={{ fontSize: '0.875rem', border: '1px solid transparent', padding: '8px', width: '100%', minHeight: '120px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', background: '#f9fafb', borderRadius: '6px', color: COLORS.textSecondary }}
                                onFocus={(e) => e.target.style.border = `1px solid ${COLORS.border}`}
                                onBlur={(e) => e.target.style.border = '1px solid transparent'}
                            />
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
