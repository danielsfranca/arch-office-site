
import { promises as fs } from 'fs';
import path from 'path';

// Define the path to the JSON file
const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

// Types based on the JSON structure
export interface Delivery {
    id: number;
    name: string;
    type: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected' | 'delivered';
}

export interface Client {
    id: number;
    name: string;
    project: string;
    email: string;
    serial: string;
    deliveries: Delivery[];
    timeline: any[];
}

export interface Project {
    id: string | number;
    client_user_id: string | number; // references Client
    name: string;
    status: 'lead' | 'active' | 'finished';
    complexity?: 'baixa' | 'media' | 'alta';
    start_date: string;
    deadline: string;
}

export interface BoardColumn {
    id: string | number;
    project_id: string | number; // references Project
    name: string;
    order_index: number;
}

export interface Task {
    id: string | number;
    column_id: string | number; // references BoardColumn
    project_id: string | number; // references Project
    title: string;
    description: string;
    due_date: string;
    assigned_to_user_id: string | number;
}

export interface TimeEntry {
    id: string | number;
    user_id: string | number;
    project_id: string | number; // references Project
    task_id: string | number; // references Task
    start_time: string;
    end_time: string | null;
    duration_seconds: number;
    is_billable: boolean;
}

export interface Financial {
    id: string | number;
    project_id: string | number; // references Project
    type: 'income' | 'expense';
    amount: number;
    status: 'pending' | 'paid' | 'cancelled';
    due_date: string;
}

export interface Database {
    clients: Client[];
    projects: Project[];
    columns: BoardColumn[];
    tasks: Task[];
    timeEntries: TimeEntry[];
    financials: Financial[];
}

// Function to read the database
export async function getDatabase(): Promise<Database> {
    try {
        const fileContents = await fs.readFile(DATA_FILE_PATH, 'utf8');
        const db = JSON.parse(fileContents);

        // Ensure defaults for all collections
        return {
            clients: db.clients || [],
            projects: db.projects || [],
            columns: db.columns || [],
            tasks: db.tasks || [],
            timeEntries: db.timeEntries || [],
            financials: db.financials || [],
        };
    } catch (error) {
        console.error('Error reading database:', error);
        // Return a default structure if reading fails
        return {
            clients: [], projects: [], columns: [], tasks: [],
            timeEntries: [], financials: []
        };
    }
}

// Function to write to the database (simulated persistence)
export async function saveDatabase(data: Database): Promise<void> {
    try {
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing database:', error);
    }
}

// Helper: Get Client by ID or Serial
export async function getClientBySerial(serial: string): Promise<Client | undefined> {
    const db = await getDatabase();
    return db.clients.find(c => c.serial === serial);
}

// Helper: Get Client by ID
export async function getClientById(id: number): Promise<Client | undefined> {
    const db = await getDatabase();
    return db.clients.find(c => c.id === id);
}

// Helper: Add Delivery to Client
export async function addDelivery(clientId: number, delivery: Delivery): Promise<boolean> {
    const db = await getDatabase();
    const clientIndex = db.clients.findIndex(c => c.id === clientId);

    if (clientIndex === -1) return false;

    db.clients[clientIndex].deliveries.push(delivery);
    await saveDatabase(db);
    return true;
}

// --- Auth Helpers (Added for Build Compatibility) ---

export async function findClientByEmail(email: string): Promise<any | undefined> {
    const db = await getDatabase();
    // Using 'any' for return because auth.ts expects properties like passwordHash which aren't in Client interface yet
    return db.clients.find((c: any) => c.email === email);
}

export async function saveClient(newClient: any): Promise<void> {
    const db = await getDatabase();
    // Adapt newClient from auth.ts (which has string ID) to our DB structure if necessary
    // checking if we need to cast ID or push as is. 
    // For now pushing as is to db.clients array.
    db.clients.push(newClient);
    await saveDatabase(db);
}
