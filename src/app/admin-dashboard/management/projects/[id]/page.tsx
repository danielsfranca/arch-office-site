import { getKanbanDataAction } from "@/app/actions/kanban-actions";
import KanbanBoard from "./kanban-board";
import { COLORS } from "@/lib/constants";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const projectId = resolvedParams.id;
    // Busca dados iniciais no servidor
    const initialData = await getKanbanDataAction(projectId);

    return (
        <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: COLORS.textPrimary }}>
                        Quadro Kanban - Projeto {projectId}
                    </h1>
                    <p style={{ color: COLORS.textSecondary, fontSize: '0.875rem', marginTop: '4px' }}>
                        Gerencie as tarefas e o fluxo do trabalho.
                    </p>
                </div>
            </div>

            {/* Kanban Board Component */}
            <KanbanBoard projectId={projectId} initialColumns={initialData.columns} initialTasks={initialData.tasks} />
        </div>
    );
}
