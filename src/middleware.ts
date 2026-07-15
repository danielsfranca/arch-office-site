import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================
// 🚧 MAINTENANCE MODE — ativo
// Para REATIVAR o site, delete ou comente o bloco abaixo
// (da linha "// === INÍCIO ===" até "// === FIM ===")
// ============================================================
// === INÍCIO ===
const MAINTENANCE_MODE = true;

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (MAINTENANCE_MODE) {
        // Permite acesso apenas à própria página de manutenção e assets
        if (
            !pathname.startsWith("/maintenance") &&
            !pathname.startsWith("/_next") &&
            !pathname.startsWith("/favicon")
        ) {
            return NextResponse.redirect(new URL("/maintenance", request.url));
        }
        return NextResponse.next();
    }
    // === FIM ===

    // Protect Admin Dashboard
    if (pathname.startsWith("/admin-dashboard")) {
        const adminSession = request.cookies.get("admin_session");
        if (!adminSession) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Protect Client Dashboard
    if (pathname.startsWith("/client-dashboard")) {
        const clientSession = request.cookies.get("client_session");
        const nextAuthSession = request.cookies.get("next-auth.session-token") ||
            request.cookies.get("__Secure-next-auth.session-token") ||
            request.cookies.get("authjs.session-token"); // Check all variants

        // If neither custom session nor NextAuth session exists, redirect
        if (!clientSession && !nextAuthSession) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

// Configure paths to match
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
