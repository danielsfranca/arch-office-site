'use server';

import { getDatabase, saveDatabase, BoardColumn, Task } from '@/lib/db';

export async function getKanbanDataAction(projectId: string): Promise<{ columns: BoardColumn[], tasks: Task[] }> {
    const db = await getDatabase();

    // Check if columns exist for this project, if not generate default Vobi style columns
    let cols = db.columns.filter(c => c.project_id?.toString() === projectId);

    if (cols.length === 0) {
        const defaultColumns: BoardColumn[] = [
            { id: Date.now().toString() + '-1', project_id: projectId, name: 'To Do', order_index: 0 },
            { id: Date.now().toString() + '-2', project_id: projectId, name: 'Doing', order_index: 1 },
            { id: Date.now().toString() + '-3', project_id: projectId, name: 'Done', order_index: 2 }
        ];
        db.columns.push(...defaultColumns);
        await saveDatabase(db);
        cols = defaultColumns;
    }

    const projectTasks = db.tasks.filter(t => t.project_id?.toString() === projectId);

    return { columns: cols, tasks: projectTasks };
}

export async function moveTaskAction(taskId: string, newColumnId: string): Promise<{ success: boolean; message?: string }> {
    try {
        const db = await getDatabase();
        const taskIndex = db.tasks.findIndex(t => t.id.toString() === taskId);

        if (taskIndex > -1) {
            db.tasks[taskIndex].column_id = newColumnId;
            await saveDatabase(db);
            return { success: true };
        }
        return { success: false, message: 'Tarefa não encontrada' };
    } catch (e) {
        return { success: false, message: 'Erro ao mover tarefa' };
    }
}

export async function createTaskAction(projectId: string, columnId: string, title: string, description: string = '', dueDate: string = ''): Promise<{ success: boolean, task?: Task }> {
    const db = await getDatabase();

    const newTask: Task = {
        id: Date.now().toString(),
        project_id: projectId,
        column_id: columnId,
        title,
        description,
        due_date: dueDate,
        assigned_to_user_id: '' // Assign to no one por enquanto
    };

    db.tasks.push(newTask);
    await saveDatabase(db);

    return { success: true, task: newTask };
}

export async function updateTaskAction(taskId: string, updates: Partial<Task>): Promise<{ success: boolean }> {
    const db = await getDatabase();
    const taskIndex = db.tasks.findIndex(t => t.id.toString() === taskId);

    if (taskIndex > -1) {
        db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...updates };
        await saveDatabase(db);
        return { success: true };
    }

    return { success: false };
}

export async function deleteTaskAction(taskId: string): Promise<{ success: boolean }> {
    const db = await getDatabase();
    db.tasks = db.tasks.filter(t => t.id.toString() !== taskId);
    await saveDatabase(db);
    return { success: true };
}
