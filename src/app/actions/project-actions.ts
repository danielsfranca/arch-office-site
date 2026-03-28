'use server';

import { getDatabase, saveDatabase, Project, Task, Client, BoardColumn } from '@/lib/db';
import { PROJECT_TEMPLATES } from '@/lib/project-templates';

export async function getProjectsAction(): Promise<{ projects: Project[], clients: Client[] }> {
    const db = await getDatabase();
    return {
        projects: db.projects || [],
        clients: db.clients || []
    };
}

export async function getProjectTasksAction(projectId: string | number): Promise<Task[]> {
    const db = await getDatabase();
    return db.tasks.filter(t => t.project_id === projectId) || [];
}

export async function createProjectAction(data: { name: string, client_user_id: string | number, start_date: string, deadline: string, complexity?: 'baixa' | 'media' | 'alta' }): Promise<{ success: boolean, project?: Project, message?: string }> {
    try {
        const db = await getDatabase();

        const newProject: Project = {
            id: Date.now().toString(),
            name: data.name,
            client_user_id: data.client_user_id,
            start_date: data.start_date,
            deadline: data.deadline,
            complexity: data.complexity || 'baixa',
            status: 'lead'
        };

        db.projects.push(newProject);

        // Gera as colunas e tarefas automaticamente com base na complexidade e diagramas base
        const template = PROJECT_TEMPLATES[newProject.complexity || 'baixa'];

        // Base Date pra prazos consecutivos iterativos
        let currentDate = data.start_date ? new Date(data.start_date + 'T12:00:00') : new Date();

        template.columns.forEach((col, idx) => {
            db.columns.push({
                id: `${newProject.id}-${col.id}`,
                project_id: newProject.id,
                name: col.name,
                order_index: idx
            });
        });

        template.tasks.forEach((task, idx) => {
            const columnId = `${newProject.id}-${task.col}`;

            let taskDueDateStr = '';
            let description = task.durationWeeks > 0 ? `Prazo: ${task.durationWeeks} semana(s) estimada(s) - Automático` : 'Prazo: Variável (Pendente Definição)';

            if (task.durationWeeks > 0) {
                const newDate = new Date(currentDate);
                newDate.setDate(newDate.getDate() + (task.durationWeeks * 7));
                currentDate = newDate; // A task seguinte começa depois da entrega desta
                taskDueDateStr = newDate.toISOString().split('T')[0];
            }

            db.tasks.push({
                id: `${newProject.id}-t${idx}`,
                column_id: columnId,
                project_id: newProject.id,
                title: `[${task.code}] ${task.title}`,
                description: description,
                due_date: taskDueDateStr,
                assigned_to_user_id: ''
            });
        });

        await saveDatabase(db);

        return { success: true, project: newProject };
    } catch (error) {
        return { success: false, message: 'Erro ao criar projeto.' };
    }
}
