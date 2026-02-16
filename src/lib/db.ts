
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

export interface Database {
    clients: Client[];
    projects: any[];
}

// Function to read the database
export async function getDatabase(): Promise<Database> {
    try {
        const fileContents = await fs.readFile(DATA_FILE_PATH, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading database:', error);
        // Return a default structure if reading fails
        return { clients: [], projects: [] };
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
