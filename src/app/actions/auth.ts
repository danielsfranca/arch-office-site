"use server";

import { cookies } from "next/headers";
import { findClientByEmail, saveClient } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/security";
import crypto from "crypto";

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    // Simulate a minimal delay to prevent timing attacks
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (role === "admin") {
        // Validate strict Admin credentials from Environment Variables
        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const cookieStore = await cookies();

            cookieStore.set("admin_session", "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            });

            return { success: true, redirectUrl: "/admin-dashboard" };
        } else {
            return { success: false, message: "Email ou senha de administrador incorretos." };
        }
    }

    if (role === "client") {
        const client = await findClientByEmail(email);

        if (!client) {
            // Return generic message for security (user enumeration prevention)
            return { success: false, message: "Credenciais inválidas." };
        }

        const isValid = verifyPassword(password, client.passwordHash, client.salt);

        if (isValid) {
            const cookieStore = await cookies();
            cookieStore.set("client_session", client.id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            });
            return { success: true, redirectUrl: "/client-dashboard" };
        }

        return { success: false, message: "Credenciais inválidas." };
    }

    return { success: false, message: "Tipo de usuário inválido." };
}

export async function registerAction(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
        return { success: false, message: "As senhas não coincidem." };
    }

    if (password.length < 6) {
        return { success: false, message: "A senha deve ter pelo menos 6 caracteres." };
    }

    const existingClient = await findClientByEmail(email);
    if (existingClient) {
        return { success: false, message: "Este email já está cadastrado." };
    }

    const { hash, salt } = hashPassword(password);

    const newClient = {
        id: crypto.randomUUID(),
        name,
        email,
        phone,
        passwordHash: hash,
        salt,
        createdAt: new Date().toISOString(),
    };

    await saveClient(newClient);

    // Redirect to login with a success parameter
    return { success: true, redirectUrl: "/login?registered=true" };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    cookieStore.delete("client_session");
}
