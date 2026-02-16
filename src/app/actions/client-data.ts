
"use server";

import { getDatabase, saveDatabase } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addDeliveryAction(clientId: number, type: string, projectName: string) {
    const db = await getDatabase();
    const clientIndex = db.clients.findIndex(c => c.id === clientId);

    if (clientIndex === -1) {
        return { success: false, message: "Client not found" };
    }

    const newDelivery = {
        id: Date.now(),
        name: `${type}_${projectName.replace(/\s+/g, '_')}.pdf`,
        type: "pdf",
        date: new Date().toISOString().split('T')[0],
        status: "approved"
    };

    db.clients[clientIndex].deliveries.push(newDelivery as any);
    await saveDatabase(db);

    revalidatePath("/client-dashboard");
    revalidatePath("/admin-dashboard");

    return { success: true, message: "Document delivered successfully" };
}

export async function getClientDataAction(serial: string) {
    const db = await getDatabase();
    const client = db.clients.find(c => c.serial === serial);
    return client || null;
}

export async function getClientsAction() {
    const db = await getDatabase();
    return db.clients;
}
